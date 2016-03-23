package com.talkforex.quote.action;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.talkforex.common.utils.UUIDGenerator;
import com.talkforex.quote.common.Config;
import com.talkforex.quote.entity.Record;
import com.talkforex.quote.service.QuoteService;
import com.talkforex.quote.service.RecordSerService;
import com.talkforex.quoteclient.InstQuote;

@Controller
public class QuoteAction {
	
	@Autowired
	private QuoteService quoteService;
	
	@Autowired
	private RecordSerService recordService;
	
	@RequestMapping(value = "/gettoken.do", method = RequestMethod.GET)
	public @ResponseBody String gettoken1(HttpServletRequest request) {
		Record record = new Record();
		record.setId(UUIDGenerator.getUUID());
		record.setTime(new Date());
		record.setClientip(request.getRemoteHost());
		record.setFunctionid(0);
		record.setMtype(request.getParameter("mt"));
		record.setMcode(request.getParameter("mc"));
		record.setAppversion(request.getParameter("av"));
		record.setSysversion(request.getParameter("sv"));
		if(StringUtils.isEmpty(record.getMtype()) || StringUtils.isEmpty(record.getMcode()) || StringUtils.isEmpty(record.getAppversion()) || StringUtils.isEmpty(record.getSysversion())){
			return "null source";
		}
		if(!record.getMtype().startsWith("ios") && !record.getMtype().startsWith("android") && !record.getMtype().startsWith("pc")){
			return "not valid source";
		}
		this.recordService.save(record);
		return quoteService.getToken();
	}
	
	@RequestMapping(value = "/gettoken.do", method = RequestMethod.POST)
	public @ResponseBody String gettoken2(HttpServletRequest request) {
		Record record = new Record();
		record.setId(UUIDGenerator.getUUID());
		record.setTime(new Date());
		record.setClientip(request.getRemoteHost());
		record.setFunctionid(0);
		record.setMtype(request.getParameter("mt"));
		record.setMcode(request.getParameter("mc"));
		record.setAppversion(request.getParameter("av"));
		record.setSysversion(request.getParameter("sv"));
		if(StringUtils.isEmpty(record.getMtype()) || StringUtils.isEmpty(record.getMcode()) || StringUtils.isEmpty(record.getAppversion()) || StringUtils.isEmpty(record.getSysversion())){
			return "null source";
		}
		if(!record.getMtype().startsWith("ios") && !record.getMtype().startsWith("android") && !record.getMtype().startsWith("pc")){
			return "not valid source";
		}
		this.recordService.save(record);
		return quoteService.getToken();
	}
	
	@RequestMapping(value = "/get.do", method = RequestMethod.GET)
	public String get(HttpServletRequest request, ModelMap model) {
		String instGroup = request.getParameter("instgroup");
		String sfunc = request.getParameter("func");
		int func = 0;
		if(StringUtils.isNotEmpty(sfunc)){
			func = Integer.parseInt(request.getParameter("func"));
		}
		int group = 0;
		if(StringUtils.isNotEmpty(instGroup)){
			group = Integer.parseInt(instGroup);
		}
		Record record = new Record();
		record.setId(UUIDGenerator.getUUID());
		record.setTime(new Date());
		record.setClientip(request.getRemoteHost());
		record.setReferurl(request.getHeader("referer"));
		record.setFunctionid(func);
		record.setInstgroup(group);
		this.recordService.save(record);
		
		if(func == 1){
			model.addAttribute("QuoteServerHost", Config.getInstance().getQuoteServerHost());
			model.addAttribute("QuoteServerPort", Config.getInstance().getQuotePort());
			model.addAttribute("Token", quoteService.getToken());
			model.addAttribute("InstGroup", instGroup);
			return "kline";
		}else if(func == 2){
			model.addAttribute("InstGroup", instGroup);
			return "quotelist";
		}else if(func == 3){
			model.addAttribute("Insts", request.getParameter("insts"));
			return "quoteindex";
		}else{
			return "index";
		}
	}
	
	@RequestMapping(value = "/getQuoteListByGroup.do", method = RequestMethod.POST)
	public @ResponseBody List<InstQuote> getQuoteListByGroup(HttpServletRequest request) {
		String instGroup = request.getParameter("InstGroup");
		int group = 0;
		if(StringUtils.isNotEmpty(instGroup)){
			group = Integer.parseInt(instGroup);
		}
		return this.quoteService.getQuoteListByGroup(group);
	}
	
	@RequestMapping(value = "/getQuoteListByInst.do", method = RequestMethod.POST)
	public @ResponseBody List<InstQuote> getQuoteListByInst(HttpServletRequest request) {
		String[] insts = request.getParameter("Insts").split(",");
		return this.quoteService.getQuoteListByInst(insts);
	}
	
	@RequestMapping(value = "/index.do", method = RequestMethod.GET)
	public String index() {
		return "index";
	}
	
	@RequestMapping(value = "/subsReg.do", method = RequestMethod.GET)
	public @ResponseBody String subsReg(HttpServletRequest request){
		String regid = request.getParameter("regid");
		if(regid.equals("1Wbda")){
			this.quoteService.SubsReg();
			return "ok";
		}
		return "error";
	}
}
