package com.talkforex.quoteclient;

import org.apache.commons.lang.ArrayUtils;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IoSession;

public class IoHandler  extends IoHandlerAdapter{

	private Quote quote;
	
	public IoHandler(Quote quote){
		
		this.quote = quote;
	}
	
	@Override
	public void sessionOpened(IoSession session) throws Exception {
		System.out.println("gettoken");
		String token = this.quote.getToken();
		String reqMsg = "c:0&" + token;
		byte[] bt = reqMsg.getBytes("utf-8");
		IoBuffer ioBuffer = IoBuffer.allocate(bt.length);
		ioBuffer.put(bt, 0, bt.length);
		ioBuffer.flip();
		session.write(ioBuffer);
		System.out.println("sendreg");
		this.quote.setSession(session);
	}
	
	@Override
	public void messageReceived(IoSession session, Object message) throws Exception {
		IoBuffer buffer = (IoBuffer)message;
		byte[] byteBuffer = new byte[buffer.limit()];
		buffer.get(byteBuffer);
		synchronized (this.quote.lock){
			byte[] recvd = this.quote.getBrecv();
			recvd = ArrayUtils.addAll(recvd, byteBuffer);
			this.quote.setBrecv(recvd);
		}
	}
}
