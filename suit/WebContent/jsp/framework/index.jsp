<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
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
</head>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/framework/index.css">
<script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
<script src="<%=basePath%>/js/framework/index.js"></script>
<body>
   <div class="banner">
    <iframe id="banner-container" src="<%=basePath%>/jsp/framework/banner.jsp"></iframe>
</div>
<div class="menu">
    <iframe id="menu-container" src="<%=basePath%>/jsp/framework/menu.jsp"></iframe>
</div>
<div class="workspace">
    <iframe id="workspace-container" src="<%=basePath%>/jsp/framework/workspace.jsp"></iframe>
</div>
</body>
</html>