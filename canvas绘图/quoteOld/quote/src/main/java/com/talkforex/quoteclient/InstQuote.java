package com.talkforex.quoteclient;

public class InstQuote {
	private String inst;
	private String instname;
	private int group;
	private String bid;
	private String ask;
	private String updown;
	private double preclose;
	
	public double getPreclose() {
		return preclose;
	}
	public void setPreclose(double preclose) {
		this.preclose = preclose;
	}
	public String getUpdown() {
		return updown;
	}
	public void setUpdown(String updown) {
		this.updown = updown;
	}
	public String getInst() {
		return inst;
	}
	public void setInst(String inst) {
		this.inst = inst;
	}
	public String getInstname() {
		return instname;
	}
	public void setInstname(String instname) {
		this.instname = instname;
	}
	public int getGroup() {
		return group;
	}
	public void setGroup(int group) {
		this.group = group;
	}
	public String getBid() {
		return bid;
	}
	public void setBid(String bid) {
		this.bid = bid;
	}
	public String getAsk() {
		return ask;
	}
	public void setAsk(String ask) {
		this.ask = ask;
	}
}
