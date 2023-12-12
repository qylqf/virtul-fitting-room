<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + 
                                      request.getServerName() + ":" +
                                      request.getServerPort() + path;
%>
<!DOCTYPE html>
<html>
<head>
    <title>梦想试衣间</title>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/framework/banner.css">
    <script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
    <script src="<%=basePath%>/js/framework/banner.js"></script>
</head>
<body>
<div id="banner-container">
<div>
当前用户：
<span id="nowUser"></span>
</div>
    <div id="icon-container">
        <!-- 个人信息图标，替换 'path/to/profile/icon.png' 为实际路径 -->
        <img id="profile-icon" class="icon" src="<%=basePath%>/images/ui/self.png" alt="Profile Icon" >

        <!-- 退出登录图标，替换 'path/to/logout/icon.png' 为实际路径 -->
        <img id="logout-icon" class="icon" src="<%=basePath%>/images/ui/exit.png" alt="Logout Icon">
    </div>
</div>
</body>
</html>
