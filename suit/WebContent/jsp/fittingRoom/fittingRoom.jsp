<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
       <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/fittingRoom/fittingRoom.css">
    <script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
    <script src="<%=basePath%>/js/fittingRoom/fittingRoom.js"></script>
</head>
<body>
<div id = "fittingRoomspace">
<div id = "selectedClothspace">
<div class = "windowAction">
<div class = "exit">
<img class="min-button">
<button class="min">缩小</button>
</div>
<div class = "extend">
<img class = "fullpage-button">
<button class="fullpage">放大</button>
</div>
</div>
<div id = "selectedCloth"></div>
</div>
<div id = "fittingRoom">
<div id = "clothDisplay"></div>
<div id="ground">
<img class="imgs" src = "<%=basePath%>/images/ui/ground.png">
</div>
<div id = "totalPrice">
<div id = "uptotalPrice">
<span>总计</span>
</div>
<div id = "downtotalPrice">
<span>￥</span>
<span id = "Allprice">0</span>
</div>
</div>
</div>
<div id = "clothSelectspace">
<div id = "clothSearch">
<span>选择分类：</span>
<select id="clothingClass" class="clothingCategory" name="clothingCategory">
</select>
</div>
<div id = "clothSelect">
</div>
</div>
</div>
</body>
</html>
