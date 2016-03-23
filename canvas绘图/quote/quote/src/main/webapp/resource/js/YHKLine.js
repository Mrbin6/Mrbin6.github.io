//初始化
function initKLine(configParam){
	var divParam = getDivParam(configParam.containerID);
	if(divParam.width < 500){
		alert('sorry,the container minWidth 500px!');
		return;
	}
	if(divParam.height < 180){
		alert('sorry,the container minHeight 360px!'); 
		return;
	}
	if(divParam.width < 800){
		configParam.headerFlag = false;
	}
	//配置
	getConfig(configParam,divParam);	
}
