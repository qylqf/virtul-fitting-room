<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + 
                                      request.getServerName() + ":" +
                                      request.getServerPort() + path;
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothing Management</title>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/clothType/clothType.css">
    <script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
    <script src="<%=basePath%>/js/clothType/clothType.js"></script>
</head>
<body>
<div id="container-space">
<div class="clothing-container">
    <div class="clothing-item">
    	编号:&nbsp&nbsp&nbsp<input type="text" class="clothingNumber" name="clothingNumber" required>
        服装名:<input type="text"class="clothingName" name="clothingName" required>
    </div>
        <div class="container-bottom">
        <button class="addCloth">添加类型</button>
    </div>
</div>
</div>
<div class="page">
  <button id="prevButton" onclick="prePage()">上一页</button>
  <span id="pageNum">1</span>/
  <span id="AllPageNum"></span>
  <button id="nextButton" onclick="nextPage()">下一页</button>
</div>
</body>
</html>
