//数据加工
function DataUtil(){
	$this = this;
}

DataUtil.prototype = {
	//获取数据
	getData : function(){
		var result = {};
		var ks = [];
		for (var i = 0; i < data.length; i++) {
			var rawData = data[i];
			//20111215,11.68,11.65,11.76,11.40,11.41,43356655,502325991
			//日期,昨收,开盘价,高,低，收,量，额
			var item = {
				quoteTime: rawData[0],
				preClose: rawData[1],
				open: rawData[2],
				high: rawData[3],
				low: rawData[4],
				close: rawData[5],
				volume: rawData[5],
				amount: rawData[5]
			};
			if (ks.length == 0) {
				result.low = item.low;
				result.high = item.high;
			} else {
				result.high = Math.max(result.high, item.high);
				result.low = Math.min(result.low, item.low);
			}
			ks.push(item);
		}
		result.ks = ks;
		return result;
	},
	//获取区间内最大值，最小值
	getLimit : function(config){
		var highs = new Array();
		var lows = new Array();
		for(var i = config.begin;i<config.end;i++){
			if(config.mDatas[i]){
				highs.push(config.mDatas[i].high);
				lows.push(config.mDatas[i].low);
			}
		}
		highs = highs.sort(function compare(a,b){return a-b;});
		lows = lows.sort(function compare(a,b){return a-b;});
		var low = lows[0];
		var high = highs[highs.length-1];
		//钱/像素
		var multiple = (highs[highs.length-1] - lows[0])/(config.canvasHeight-2*config.vSpace);
		//手动释放数组
		highs.splice(0,highs.length);
		highs = null;
		lows.splice(0,lows.length);
		lows = null;
		config.perPxMoney = multiple;
		config.lowest = low;
		return {
			multiple : multiple,
			low : low,
			high : high
		}
	},
	//获取每像素代表的钱
	getPerPXMoney : function(high,low){
		var multiple = (high - low)/(canvasHeight-2*vSpace);
		return multiple;
	}
}