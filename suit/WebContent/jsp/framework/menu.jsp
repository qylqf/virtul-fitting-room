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
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/framework/menu.css">
<script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
<script src="<%=basePath%>/js/framework/menu.js"></script>
<body>

<!-- Sidebar -->
<div class="sidebar">
    <div id="changeMenu">
    <img class="imgs" src="../../images/ui/list.png">
    </div>
    <div id="home">
    <img class="imgs" src="../../images/ui/home.png">
    <span id="rehome">主页</span>
    </div>
    <div id="userList">
    <img class="imgs" src="../../images/ui/userList.png">
    <span id="reuserList">用户列表</span>
    </div>
    <div id="cloth">
    <img class="imgs" src="../../images/ui/logo.png">
    <span id="reManage">服装管理</span>
    </div>
    <div id="clothClass">
    <img class="imgs" src="../../images/ui/catalog.png">
    <span id="reCloth">服装类型管理</span>
    </div>
    <div id="Fitting">
    <img class="imgs" src="../../images/ui/mySuits.png">
    <span id="reRoom">试衣间</span>
    </div>
</div>
</body>
</html>