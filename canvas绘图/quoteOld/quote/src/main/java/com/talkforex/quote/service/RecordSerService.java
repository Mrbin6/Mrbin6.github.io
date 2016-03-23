package com.talkforex.quote.service;

import org.springframework.stereotype.Service;

import com.talkforex.quote.entity.Record;

@Service
public interface RecordSerService {

	public void save(Record record);
}
