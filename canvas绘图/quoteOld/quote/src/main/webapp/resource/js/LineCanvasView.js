/**
画笔
*/
//画图
function paintLine(config){
	var canvas = document.getElementById(config.canvasID);
	var cover = document.getElementById(config.coverID); 
	if(!canvas.getContext){
		return;
	}
	
	var cans = canvas.getContext('2d');
	var coverCtx = cover.getContext('2d');
	var data = config.mDatas;
	cans.clearRect(0,0,config.canvasWidth,config.canvasHeight);
	drawBackLines(cans,coverCtx,config);
	if(config.needToShowDrawKLine == true){
		drawkLines(cans,data,config);
	}
	if(config.needToShowBrokenLine == true){
		drawLines(cans,data,config);
	}
}
	//画折线
function drawLines(cans,data,config){
	var current = (config.hSpace+config.candleWidth)/2;
	var current = 0;
	cans.beginPath();
	cans.lineJoin="round";
	
	var param = config.mDataUtil.getLimit(config);
	//console.log('差距',JSON.stringify(highs));
	for(var i = config.begin;i<config.end;i++){
		if(data[i]){
			if(i == config.begin){
				cans.moveTo(current,config.canvasHeight-((data[i].close-param.low)/param.multiple+config.vSpace));
			} else{
				current = current+config.candleWidth+config.hSpace;
				cans.lineTo(current,config.canvasHeight-((data[i].close-param.low)/param.multiple+config.vSpace));
			}	
		}					
	};
	cans.strokeStyle = 'grey';
	cans.save();
	cans.stroke();
}

//画蜡烛图
function drawkLines(cans,data,config){
	//var current = (hSpace+candleWidth)/2;
	var current = 0.5;
	cans.lineWidth=config.baseSize;
	cans.globalAlpha = 1.0;
	cans.globalAlpha = 1.0;
	var param = config.mDataUtil.getLimit(config);
	//console.log('draw:config.begin:'+config.begin+',config.end:'+config.end+',mDatas.length:'+mDatas.length);
	for(var i = config.begin;i<config.end;i++){
		if(data[i]){
			cans.beginPath();
			if(data[i].open >= data[i].close){
				cans.strokeStyle = 'green';
				cans.fillStyle = 'black';
				cans.moveTo(current,config.canvasHeight-((data[i].low-param.low)/param.multiple+config.vSpace));
				cans.lineTo(current,config.canvasHeight-((data[i].close-param.low)/param.multiple+config.vSpace));
				cans.moveTo(current,config.canvasHeight-((data[i].open-param.low)/param.multiple+config.vSpace));
				cans.lineTo(current,config.canvasHeight-((data[i].high-param.low)/param.multiple+config.vSpace));
				
				//左点，宽高
				var high = (data[i].open-data[i].close)/param.multiple;
				if(high < 2){
					high = 2;
				}
				cans.fillRect(current-config.candleWidth/2,config.canvasHeight-((data[i].open-param.low)/param.multiple+config.vSpace),config.candleWidth,high);
				cans.fillStyle = 'green';
				cans.fillRect(current-config.candleWidth/2+0.5,config.canvasHeight-((data[i].open-param.low)/param.multiple+config.vSpace)+0.5,config.candleWidth-1,high-1);
			} else{
				cans.strokeStyle = 'red';
				cans.fillStyle = 'red';
				cans.moveTo(current,config.canvasHeight-((data[i].low-param.low)/param.multiple+config.vSpace));
				cans.lineTo(current,config.canvasHeight-((data[i].open-param.low)/param.multiple+config.vSpace));
				cans.moveTo(current,config.canvasHeight-((data[i].close-param.low)/param.multiple+config.vSpace));
				cans.lineTo(current,config.canvasHeight-((data[i].high-param.low)/param.multiple+config.vSpace));
				
				//左点，宽高
				var high = (data[i].close-data[i].open)/param.multiple;
				if(high < 2){
					high = 2;
				}
				cans.fillRect(current-config.candleWidth/2,config.canvasHeight-((data[i].close-param.low)/param.multiple+config.vSpace),config.candleWidth,high);
				cans.fillStyle = 'white';
				cans.fillRect(current-config.candleWidth/2+0.5,config.canvasHeight-((data[i].close-param.low)/param.multiple+config.vSpace)+0.5,config.candleWidth-1,high-1);
			}
			cans.fillStyle = 'green';
			cans.stroke();
			cans.fill();
			current = current+config.candleWidth+config.hSpace;
		}					
	};
	cans.save();
}

//画背景线
function drawBackLines(cans,coverCtx,config){
	cans.beginPath();
	cans.lineWidth=1;
	cans.strokeStyle = "#D6D6D6";
	cans.clearRect(0,config.canvasHeight,config.canvasWidth,config.hLocationHeight);
	//比例
	var size = config.maxWidth/config.candleWidth;
	for(var i = 0;i <= config.maxSize+1;i++){
		drawDashLine(cans,config.baseWidth*i,0,config.baseWidth*i,config.canvasHeight,3);
		drawHLocation(cans,i,config.baseWidth*i,config.canvasHeight+config.hLocationHeight,size,config);
	}
	
	var param = getBaseHeight(config);
	coverCtx.fillStyle = "#FFF";
	coverCtx.clearRect(config.canvasWidth,0,config.baseWidth+config.parentLeft,config.canvasHeight+config.hLocationHeight);
	coverCtx.fillRect(config.canvasWidth,0,config.baseWidth+config.parentLeft,config.canvasHeight+config.hLocationHeight);
	for(var i=0; i <= param.g; i++){
		drawDashLine(cans,0,(param.maxPosition-param.firstHeight)-param.gh*i,config.canvasWidth,(param.maxPosition-param.firstHeight)-param.gh*i,3);
		drawVLocation(coverCtx,config.coverWidth,param.maxPosition-param.gh*(i+1),param.firstMoney+param.m*i,config);
	}
}

//画虚线
function drawDashLine(ctx, x1, y1, x2, y2, dashLen){
	xpos = x2 - x1; //得到横向的宽度;
	ypos = y2 - y1; //得到纵向的高度;
	numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); 
	for(var i=0; i < numDashes; i++){
		if(i % 2 === 0){
			ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
		}else{
			ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
		}
	}
	ctx.stroke();
}

//获取 gh：格子高度，m：钱/格，g：格子数
function getBaseHeight(config){
	var param = config.mDataUtil.getLimit(config);
	var g = Math.ceil((config.canvasHeight + config.headerHeight)*2/100);
	if(g > 10){
		g = 10;
	}
	var m = 5;
	//放大倍数
	var decimal = 100000;
	//最大值-最小值
	var min = (param.high - param.low)*decimal;
	var minLow = param.low*decimal;
	var maxPosition = config.canvasHeight;
	var gh = 0;
	var modulus = 0;
	if(min <= g){
		g = min;
	} 
	g++;
	gh = Math.ceil(config.canvasHeight/g);
	modulus = Math.ceil(gh*config.perPxMoney*decimal);
	if(modulus%5 != 0){
		modulus = modulus - modulus%5 + 5;
		gh = (5-modulus%5)/(config.perPxMoney*Math.pow(10,5)) +gh;
	}
	modulus = modulus/decimal;
	//console.log('param.high:',param.high+",param.low:"+param.low);
	var firstMoney = Math.ceil((param.low - config.vSpace*config.perPxMoney + modulus)*decimal);
	firstMoney = (firstMoney - firstMoney%5)/decimal;
	firstHeight = (firstMoney-minLow/decimal)/config.perPxMoney+config.vSpace;
	return {
		g : g,
		m : modulus,
		maxPosition : maxPosition,
		firstMoney : firstMoney,
		firstHeight : firstHeight,
		gh : gh
	}
}

//画纵轴坐标
function drawVLocation(coverCtx,x,y,price,config){
	// 设置字体内容，以及在画布上的位置
	coverCtx.fillStyle = "#5D5D5D";
	coverCtx.fillText(''+price.toFixed(5),config.canvasWidth+7, y+3); 
}

//画横轴坐标
function drawHLocation(cans,position,x,y,size,config){
	// 设置字体内容，以及在画布上的位置
	cans.fillStyle = "#5D5D5D";
	if(config.mDatas[config.begin+position*size]){
		var showTime = getCorrectTime(config.mDatas[config.begin+position*size].quoteTime,config.CYCLE);
		if(config.CYCLE  == '9' || config.CYCLE == '10'){
			cans.fillText(showTime, x-23, y);
		} else{
			cans.fillText(showTime, x-13, y);
		}
	}
}

//根据周期和日期返回正确格式
function getCorrectTime(quoteTime,cycle){
	var showTime = quoteTime;
	var len = quoteTime.length;
	//1分钟-5分钟-小时
	if(cycle == '1' || cycle == '2' || cycle == '5'){
		showTime = quoteTime.substring(8,10)+':'+quoteTime.substring(10,12);
	}
	//日-周
	else if(cycle == '9' || cycle == '10'){
		showTime = quoteTime.substring(0,4)+'-'+quoteTime.substring(4,6)+'-'+quoteTime.substring(6,8);
	}
	//月-季度
	else if(cycle == '11' || cycle == '12'){
		showTime = quoteTime.substring(0,4)+'-'+quoteTime.substring(4,6);
	}
	//年
	else if(cycle == '13'){
		showTime = quoteTime.substring(0,4);
	}
	return showTime;
}
