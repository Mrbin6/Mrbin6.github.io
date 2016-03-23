function getConfig(configParam,divParam){
	var config = new Object();
	//TCP 长连接
	config.mTcpClient;
	config.serverAddress = configParam.server;
	//数据
	config.kldata;
	//鼠标落下点
	config.downPoint = 0;
	//鼠标离开点
	config.upPoint = 0;
	//鼠标移动点
	config.currentPoint = 0;
	//横向间距
	config.hSpace;
	//上下间距
	config.vSpace = 30;
	//起始下标
	config.begin;
	//结束下标
	config.end;
	//鼠标是否按下标记
	config.mouseFlag = false;
	//画布宽度
	config.canvasWidth;
	//画布高度
	config.canvasHeight;
	//蜡烛宽度
	config.candleWidth;
	//最大放置蜡烛数
	config.maxSize = 10;
	//蜡烛最大宽度
	config.maxWidth = 64;
	//当前倍数
	config.currentMulity = 1;
	//基本宽度
	config.baseWidth = 96;
	config.firstMove = false;
	//覆盖层（坐标）
	config.cover;
	//画布层（线）
	config.canvas;
	//事件层（手势）
	config.touch;
	//放大
	config.big;
	//缩小
	config.small;
	//切换品种
	config.select;
	//切换周期
	config.cycles;
	//切换日
	config.lirs;
	//切换周
	config.lizs;
	//切换月
	config.liys;
	//切换季度
	config.lijs;
	//切换年
	config.lins;
	//刷新
	config.refresh;
	//截屏
	config.camera;
	//数据
	config.mDatas = new Array();
	//画笔粗细
	config.baseSize = 1;
	config.lineCanvasView;
	config.touchCanvasView;
	config.mDataUtil = new DataUtil();
	//每像素代表价格
	config.perPxMoney=0;
	config.lowest=0;
	config.coverWidth=0;
	//横坐标高度
	config.hLocationHeight=20;

	//默认显示K线
	config.needToShowDrawKLine=true;
	//默认不显示K线
	config.needToShowBrokenLine=false;
	
	//父容器左位置
	config.parentLeft = divParam.left;
	
	//请求
	config.REQUEST = 'c:1';
	//推送
	config.PUSH = 'c:2';
	//取消推送
	config.CANCELPUSH = 'c:3';
	config.TOKEN = configParam.token;
	//品种 
	config.PRODUCT = configParam.defaultProductID;
	//品种列表
	config.PRODUCTLIST = configParam.defaultProductListType;
	//周期
	config.CYCLE = '5';
	//开始时间
	config.STARTTIME = '0';
	//结束时间
	config.ENDTIME = '0';
	//请求根数
	config.CANDLENUMBER = '200';
	//请求标记
	config.RESTFLAG = false;
	config.canvasID;
	config.touchID;
	config.coverID;
	//是否需要画表头
	config.headerFlag = configParam.headerFlag;
	config.headerHeight = 0;
	//是否已经绑定事件
	config.hasBindEvent = false;
	
	//加载
	config.loading;
	//数据
	config.dataTime;
	config.detailTime;
	config.dataOpen;
	config.dataHigh;
	config.dataLow;
	config.dataClose;
	config.dataVlu;
	
	//父容器ID
	config.parentID = configParam.containerID;
	config.configParam = configParam;
	
	initView(configParam,divParam,config);
	
	//打开连接
	getTcpClient(config);
	
}

//初始化view
function initView(configParam,divParam,config){
	//根据容器的宽高计算画布的位置
	var width = divParam.width;
	var height = divParam.height;
	var top = divParam.top;
	var left = config.parentLeft;
	var container = document.getElementById(configParam.containerID);
	
	//添加表头控件
	if(config.headerFlag){
		var header = document.createElement('div');
		config.headerHeight = 70;
		header.width = width;
		header.height = config.headerHeight;
		header.className = 'KLineHeader';
		//header.style.left = (left+80) + 'px';
		//header.style.top = top + 'px';
		//header.style.position = 'absolute';
		var bigID =  configParam.containerID+'Big';
		var smallID =  configParam.containerID+'Small';
		var selectionID = configParam.containerID+'Selection';
		var cycleID = configParam.containerID+'Cycle';
		var lirID = configParam.containerID+'Lir';
		var lizID = configParam.containerID+'Liz';
		var liyID = configParam.containerID+'Liy';
		var lijID = configParam.containerID+'Lij';
		var linID = configParam.containerID+'Lin';
		var refreshID = configParam.containerID+'Refresh';
		var cameraID = configParam.containerID+'Camera';
		var needToDrawKLineID = configParam.containerID+'NeedToDrawKLine';
		var needToBrokenLineID = configParam.containerID+'NeedToBrokenLine';
		var inner = '<div class="KLineHeader-left">';
				inner += '<select id="'+selectionID+'">';
					inner += '<option value="'+configParam.defaultProductID+'">'+configParam.defaultProductName+'</option>';
				inner += '</select>';
				inner += '<div class="tab">';
					inner += '<ul >';
						inner += '<li id="'+lirID+'" title="9" ><a>日</a></li>';
						inner += '<li id="'+lizID+'" title="10"><a>周</a></li>';
						inner += '<li id="'+liyID+'" title="11"><a>月</a></li>';
						inner += '<li id="'+lijID+'" title="12"><a>季度</a></li>';
						inner += '<li id="'+linID+'" title="13"><a>年</a></li>';
					inner += '</ul>';
				inner += '</div>';
				inner += '<select id="'+cycleID+'">';
					inner += '<option value="0">--请选择--</option>';
					inner += '<option value="1">1分钟线</option>';
					inner += '<option value="2">5分钟线</option>';
					inner += '<option selected value="5">小时线</option>';
				inner += '</select>';
				inner += '<span class="line">';
					inner += '<a id="'+needToDrawKLineID+'" class="candlehover">showKline</a>';
					inner += '<a id="'+needToBrokenLineID+'" class="broken">showBrokenLine</a>';
					inner += '<a class="stick">sd </a>';
				inner += '</span>';
			inner += '</div>';
			inner += '<div class="KLineHeader-right">';
				inner += '<a class="camera" id="'+cameraID+'">截屏</a>';
				inner += '<a class="bigger" id="'+bigID+'">放大</a>';
				inner += '<a class="smaller" id="'+smallID+'">缩小</a>';
				inner += '<a class="refresh" id="'+refreshID+'">刷新</a>';
			inner += '</div>';
		header.innerHTML = inner;
		container.appendChild(header);
		
		config.big = document.getElementById(bigID);
		config.small = document.getElementById(smallID);
		config.select = document.getElementById(selectionID);
		config.cycles = document.getElementById(cycleID);
		config.lirs = document.getElementById(lirID);
		config.lizs = document.getElementById(lizID);
		config.liys = document.getElementById(liyID);
		config.lijs = document.getElementById(lijID);
		config.lins = document.getElementById(linID);
		config.refresh = document.getElementById(refreshID);
		config.camera = document.getElementById(cameraID);
		config.needToDrawKLine = document.getElementById(needToDrawKLineID);
		config.needToBrokenLine = document.getElementById(needToBrokenLineID);
	}
	
	var content = document.createElement('div');
	content.className = 'KLineContent';
	container.appendChild(content);
	
	var coverHeight = height-config.headerHeight;
	var coverWidth = width;
	
	var canvasHeight = height-config.headerHeight;
	var canvasWidth = width-config.baseWidth;
	
	var touchHeight = height-config.headerHeight-config.hLocationHeight;
	var touchWidth = width-2*config.baseWidth;
	var touchLeft = config.baseWidth;
	
	//画布层（线）
	var canvas;
	canvas = document.createElement('canvas');
	canvas.id = configParam.containerID+'Canvas';
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.style.top = top+config.headerHeight + 'px';
	canvas.style.position = 'absolute';
	canvas.style.left = left + 'px';
	canvas.style.zIndex = 100;
	config.canvas = canvas;
	config.canvasID = configParam.containerID+'Canvas';
	
	//遮罩层
	var cover;
	cover = document.createElement('canvas');
	cover.id = configParam.containerID+'Cover';
	cover.width = coverWidth;
	cover.height = coverHeight;
	cover.style.top = top+config.headerHeight + 'px';
	cover.style.position = 'absolute';
	cover.style.zIndex = 1000;
	config.cover = cover;
	config.coverID = configParam.containerID+'Cover';
	
	//事件层（手势）
	var touch;
	touch = document.createElement('canvas');
	touch.id = configParam.containerID+'Touch';
	touch.width = touchWidth+1;
	touch.height = touchHeight;
	touch.style.left = touchLeft-1+left + 'px';
	touch.style.top = top+config.headerHeight + 'px';
	touch.style.position = 'absolute';
	touch.style.border = 'solid 1px #CCC';
	touch.style.cursor = 'none';
	touch.style.zIndex = 1080;
	config.touch = touch;
	config.touchID = configParam.containerID+'Touch';
	
	//加载框
	var loading;
	loading = document.createElement('img');
	loading.id = configParam.containerID+'Loading';
	loading.style.left = (canvasWidth+config.baseWidth-40)/2+ 'px';
	loading.style.top = top+config.headerHeight+canvasHeight/2-config.hLocationHeight + 'px';
	loading.style.position = 'absolute';
	loading.className = 'loading';
	loading.style.zIndex = 1081;
	config.loading=loading;
	
	//添加画布
	content.appendChild(config.loading);
	content.appendChild(config.canvas);
	content.appendChild(config.cover);
	content.appendChild(config.touch);
	
	//添加开高低收
	
	var dataTime =  configParam.containerID+'Time';
	var detailTime =  configParam.containerID+'DetailTime';
	var dataOpen =  configParam.containerID+'Open';
	var dataHigh = configParam.containerID+'High';
	var dataLow = configParam.containerID+'Low';
	var dataClose = configParam.containerID+'Close';
	var dataVlu = configParam.containerID+'Vlu';
		
	var lefter = document.createElement('div');
	lefter.style.width = 90 + 'px';
	lefter.style.height = 300 + 'px';
	lefter.style.position = 'absolute';
	lefter.style.left = left + 'px';
	lefter.style.top = top+config.headerHeight + 'px';
	lefter.className = 'KLineLefter';
	lefter.style.border = 'solid 1px #CCC';
	lefter.style.fontSize = "12px";
	var innerLeft='<div>';
			innerLeft += '<div id="'+dataTime+'"></div>';
			innerLeft += '<div id="'+detailTime+'"></div></br>';
			innerLeft += '<div>开盘价：</div> <div id="'+dataOpen+'"></div>';
			innerLeft += '<div>最高价：</div> <div id="'+dataHigh+'"></div>';
			innerLeft += '<div>最低价：</div> <div id="'+dataLow+'"></div>';
			innerLeft += '<div>收盘价：</div> <div id="'+dataClose+'"></div>';
			innerLeft += '<div>成交量：</div> <div id="'+dataVlu+'"></div>';
		innerLeft += '</div>';
	lefter.innerHTML = innerLeft;
	lefter.style.zIndex = 1088;
	
	container.appendChild(lefter);
	
	config.dataTime = document.getElementById(dataTime);
	config.detailTime = document.getElementById(detailTime);
	config.dataOpen = document.getElementById(dataOpen);
	config.dataHigh = document.getElementById(dataHigh);
	config.dataLow = document.getElementById(dataLow);
	config.dataClose = document.getElementById(dataClose);
	config.dataVlu = document.getElementById(dataVlu);
	
	//添加点击事件
	if(!config.hasBindEvent){
		addEachEvent(config);
		config.hasBindEvent = true;
	}
	
	//初始化数值
	config.candleWidth = config.maxWidth;
	config.canvasWidth = config.canvas.width;
	config.canvasHeight = config.canvas.height-config.hLocationHeight;
	config.coverWidth = config.canvas.width;
	config.maxSize = Math.round(config.canvasWidth/config.baseWidth);
	config.hSpace = config.baseWidth-config.maxWidth;
	//画遮罩
	drawCover(config.cover,width,left,touchWidth,config);
}
//画遮罩
function drawCover(cover,width,left,touchWidth,config){
	var ctx = cover.getContext('2d');
	//透明度
	ctx.globalAlpha = 1.0;
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = 'white';
	//左侧遮罩
	ctx.fillRect(0,0,config.baseWidth,config.canvasHeight+config.hLocationHeight);
	//右侧遮罩
	ctx.fillRect(config.canvasWidth,0,config.baseWidth+config.parentLeft,config.canvasHeight+config.hLocationHeight);
}



