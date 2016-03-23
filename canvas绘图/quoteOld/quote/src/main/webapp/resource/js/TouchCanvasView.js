/**
�¼�
*/
/**
Method ������
param ������ID�����ʲ��������
*/

function TouchCanvasView(config,messageUtil){
	$touch = this;
	config = config;
	this.data = config.data;
	addEachEvent(config.touch);
}

function addEachEvent(config){
	var touch = config.touch;
	var data = config.mDatas;
	addEvent(touch, 'mousemove', function (ev) { 	
		if(config.mouseFlag){
			currentPoint = getMousePos(touch,ev).x;
			var direction = currentPoint-downPoint;
			var left = config.canvas.offsetLeft;
			if(direction == 0){
				downPoint = currentPoint;
				return;
			}
			//����
			if(direction > 0){
				if(config.begin == 0){
					requireData(config);
					
					if(left+direction >= config.baseWidth+config.parentLeft){
						config.canvas.style.left = config.baseWidth+config.parentLeft+'px';
					} else{
						config.canvas.style.left = left+direction+'px';
					}
					return;
				} else{
					if(left+direction >= config.baseWidth+config.parentLeft){
						if(config.begin-config.maxWidth/config.candleWidth < 0){
							requireData(config);
						} else{
							config.begin -= config.maxWidth/config.candleWidth;
							config.end -= config.maxWidth/config.candleWidth;
							paintLine(config);
							config.canvas.style.left = config.parentLeft+'px';
						}
					} else{
						config.canvas.style.left = left+direction+'px';
					}
				}
				
			} 
			//����
			else{
				//console.log('left+direction:',(left+direction)+','+config.parentLeft);
				if(config.end == config.mDatas.length){
					if(config.canvas.offsetLeft < config.parentLeft){
						return;
					}
					if(left+direction < config.parentLeft){
						config.canvas.style.left = config.parentLeft+'px';
					} else{
						config.canvas.style.left = left+direction+'px';
					}
				} else{
					if(left+direction <= config.parentLeft){
						if((config.end+config.maxWidth/config.candleWidth) > config.mDatas.length){
							config.begin = config.begin + config.mDatas.length - config.end;
							config.end = config.mDatas.length;
						}else{
							config.begin += config.maxWidth/config.candleWidth;
							config.end += config.maxWidth/config.candleWidth;
						}
						config.canvas.style.left = config.baseWidth+config.parentLeft+'px';
						paintLine(config);
					} else{
						config.canvas.style.left = left+direction+'px';
						//console.log('offsetLeft:',config.canvas.offsetLeft+',left-direction'+(left+direction));
					}
				}
				
			}
			downPoint = currentPoint;				
		} else{
			var crossPoint = getMousePos(config.touch,ev);
			var crossLines = new crossLine(config.cover,crossPoint,config);
			crossLines.updateOptions(config.cover,crossPoint);
			crossLines.drawCrossLines();
		}
	});
	addEvent(touch, 'mouseout', function (ev) {
		var crossLines = new crossLine(config.cover,getMousePos(touch,ev),config);
		crossLines.removeCrossLines();
		config.mouseFlag = false;
		config.touch.style.cursor = 'none';
	});
	
	addEvent(touch, 'mousedown', function (ev) { 
		downPoint = getMousePos(config.touch,ev).x;
		config.mouseFlag = true;
		config.touch.style.cursor = 'pointer';
		var crossPoint = getMousePos(config.touch,ev);
		var crossLines = new crossLine(config.cover,crossPoint,config);
		crossLines.removeCrossLines();
	});
	
	addEvent(touch, 'mouseup', function (ev) { 
		upPoint = getMousePos(config.touch,ev).x;
		config.mouseFlag = false;
		config.touch.style.cursor = 'none';
		var crossPoint = getMousePos(config.touch,ev);
		var crossLines = new crossLine(config.cover,crossPoint,config);
		crossLines.updateOptions(config.cover,crossPoint);
		crossLines.drawCrossLines();
	});
	
	//ˢ��
	addEvent(config.loading, 'click', function (ev) {
		//console.log('refresh');
		refreshLine(config);
	});
	
	if(config.headerFlag){
		addEvent(config.big, 'click', function (ev) { 
			//console.log('tag','bigger');
			enlargeLine(config);
		});
		
		addEvent(config.small, 'click', function (ev) { 
			//console.log('tag','smaller');
			narrowLine(config);
		});
		
		addEvent(config.select, 'change', function (ev) {
			//�л�Ʒ��
			changeProduct(config.select.value,config);
		});
		
		addEvent(config.cycles, 'change', function (ev) {
			//�л�����
			changeCycle(config.cycles.value,config,false,this);
		});
		addEvent(config.lirs, 'click', function (ev) {
			//�л���
			changeCycle(config.lirs.title,config,true,this);
		});
		addEvent(config.lizs, 'click', function (ev) {
			//�л���
			changeCycle(config.lizs.title,config,true,this);
		});
		addEvent(config.liys, 'click', function (ev) {
			//�л���
			changeCycle(config.liys.title,config,true,this);
		});
		addEvent(config.lijs, 'click', function (ev) {
			//�л�����
			changeCycle(config.lijs.title,config,true,this);
		});
		addEvent(config.lins, 'click', function (ev) {
			//�л���
			changeCycle(config.lins.title,config,true,this);
		});
		addEvent(config.needToDrawKLine, 'click', function (ev) {
			//��ʾK��
			if(!config.needToShowDrawKLine){
				changeLines(config);
			}
		});
		addEvent(config.needToBrokenLine, 'click', function (ev) {
			//��ʾ����
			if(!config.needToShowBrokenLine){
				changeLines(config);
			}
		});
		//ˢ��
		addEvent(config.refresh, 'click', function (ev) {
			refreshLine(config);
		});
		//����
		addEvent(config.camera, 'click', function (ev) {
			camera(config);
		});
	}
	
}

//����
function camera(config){
	Canvas2Image.saveAsPNG(config.canvas);
}

//ˢ��
function refreshLine(config){
	var container = document.getElementById(config.configParam.containerID);
	container.innerHTML = '';
	config.configParam.defaultProductID = config.PRODUCT;
	initKLine(config.configParam);
}

//��Ҫ��ʾ������
function changeLines(config){
	config.needToShowDrawKLine = !config.needToShowDrawKLine;
	if(config.needToShowDrawKLine){
		config.needToDrawKLine.className = 'candlehover';
	} else{
		config.needToDrawKLine.className = 'candle';
	}
	
	config.needToShowBrokenLine = !config.needToShowBrokenLine;
	if(config.needToShowBrokenLine){
		config.needToBrokenLine.className = 'brokenhover';
	} else{
		config.needToBrokenLine.className = 'broken';
	}
	paintLine(config);
}
//��С
function narrowLine(config){
	if(config.candleWidth/2 < 2){
		return;
	}
	if(config.RESTFLAG){
		return;
	}
	var grow = Math.round((config.end-config.begin)/2);
	grow = grow - grow%2;
	//�ж����ű���
	if(grow >= 1){
		//�ж������
		if((config.begin - grow) < 0){
			requireData(config);
		} else{
			//�ж����Ҷ�
			if((config.end + grow) <= config.mDatas.length){
				config.end = config.end + grow;
				config.hSpace = config.hSpace/2;
				config.candleWidth = config.candleWidth/2;
				if(config.hSpace < 1){
					config.hSpace = 1;
				}
				var currentSize = getMaxCandleNumber(config);
				config.begin = config.end-currentSize;
				paintLine(config);
			} else{
				if(config.begin + config.mDatas.length -2*grow - config.end <= 0){
					requireData(config);
				} else{
					config.end = config.mDatas.length;
					config.hSpace = config.hSpace/2;
					config.candleWidth = config.candleWidth/2;
					if(config.hSpace < 1){
						config.hSpace = 1;
					}
					//���㵱ǰ������ʾ������
					var currentSize = getMaxCandleNumber(config);
					config.begin = config.end-currentSize;
					paintLine(config);
				}
			}
		}
		if(config.candleWidth/2 < 2){
			config.small.className='smallest';
		} else{
			config.big.className='bigger';
		}
	}
}
//�Ŵ�
function enlargeLine(config){
	if(config.candleWidth*2 > config.maxWidth){
		return;
	}
	config.candleWidth = config.candleWidth*2;
	config.hSpace = config.hSpace*2;
	config.begin = parseInt(config.begin);
	config.end = parseInt(config.end);
	var currentSize = getMaxCandleNumber(config);
	config.begin = config.end-currentSize;
	if(config.begin < 0){
		config.begin = 0;
	}
	paintLine(config);
	//console.log('enlarge','begin:'+config.begin+";end:"+config.end);
	if(config.candleWidth*2 > config.maxWidth){
		config.big.className='biggest';
	} else{
		config.small.className='smaller';
	}
}

//�л�Ʒ��
function changeProduct(product,config){
	config.mTcpClient.send(getCancelPushMsg(config));
	config.big.className='bigger';
	config.small.className='smaller';
	removeTabHover(config,null);
	config.CYCLE='5';
	config.cycles[3].selected = true;
	//����ˢ��
	window.setTimeout(function(){
		config.PRODUCT = product;
		config.mDatas.splice(0);
		config.candleWidth = config.maxWidth;
		config.hSpace = config.baseWidth-config.maxWidth;
		config.canvas.style.left = config.parentLeft+'px';
		config.ENDTIME = getCurrentTime();
		//console.log(getRequestMsg(config));
		config.mTcpClient.send(getRequestMsg(config));
		config.RESTFLAG = true;
		config.loading.style.display='block';
	},10);
}

//�л�����
function changeCycle(cycle,config,flag,element){
	removeTabHover(config,element);
	//����select������
	if(flag){
		config.cycles[0].selected = true;
		element.childNodes[0].className = 'hover';
	}
	config.big.className='bigger';
	config.small.className='smaller';
	config.CYCLE = cycle;
	config.mDatas.splice(0);
	config.canvas.style.left = config.parentLeft+'px';
	config.candleWidth = config.maxWidth;
	config.hSpace = config.baseWidth-config.maxWidth;
	config.ENDTIME = getCurrentTime();
	config.mTcpClient.send(getRequestMsg(config));
}

//�Ƴ�hover
function removeTabHover(config,element){
	removeClass(config.lirs.childNodes[0],'hover');
	removeClass(config.lizs.childNodes[0],'hover');
	removeClass(config.liys.childNodes[0],'hover');
	removeClass(config.lijs.childNodes[0],'hover');
	removeClass(config.lins.childNodes[0],'hover');
}

//��ȡ���λ��
function getMousePos(canvas, evt){
	if(!canvas){
		return;
	}
	var rect = canvas.getBoundingClientRect(); 
	x = evt.clientX - rect.left * (canvas.width / rect.width);
	y = evt.clientY - rect.top * (canvas.height / rect.height);
	//console.log('tag','x:'+x+",y:"+y);
	return { 
		x: x,
		y: y
   }
}

//�����ܹ���ʾ������
function getMaxCandleNumber(config){
	//�ɼ����򣬼���಻�ɼ�����Ŀ�
	var currentSize = Math.round(config.canvasWidth/(config.candleWidth+config.hSpace));
	return currentSize;
}
