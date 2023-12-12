$(document).ready(function() {
	var name = localStorage.getItem('name');
	path = basePath();
	request("POST",path + "user/queryUserByNameSelf",{"name": name},returnDetail,serverError,false);
});
function request(method,url,data,successCallBack,errorCallBack,async){
$.ajax({
	url: url, // 替换成实际的后端接口地址
 type: method,
 contentType: 'application/json', // 设置请求的 Content-Type
 data: JSON.stringify(data), // 将 JSON 数据转换为字符串
 async:async,
}).done(successCallBack).fail(errorCallBack);
}
function returnDetail(result){
	if(result.code == 0){
		alert(result.description);
		window.localStorage.clear();
    	top.location.href = "../user/login.jsp";
	}
}
function serverError(){
	
}
$(window).on('message', function (event) {
	var path=basePath();
    // 根据消息内容执行相应的操作
    if (event.originalEvent.data.action === 'viewProfile') {
        // $("iframe.banner").attr("src","<%=basePath%>/jsp/user/profile.jsp")
        // 获取iframe的引用
        var path=basePath();
        var iframe = document.getElementById('workspace-container');
// 修改iframe的src属性，实现页面跳转
        iframe.src = path + "jsp/user/profile.jsp";
    }else if (event.originalEvent.data.action === 'serverError'){
        console.log("responseText:",XMLHttpRequest.responseText);
        console.log("status:",XMLHttpRequest.status);
        console.log("readyState:",XMLHttpRequest.readyState);
        alert("网络都出问题还想穿衣服？按F12键看看发生了什么吧！");
    }else if(event.originalEvent.data.action === 'clothClass'){
		
		$("#workspace-container").attr("src", path + "jsp/clothClass/clothTypeManage.jsp")

    }else if(event.originalEvent.data.action === 'fittingRoom'){
		
		$("#workspace-container").attr("src", path + "jsp/fittingRoom/fittingRoom.jsp")
		
    }else if(event.originalEvent.data.action === 'userList'){
		
		$("#workspace-container").attr("src",path + "jsp/user/userList.jsp")
		
    }else if(event.originalEvent.data.action === 'returnHome'){
		
		$("#workspace-container").attr("src",path + "jsp/framework/workspace.jsp")
		
    }else if(event.originalEvent.data.action === 'cloth'){
		
		$("#workspace-container").attr("src",path + "jsp/cloth/clothManage.jsp")
		
	}else if(event.originalEvent.data.action === 'changeMenuMin'){
		$(".menu").css("width","7%");
		$(".workspace").css("width","93%")
	}else if(event.originalEvent.data.action === 'changeMenuMax'){
		$(".menu").css("width","20%");
		$(".workspace").css("width","80%")
	}
});
function basePath(){
       //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/ems
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    //获取项目的basePath   http://localhost:8080/ems/
    var basePath=localhostPath+projectName+"/";
    return basePath;
};