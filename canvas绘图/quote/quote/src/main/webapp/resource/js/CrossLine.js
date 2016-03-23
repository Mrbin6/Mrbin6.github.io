/*
十字线
*/

function crossLine(canvas,crossPoint,config) {
	$config = config;
	this.updateOptions(canvas,crossPoint);
}

crossLine.prototype = {
    updateOptions: function (canvas,crossPoint) {
        this.canvas = canvas;
        this.canvasId = this.canvas.id;
        this.horizontalDivId = this.canvasId + '_crossLines_H';
        this.verticalDivId = this.canvasId + '_crossLines_V';
        this.textDivId = this.canvasId + '_crossLines_Text';
        this.verticalRange = { y1: 0, y2: this.canvas.height };
        this.horizontalRange = { x1: 0, x2: this.canvas.width };
        this.canvasPosition = getPageCoord(this.canvas);
        this.crossPoint = crossPoint;
        this.color = 'black';
		this.textColor = '#DED5CC';
    },
    removeCrossLines: function () {
        var canvas = this.canvas;
        var canvasId = canvas.id;
        var horizontalDivId = canvasId + '_crossLines_H';
        var verticalDivId = canvasId + '_crossLines_V';
		var textDivId = canvasId + '_crossLines_Text';
        var lineX = $id(horizontalDivId);
        if (lineX) {
			lineX.style.display = 'none';
		}
        var lineY = $id(verticalDivId);
        if (lineY) {
			lineY.style.display = 'none';
		}
		var text = $id(textDivId);
		if (text) {
			text.style.display = 'none';
		}
    },

    getHLine: function () {
        return $id(this.horizontalDivId);
    },
    getVLine: function () {
        return $id(this.verticalDivId);
    },
	getText: function () {
        return $id(this.textDivId);
    },
    setMouseEvents: function (evtForHLine, evtForVLine) {
        this.hLineMouseEvt = evtForHLine;
        this.vLineMouseEvt = evtForVLine;
    },
    updateCrossPoint: function (point) {
        this.crossPoint = point;
        this.drawCrossLines();
    },
    drawCrossLines: function () {
        var canvas = this.canvas;
        var canvasId = this.canvas.id;
        var horizontalDivId = canvasId + '_crossLines_H';
        var verticalDivId = canvasId + '_crossLines_V';
		var textDivId = canvasId + '_crossLines_Text';
        var vertialRange = this.verticalRange || { y1: 0, y2: canvas.height };
        var horizontalRange = this.horizontalRange || { x1: 0, x2: canvas.width };
        var canvasPosition = this.canvasPosition;

        //判断是否超出水平和垂直范围，如果超出范围则要隐藏线
        if (this.crossPoint.x < horizontalRange.x1
            || this.crossPoint.x > horizontalRange.x2
            || this.crossPoint.y < vertialRange.y1
            || this.crossPoint.y > vertialRange.y2) {
            this.removeCrossLines();
            return;
        }


        var zIndex = parseInt((canvas.style.zIndex || 1)) + 1;
        //画水平线
        var exists = false;
        var hLine;
        if ($id(horizontalDivId)) {
            exists = true;
            hLine = $id(horizontalDivId);
        }
        else {
            hLine = document.createElement('DIV');
            hLine.id = horizontalDivId;
        }
        hLine.style.display = 'block';
        hLine.style.position = 'absolute';
        hLine.style.width = $config.touch.width + 'px';
        hLine.style.height = '1px';
        hLine.style.left = $config.baseWidth + $config.parentLeft + 'px';
        hLine.style.top = Math.round(this.crossPoint.y + canvasPosition.y) + 'px';
        hLine.style.backgroundColor = this.color;
        hLine.style.zIndex = zIndex+1;
        if (!exists) {
            document.body.appendChild(hLine);
        }
		
		//画价格
		exists = false;
        var text;
        if ($id(textDivId)) {
            exists = true;
            text = $id(textDivId);
        }
        else {
            text = document.createElement('DIV');
            text.id = textDivId;
        }
        text.style.display = 'block';
        text.style.position = 'absolute';
        text.style.padding = '2px';
        text.style.left = $config.canvasWidth + $config.parentLeft + 5 + 'px';
        text.style.top = Math.round(this.crossPoint.y + canvasPosition.y - 5) + 'px';
        text.style.backgroundColor = this.textColor;
		text.style.color = '#000';
		text.style.fontSize = '10px';
        text.style.zIndex = zIndex+1;
		var price = (Math.floor(($config.canvasHeight-Math.ceil(this.crossPoint.y+$config.vSpace))*$config.perPxMoney*Math.pow(10,5))+Math.floor($config.lowest*Math.pow(10,5)))/Math.pow(10,5);
		text.innerHTML = price;
        if (!exists) {
            document.body.appendChild(text);
        }

        //画垂直线
        exists = false;
        var vLine;
        if ($id(verticalDivId)) {
            exists = true;
            vLine = $id(verticalDivId);
        }
        else {
            vLine = document.createElement('DIV');
            vLine.id = verticalDivId;
        }
		
        vLine.style.display = 'block';
        vLine.style.position = 'absolute';
		//20横坐标 1误差
        vLine.style.height = Math.round(vertialRange.y2 - vertialRange.y1-20+1) + 'px';
        vLine.style.width = '1px';
		var currLeft = (Math.round(this.crossPoint.x + canvasPosition.x) + $config.baseWidth);
		var tcurrLeft = currLeft;
		//一个candle所占长度
		var singleWidth = $config.candleWidth+$config.hSpace;
		currLeft = Math.round(currLeft/singleWidth - $config.canvas.offsetLeft/singleWidth)*singleWidth;
		//消除像素误差
        vLine.style.left = currLeft + $config.canvas.offsetLeft + 'px';
		//console.log('left:',$config.canvas.offsetLeft+',currLeft'+tcurrLeft);
		var positionST = Math.floor(($config.canvas.offsetLeft + currLeft)/singleWidth);
		var position = $config.begin + positionST - Math.floor($config.canvas.offsetLeft/singleWidth);
		var dt = $config.mDatas[position];
		if(dt){
			//console.log('current data is :',JSON.stringify($config.mDatas[position])+','+$config.canvas.offsetLeft);
			$config.dataTime.innerHTML = dt.quoteTime.substring(0,4)+'-'+dt.quoteTime.substring(4,6)+'-'+dt.quoteTime.substring(6,8);
			$config.detailTime.innerHTML = dt.quoteTime.substring(8,10)+':'+dt.quoteTime.substring(10,12);
			$config.dataOpen.innerHTML = dt.open;
			$config.dataHigh.innerHTML = dt.high;
			$config.dataLow.innerHTML = dt.low;
			$config.dataClose.innerHTML = dt.close;
			$config.dataVlu.innerHTML = dt.volume;
		}
        vLine.style.top = Math.round(vertialRange.y1 + canvasPosition.y) + 'px';
        vLine.style.backgroundColor = this.color;
        vLine.style.zIndex = zIndex;
        if (!exists) {
            document.body.appendChild(vLine);
        }
    }
};