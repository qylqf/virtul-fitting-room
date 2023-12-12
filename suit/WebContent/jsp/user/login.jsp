<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + 
                                      request.getServerName() + ":" +
                                      request.getServerPort() + path;
%>
<html>
<head>
    <title>试衣间登录</title>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/login.css">
    <script src="<%=basePath%>/js/main.js"></script>
    <script src="<%=basePath%>/js/jquery.min.js"></script>
    
</head>
<body>
    <form id="loginForm" action="<%=basePath%>/user/login" method="post">
        <h2>试衣间登录</h2>
        <div class="form-group">
            <div class="label">用户名：</div>
            <div class="input"><input type="text" id="username" name="username" required></div>
        </div>
        <div class="form-group">
            <div class="label">密&nbsp&nbsp&nbsp&nbsp码：</div>
            <div class="input"><input type="password" id="password" name="password" required></div>
        </div>
        <button type="button" class="btn" onclick="login()">登录</button>
        
        <p>还没有账号？<a href="<%=basePath%>/jsp/user/register.jsp" class="register-link">立即注册</a></p>
    </form>
</body>
<script>
	function login() {
		// 获取用户名和密码
        var username = $("#username").val();
        var password = $("#password").val();
		var user = {};
		user.name = username;
		user.password = password;
		request("POST", "<%=basePath%>/user/login", user, loginSucceed, loginFail, true);
	}
	
	// 成功的回调函数
	function loginSucceed(result) {
		$.each(result.data, function(key, value) {
		    localStorage.setItem(key, value);
		  });
	    // 处理从服务器返回的 JSON 数据
	    if (result.code == 1) {
	        // 这里可以根据需要进行处理
	        window.location.href = "<%=basePath%>/jsp/framework/index.jsp";
	    } else {
	        // 登录失败，弹出提示框
	        alert("登录失败：" + result.description);
	    }
	}
	
	// 失败的回调函数
	function loginFail(result) {
	    // 处理从服务器返回的 JSON 数据
	    if (result.code == 1) {
	        // 这里可以根据需要进行处理
	        window.location.href = "<%=basePath%>/jsp/framework/index.jsp";
	    } else {
	        // 登录失败，弹出提示框
	        alert("登录失败：" + result.description);
	    }
	}
</script>

</html>
