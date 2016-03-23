/**
 * 画笔
 */
// 画图
function paintLine(config) {
    var canvas = document.getElementById(config.canvasID);
    var cover = document.getElementById(config.coverID);
    if (!canvas.getContext) {
        return;
    }

    var cans = canvas.getContext('2d');
    var coverCtx = cover.getContext('2d');
    var data = config.mDatas;
    cans.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
    drawBackLines(cans, coverCtx, config);
    var arr=[5,10,15,20,60,1];
    if (config.needToShowDrawKLine == true) {
        drawkLines(cans, data, config);
        drawSomeMALines(cans, arr, config);//画MA线
    }
    if (config.needToShowBrokenLine == true) {
        drawLines(cans, data, config);
    }
}
// 画折线 带渐变阴影
function drawLines(cans, data, config) {
    var current = (config.hSpace + config.candleWidth) / 2;
    var current = 0;
    cans.beginPath();
    cans.lineJoin = "round";

    var param = config.mDataUtil.getLimit(config);
    // console.log('差距',JSON.stringify(highs));
    for (var i = config.begin; i < config.end; i++) {
        if (data[i]) {
            if (i == config.begin) {// 开始点，current为0，其他的点current重新计算
                cans.moveTo(current, config.canvasHeight - ((data[i].close - param.low) / param.multiple + config.vSpace));
            } else {
                current = current + config.candleWidth + config.hSpace;// current点x坐标为蜡烛最右边。
                cans.lineTo(current, config.canvasHeight - ((data[i].close - param.low) / param.multiple + config.vSpace));
            }
        }
    }
    cans.strokeStyle = 'grey';
    cans.save();
    cans.stroke();
    // 填充样式
    if(data[config.begin]){
	    cans.lineTo(current, config.canvasHeight);// 右下
	    cans.lineTo(0, config.canvasHeight);// 左下
	    cans.lineTo(0, config.canvasHeight - ((data[config.begin].close - param.low) / param.multiple + config.vSpace));// 开始点
	    var grad = cans.createLinearGradient(0, config.vSpace, 0, config.canvasHeight - config.vSpace);// 线性填充
	    grad.addColorStop(0, "#B0E2FF");
	    grad.addColorStop(1, "white");
	    cans.fillStyle = grad;
	    cans.fill();
    }
}
//画多根MA指标线
function drawSomeMALines(cans,daysArr,config){
	for(var i=0;i<daysArr.length;i++){
		cans.beginPath();
		drawMALines(cans,daysArr[i],config);//画每条线
		cans.lineJoin = "round";
		cans.strokeStyle = getColor(i);//获取每条线的颜色
	    cans.stroke();
	}
}
//获得颜色
function getColor(i){
	var color="";
	switch(i){
    case 0:color = "blue";break;
    case 1:color = "orange";break;
    case 2:color = "pink";break;
    case 3:color = "green";break;
    case 4:color = "mediumvioletred";break;
    case 5:color = "darkslategray";break;
    case 6:color = "burlywood";break;
    case 7:color = "powderblue";break;
    case 8:color = "chocolate";break;
    case 9:color = "springgreen";break;
    case 10:color = "steelblue";break;
    case 11:color = "violet";break;
    case 12:color = "darksalmon";break;
    case 13:color = "seagreen";break;
    case 14:color = "goldenrod";break;
    case 15:color = "mediumseagreen";break;
    case 16:color = "maroon";break;
    case 17:color = "lightslategray";break;
    case 18:color = "plum";break;
    default:color = getRandomColor();
    }
	return color;
}
// 画MA指标线
function drawMALines(cans, maDays, config) {
    var current = 0;
    var MAdata = caculMA(maDays, config.end, config);// 计算end+1 点的ma值
    var param = config.mDataUtil.getLimit(config);
    var begin = config.begin;
    if (begin < maDays) {// 控制最小的begin
        begin = maDays;
    }
    for (var i = config.end - 1; i >= begin; i--) {// 从后往前计算，这里限制了画点的个数。
    	if(config.mDatas[i]){
	        if (i == config.end - 1) {// 画第一个点的时候(右边的点)
	            current = (config.end - config.begin) * (config.candleWidth + config.hSpace);
	            cans.moveTo(current, config.canvasHeight - ((MAdata-param.low)/ param.multiple + config.vSpace));//基于最低点画图
	        } else {
	            current = current - (config.candleWidth + config.hSpace);
	            if((MAdata-param.low)/param.multiple<-config.vSpace)return;//往下边超出了，就不画了。
	            cans.lineTo(current, config.canvasHeight - ((MAdata-param.low)/ param.multiple + config.vSpace));
	            //console.log(config.canvasHeight - ((MAdata-param.low)/ param.multiple + config.vSpace));
	        }
	        MAdata = (MAdata*maDays - parseFloat(config.mDatas[i].close) + parseFloat(config.mDatas[i - maDays].close))/maDays;// 加上左边的新点
    	}
    }
}
// 获取当前的MA坐标值,计算end+1 点的MA值
function caculMA(maDays, end, config) {
    var closeSum = 0;
    for (var i = end - maDays; i < end; i++) {
    	if(config.mDatas[i]){
    		closeSum += parseFloat(config.mDatas[i].close);
    	}
    }
    return closeSum / maDays;
}
//随机生成颜色
function getRandomColor(){    
	  return  '#' +    
	    (function(color){    
	    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
	      && (color.length == 6) ?  color : arguments.callee(color);    
	  })('');    
} 

// 画蜡烛图
function drawkLines(cans, data, config) {
    // var current = (hSpace+candleWidth)/2;
    var current = 0.5;
    cans.lineWidth = config.baseSize;
    cans.globalAlpha = 1.0;
    cans.globalAlpha = 1.0;
    var param = config.mDataUtil.getLimit(config);
    // console.log('draw:config.begin:'+config.begin+',config.end:'+config.end+',mDatas.length:'+mDatas.length);
    for (var i = config.begin; i < config.end; i++) {
        if (data[i]) {
            cans.beginPath();
            if (data[i].open >= data[i].close) {// 画阴线，开高收低
                cans.strokeStyle = 'green';
                cans.fillStyle = 'black';
                cans.moveTo(current, config.canvasHeight - ((data[i].low - param.low) / param.multiple + config.vSpace));
                cans.lineTo(current, config.canvasHeight - ((data[i].close - param.low) / param.multiple + config.vSpace));
                cans.moveTo(current, config.canvasHeight - ((data[i].open - param.low) / param.multiple + config.vSpace));
                cans.lineTo(current, config.canvasHeight - ((data[i].high - param.low) / param.multiple + config.vSpace));

                // 左点，宽高 最矮的蜡烛图也有两像素
                var high = (data[i].open - data[i].close) / param.multiple;
                if (high < 2) {
                    high = 2;
                }
                cans.fillRect(current - config.candleWidth / 2, config.canvasHeight - ((data[i].open - param.low) / param.multiple + config.vSpace), config.candleWidth, high);
                cans.fillStyle = 'green';
                cans.fillRect(current - config.candleWidth / 2 + 0.5, config.canvasHeight - ((data[i].open - param.low) / param.multiple + config.vSpace)
                + 0.5, config.candleWidth - 1, high - 1);
            } else {// 画阳线，开低收高
                cans.strokeStyle = 'red';
                cans.fillStyle = 'red';
                cans.moveTo(current, config.canvasHeight - ((data[i].low - param.low) / param.multiple + config.vSpace));
                cans.lineTo(current, config.canvasHeight - ((data[i].open - param.low) / param.multiple + config.vSpace));
                cans.moveTo(current, config.canvasHeight - ((data[i].close - param.low) / param.multiple + config.vSpace));
                cans.lineTo(current, config.canvasHeight - ((data[i].high - param.low) / param.multiple + config.vSpace));

                // 左点，宽高
                var high = (data[i].close - data[i].open) / param.multiple;
                if (high < 2) {
                    high = 2;
                }
                // 画白框，将红色的阳线中间部分盖住，形成真正的阳线。
                cans.fillRect(current - config.candleWidth / 2, config.canvasHeight - ((data[i].close - param.low) / param.multiple + config.vSpace), config.candleWidth, high);
                cans.fillStyle = 'white';
                cans.fillRect(current - config.candleWidth / 2 + 0.5, config.canvasHeight - ((data[i].close - param.low) / param.multiple + config.vSpace) + 0.5, config.candleWidth - 1, high - 1);
            }
            cans.fillStyle = 'green';
            cans.stroke();
            cans.fill();
            current = current + config.candleWidth + config.hSpace;
        }
    }
    cans.save();
}

// 画背景线
function drawBackLines(cans, coverCtx, config) {
    cans.beginPath();
    cans.lineWidth = 1;
    cans.strokeStyle = "#D6D6D6";
    cans.clearRect(0, config.canvasHeight, config.canvasWidth,
        config.hLocationHeight);
    // 比例
    var size = config.maxWidth / config.candleWidth;
    for (var i = 0; i <= config.maxSize + 1; i++) {
        drawDashLine(cans, config.baseWidth * i, 0, config.baseWidth * i,
            config.canvasHeight, 3);// 从canvas最左边开始画竖线。
        drawHLocation(cans, i, config.baseWidth * i, config.canvasHeight + config.hLocationHeight, size, config);
    }

    var param = getBaseHeight(config);
    coverCtx.fillStyle = "#FFF";
    coverCtx.clearRect(config.canvasWidth, 0, config.baseWidth
    + config.parentLeft, config.canvasHeight + config.hLocationHeight);
    coverCtx.fillRect(config.canvasWidth, 0, config.baseWidth
    + config.parentLeft, config.canvasHeight + config.hLocationHeight);
    for (var i = 0; i <= param.g; i++) {
        // 通过当前金额差param.m*i 算当前横线位置。
        drawDashLine(cans, 0, (param.maxPosition - param.firstHeight) - param.m * i / config.perPxMoney, config.canvasWidth, (param.maxPosition - param.firstHeight) - param.m * i / config.perPxMoney, 3);
        drawVLocation(coverCtx, config.coverWidth, (param.maxPosition - param.firstHeight) - param.m * i / config.perPxMoney, param.firstMoney + param.m * i, config);
    }
}

// 画虚线
function drawDashLine(ctx, x1, y1, x2, y2, dashLen) {
    xpos = x2 - x1; // //得到横向的宽度;
    ypos = y2 - y1; // 得到纵向的高度;
    numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
    for (var i = 0; i < numDashes; i++) {
        if (i % 2 === 0) {//跳着画线段，0到1  2到3  4到5 。。。就形成了虚线。
            ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
        } else {
            ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
        }
    }
    ctx.stroke();
}

// 获取 gh：格子高度，m：钱/格，g：格子数
function getBaseHeight(config) {
    var param = config.mDataUtil.getLimit(config);
    var g = Math.ceil((config.canvasHeight + config.headerHeight) * 2 / 100);
    if (g > 10) {
        g = 10;
    }
    var m = 5;
    // 放大倍数
    var decimal = 100000;
    // 最大值-最小值
    var min = (param.high - param.low) * decimal;
    var minLow = param.low * decimal;
    var maxPosition = config.canvasHeight;
    var gh = 0;
    var modulus = 0;
    if (min <= g) {
        g = min;
    }
    g++;
    gh = config.canvasHeight / g;
    modulus = Math.ceil(gh * config.perPxMoney * decimal);// 45px已经能表示的钱。
    if (modulus % 5 != 0) {
        // gh = Math.ceil((5-modulus%5)/(config.perPxMoney*Math.pow(10,5)) +gh);
        modulus = modulus - modulus % 5 + 5;
    }
    modulus = modulus / decimal;
    // console.log('param.high:',param.high+",param.low:"+param.low);
    var firstMoney = Math.ceil((param.low - config.vSpace * config.perPxMoney + modulus) * decimal);
    firstMoney = (firstMoney - firstMoney % 5) / decimal;
    firstHeight = (firstMoney - minLow / decimal) / config.perPxMoney
    + config.vSpace;
    return {
        g: g,
        m: modulus,
        maxPosition: maxPosition,
        firstMoney: firstMoney,
        firstHeight: firstHeight
        // gh : gh 这个高度有误差，没用这个画横线。
    }
}

// 画纵轴坐标
function drawVLocation(coverCtx, x, y, price, config) {
    // 设置字体内容，以及在画布上的位置
    coverCtx.fillStyle = "#5D5D5D";
    coverCtx.fillText('' + price.toFixed(5), config.canvasWidth + 7, y + 3);
}

// 画横轴坐标
function drawHLocation(cans, position, x, y, size, config) {
    // 设置字体内容，以及在画布上的位置
    cans.fillStyle = "#5D5D5D";
    if (config.mDatas[config.begin + position * size]) {
        var showTime = getCorrectTime(config.mDatas[config.begin + position * size].quoteTime, config.CYCLE);
        if (config.CYCLE == '9' || config.CYCLE == '10') {
            cans.fillText(showTime, x - 23, y);
        } else {
            cans.fillText(showTime, x - 13, y);
        }
    }
}

// 根据周期和日期返回正确格式
function getCorrectTime(quoteTime, cycle) {
    var showTime = quoteTime;
    var len = quoteTime.length;
    // 1分钟-5分钟-小时
    if (cycle == '1' || cycle == '2' || cycle == '5') {
        showTime = quoteTime.substring(8, 10) + ':'
        + quoteTime.substring(10, 12);
    }
    // 日-周
    else if (cycle == '9' || cycle == '10') {
        showTime = quoteTime.substring(0, 4) + '-' + quoteTime.substring(4, 6)
        + '-' + quoteTime.substring(6, 8);
    }
    // 月-季度
    else if (cycle == '11' || cycle == '12') {
        showTime = quoteTime.substring(0, 4) + '-' + quoteTime.substring(4, 6);
    }
    // 年
    else if (cycle == '13') {
        showTime = quoteTime.substring(0, 4);
    }
    return showTime;
}
