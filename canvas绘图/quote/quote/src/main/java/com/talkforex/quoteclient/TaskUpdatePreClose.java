package com.talkforex.quoteclient;

import java.io.UnsupportedEncodingException;
import java.util.TimerTask;

import org.apache.mina.core.buffer.IoBuffer;

public class TaskUpdatePreClose extends TimerTask{

	private Quote quote;
	
	public TaskUpdatePreClose(Quote quote){
		this.quote = quote;
	}
	
	public void run(){
		try {
			String reqMsg = "c:6";
			byte[] bt = reqMsg.getBytes("utf-8");
			IoBuffer ioBuffer = IoBuffer.allocate(bt.length);
			ioBuffer.put(bt, 0, bt.length);
			ioBuffer.flip();
			this.quote.getSession().write(ioBuffer);
		} catch (UnsupportedEncodingException e) {
		}
	}
}
