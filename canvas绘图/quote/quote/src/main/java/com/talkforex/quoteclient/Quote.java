package com.talkforex.quoteclient;

import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Timer;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.future.ReadFuture;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.executor.ExecutorFilter;
import org.apache.mina.filter.stream.StreamWriteFilter;
import org.apache.mina.transport.socket.SocketSessionConfig;
import org.apache.mina.transport.socket.nio.NioSocketConnector;

import com.talkforex.common.utils.EncrypUtil;

/**
 * Hello world!
 *
 */
public class Quote 
{
	private String serverHost;
	private int port;
	private String appId;
	private String appSecret;
	private String aesKey;
	private IoSession session;
	private int adleTimes = 0;
	
	public int getAdleTimes() {
		return adleTimes;
	}

	public void setAdleTimes(int adleTimes) {
		this.adleTimes = adleTimes;
	}

	public Object lock = new Object();
	
	public IoSession getSession() {
		return session;
	}

	public void setSession(IoSession session) {
		this.session = session;
	}

	private ConcurrentHashMap<String, InstQuote> listQuote = new ConcurrentHashMap<String,InstQuote>();
	private byte[] brecv;
	
	public byte[] getBrecv() {
		return brecv;
	}

	public void setBrecv(byte[] brecv) {
		this.brecv = brecv;
	}

	public ConcurrentHashMap<String, InstQuote> getListQuote() {
		return listQuote;
	}

	public Quote(String serverHost, int port, String appId, String appSecret, String aesKey){
		
		this.serverHost = serverHost;
		this.port = port;
		this.appId = appId;
		this.appSecret = appSecret;
		this.aesKey = aesKey;
	}

	public String getToken(){
		String result = null;
		try {
			byte[] bEnCont = EncrypUtil.encrypAES(appSecret, aesKey);
			String sEnCont = EncrypUtil.parseByte2HexStr(bEnCont);
			String reqMsg = "c:5&" + appId + "&" + sEnCont;
			byte[] bt = reqMsg.getBytes("utf-8");
			IoBuffer ioBuffer = IoBuffer.allocate(bt.length);
		    ioBuffer.put(bt, 0, bt.length);
		    ioBuffer.flip();
		    NioSocketConnector connector = new NioSocketConnector();
			connector.setConnectTimeoutMillis(30000L);
			connector.getFilterChain().addLast("codec", new StreamWriteFilter());
			connector.getFilterChain().addLast("threadPool", 
					new ExecutorFilter(Executors.newFixedThreadPool(1)));
		    SocketSessionConfig cfg = connector.getSessionConfig();
		    cfg.setUseReadOperation(true);
		    IoSession session = connector.connect(new InetSocketAddress(serverHost, port)).awaitUninterruptibly().getSession();
			session.write(ioBuffer).awaitUninterruptibly();
			ReadFuture readFuture = session.read();
			if (readFuture.awaitUninterruptibly(30, TimeUnit.SECONDS)) {
				IoBuffer buffer = (IoBuffer)readFuture.getMessage();
				byte[] byteBuffer = new byte[buffer.limit()];
				buffer.get(byteBuffer);
				result = new String(byteBuffer,"utf-8");
				if(result.startsWith("HTTP")){
					ioBuffer = IoBuffer.allocate(bt.length);
				    ioBuffer.put(bt, 0, bt.length);
				    ioBuffer.flip();
					session.write(ioBuffer).awaitUninterruptibly();
					readFuture = session.read();
					if (readFuture.awaitUninterruptibly(30, TimeUnit.SECONDS)) {
						buffer = (IoBuffer)readFuture.getMessage();
						byteBuffer = new byte[buffer.limit()];
						buffer.get(byteBuffer);
						result = new String(byteBuffer,"utf-8");
						result = result.split("&")[1];
					}else{
						result = "error:timeout";
					}
				}else{
					result = result.split("&")[1];
				}
			} else {
				result = "error:timeout";
			}
			connector.dispose();
			return result;
		} catch (UnsupportedEncodingException e) {
			return "error:" + e.getMessage();
		}
	}
	
	public void subscribeQuoteList(){
		System.out.println("SubsList");
		connect();
		Timer timer = new Timer();
		timer.schedule(new TaskRecv(this), 1000, 50);
		timer.schedule(new TaskUpdatePreClose(this), 60000 * 60, 60000 * 60);
		timer.schedule(new TaskHeartBeat(this), 20000, 5000);
	}
	
	private NioSocketConnector connector;
	public void connect(){
		if(connector != null){
			connector.dispose();
			connector = null;
		}
		connector = new NioSocketConnector();
		connector.setConnectTimeoutMillis(30000L);
		connector.getFilterChain().addLast("codec", new StreamWriteFilter());
		connector.setHandler(new IoHandler(this));
		connector.connect(new InetSocketAddress(serverHost, port));
	}
	
	public List<InstQuote> getQuoteListByGroup(int group){
		List<InstQuote> list = new ArrayList<InstQuote>();
		if(listQuote != null){
			Iterator<Entry<String, InstQuote>> iter = listQuote.entrySet().iterator();
			while(iter.hasNext()){
				Entry<String, InstQuote> entry = iter.next();
				InstQuote iq = entry.getValue();
				if(iq.getGroup() == group || group == 0){
					list.add(iq);
				}
			}
		}
		return list;
	}
	
	public List<InstQuote> getQuoteListByInst(String[] insts){
		List<InstQuote> list = new ArrayList<InstQuote>();
		if(listQuote != null){
			for(String inst : insts){
				InstQuote iq = listQuote.get(inst);
				if(iq != null){
					list.add(iq);
				}
			}
		}
		return list;
	}
}
