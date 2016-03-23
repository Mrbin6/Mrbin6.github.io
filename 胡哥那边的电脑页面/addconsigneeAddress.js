var isSatisfy=false;
var satisfy=[true,true,true,false];//关键验证数组，注意：姓名  输入的地址   手机号码  选择的地址
var changed=false;
var prevenceChosen=false;//选择省标识,放开了
var cityChosen=false;//选择市标识，放开了
var fixedJudge=true;

//编辑收货地址的验证，不方便将保存地址的验证改为通用的了，复制了一套给编辑地址页面用。
var isSatisfyEdit=true;
var satisfyEdit=[true,true,true,true];//关键验证数组，注意：姓名  输入的地址   手机号码  选择的地址
var changedEdit=true;
var prevenceChosenEdit=true;//选择省标识,放开了
var cityChosenEdit=true;//选择市标识，放开了
var fixedJudgeEdit=true;

function nameCheck() {
		var nametext=$("#consignee-name").val();
		var nameReg=/^[\u4e00-\u9fa5]{2,}$/;
		if(nameReg.test(nametext)&&nametext!="") 
			{$("#consignee-name").next().text("姓名输入正确!").css({"color":"green","padding-left":"16px"});setSatisfied(0,true)}
		else if(isEmptyStr(nametext))
			{
			$("#consignee-name").next().text("您未填写收货人姓名!").css({"color":"red","padding-left":"16px"});setSatisfied(0,false);
			}
		else
	{$("#consignee-name").next().text("您输入的姓名格式不对!").css({"color":"red","padding-left":"16px"});setSatisfied(0,false);}
}
function checkAddr() {
		var addrtext=$("#detailed-address").val();
		var addrReg=/^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+/;//一定是汉字开头，
		
		if (addrReg.test(addrtext)) 
			{
			$("#detailed-address").next().text("详细地址输入正确!").css({"color":"green","padding-left":"16px"});setSatisfied(1,true);
			}
		else if(isEmptyStr(addrtext))
			{$("#detailed-address").next().text("您未填详细地址!").css({"color":"red","padding-left":"16px"});setSatisfied(1,false);} 
		else
	{$("#detailed-address").next().text("您输入的地址格式不对!").css({"color":"red","padding-left":"16px"});setSatisfied(1,false);}
	}
function checkPhone() {
		var phonetext=$("#consignee-phone").val();
		var phoneReg=/^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/;
	if(phoneReg.test(phonetext))
	{$("#consignee-phone").next().text("输入正确!").css({"color":"green","padding-left":"16px"});setSatisfied(2,true);}
	else if ( isEmptyStr(phonetext))
	{$("#consignee-phone").next().text("您未填手机号!").css({"color":"red","padding-left":"16px"});setSatisfied(2,false);} 
	else if(Trim(phonetext).length<11&&$("#consignee-phone").val()!=="")
	{$("#consignee-phone").next().text("您输入的号码不足11位!").css({"color":"#f00","padding-left":"16px"});setSatisfied(2,false);}
	else
	{$("#consignee-phone").next().text("您输入的号码格式不对!").css({"color":"red","padding-left":"16px"});setSatisfied(2,false);}
	}
function checkFixPhone() {
		var teltext=$("#consignee-telephone").val();
		var telReg=/^(0[0-9]{2})-\d{8}$|^(0[0-9]{3})-\d{7}$/;
	if(telReg.test(teltext))
	{$("#consignee-telephone").next().text("输入正确!").css({"color":"green","padding-left":"16px"});fixedJudge=true;resetPointer();}
	else if ( isEmptyStr(teltext))
	{$("#consignee-telephone").next().text("您未填固定电话!").css({"color":"green","padding-left":"16px"});fixedJudge=true;resetPointer();} 
	else if(Trim(teltext).length<12&&$("#consignee-telephone").val()!==""&&teltext.substr(0,1)=="0"&&(teltext.slice(3,4)=="-"|teltext.slice(4,5)=="-"))
	{$("#consignee-telephone").next().text("您输入的号码不足11位!").css({"color":"#f00","padding-left":"16px"});fixedJudge=false;resetPointer();}
	else
	{$("#consignee-telephone").next().text("您输入的号码格式不对!").css({"color":"red","padding-left":"16px"});fixedJudge=false;resetPointer();}
	}
function checkSelAddr(){
	  if(prevenceChosen==true&&cityChosen==true){
		  $("#choseAddrTip").text("选择成功!").css({"color":"green","padding-left":"16px"});
		  setSatisfied(3,true);//关键参数
	  }else{
		  if(prevenceChosen==false){
			  $("#choseAddrTip").text("请选择地址第一项!").css({"color":"red","padding-left":"16px"});
		  }else if(cityChosen==false){
			  $("#choseAddrTip").text("请选择地址第二项!").css({"color":"red","padding-left":"16px"});
		  }
		  setSatisfied(3,false);//关键参数
	  }
}
$( function(){
	//一开始就将提交按钮设置成不可用
	$("#save-addr-btn").attr("data-disabled",true);
	$("#save-addr-btn").css({"cursor":"not-allowed","color":"blue"});
 	$("#consignee-name").blur(function(){nameCheck();});
	 $("#detailed-address").blur(function(){checkAddr();});
	  $("#consignee-phone").blur(function(){checkPhone();});
	  $("#consignee-telephone").blur(function(){ checkFixPhone();});
	  $("#choseAddr select").click(function(){checkSelAddr();});
	  //双重的事件
	  $("#choseAddr select").blur(function(){checkSelAddr();});
 });
function setSatisfied(index,bool) {
	satisfy[index]=bool;
	changed=true;
	isSatisfy=true;
	for(var i=0;i<satisfy.length;i++){
		if(satisfy[i]==false){
			isSatisfy=false;
		}
	}
	if(fixedJudge==false){
		isSatisfy=false;
	}
	if(changed==true&&isSatisfy==true){
		$("#save-addr-btn").attr("data-disabled",false);
	  	$("#save-addr-btn").css({"cursor":"pointer"});
	  	$("#save-addr-btn").attr("title","保存！");
	}else{
		$("#save-addr-btn").attr("data-disabled",true);
		$("#save-addr-btn").css({"cursor":"not-allowed","color":"blue"});
		$("#save-addr-btn").attr("title","信息有误！保存按钮不可用！");
	}
}  		
function resetPointer(){
	changed=true;
	isSatisfy=true;
	for(var i=0;i<satisfy.length;i++){
		if(satisfy[i]==false){
			isSatisfy=false;
		}
	}
	if(fixedJudge==false){
		isSatisfy=false;
	}
	if(changed==true&&isSatisfy==true){
		$("#save-addr-btn").attr("data-disabled",false);
	  	$("#save-addr-btn").css({"cursor":"pointer"});
	  	$("#save-addr-btn").attr("title","保存！");
	}else{
		$("#save-addr-btn").attr("data-disabled",true);
		$("#save-addr-btn").css({"cursor":"not-allowed","color":"blue"});
		$("#save-addr-btn").attr("title","信息有误！保存按钮不可用！");
	}
}
//判断字符串是否为空字符串
function isEmptyStr(str)
	{
		var reg=/^\s*$/;
		if(str==null)//验证null和undefined
			{	return true;}
		else if(reg.test(str))//验证空字符串或者其他空字符
			{ return true;}
		else
			{ return false;}
	};
	//去掉前后空格
function Trim(str)
	{	return str.replace(/(^\s+)|(\s+$)/g,"");};
$(function () {
		//关闭提示框
		$("#msg-btn-colse").click(function () {setTimeout(function () {$("#msg-con").css("display","none");},300);});
		//点击取消
		$("#msg-btn-cancel").click(function () {setTimeout(function () {$("#msg-con").css("display","none");},300);});
});


function nameCheckEdit() {
		var nametext=$("#consig-name").val();
		var nameReg=/^[\u4e00-\u9fa5]{2,}$/;
		if(nameReg.test(nametext)&&nametext!="") 
			{$("#consig-name").next().text("姓名输入正确!").css({"color":"green","padding-left":"16px"});setSatisfiedEdit(0,true)}
		else if(isEmptyStr(nametext))
			{
				$("#consig-name").next().text("您未填写收货人姓名!").css({"color":"red","padding-left":"16px"});setSatisfiedEdit(0,false);
			}
		else{$("#consig-name").next().text("您输入的姓名格式不对!").css({"color":"red","padding-left":"16px"});setSatisfiedEdit(0,false);}
	}
function checkAddrEdit() {
		var addrtext=$("#detailed-addr").val();
		var addrReg=/^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+/;//一定是汉字开头，
		
		if (addrReg.test(addrtext)) 
			{
			$("#detailed-addr").next().text("详细地址输入正确!").css({"color":"green","padding-left":"16px"});setSatisfiedEdit(1,true);
			}
		else if(isEmptyStr(addrtext))
			{$("#detailed-addr").next().text("您未填详细地址!").css({"color":"red","padding-left":"16px"});setSatisfiedEdit(1,false);} 
		else
	{$("#detailed-addr").next().text("您输入的地址格式不对!").css({"color":"red","padding-left":"16px"});setSatisfiedEdit(1,false);}
	}
function checkPhoneEdit() {
		var phonetext= $("#phone").val();
		var phoneReg=/^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/;
	if(phoneReg.test(phonetext))
	{ $("#phone").next().text("输入正确!").css({"color":"green","padding-left":"16px"});setSatisfiedEdit(2,true);}
	else if ( isEmptyStr(phonetext))
	{ $("#phone").next().text("您未填手机号!").css({"color":"red","padding-left":"16px"});setSatisfiedEdit(2,false);} 
	else if(Trim(phonetext).length<11&&$("#phone").val()!=="")
	{ $("#phone").next().text("您输入的号码不足11位!").css({"color":"#f00","padding-left":"16px"});setSatisfiedEdit(2,false);}
	else
	{ $("#phone").next().text("您输入的号码格式不对!").css({"color":"red","padding-left":"16px"});setSatisfiedEdit(2,false);}
	}
function checkFixPhoneEdit() {
		var teltext=$("#fixed-tel").val();
		var telReg=/^(0[0-9]{2})-\d{8}$|^(0[0-9]{3})-\d{7}$/;
	if(telReg.test(teltext))
	{$("#fixed-tel").next().text("输入正确!").css({"color":"green","padding-left":"16px"});fixedJudgeEdit=true;resetPointerEdit();}
	else if ( isEmptyStr(teltext))
	{$("#fixed-tel").next().text("您未填固定电话!").css({"color":"green","padding-left":"16px"});fixedJudgeEdit=true;resetPointerEdit();} 
	else if(Trim(teltext).length<12&&$("#fixed-tel").val()!==""&&teltext.substr(0,1)=="0"&&(teltext.slice(3,4)=="-"|teltext.slice(4,5)=="-"))
	{$("#fixed-tel").next().text("您输入的号码不足11位!").css({"color":"#f00","padding-left":"16px"});fixedJudgeEdit=false;resetPointerEdit();}
	else
	{$("#fixed-tel").next().text("您输入的号码格式不对!").css({"color":"red","padding-left":"16px"});fixedJudgeEdit=false;resetPointerEdit();}
	}
function checkSelAddrEdit(){
	if(prevenceChosenEdit==true&&cityChosenEdit==true){
	  $("#choseAddrEditTip").text("选择成功!").css({"color":"green","padding-left":"16px"});
	  setSatisfiedEdit(3,true);//关键参数
	}else{
	  if(prevenceChosenEdit==false){
		  $("#choseAddrEditTip").text("请选择地址第一项!").css({"color":"red","padding-left":"16px"});
	  }else if(cityChosenEdit==false){
		  $("#choseAddrEditTip").text("请选择地址第二项!").css({"color":"red","padding-left":"16px"});
	  }
	  setSatisfiedEdit(3,false);//关键参数
	}
}

function editAddrJudge(){
	$("#edit-addr-tips").text("");
	$("#fixed-tel").val("");
	initJudgeEdit();
 	$("#consig-name").blur(function () {nameCheckEdit();});
	 $("#detailed-addr").blur(function () {checkAddrEdit();});
	  $("#phone").blur(function () {checkPhoneEdit();});
	  $("#fixed-tel").blur(function () {checkFixPhoneEdit();});
	  $("#choseAddrEdit select").click(function(){checkSelAddrEdit();});
	  $("#choseAddrEdit select").blur(function(){checkSelAddrEdit();});
}
function setSatisfiedEdit(index,bool) {
  	$("#edit-addr-tips").text("");
	satisfyEdit[index]=bool;
	changedEdit=true;
	isSatisfyEdit=true;
	for(var i=0;i<satisfyEdit.length;i++){
		if(satisfyEdit[i]==false){
			isSatisfyEdit=false;
		}
	}
	if(fixedJudgeEdit==false){
		isSatisfyEdit=false;
	}
	if(changedEdit==true&&isSatisfyEdit==true){
		$("#save-editAddr-btn").attr("data-disabled",false);
	  	$("#save-editAddr-btn").css({"cursor":"pointer"});
	  	$("#save-editAddr-btn").attr("title","保存！");
	}else{
		$("#save-editAddr-btn").attr("data-disabled",true);
		$("#save-editAddr-btn").css({"cursor":"not-allowed","color":"blue"});
		$("#save-editAddr-btn").attr("title","信息有误！保存按钮不可用！");
	}
}  
function resetPointerEdit() {
  	$("#edit-addr-tips").text("");
	changedEdit=true;
	isSatisfyEdit=true;
	for(var i=0;i<satisfyEdit.length;i++){
		if(satisfyEdit[i]==false){
			isSatisfyEdit=false;
		}
	}
	if(fixedJudgeEdit==false){
		isSatisfyEdit=false;
	}
	if(changedEdit==true&&isSatisfyEdit==true){
		$("#save-editAddr-btn").attr("data-disabled",false);
	  	$("#save-editAddr-btn").css({"cursor":"pointer"});
	  	$("#save-editAddr-btn").attr("title","保存！");
	}else{
		$("#save-editAddr-btn").attr("data-disabled",true);
		$("#save-editAddr-btn").css({"cursor":"not-allowed","color":"blue"});
		$("#save-editAddr-btn").attr("title","信息有误！保存按钮不可用！");
	}
}  