$(document).ready(function () {
        // Handle file input change event
        path = basePath();
    $('.clothingImage').on('change', function (e) {
		bindAddImage($(this));
    });
    $(".addCloth").click(function(){
		addClothing($(this));
	})
	$(".deleteCloth").click(function(){
		deleteClothing($(this));
	})
	$(".modifyCloth").click(function(){
		modifyClothing($(this));
	})
    queryAllClothType();
    pageSearchQuery();
    
});
function getPageSize(sex = null,type = null){
	if(sex === "male"){
		sex = true;
	}else if(sex === "female"){
		sex = false;
	}
	var data = {
		"sex":sex,
		"type":type
	}
	request("POST",path + "cloth/getTotalPages",data,getPageAllSize,serverError,false);
}
function bindAddImage(image){
	if(window.confirm("是否上传文件")){
	  cleanImg(image);
	  // 处理文件选择事件的代码
	  var selectedFile = image.prop('files')[0];;
	  // 在这里可以对选中的文件进行处理或执行其他操作
	  var fileName = selectedFile.name;
	  sendFile(image);
	  sleep(1000);
	  var img = $("<img>"); 
	  img.attr("class","imgs"); 
	  img.attr("src",path + "images/data/suits/" + fileName);
	  img.appendTo(image.parents(".image-container").find(".img-container"));
	}
}
function pageBySearchQuery(){
	var gender = $("#clothingSex").val();
	var type = $("#clothingClass").val();
	$(".clothingType").val(gender);
	$(".clothingCategory").val(type);
	$("#pageNum").text("1");
	pageSearchQuery();
}
function addClothing(cloth){
	if(window.confirm("是否要添加该衣物")){
		var number = cloth.parents(".clothing-container").find(".clothingNumber").val();;
		var name = cloth.parents(".clothing-container").find(".clothingName").val();;
		var type = cloth.parents(".clothing-container").find(".clothingCategory").val();;
		var sex =cloth.parents(".clothing-container").find(".clothingType").val();
		if(sex === "male"){
		sex = true;
		}else if(sex === "female"){
			sex = false;
		}
		var price = cloth.parents(".clothing-container").find(".clothPrice").val();
		var file = cloth.parents(".clothing-container").find(".img-container img:first").attr("src")
		var image = getStr(file);
		var data = {
			"sex":sex,
			"type":type,
			"name":name,
			"number":number,
			"price":price,
			"image":image
		}
		path = basePath();
		cloth.parents(".clothing-container").find(".clothingNumber").val("");
		cloth.parents(".clothing-container").find(".clothingName").val("");
		cloth.parents(".clothing-container").find(".clothingCategory").val("");
		cloth.parents(".clothing-container").find(".clothingType").val("");
		cloth.parents(".clothing-container").find(".clothPrice").val("");
		cloth.parents(".clothing-container").find(".img-container img:first").remove();
		request("POST",path + "cloth/addCloth",data,checkFull(),serverError,true);
		pageSearchQuery();
		}
}
function deleteClothing(cloth){
	if(window.confirm("是否要删除该衣物")){
		var number = cloth.parents(".clothing-container").find(".clothingNumber").val();
		request("POST",path + "cloth/deleteCloth",{"number":number},checkFull(),serverError,false);
		pageSearchQuery();
	}
	
	
}
function sendFile(image){
	path = basePath();
	 var files = image.parents(".clothing-container").find(".clothingImage")[0].files;
            if(files.length <= 0) {
                return alert('请选择文件后再上传')
            }
            console.log('ok')
            var fd = new FormData()
            fd.append('avatar',files[0])
            $.ajax({
                method: 'POST',
                url: path + "cloth/uploadImage",
                data: fd,
                processData: false,
                contentType: false,
                success: function(res) {
                    console.log(res);
                }
 
            })
}
function checkFull(){
	
}
function modifyClothing(cloth){
	if(window.confirm("是否要修改该衣物")){
		var number = cloth.parents(".clothing-container").find(".clothingNumber").val();;
		var name = cloth.parents(".clothing-container").find(".clothingName").val();;
		var type = cloth.parents(".clothing-container").find(".clothingCategory").val();;
		var sex =cloth.parents(".clothing-container").find(".clothingType").val();
		if(sex === "male"){
		sex = true;
		}else if(sex === "female"){
			sex = false;
		}
		var price = cloth.parents(".clothing-container").find(".clothPrice").val();;
		var file = cloth.parents(".clothing-container").find(".img-container img:first").attr("src")
		var image = getStr(file);
		var data = {
			"sex":sex,
			"type":type,
			"name":name,
			"number":number,
			"price":price,
			"image":image
		}
		path = basePath();
		request("POST",path + "cloth/modifyCloth",data,checkFull(),serverError,false);
		pageSearchQuery();
	}
}
function getStr(originalString){
	if(!(originalString === null || originalString === undefined || originalString === '')){
		var searchString = "images/data/suits/";
		var result = originalString.substring(originalString.indexOf(searchString) + searchString.length);
		return result;
	}
}
function queryAllClothType(){
	
	path = basePath();
	request("POST",path + "category/queryAllClothType",{},returnTypeDetail,serverError);
}
function returnTypeDetail(result){
	if(result.code == 0){
		alert(result.description);
		window.parent.postMessage({ action: 'returnHome' }, '*');
		return;
	}
	    var option = $("<option>");
		option.attr("value","type");
		option.text("选择种类");
		option.appendTo($(".clothingCategory"));
	$.each(result.data,function(index,element){
		var option = $("<option>");
		option.attr("value",element.number);
		option.text(element.name);
		option.appendTo($(".clothingCategory"));
	})
}
function getAllClothClass(result){
	clean();
	if(result.description === "页码无效"){
		return;
	}
	path = basePath();
	$.each(result.data,function (index,cloth){
		var sex;
		if(cloth.sex == true){
			sex = "male";
		}else{
			sex = "female";
		}
		var type = cloth.type;
		var name = cloth.name;
		var number = cloth.number;
		var image = cloth.image;
		var price = cloth.price;
		var container = $("#container-space .clothing-container:first").clone();
		container.addClass("clothGetByData");
		container.find(".clothingNumber").val(number);
		container.find(".clothingName").val(name);
		container.find(".clothingCategory").val(type);
		container.find(".clothingType").val(sex);
		container.find(".clothPrice").val(price);
		container.find(".addCloth").text("修改");
		container.find(".addCloth").attr("class","modifyCloth");
		var button = $("<button>"); 
		button.attr("class","deleteCloth")
		button.text("删除");
		button.appendTo(container.find(".container-bottom"));
		container.find(".img-container img:first").remove();
		var img = $("<img>"); 
	    img.attr("class","imgs"); 
	    img.attr("src",path + "images/data/suits/" + image);
	    img.appendTo(container.find(".img-container"));
	    
	    container.find('.clothingImage').on('change', function (e) {
		bindAddImage($(this));
	    });
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
function pageSearchQuery(){
	var gender = $("#clothingSex").val();
	var type = $("#clothingClass").val();
	if(gender === "sex"){
		gender = null
	}
	if(type === "type"){
		type = null;
	};
	getPageSize(gender,type);
	getSearchQueryDetail(gender,type);
}
function getSearchQueryDetail(sex = null,type = null){
	var pageNum = $("#pageNum").text();
	var path=basePath();
	if(sex === "male"){
		sex = true;
	}else if(sex === "female"){
		sex = false;
	}
	var data = {
		"sex":sex,
		"type":type,
		"pageNum":pageNum
	}
	request("POST",path + "cloth/queryClothByPage",data,getAllClothClass,serverError);
}
function getPageAllSize(result){
	if(result.code == 0){
		alert(result.description);
		window.parent.postMessage({ action: 'returnHome' }, '*');
		return;
	}
	$("#AllPageNum").text(result.data);
}
function nextPage(){
	var pageAllNum = $("#AllPageNum").text();
	var pageNum = $("#pageNum").text();
	pageNum = parseInt(pageNum);
	pageAllNum = parseInt(pageAllNum);
	if(pageNum < pageAllNum){
		$("#pageNum").text(parseInt(pageNum) + 1);
		pageSearchQuery();
	}
}
function prePage(){
	var pageNum = $("#pageNum").text();
	pageNum = parseInt(pageNum);
	if(pageNum>1){
	$("#pageNum").text(pageNum - 1);
	pageSearchQuery();
	}
}
function clean(){
	$(".clothGetByData").remove();
}
function cleanImg(cloth){
	cloth.parents(".image-container").find(".img-container img:first").remove();
	
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
	 	alert("网络都出问题还想穿衣服？按F12键看看发生了什么吧！");
	};
	function sleep(n) { //n表示的毫秒数
	    var start = new Date().getTime();
	    while (true) if (new Date().getTime() - start > n) break;
	}  