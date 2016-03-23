package com.talkforex.quote.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.talkforex.quote.dao.RecordMapper;
import com.talkforex.quote.entity.Record;
import com.talkforex.quote.service.RecordSerService;

@Service
public class RecordSerServiceImpl implements RecordSerService {

	@Autowired
	private RecordMapper recordMapper;

	@Override
	@Transactional
	public void save(Record record) {
		recordMapper.insert(record);
	}
}
