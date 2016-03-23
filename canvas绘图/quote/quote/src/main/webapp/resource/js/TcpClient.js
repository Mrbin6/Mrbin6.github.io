//websocket 接收，发送消息
function getTcpClient(config){
	if(!config.mTcpClient){
		config.mTcpClient = new WebSocket(config.serverAddress);
		config.mTcpClient.onerror = function(event) {
		  onError(event,config);
		};
		 
		config.mTcpClient.onopen = function(event) {
		  onOpen(event,config);
		};
		 
		config.mTcpClient.onmessage = function(event) {
		  onMessage(event,config);
		};
		
		config.mTcpClient.onclose = function(event) {
		  onClose(event,config.mTcpClient);
		};
	}
}

//打开连接
function onOpen(event,config){
	//console.log('open','打开连接');
	if(!config.mDatas || config.mDatas.length < 1){
		config.mTcpClient.send(registerLine(config));
	}
}

//连接异常
function onError(event,config){
	//alert("连接异常，请检查网络！");
}

//接收消息
function onMessage(event,config){
	//console.log('data:',event.data);
	analysisMessage(event.data,config);
}

//关闭连接
function onClose(event,mTcpClient){
	if(mTcpClient != null){
		//console.log('close','关闭连接');
		mTcpClient.close();
		mTcpClient = null;
	}
}

function stringToBytes ( str ) {  
  var ch, st, re = [];  
  for (var i = 0; i < str.length; i++ ) {  
    ch = str.charCodeAt(i);  // get char   
    st = [];                 // set up "stack"  
    do {  
      st.push( ch & 0xFF );  // push byte to stack  
      ch = ch >> 8;          // shift value down by 1 byte  
    }    
    while ( ch );  
    // add stack contents to result  
    // done because chars have "wrong" endianness  
    re = re.concat( st.reverse() );  
  }  
  // return an array of bytes  
  return re;  
}  

