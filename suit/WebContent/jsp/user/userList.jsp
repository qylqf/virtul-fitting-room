<%--
  Created by IntelliJ IDEA.
  User: asus
  Date: 2023/11/27
  Time: 16:49
  To change this template use File | Settings | File Templates.
--%>
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
    <title>用户列表</title>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/user/userList.css">
<script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
  <script src="<%=basePath%>/js/user/getUserList.js"></script>
</head>
<body>
<div id="content">
<div id="userList">
<table>
  <tr>
    <th>id</th>
    <th>用户名称</th>
    <th>用户实名</th>
    <th>是否是管理员</th>
    <th>模型选择</th>
    <th>性别</th>
    <th>操作</th>
  </tr>
</table>
</div>
<div class="page">
  <button id="prevButton">上一页</button>
  <span id="pageNum">1</span>/
  <span id="AllPageNum"></span>
  <button id="nextButton">下一页</button>
</div>
<div class="userDetail">
    <iframe id="workspace-container" src="<%=basePath%>/jsp/user/userDetail.jsp"></iframe>
</div>
</div>
</body>
</html>
