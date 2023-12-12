<%--
  Created by IntelliJ IDEA.
  User: asus
  Date: 2023/11/27
  Time: 15:20
  To change this template use File | Settings | File Templates.
--%>
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
    <link rel="stylesheet" type="text/css" href="<%=basePath%>/css/user/profile.css">
<script src="<%=basePath%>/js/jquery-3.3.1.js"></script>
<script src="<%=basePath%>/js/user/profile.js">
</script>
</head>
<body>
<form id="registrationForm" enctype="multipart/form-data" oninput="showAvatars()">
    <h2>个人信息</h2>
    <div class="form-group">
        <div class="label">用户名称：</div>
        <div class="input"><input type="text" id="username" name="username" required placeholder="例如：ShadowMaster"></div>
    </div>
    <input type="hidden" id="id">
    <input type="hidden" id="isAdmin">
    <div class="form-group">
        <div class="label">真实姓名：</div>
        <div class="input"><input type="text" id="fullName" name="fullName" placeholder="例如：John Doe"></div>
    </div>
    <div class="form-group">
        <div class="label">邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱：</div>
        <div class="input"><input type="email" id="email" name="email" required placeholder="例如：john.doe@example.com"></div>
    </div>
    <div class="form-group">
        <div class="label">密&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码：</div>
        <div class="input"><input type="password" id="password" name="password" required placeholder="包含字母、数字和符号"></div>
    </div>

    <div class="form-group">
        <div class="label">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别：</div>
        <div class="input">
            <select id="gender" name="gender">
                <option value="">请选择性别</option>
                <option value="male">男</option>
                <option value="female">女</option>
            </select>
        </div>
    </div>

    <!-- 头像选择容器 -->
    <div id="avatar-container" class="avatar-container">
        <div class="model-choose">模型选择</div>
        <div id="maleAvatars" class="avatar-row" style="display: none;">
            <div style="float:left;"><img src="<%=basePath%>/images/data/model/mheadA.png" alt="Male Avatar 1" class="avatar" data-avatar="male1"></div>
            <div style="float:left;"><img src="<%=basePath%>/images/data/model/mheadB.png" alt="Male Avatar 2" class="avatar" data-avatar="male2"></div>
        </div>
        <div id="femaleAvatars" class="avatar-row" style="display: none;">
            <div style="float:left;"><img src="<%=basePath%>/images/data/model/wheadA.png" alt="Female Avatar 1" class="avatar" data-avatar="female1"></div>
            <div style="float:left;"><img src="<%=basePath%>/images/data/model/wheadB.png" alt="Female Avatar 2" class="avatar" data-avatar="female2"></div>
        </div>
    </div>

    <!--     <div class="sub-btn">
            <input type="submit" value="注册">
        </div> -->
         <button onclick="modify()" class="btn">修改</button>
</form>
</body>
</html>
