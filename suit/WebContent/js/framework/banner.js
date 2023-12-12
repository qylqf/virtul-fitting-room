$(document).ready(function() {
    $("#profile-icon").click(function() {
		onViewProfileClick();
        // 调用后端接口查看个人信息
       // request("post","user/profile",{},,serverError,false);
    });
        $("#logout-icon").click(function() {
            // 使用 top 对象引用顶级框架，进行整个页面的跳转
            if(window.confirm("是否退出")){
				window.localStorage.clear();
            	top.location.href = "../user/login.jsp";
			}
        });
        $("#nowUser").text(localStorage.getItem('name'));
});
function request(method,url,data,successCallBack,errorCallBack,async){
    $.ajax({
        url: url,
        async:async,
        data: data,
        method: method
    }).done(successCallBack).fail(errorCallBack);
}
function onViewProfileClick() {
    // 发送消息给父网页
    window.parent.postMessage({ action: 'viewProfile' }, '*');
}
function serverError(XMLHttpRequest, textStatus){
    window.parent.postMessage({ action: 'serverError' }, '*');
}