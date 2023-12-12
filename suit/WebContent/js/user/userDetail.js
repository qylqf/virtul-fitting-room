$(window).on('message', function (event) {
	var path = basePath();
    name = event.originalEvent.data.name;
    request("POST",path + "user/queryUserByName",{"name": name},returnDetail,serverError,false);
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
function exit(){
	document.getElementById("maleAvatars").style.display = "none";
    document.getElementById("femaleAvatars").style.display = "none";
	window.parent.postMessage({ action: 'exit' }, '*');
}
function modify(){
	var id = $('#id').val();
	var isAdmin = $('#isAdmin').val();
	var name = $('#username').val();
    var email = $('#email').val();
    var realName = $('#fullName').val();
    var password = $('#password').val();
    var sex;
    var model;
    if($('#gender').val() === 'male'){
		sex = true;
		
	}else if($('#gender').val() === 'female'){
        sex = false;
	};
	model = $(".avatar.active").data("avatar");
	var data = {
		"name":name,
		"realName":realName,
		"email":email,
		"password":password,
		"sex":sex,
		"model":model,
		"id":id,
		"isAdmin":isAdmin
	}
	path = basePath();
	request("POST",path + "user/update",data,exit(),serverError,false);
}	
function returnDetail(result){
	var id = result.data.id;
	var isAdmin = result.data.isAdmin;
    var name = result.data.name;
    var email = result.data.email;
    var realName = result.data.realName;
    var password = result.data.password;
    var sex = result.data.sex;
    var model = result.data.model;
    $('#username').val(name);
    $('#email').val(email);
    $('#fullName').val(realName);
    $('#password').val(password);
    $('#id').val(id);
    $('#isAdmin').val(isAdmin);
    if(sex === true){
		$('#gender').val('male');
		
		document.getElementById("maleAvatars").style.display = "block";
		var avatars = document.querySelectorAll(".avatar");
        avatars.forEach(function (avatar) {
        avatar.classList.remove("active");
    });
    document.getElementById("avatar-container").classList.add("active");
    if(model === 'male1'){
		$('#maleAvatars > div:nth-child(1) img').click();
	}else if(model === 'male2'){
		 $('#maleAvatars > div:nth-child(2) img').click();
	}
	}else if(sex === false){
		$('#gender').val('female');
		document.getElementById("femaleAvatars").style.display = "block";
		var avatars = document.querySelectorAll(".avatar");
        avatars.forEach(function (avatar) {
        avatar.classList.remove("active");
    });
    document.getElementById("avatar-container").classList.add("active");
    if(model === 'female1'){
		$('#femaleAvatars > div:nth-child(1) img').click();
		
	}else if(model === 'female2'){
		$('#femaleAvatars > div:nth-child(2) img').click();
	}
	}
    
}
function showAvatars() {
    var selectedGender = document.getElementById("gender").value;
    document.getElementById("maleAvatars").style.display = "none";
    document.getElementById("femaleAvatars").style.display = "none";

    if (selectedGender === "male") {
        document.getElementById("maleAvatars").style.display = "block";
    } else if (selectedGender === "female") {
        document.getElementById("femaleAvatars").style.display = "block";
    }

    var avatars = document.querySelectorAll(".avatar");
    avatars.forEach(function (avatar) {
        avatar.classList.remove("active");
    });

    document.getElementById("avatar-container").classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    var avatars = document.querySelectorAll(".avatar");
    avatars.forEach(function (avatar) {
        avatar.addEventListener("click", function () {
            // 移除所有头像的活动状态
            avatars.forEach(function (otherAvatar) {
                otherAvatar.classList.remove("active");
            });

            // 为点击的头像添加活动状态
            this.classList.add("active");

            // 获取所选头像的值
            var selectedAvatar = this.getAttribute("data-avatar");

            // 将头像值添加到表单中
            var avatarInput = document.createElement("input");
            avatarInput.type = "hidden";
            avatarInput.name = "avatar";
            avatarInput.value = selectedAvatar;

            // 如果已存在同名的隐藏字段，则替换它
            var existingInput = document.querySelector("input[name='avatar']");
            if (existingInput) {
                existingInput.parentNode.replaceChild(avatarInput, existingInput);
            } else {
                document.getElementById("registrationForm").appendChild(avatarInput);
            }
        });
    });
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
	function serverError(XMLHttpRequest){
	    console.log("responseText:",XMLHttpRequest.responseText);
	    console.log("status:",XMLHttpRequest.status);
	    console.log("readyState:",XMLHttpRequest.readyState);
	    alert("网络都出问题还想穿衣服？按F12键看看发生了什么吧！");
	}