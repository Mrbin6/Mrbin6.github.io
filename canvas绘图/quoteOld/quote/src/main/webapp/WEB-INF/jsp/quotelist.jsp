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
 <table width="300px" cellpadding="0" cellspacing="0" border="0" id="quotelist">
     <tr>
       <th align="left">交易品种</th>
       <th align="right">卖价</th>
       <th align="right">买价</th>
     </tr>
 </table>
 <script type="text/javascript" >
 window.setInterval("refList()", 2000);
 function refList(){
	$.ajax({
		type: "POST",
		url: 'getQuoteListByGroup.do',
		data:{
			InstGroup: '${InstGroup}'
		},
		success: function (data) {
			$('#quotelist tr').each(function(i){
				if($('#quotelist tr').size()>1){
					$('#quotelist tr:last').remove();
				}
			});
			$.each(data,function(i,elements){
				var content="<tr>"
					+"<td align='left'>"+elements.instname+"</td>"
					+"<td align='right'>"+elements.ask+"</td>"
	    			+"<td align='right'>"+elements.bid+"</td>"
	    			+"</tr>";
	    		$('#quotelist').append($(content));
			});
		}
	}); 
 }
 </script>
</body>
</html>