package com.talkforex.quote.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.talkforex.quote.common.QuoteClient;
import com.talkforex.quote.service.QuoteService;
import com.talkforex.quoteclient.InstQuote;

@Service
public class QuoteServiceImpl implements QuoteService {

	@Override
	public String getToken(){
		String result = QuoteClient.getInstance().getToken();
		return result;
	}
	
	@Override
	public List<InstQuote> getQuoteListByGroup(int group){
		return QuoteClient.getInstance().getQuoteListByGroup(group);
	}
	
	@Override
	public List<InstQuote> getQuoteListByInst(String[] insts){
		return QuoteClient.getInstance().getQuoteListByInst(insts);
	}
	
	@Override
	public void SubsReg(){
		QuoteClient.getInstance().subscribeQuoteList();
	}
}
