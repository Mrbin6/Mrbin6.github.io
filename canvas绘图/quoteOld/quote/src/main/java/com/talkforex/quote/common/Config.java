package com.talkforex.quote.common;

import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

public class Config {

	private String appID;
	private String appSecret;
	private String aesKey;
	private String quoteServerHost;
	private int quotePort;

	public String getAppID() {
		return appID;
	}

	public String getAppSecret() {
		return appSecret;
	}

	public String getAesKey() {
		return aesKey;
	}

	public String getQuoteServerHost() {
		return quoteServerHost;
	}

	public int getQuotePort() {
		return quotePort;
	}

	public Config(){
		ResourceBundle bundle = PropertyResourceBundle.getBundle("config/config");
		appID = bundle.getString("appID");
		appSecret = bundle.getString("appSecret");
		aesKey = bundle.getString("aesKey");
		quoteServerHost = bundle.getString("quoteServerHost");
		quotePort = Integer.parseInt(bundle.getString("quotePort"));
	}
	
	private static Config config = new Config();

	static public Config getInstance() {
		return config;
	}
}
