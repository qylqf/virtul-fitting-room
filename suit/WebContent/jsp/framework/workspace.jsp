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
    <title>Welcome to the Fitting Room</title>
    <link rel="stylesheet" href="<%=basePath%>/css/framework/workspace.css">
</head>
<body>

<div class="welcome-container">
    <div class="welcome-text">
        <h1>Welcome to the Fitting Room</h1>
        <p>Explore the latest fashion trends and find your perfect style.</p>
    </div>
    <div class="cta-button">
        <a href="explore.html">Explore Now</a>
    </div>
</div>

</body>
</html>
