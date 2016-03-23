package com.talkforex.quote.common;

import com.talkforex.quoteclient.Quote;

public class QuoteClient {

	private static Object lock = new Object(); 
	private static Quote quote;
	public static Quote getInstance(){
		synchronized (lock) {
			if(quote == null){
				quote = new Quote(Config.getInstance().getQuoteServerHost(), Config.getInstance().getQuotePort(), Config.getInstance().getAppID(), Config.getInstance().getAppSecret(), Config.getInstance().getAesKey());
				System.out.println("StartSubs");
				quote.subscribeQuoteList();
			}
			return quote;
		}
	}
}
