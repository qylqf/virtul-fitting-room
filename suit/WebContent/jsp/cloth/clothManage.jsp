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
    <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/cloth/clothManage.css">
    <script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
    <script src="<%=basePath%>/js/cloth/clothManage.js"></script>
</head>
<body>
<div id="cloth-search">
性别:<select id="clothingSex" class="clothingType" name="clothingType">
            <option value="sex">选择性别</option>
            <option value="male">男装</option>
            <option value="female">女装</option>
        </select>
类别:<select id="clothingClass" class="clothingCategory" name="clothingCategory">
            <!-- Add more clothing categories as needed -->
        </select>
        <button onclick="pageBySearchQuery()">查询</button>
</div>
<div id="container-space">
<div class="clothing-container">
    <div class="clothing-item">
    	编号:&nbsp&nbsp&nbsp<input type="text" class="clothingNumber" name="clothingNumber" required>
        服装名:<input type="text"class="clothingName" name="clothingName" required>
        
        价格:&nbsp&nbsp&nbsp<input type="text" class="clothPrice" name="clothPiece" required>

        性别:&nbsp&nbsp&nbsp<select class="clothingType" name="clothingType" required>
            <option value="male">男装</option>
            <option value="female">女装</option>
        </select>
        类别:&nbsp&nbsp&nbsp<select class="clothingCategory" name="clothingCategory" required>

            <!-- Add more clothing categories as needed -->
        </select>
    </div>
    <!-- Display added clothing items here -->
    <div class="clothing-list">
    <div class="image-container" id="imageContainer">
            <div class="image-preview" id="imagePreview">
                <span class="imageHint">点击选择图片</span>
                <input type="file" class="clothingImage" name="clothingImage" accept="image/*">
            </div>
            <div class = "img-container"></div>
        </div>
    </div>
        <div class="container-bottom">
        <button class="addCloth">添加服装</button>
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
