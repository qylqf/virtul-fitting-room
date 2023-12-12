$(document).ready(function () {
	var path=basePath();
	$(".userDetail").css("display","none");
	$("#prevButton").click(function(){
		prePage();
	})
	$("#nextButton").click(function(){
		nextPage();
	})
	request("POST",path + "user/getTotalPages",{},getPageAllSize,severError,false);
	pageQuery();
	
/*    request("POST",path + "user/queryAllUser",{},getUserList,severError,false);
    request("POST",path + "user/queryAllUser",{},getPageAllSize,severError,false);*/
});
$(window).on('message', function (event) {
	clean();
	$(".userDetail").css("display","none");
	 pageQuery();
});
function pageQuery(){
	var path=basePath();
	var pageNum = $("#pageNum").text();
	request("POST",path + "user/queryUserByPage",{"pageNum":pageNum},getUserList,severError,false);
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
	clean();
	pageQuery();
	}
}
function prePage(){
	var pageNum = $("#pageNum").text();
	pageNum = parseInt(pageNum);
	if(pageNum>1){
	$("#pageNum").text(pageNum - 1);
	clean();
	pageQuery();
	}
}
function clean(){
	$(".user").remove();
}
function request(method,url,data,successCallBack,errorCallBack,async){
    $.ajax({
		url: url, // 替换成实际的后端接口地址
        type: method,
        contentType: 'application/json', // 设置请求的 Content-Type
        data: JSON.stringify(data), // 将 JSON 数据转换为字符串
        async:async,
    }).done(successCallBack).fail(errorCallBack);
}
function getUserList(result){
    $.each(result.data,function (index,user){
		addUser(user);
    });
}
function addUser(user){
	var path=basePath();
	    var userid = '';
		//alert(JSON.stringify(result.data));
		//alert(index + "" + JSON.stringify(element))
        var tr = $("<tr>");
        //alert(JSON.stringify(user))
        $.each(user,function (key, element){
			//alert(key + "" + element)
			if(key === "id"){
				 var td = $("<td>");
                td.attr("class",key)
                td.text(element);
                userid = element;
                td.appendTo(tr);
			}
            if(key === "realName"||key ==="name"){
                var td = $("<td>");
                td.attr("class",key)
                td.text(element);
                td.appendTo(tr);
            }
            if(key ==="sex"){
                if(element === true){
                    var td = $("<td>");
                    td.attr("class",key)
                    td.text("男");
                    td.appendTo(tr);
                }else{
                    var td = $("<td>");
                    td.attr("class",key)
                    td.text("女");
                    td.appendTo(tr);
                }
            }
            if(key ==="model"){
				var td = $("<td>");
                td.attr("class",key)
                var img = $("<img>");
                img.attr("class","imgs");
                var src = '';
				if(element == 'male1'){
					src = path + "images/data/model/mheadA.png";
				}else if(element === 'male2'){
					src = path + "images/data/model/mheadB.png";
				}else if(element === 'female1'){
					src = path + "images/data/model/wheadA.png";
				}else if(element === 'female2'){
					src = path + "images/data/model/wheadB.png";
				}
                img.attr("src",src)
                img.appendTo(td);
                td.appendTo(tr);

            }
            if(key ==="isAdmin"){
                if(element === true){
                    var td = $("<td>");
                    td.attr("class",key)
                    td.text("是");
                    td.appendTo(tr);
                }else{
                    var td = $("<td>");
                    td.attr("class",key)
                    td.text("");
                    td.appendTo(tr);
                }
            }
        });
        var td = $("<td>");
        var input = $("<div>");
        input.html("<input type=\"button\" class=\"modify\" id=\"modify" + userid + "\" value=\"修改\" onclick=\"modifyUser(this.id)\">");
        input.appendTo(td);
        var input1 = $("<div>");
        input1.html("<input type=\"button\" class=\"delete\" id=\"delete" + userid + "\" value=\"删除\" onclick=\"deleteUser(this.id)\">");
        input1.appendTo(td);
        td.appendTo(tr);
        tr.attr("class","user")
        tr.appendTo($("#userList table:first"));
}
function severError(XMLHttpRequest){
    console.log("responseText:",XMLHttpRequest.responseText);
    console.log("status:",XMLHttpRequest.status);
    console.log("readyState:",XMLHttpRequest.readyState);
    alert("网络都出问题还想穿衣服？按F12键看看发生了什么吧！");
}
function modifyUser(id){
	use = $("#" + id).parents("tr").find(".name").text();
	$(".userDetail").css("display","block");
	// 获取 iframe 元素
var iframe = document.getElementById('workspace-container');
var path=basePath();
// 向 iframe 发送消息
iframe.contentWindow.postMessage({ name: use }, path + "jsp/user/userDetail.jsp");

}
function deleteUser(id){
	var path=basePath();
	use = $("#" + id).parents("tr").find(".name").text();
	uid = $("#" + id).parents("tr").find(".id").text();
	if(window.confirm("是否删除" +use)){
		 $("#" + id).parents("tr").remove();
    request('post',path + "user/delete",{"name":use},"deleteUserDetail","severError");
	}
}
function deleteUserDetail(){
	
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
