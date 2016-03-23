package com.talkforex.quote.entity;

import java.util.Date;

public class Record {

	private String id;
	private Date time;
	private String clientip;
	private String referurl;
	private int functionid;
	private int instgroup;
	private String mtype;
	private String mcode;
	private String appversion;
	private String sysversion;
	
	public String getMtype() {
		return mtype;
	}
	public void setMtype(String mtype) {
		this.mtype = mtype;
	}
	public String getMcode() {
		return mcode;
	}
	public void setMcode(String mcode) {
		this.mcode = mcode;
	}
	public String getAppversion() {
		return appversion;
	}
	public void setAppversion(String appversion) {
		this.appversion = appversion;
	}
	public String getSysversion() {
		return sysversion;
	}
	public void setSysversion(String sysversion) {
		this.sysversion = sysversion;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getClientip() {
		return clientip;
	}
	public void setClientip(String clientip) {
		this.clientip = clientip;
	}
	public String getReferurl() {
		return referurl;
	}
	public void setReferurl(String referurl) {
		this.referurl = referurl;
	}
	public int getFunctionid() {
		return functionid;
	}
	public void setFunctionid(int functionid) {
		this.functionid = functionid;
	}
	public int getInstgroup() {
		return instgroup;
	}
	public void setInstgroup(int instgroup) {
		this.instgroup = instgroup;
	}
}
