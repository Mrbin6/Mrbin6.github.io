<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>kline</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/base.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/YHKLine.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/Util.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/CrossLine.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/LineCanvasView.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/DataUtil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/ConfigParam.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/MessageUtil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/TcpClient.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/TouchCanvasView.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/Base64.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/Canvas2image.js"></script>
</head>
<body>
	<div style="margin-left:20px">
		<div id="containerOne" style="width: 800px; height: 600px;"></div>
	</div>
	<script type="text/javascript" >
		window.setTimeout(function(){
			//配置参数
			var configParamOne = {
				//容器ID
				containerID : 'containerOne',
				//服务器地址
				server : 'ws://${QuoteServerHost}:${QuoteServerPort}',
				//表头
				headerFlag : true,
				//默认显示品种
				defaultProductName : '欧元/美元',
				defaultProductID : 'EURUSD',
				//显示品种列表类型
				defaultProductListType : '${InstGroup}',
				token : '${Token}'
			}
			console.log('param',JSON.stringify(configParamOne));
			initKLine(configParamOne);
		},10);
	
	</script>
</body>
</html>