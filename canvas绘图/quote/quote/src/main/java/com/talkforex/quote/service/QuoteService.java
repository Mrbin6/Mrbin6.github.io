package com.talkforex.quote.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.talkforex.quoteclient.InstQuote;

@Service
public interface QuoteService {
	public String getToken();
	public List<InstQuote> getQuoteListByGroup(int group);
	public List<InstQuote> getQuoteListByInst(String[] insts);
	public void SubsReg();
}
