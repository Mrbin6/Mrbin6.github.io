<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>index</title>
	<script src="${pageContext.request.contextPath}/resource/jquery/jquery-1.5.2.js"></script>
</head>
<body>
<div class="data">
	<div class="data_title">
		<div class="left"><em></em>汇率报价</div>
		<div class="more"><a href="http://www.ieforex.com/avafxsaxo.htm" target="_blank">MORE></a></div>
	</div>
	<div class="h_tab">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" id="quotelist">
     	<tr>
       	<th>商品</th>
       	<th>最新</th>
       	<th>涨跌点</th>
     	</tr>
		</table>
	</div>
</div>
 <script type="text/javascript" >
 window.setInterval("refList()", 2000);
 function refList(){
	$.ajax({
		type: "POST",
		url: 'getQuoteListByInst.do',
		data:{
			Insts: '${Insts}'
		},
		success: function (data) {
			$('#quotelist tr').each(function(i){
				if($('#quotelist tr').size()>1){
					$('#quotelist tr:last').remove();
				}
			});
			$.each(data,function(i,elements){
				var content="<tr>"
					+"<td class='blue'>"+elements.instname+"</td>"
					+"<td>"+elements.ask+"</td>";
					var updown = elements.updown;
					if(updown[0] == "-"){
						content += "<td><span class='fall'>"+elements.updown+"</span></td>";
					}else{
						content += "<td><span class='rose'>"+elements.updown+"</span></td>";
					}
					content += "</tr>";
	    		$('#quotelist').append($(content));
			});
		}
	}); 
 }
 </script>
 <style>
body{ font-size:12px;margin:0px;margin-left:2px;}
.left{ float:left}
.blue{ color:#185a9b}
.data{ width:320px;height:347px; }
.data b{ font-weight:normal;}
.data_title{ font-size:16px; line-height:40px; float:left; width:100%;display:none;}
.data_title em{ background:#005BAC ; display:inline-block; width: 5px; height:18px; position: relative; top:2px; margin-right: 5px;}
.data_title .more{ float:right; font-size:12px;}
.data_title .more a{color:#999;  text-decoration: none;}
.data th{font-size:14px;border-top:1px solid #e3e3e3;border-bottom:1px solid #e3e3e3;height:38px; line-height:38px;background:#f7f7f7;text-align:center; font-weight:normal;}
.data table{ text-align:center; table-layout: fixed; }
.data table span{text-indent:15px; display:inline-block; background-position:left center;}
.fall{ color:#42ad69; background:url(${pageContext.request.contextPath}/resource/img/fall.jpg) no-repeat; }
.rose{ color:#eb0b1b; background:url(${pageContext.request.contextPath}/resource/img/rose.jpg) no-repeat;}
.data td{overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size:12px;height:38px; line-height:38px; border-bottom:1px solid #e3e3e3;}
.data td .time{ width:45px; text-align:center; line-height:18px;color:#fff; display:inline-block; font-weight:normal;  background:#005bac;}
.data .h_tab{height:304px; overflow: hidden; clear: both;}
</style>
</body>
</html>