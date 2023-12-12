$(document).ready(function() {
    $("#home").click(function() {
        returnHome();
    });
    $("#userList").click(function() {
        userList();
    });
    $("#clothClass").click(function() {
        clothClass();
    });
    $("#cloth").click(function() {
        cloth();
    });
    $("#Fitting").click(function() {
        fittingRoom();
    });
    $("#changeMenu").click(function() {
        changeMenu($(this));
    });
});
function request(method,url,data,successCallBack,errorCallBack,async){
    $.ajax({
        url: url,
        async:async,
        data: data,
        method: method
    }).done(successCallBack).fail(errorCallBack);
}
function clothClass(){
    window.parent.postMessage({ action: 'clothClass' }, '*');
}
function fittingRoom(){
    window.parent.postMessage({ action: 'fittingRoom' }, '*');
}
function userList(){
    window.parent.postMessage({ action: 'userList' }, '*');
}
function returnHome(){
    window.parent.postMessage({ action: 'returnHome' }, '*');
}
function cloth(){
	window.parent.postMessage({ action: 'cloth' }, '*');
}
function onViewProfileClick() {
    // 发送消息给父网页
    window.parent.postMessage({ action: 'viewProfile' }, '*');
}
function changeMenu(menu){
	if(menu.parents(".sidebar").find("#rehome").text() =="主页"){
		menu.parents(".sidebar").find("#rehome").text("");
		menu.parents(".sidebar").find("#reuserList").text("");
		menu.parents(".sidebar").find("#reManage").text("");
		menu.parents(".sidebar").find("#reCloth").text("");
		menu.parents(".sidebar").find("#reRoom").text("");
		$(".imgs").css("width","60%");
		$(".imgs").css("height","100%");
		window.parent.postMessage({ action: 'changeMenuMin' }, '*');
	}else{
		menu.parents(".sidebar").find("#rehome").text("主页");
		menu.parents(".sidebar").find("#reuserList").text("用户列表");
		menu.parents(".sidebar").find("#reManage").text("服装管理");
		menu.parents(".sidebar").find("#reCloth").text("服装类型管理");
		menu.parents(".sidebar").find("#reRoom").text("试衣间");
		$(".imgs").css("width","20%");
		$(".imgs").css("height","100%");
		window.parent.postMessage({ action: 'changeMenuMax' }, '*');
	}
	
}
function serverError(XMLHttpRequest, textStatus){
    window.parent.postMessage({ action: 'serverError' }, '*');
}