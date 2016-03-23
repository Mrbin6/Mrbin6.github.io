package com.talkforex.quoteclient;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.TimerTask;

import org.apache.mina.core.buffer.IoBuffer;

public class TaskRecv extends TimerTask{

	private Quote quote;
	
	public TaskRecv(Quote quote){
		this.quote = quote;
	}
	
	public void run(){
		try {
			synchronized (this.quote.lock){
				byte[] recvd = this.quote.getBrecv();
				if(recvd == null || recvd.length == 0){
					this.quote.setAdleTimes(this.quote.getAdleTimes() + 1);
					if(this.quote.getAdleTimes() > 1000){
						this.quote.setAdleTimes(-100);
						this.quote.connect();
						System.out.println(new Date());
						System.out.println("reconnecting");
					}
					return;
				}
				this.quote.setAdleTimes(0);
				String recv = new String(recvd,"utf-8");
				String[] arr = recv.split("\\|");
				String sl = arr[0];
				int il = Integer.parseInt(sl);
				int curl = recvd.length - sl.length() - 1;
				if(curl >= il){
					byte[] bwh = new byte[il];
					byte[] brm = new byte[curl - il];
					for(int i = sl.length() + 1; i < recvd.length; i++){
						if(i < sl.length() + 1 + il){
							bwh[i - sl.length() - 1] = recvd[i];
						}else{
							brm[i - il - sl.length() - 1] = recvd[i];
						}
					}
					this.quote.setBrecv(brm);
					
					recv = new String(bwh,"utf-8");
					arr = recv.split("&");
					String requestType = arr[0].substring(arr[0].lastIndexOf(":"));
					if(requestType.equals(":0")){
						if(arr[1].equals("0")){
							String reqMsg = "c:4&0";
							byte[] bt = reqMsg.getBytes("utf-8");
							IoBuffer ioBuffer = IoBuffer.allocate(bt.length);
							ioBuffer.put(bt, 0, bt.length);
							ioBuffer.flip();
							this.quote.getSession().write(ioBuffer);
						}
					}else if(requestType.equals(":4")){
						for (int i = 1; i < arr.length - 2; i += 3){
							InstQuote iq = new InstQuote();
			            	iq.setInst(arr[i]);
			            	iq.setInstname(arr[i + 1]);
			            	iq.setGroup(Integer.parseInt(arr[i + 2]));
			            	iq.setAsk("0");
			            	iq.setBid("0");
			            	iq.setUpdown("0");
			            	iq.setPreclose(0);
			            	this.quote.getListQuote().put(iq.getInst(), iq);
			            }
		            	
		            	String reqMsg = "c:10";
		            	byte[] bt = reqMsg.getBytes("utf-8");
		            	IoBuffer ioBuffer = IoBuffer.allocate(bt.length);
		    			ioBuffer.put(bt, 0, bt.length);
		    			ioBuffer.flip();
		    			this.quote.getSession().write(ioBuffer);
		    			
		            	reqMsg = "c:2";
		            	bt = reqMsg.getBytes("utf-8");
		            	ioBuffer = IoBuffer.allocate(bt.length);
		    			ioBuffer.put(bt, 0, bt.length);
		    			ioBuffer.flip();
		    			this.quote.getSession().write(ioBuffer);
					}else if(requestType.equals(":2")){
						InstQuote iq = this.quote.getListQuote().get(arr[1]);
						if(iq != null){
							iq.setAsk(arr[3]);
							iq.setBid(arr[4]);
							if(iq.getPreclose() != 0){
								BigDecimal b = new BigDecimal(Double.parseDouble(iq.getAsk()) - iq.getPreclose());
								if(b.doubleValue() != 0){
									iq.setUpdown(b.setScale(5, BigDecimal.ROUND_HALF_UP).toString());
								}
							}
						}
					}else if(requestType.equals(":10")){
						for (int i = 1; i < arr.length - 3; i += 4){
							InstQuote iq = this.quote.getListQuote().get(arr[i]);
							if(iq != null){
								iq.setAsk(arr[i + 2]);
								iq.setBid(arr[i + 1]);
								iq.setPreclose(Double.parseDouble(arr[i + 3]));
								if(iq.getPreclose() != 0){
									BigDecimal b = new BigDecimal(Double.parseDouble(iq.getAsk()) - iq.getPreclose());
									if(b.doubleValue() != 0){
										iq.setUpdown(b.setScale(5, BigDecimal.ROUND_HALF_UP).toString());
									}
								}
							}
						}
					}
				}
			}
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
