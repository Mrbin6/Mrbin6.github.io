<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>登录界面</title>
    <link href="${pageContext.request.contextPath}/resource/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="${pageContext.request.contextPath}/resource/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
    <link href="${pageContext.request.contextPath}/resource/assets/styles.css" rel="stylesheet" media="screen">
     <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script src="${pageContext.request.contextPath}/resource/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
  </head>
  <body id="login">
    <div class="container">

      <form class="form-signin" action="${pageContext.request.contextPath}/login.do" method="post">
        <h2 class="form-signin-heading">登录界面</h2>
        <input type="text" name="username" class="input-block-level" placeholder="用户名" required autofocus>
        <input type="password" name="password" class="input-block-level" placeholder="密码" required>
        <label class="checkbox">
          <input type="checkbox" value="rememberMe">记住我
        </label>
        <button class="btn btn-large btn-primary" type="submit">登录</button>
      </form>

    </div> <!-- /container -->
    <script src="${pageContext.request.contextPath}/resource/vendors/jquery-1.9.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resource/bootstrap/js/bootstrap.min.js"></script>
</html>