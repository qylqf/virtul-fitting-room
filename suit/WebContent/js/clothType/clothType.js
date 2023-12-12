$(document).ready(function () {
    $(".addCloth").click(function(){
		addClothing($(this))
	})
	$(".deleteCloth").click(function(){
		deleteClothing($(this))
	})
	$(".modifyCloth").click(function(){
		modifyClothing($(this))
	})
    pageTypeSearchQuery();
    getPageSize();
});
function pageTypeSearchQuery(){
	path = basePath();
	var pageNum = $("#pageNum").text()
	var data = {
		"pageNum":pageNum
	}
	cleanType();
	request("POST",path + "category/queryCategoryByPage",data,returnTypeDetail,serverError);
}
function getPageSize(){
	request("POST",path + "category/getTotalPages",{},getPageAllSize,serverError,false);
}
function addClothing(cloth){
	if(window.confirm("是否要添加该衣物类型")){
		var number = cloth.parents(".clothing-container").find(".clothingNumber").val();
		var name = cloth.parents(".clothing-container").find(".clothingName").val();
		var data = {
			"name":name,
			"number":number,
		}
		cloth.parents(".clothing-container").find(".clothingNumber").val("");
		cloth.parents(".clothing-container").find(".clothingName").val("");
		path = basePath();
		request("POST",path + "category/add",data,checkFullType(),serverError,false);
		getPageSize();
		pageTypeSearchQuery();
		}
}
function deleteClothing(cloth){
	if(window.confirm("是否要删除该衣物类型")){
		var number = cloth.parents(".clothing-container").find(".clothingNumber").val();
		request("POST",path + "category/delete",{"number":number},checkFullType(),serverError,false);
		getPageSize();
		pageTypeSearchQuery();
	}
	
	
}
function checkFullType(){
	
	
}
function modifyClothing(cloth){
	if(window.confirm("是否要修改该衣物类型")){
		var number = cloth.parents(".clothing-container").find(".clothingNumber").val();;
		var name = cloth.parents(".clothing-container").find(".clothingName").val();;
		var data = {
			"name":name,
			"number":number,
		}
		path = basePath();
		request("POST",path + "category/update",data,checkFullType(),serverError,false);
		getPageSize();
		pageTypeSearchQuery();
	}
}
function cleanType(){
	$(".clothTypeGetByData").remove();
}
function returnTypeDetail(result){
	if(result.code == 0){
		alert(result.description);
		window.parent.postMessage({ action: 'returnHome' }, '*');
		return;
	}
	if(result.description === "页码无效"){
		return;
	}
	path = basePath();
	$.each(result.data,function (index,type){
		var name = type.name;
		var number = type.number;
		var container = $("#container-space .clothing-container:first").clone();
		container.addClass("clothTypeGetByData");
		container.find(".clothingNumber").val(number);
		container.find(".clothingName").val(name);
		container.find(".addCloth").text("修改");
		container.find(".addCloth").attr("class","modifyCloth");
		var button = $("<button>"); 
		button.attr("class","deleteCloth")
		button.text("删除");
		button.appendTo(container.find(".container-bottom"));
	    container.find(".addCloth").click(function(){
			addClothing($(this))
		})
		container.find(".deleteCloth").click(function(){
			deleteClothing($(this))
		})
		container.find(".modifyCloth").click(function(){
			modifyClothing($(this))
		})
	    container.appendTo($("#container-space"));
    });
}
function getPageAllSize(result){
	$("#AllPageNum").text(result.data);
}
function nextPage(){
	var pageAllNum = $("#AllPageNum").text();
	var pageNum = $("#pageNum").text();
	pageNum = parseInt(pageNum);
	pageAllNum = parseInt(pageAllNum);
	if(pageNum < pageAllNum){
		$("#pageNum").text(parseInt(pageNum) + 1);
		pageTypeSearchQuery();
	}
	getPageSize();
}
function prePage(){
	var pageNum = $("#pageNum").text();
	pageNum = parseInt(pageNum);
	if(pageNum>1){
	$("#pageNum").text(pageNum - 1);
		pageTypeSearchQuery();
	}
	getPageSize();
}
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
function request(method,url,data,successCallBack,errorCallBack,async){
    $.ajax({
		url: url, // 替换成实际的后端接口地址
        type: method,
        contentType: 'application/json', // 设置请求的 Content-Type
        data: JSON.stringify(data), // 将 JSON 数据转换为字符串
        async:async,
    }).done(successCallBack).fail(errorCallBack);
}
	function serverError(XMLHttpRequest){
	    console.log("responseText:",XMLHttpRequest.responseText);
	    console.log("status:",XMLHttpRequest.status);
	    console.log("readyState:",XMLHttpRequest.readyState);
	 /*   alert("网络都出问题还想穿衣服？按F12键看看发生了什么吧！");*/
	};
	  