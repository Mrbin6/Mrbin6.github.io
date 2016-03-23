//消息处理

//解析消息
function analysisMessage(msg,config){
	var messages = msg.split(':')[1].split('&');
	//注册
	if(messages[0] == 0){
		if(messages[1] == 0){
			config.mTcpClient.send(getProducts(config));
		}
	} 
	//获取品种
	else if(messages[0] == 4){
		analysisProductsMessage(messages,config);
	} 
	//推送及获取
	else{
		//判断是否是当前品种
		if(messages[1] == config.PRODUCT){
			if(messages[0] == 1){
				analysisRequestMessage(messages,config);
			} else {
				analysisPushMessage(messages,config);
			}
		}
	}
}

//解析品种数据
function analysisProductsMessage(messages,config){
	if(!config.mDatas || config.mDatas.length < 1){
		config.ENDTIME = getCurrentTime();
		//console.log("current",config.ENDTIME);
		config.mTcpClient.send(getRequestMsg(config));
	}
	if(config.headerFlag){
		var inner = '';
		var len=messages.length;
		for (var i = 1; i < len - 2; i += 3){
			if(messages[i] == config.PRODUCT){
				inner += '<option selected value="'+messages[i]+'">'+messages[i+1]+'</option>';
			} else{
				inner += '<option value="'+messages[i]+'">'+messages[i+1]+'</option>';
			}		
		}
		config.select.innerHTML = inner;	
	}
}

//解析请求数据
function analysisRequestMessage(messages,config){
	if(config.mDatas.length < 1){
		for(var i=3,len = messages.length;i < len;i=i+7){
			var item = {
				quoteTime: messages[i],
				open: messages[i+1],
				high: messages[i+2],
				low: messages[i+3],
				close: messages[i+4],
				preClose: messages[i+5],
				volume: messages[i+6]
			};
			config.mDatas.push(item);
		}
		startPaint(config);
	} else{
		var number = 0;
		for(var i=messages.length-1;i > 3;i=i-7){
			var item = {
				quoteTime: messages[i-6],
				open: messages[i-5],
				high: messages[i-4],
				low: messages[i-3],
				close: messages[i-2],
				preClose: messages[i-1],
				volume: messages[i]
			};
			number++;
			config.mDatas.unshift(item);
		}
		config.begin+=number;
		config.end+=number;
	}
	config.RESTFLAG = false;
	config.loading.style.display='none';
}

//解析推送数据
function analysisPushMessage(messages,config){
	var endData = config.mDatas[config.mDatas.length-1];
	if(!endData){
		return;
	}
	var needData = needToCreateData(messages[2],endData.quoteTime,config.CYCLE);
	//console.log('item',JSON.stringify(needData)+',money:'+messages[3]);
	if(!needData.needToCreate){
		if(messages[3] < endData.low){
			endData.low = messages[3];
		} else if(messages[3] > endData.high){
			endData.high = messages[3];
		}
		endData.close = messages[3];
		//console.log('item',JSON.stringify(endData)+',money:'+messages[3]);
	} else{
		var currentopen = messages[3];
		var currentlow = messages[3];
		var currenthigh = messages[3];
		
		var item = {
			quoteTime: needData.correctTime,
			open: currentopen,
			high: currenthigh,
			low: currentlow,
			close: messages[3],
			preClose: endData.close,
			volume: 0
		};
		config.mDatas.push(item);
		if(config.end == config.mDatas.length-1 && !config.mouseFlag){
			config.begin++;
			config.end++;
		}
	}
}

//判断是否需要产生一条新的数据
function needToCreateData(currentTime,endTime,cycle){
	//2009 01 01 00 00
	var correctTime = currentTime;
	var len = correctTime.length;
	var correntT;
	var endT;
	//1分钟
	if(cycle == '1'){
		correntT = correctTime.substring(10,12);
		endT = endTime.substring(10,12);
		if(correntT != endT){
			return {
				needToCreate : true,
				correctTime : correctTime
			}
		} else{
			return {
				needToCreate : false,
				correctTime : correctTime
			}
		}
	} 
	//5分钟
	else if(cycle == '2'){
		correntT = parseInt(correctTime.substring(8,12));
		endT = parseInt(endTime.substring(8,12));
		
		if((correntT-endT) > 5){
			var minute = (correntT - correntT%5)+'';
			if(minute.length < 2){
				minute = '0'+minute;
			}
			return {
				needToCreate : true,
				correctTime : currentTime.substring(0,8) + minute
			}
		} else{
			if((correntT-endT) != 0 && (correntT-endT)%5 == 0){
				return {
					needToCreate : true,
					correctTime : currentTime.substring(0,12)
				}
			} else{
				return {
					needToCreate : false,
					correctTime : correctTime
				}
			}
		}
		
	}
	//小时
	else if(cycle == '5'){
		correntT = correctTime.substring(8,10);
		endT = endTime.substring(8,10);
		if(correntT != endT){
			return {
				needToCreate : true,
				correctTime : currentTime.substring(0,10)+'00'
			}
		} else{
			return {
				needToCreate : false,
				correctTime : correctTime
			}
		}
	}
	//日
	else if(cycle == '9'){
		correntT = correctTime.substring(0,8);
		endT = endTime.substring(0,8);
		if(correntT != endT){
			return {
				needToCreate : true,
				correctTime : currentTime.substring(0,8)+'0000'
			}
		} else{
			return {
				needToCreate : false,
				correctTime : correctTime
			}
		}
	}
	//周
	else if(cycle == '10'){
		correntT = parseInt(correctTime.substring(0,8));
		endT = parseInt(endTime.substring(0,8));
		
		if((correntT-endT) > 7){
			var day = (correntT - correntT%7)+'';
			if(day.length < 2){
				day = '0'+day;
			}
			return {
				needToCreate : true,
				correctTime : currentTime.substring(0,6) + day+'0000'
			}
		} else{
			if((correntT-endT) != 0 && (correntT-endT)%7 == 0){
				return {
					needToCreate : true,
					correctTime : currentTime.substring(0,8)+'0000'
				}
			} else{
				return {
					needToCreate : false,
					correctTime : correctTime
				}
			}
		}
	}
	//月
	else if(cycle == '11'){
		correntT = correctTime.substring(4,6);
		endT = endTime.substring(4,6);
		if(correntT != endT){
			return {
				needToCreate : true,
				correctTime : currentTime.substring(0,6)+'000000'
			}
		} else{
			return {
				needToCreate : false,
				correctTime : correctTime
			}
		}
	}
	//季度
	else if(cycle == '12'){
		correntT = correctTime.substring(4,6);
		endT = endTime.substring(4,6);
		if(correntT != endT){
			return {
				needToCreate : true,
				correctTime : currentTime.substring(0,6)+'000000'
			}
		} else{
			return {
				needToCreate : false,
				correctTime : correctTime
			}
		}
	}
	//年
	else if(cycle == '13'){
		correntT = correctTime.substring(0,4);
		endT = endTime.substring(0,4);
		if(correntT != endT){
			return {
				needToCreate : true,
				correctTime : correctTime
			}
		} else{
			return {
				needToCreate : false,
				correctTime : correctTime
			}
		}
	}
}

//拼装消息体
function createMessage(msg,config){
	
}

//启动绘图
function startPaint(config){
	//console.log('redraw',config.begin+',end:'+config.end);
	initBaseData(config);
	//画图
	paintLine(config);
	//启动推送
	startPush(config);
	//启动定时重绘
	startRedraw(config);
	//console.log('after:begin:'+config.begin+',end:'+config.end+',mDatas.length:'+config.mDatas.length);
}

//初始化KLINE基本数据条件
function initBaseData(config){
	config.candleWidth = config.maxWidth/16;
	config.hSpace = (config.baseWidth-config.maxWidth)/16;
	var currentSize = getMaxCandleNumber(config);
	config.end = config.mDatas.length;
	config.begin = config.end - currentSize;
	if(config.begin < 0){
		config.begin = 0;
	}
}

//启动推送
function startPush(config){
	config.mTcpClient.send(getPushMsg(config));
}

//启动刷新
function startRedraw(config){
	setInterval(function(){
		if(config.end == config.mDatas.length && !config.mouseFlag){
			paintLine(config);
		}
	},1000);
}

//获取当前时间
function getCurrentTime(){
	var myDate = new Date();
	var year = myDate.getFullYear()+'';
	var month = myDate.getMonth()+1+'';
	if(month.length < 2){
		month = '0'+month;
	}
	var date = myDate.getDate()+'';
	if(date.length < 2){
		date = '0'+date;
	}
	var hour = myDate.getHours()+'';
	if(hour.length < 2){
		hour = '0'+hour;
	}
	var minute = myDate.getMinutes();
	if(minute.length < 2){
		minute = '0'+hour;
	}
	var second = myDate.getSeconds();
	if(second.length < 2){
		second = '0'+hour;
	}
	return year+month+date+hour+minute+second;
}

//拼装请求数据
function getRequestMsg(config){
	//console.log('requestProduct:',config.REQUEST+'&'+config.PRODUCT+'&'+config.CYCLE+'&'+config.STARTTIME+'&'+config.ENDTIME+'&'+config.CANDLENUMBER);
	return config.REQUEST+'&'+config.PRODUCT+'&'+config.CYCLE+'&'+config.STARTTIME+'&'+config.ENDTIME+'&'+config.CANDLENUMBER;
}

//拼装推送数据
function getPushMsg(config){
	return config.PUSH+'&'+config.PRODUCT;
}

//拼装取消推送数据
function getCancelPushMsg(config){
	return config.CANCELPUSH+'&'+config.PRODUCT;
}

//拼装请求品种数据
function getProducts(config){
	//console.log('requestProduct:','c:4&'+config.PRODUCTLIST);
	return 'c:4&'+config.PRODUCTLIST;
}

//注册
function registerLine(config){
	return 'c:0&'+config.TOKEN;
}

//获取数据
function requireData(config){
	if(!config.RESTFLAG){
		config.ENDTIME = config.mDatas[0].quoteTime;
		config.mTcpClient.send(getRequestMsg(config));
		config.RESTFLAG = true;
		config.loading.style.display='block';
	}
}