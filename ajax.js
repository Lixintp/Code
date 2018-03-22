//obj是一个对象，对象包含以下属性
/*
*	method:请求方式(post/get)
*	url：请求地址
*	async:同步或者异步
*	data:{} 传递参数
*	success:成功之后要执行的方法
*/

function ajax(obj)
{
	//创建ajax对象
	var xhr = new XMLHttpRequest();
	//处理url，为了防止缓存，随机一下
	obj.url += '?rand=' + Math.random();
	//绑定函数的处理
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				obj.success(xhr.responseText);
			}
		}
	};
	//处理参数
	var params = [];
	//{name:'***',pwd:***}
	for (var name in obj.data) {
		//处理特殊字符
		var key = encodeURIComponent(name);
		var value = encodeURIComponent(obj.data[name]);
		params.push(key + '=' + value);
		}
		//拼接字符串
		obj.data = params.join('&');
		//判断get或者post
		if (obj.method == 'get') {
			obj.url += '&' + obj.data;
		}	
		//进行open和send的操作
		xhr.open(obj.method, obj.url, obj.async);
		//执行send的方法 
		if (obj.method == 'get') {
			xhr.send();
		}else {
			xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
			xhr.send(obj.data);
		}
	
}