$(document).ready(function () {
	path = basePath();
	$(".min-button").attr("src",path + "images/ui/min.png")
	$(".fullpage-button").attr("src",path + "images/ui/extend.png")
	$(".exit").click(function(){
		$("#selectedCloth").css("width","0");
		$("#selectedCloth").css("height","0");
		$(".windowAction").css("width","100%");
	})
	$(".extend").click(function(){
		$("#selectedCloth").css("width","100%");
		$("#selectedCloth").css("height","100%");
		$(".windowAction").css("width","30%");
	})
	$('#clothingClass').on('change', function (e) {
		cleanCloth();
		pageSearchQuery();
    });
	queryAllClothType();
	pageSearchQuery();
	showModel();
});
function showModel(){
	path = basePath();
	var model = $("<img>");
	model.attr("class","modelImg");
	model.addClass("imgs");
	var sex = localStorage.getItem('sex');
	var modelimg = localStorage.getItem('model');
	var src = "";
	if(sex === "true"){
		if(modelimg === "male1"){
			src = "mheadAModel.png";
		}else if(modelimg === "male2"){
			src = "mheadBModel.png";
		}
	}else if(sex === "false"){
		if(modelimg === "female1"){
			src = "wheadAModel.png";
		}else if(modelimg === "female2"){
			src = "wheadBModel.png";
		}
	}
	model.attr("src",path + "images/data/model/" + src);
	model.appendTo("#clothDisplay");
/*	var displayDiv = $("<div>");
	displayDiv.attr("id","displayDiv");
	displayDiv.appendTo("#clothDisplay");*/
}
function cleanCloth(){
	$(".getClothDataFromData").remove();
}
function pageSearchQuery(){
	var gender = localStorage.getItem('sex');
	var type = $("#clothingClass").val();
	if(type === "type"){
		type = null;
	};
	getSearchQuery(gender,type);
}
function getSearchQuery(sex = null,type = null){
	var path=basePath();
	var data = {
		"sex":sex,
		"type":type,
	}
	request("POST",path + "cloth/queryClothByInput",data,getAllClothClass,serverError);
}
function getAllClothClass(result){
	if(result.description === "页码无效"){
		return;
	}
	path = basePath();
	$.each(result.data,function (index,cloth){
		var content = $("<div>")
		var imageContent = $("<div>")
		var clothImgContent = $("<div>")
		var addImgContent = $("<div>")
		var contentDetail = $("<div>")
		var number = $("<div>")
		var name = $("<div>")
		var price = $("<div>")
		content.attr("class","clothContent");
		
		imageContent.attr("class","imageContent");
		clothImgContent.attr("class","clothImgContent");
		addImgContent.attr("class","addImgContent");
		
		
		contentDetail.attr("class","contentDetail");
		number.attr("class","number");
		name.attr("class","name");
		price.attr("class","price");
		
		
		var clothImg = $("<img>");
		clothImg.attr("src",path + "images/data/suits/" + cloth.image);
		clothImg.attr("class","imgs");
		clothImg.addClass("clothImg")
		clothImg.appendTo(clothImgContent);
		
		var addImag = $("<img>");
		addImag.attr("src",path + "images/ui/add.png");
		addImag.attr("class","imgs");
		addImag.addClass("addImags");
		addImag.appendTo(addImgContent);
		addImgContent.click(function(){
			addClothToModel($(this));
			var thisPrice = $(this).parents(".clothContent").find(".priceSpan").text();
			var thisNumber = $(this).parents(".clothContent").find(".numberSpan").text();
			var totalPrice = $("#Allprice").text();
			var thisPrice = parseInt(thisPrice);
			var totalPrice = parseInt(totalPrice);
			var src = $(this).parents(".clothContent").find(".clothImg").attr("src");
			$("#Allprice").text(totalPrice + thisPrice);
			var div = $("<div>")
			var img = $("<img>");
			img.attr("class","imgs")
			img.attr("src",src);
			div.attr("class",thisNumber);
			div.addClass("wearedCloth");
			img.appendTo(div);
			div.appendTo("#fittingRoom");
			$("." + thisNumber).css("z-index","1");
		})
		
		var numberpre = $("<span>");
		var numberafter = $("<span>");
		numberpre.text("编号：");
		numberafter.text(cloth.number);
		numberafter.attr("class","numberSpan");
		numberpre.appendTo(number);
		numberafter.appendTo(number);
		
		var namepre = $("<span>");
		var nameafter = $("<span>");
		namepre.text("名称：");
		nameafter.text(cloth.name);
		nameafter.attr("class","nameSpan");
		namepre.appendTo(name);
		nameafter.appendTo(name);
		
		var pricepre = $("<span>");
		var priceafter = $("<span>");
		pricepre.text("价格：");
		priceafter.text(cloth.price);
		priceafter.attr("class","priceSpan");
		pricepre.appendTo(price);
		priceafter.appendTo(price);
		
		
		clothImgContent.appendTo(imageContent);
		addImgContent.appendTo(imageContent);
		
		number.appendTo(contentDetail);
		name.appendTo(contentDetail);
		price.appendTo(contentDetail);
		
		imageContent.appendTo(content);
		contentDetail.appendTo(content);
		
		content.addClass("getClothDataFromData");
		content.appendTo("#clothSelect")
		
    });
}
function addClothToModel(cloth){
	path = basePath();
	var contentDetail = cloth.parents(".clothContent").find(".contentDetail").clone(true);
	var imgOperate = $("<div>");
	imgOperate.attr("class","imgOperate");
	var content = $("<div>");
	content.attr("class","selectedClothContent");
	
	var nowIndex = $("<div>");
	var downIndex = $("<div>");
	var upIndex = $("<div>");
	var deleteIndex = $("<div>");
	
	nowIndex.attr("class","nowIndex");
	downIndex.attr("class","downIndex");
	upIndex.attr("class","upIndex");
	deleteIndex.attr("class","deleteIndex");
	
	var nowIndexImg = $("<img>");
	var downIndexImg = $("<img>");
	var upIndexImg = $("<img>");
	var deleteIndexImg = $("<img>");
	var spanNum = $("<span>");
	spanNum.text("1");
	spanNum.attr("class","spanNum");
	
	nowIndexImg.attr("class","imgs");
	downIndexImg.attr("class","imgs");
	upIndexImg.attr("class","imgs");
	deleteIndexImg.attr("class","imgs");
	
	nowIndexImg.attr("src",path + "images/ui/zIndex.png");
	downIndexImg.attr("src",path + "images/ui/down.png");
	upIndexImg.attr("src",path + "images/ui/up.png");
	deleteIndexImg.attr("src",path + "images/ui/remove.png");
	
	nowIndexImg.appendTo(nowIndex);
	downIndexImg.appendTo(downIndex);
	upIndexImg.appendTo(upIndex);
	deleteIndexImg.appendTo(deleteIndex);
	
	downIndex.click(function(){
		downThisCloth($(this));
	})
	upIndex.click(function(){
		upThisCloth($(this));
	})
	deleteIndex.click(function(){
		deleteThisCloth($(this));
	})
	
	nowIndex.appendTo(imgOperate);
	spanNum.appendTo(imgOperate);
	downIndex.appendTo(imgOperate);
	upIndex.appendTo(imgOperate);
	deleteIndex.appendTo(imgOperate);
	
	contentDetail.appendTo(content);
	imgOperate.appendTo(content);
	
	
	content.appendTo("#selectedCloth");
}
function showThisCloth(cloth){
	var thisNumber = cloth.parents(".selectedClothContent").find(".numberSpan").text();
	var nowIndex = $("." + thisNumber).css("z-index");
	nowIndex = parseInt(nowIndex)
	cloth.parents(".selectedClothContent").find(".spanNum").text(nowIndex);
}
function downThisCloth(cloth){
	var thisNumber = cloth.parents(".selectedClothContent").find(".numberSpan").text();
	var nowIndex = $("." + thisNumber).css("z-index");
	nowIndex = parseInt(nowIndex)
	$("." + thisNumber).css("z-index",nowIndex - 1);
	showThisCloth(cloth);
}
function upThisCloth(cloth){
	var thisNumber = cloth.parents(".selectedClothContent").find(".numberSpan").text();
	var nowIndex = $("." + thisNumber).css("z-index");
	nowIndex = parseInt(nowIndex)
	$("." + thisNumber).css("z-index",nowIndex + 1);
	showThisCloth(cloth);
}
function deleteThisCloth(cloth){
	var thisPrice = cloth.parents(".selectedClothContent").find(".priceSpan").text();
	var totalPrice = $("#Allprice").text();
	var thisPrice = parseInt(thisPrice);
	var totalPrice = parseInt(totalPrice);
	var thisNumber = cloth.parents(".selectedClothContent").find(".numberSpan").text();
	$("." + thisNumber).remove();
	$("#Allprice").text(totalPrice - thisPrice);
	cloth.parents(".selectedClothContent").remove();
}
function queryAllClothType(){
	path = basePath();
	request("POST",path + "category/queryAllClothType",{},returnTypeDetail,serverError);
}
function returnTypeDetail(result){
	if(result.code == 0){
		alert(result.description);
		window.localStorage.clear();
    	top.location.href = "../user/login.jsp";
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