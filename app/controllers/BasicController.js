var path = require('path');
var express = require('express');
var multiparty = require('multiparty');
var bodyParser=require('body-parser');
var util = require('util');
var fs = require('fs');
var request = require("superagent");

const ROOT_PATH = path.resolve(__dirname, '../../');

module.exports = (app) => {
		
	app.use(bodyParser.urlencoded({extended:true}));

	app.use('/public', express.static(ROOT_PATH + '/public'));
	
	app.post('/fileUpload',  function(req, res){
		var form = new multiparty.Form({uploadDir: ROOT_PATH + '/public/temp/'});
		form.parse(req, function(err, fields, files) {
			//var filesTmp = JSON.stringify(files, null, 2);
			//console.log('fields', fields);
			if(err){
				console.log('parse error: ' + err);
			} else {		  
				res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
				res.end(JSON.stringify({fields: fields, files: files}));
			}
		});
	});

	app.post('/pushNotification', function (req, res) {
		var content = decodeURI(req.body.content);
		var appId = req.body.app_id;
		var versionNo = req.body.version_no;

		var JPush = require('jpush-sdk');

		var client = JPush.buildClient('ac09c06fad8f2d580effe858', '9e142ed6101db36ec383587b');

		client
		.push()
		.setPlatform(JPush.ALL)
    	.setAudience(JPush.ALL)
    	.setNotification(JPush.ios(content, 'default', 0, false, {app_id: appId, version_no: versionNo}),  JPush.android(content, '招证移动平台', 1, {app_id: appId, version_no: versionNo}))
    	.send(function(err, result) {
        	if (err) {
            	res.send({
	                success: false
	            });
        	} else {
            	res.send({
	                success: true
	            });
        	}
    	});
	})


	app.post('/saveImages', function(req, res) {
		var token = req.body.token;
		var appnameEn = req.body.appnameEn;
		var appnameCn = req.body.appnameCn;
		var type = req.body.type;
		var desc = req.body.desc;
		var icon_50 = req.body.icon_50;
		var icon_50_path = req.body.icon_50_path;
		var icon_100 = req.body.icon_100;
		var icon_100_path = req.body.icon_100_path;
		var icon_200 = req.body.icon_200;
		var icon_200_path = req.body.icon_200_path;

		var dstPath = ROOT_PATH + '/public/files/' + appnameEn + "/";
		if (!fs.existsSync(dstPath)) {
			fs.mkdirSync(dstPath);
		}
		

		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		Date.prototype.format = function (fmt) {
			 var o = {
				 "M+": this.getMonth() + 1, //月份
				 "d+": this.getDate(), //日
				 "h+": this.getHours(), //小时
				 "m+": this.getMinutes(), //分
				 "s+": this.getSeconds(), //秒
				 "S": this.getMilliseconds() //毫秒
			 };
			 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
			 for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
			 return fmt;
		}

		let generateMixed = (n) =>{
			 var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			 var ret = "";
			 for(var i = 0; i < n ; i ++) {
				 var id = Math.ceil(Math.random()*25);
				 ret += chars[id];
			 }
			 return ret;
		}
		
		

		var authSysid = "1001";
		var authPermit = "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ";
		var msgSequence = authSysid+"#"+new Date().format("yyyyMMddhhmmssS")+generateMixed(2);
		var msgCallback = "";
		var headerConfig = {'auth.sysid':authSysid,'auth.permit':authPermit,'auth.token':'','msg.sequence':msgSequence,'msg.callback':msgCallback};
		
		var url = "http://172.253.40.251:8081/mb/file/saveImage";
		if(icon_50 && icon_50_path) {
			console.log(icon_50);
			var dstPath_50 = dstPath + icon_50;
			fs.writeFileSync(dstPath_50, fs.readFileSync(icon_50_path));

			var fileContent_50 = fs.readFileSync(dstPath_50);
			fileContent_50 = new Buffer(fileContent_50).toString('base64');

			request.post(url)
			.set(headerConfig)
			.send("'/" + appnameEn + "/" + icon_50+"','"+fileContent_50+"'")
			.withCredentials()
			.then(function(respose){
				if(respose.text == "true"){
					res.send(JSON.stringify({success:true}));
				}else{
					res.send(JSON.stringify({success:false}));
				}
			 }).catch(function(erro) {
				res.send(JSON.stringify({success:false}));
			 });
		}

		if(icon_100 && icon_100_path) {
			var dstPath_100 = dstPath + icon_100;
			fs.writeFileSync(dstPath_100, fs.readFileSync(icon_100_path));

			var fileContent_100 = fs.readFileSync(dstPath_100);
			fileContent_100 = new Buffer(fileContent_100).toString('base64');
			/*
			fetch('http://172.253.40.251:8081/mb/file/saveImage', 
				{method: 'POST',headers: {'msg.callback': ''}, body: "'/" + appnameEn + "/" + icon_100+"','"+fileContent_100+"'"}
			).then(response => console.log(response.text));
			*/
			request.post(url)
			.set(headerConfig)
			.send("'/" + appnameEn + "/" + icon_100+"','"+fileContent_100+"'")
			.withCredentials()
			.then(function(respose){
				if(respose.text == "true"){
					res.send(JSON.stringify({success:true}));
				}else{
					res.send(JSON.stringify({success:false}));
				}
			 }).catch(function(erro) {
				res.send(JSON.stringify({success:false}));
			 });
		}
		
		if(icon_200 && icon_200_path) {
			var dstPath_200 = dstPath + icon_200;
			fs.writeFileSync(dstPath_200, fs.readFileSync(icon_200_path));

			var fileContent_200 = fs.readFileSync(dstPath_200);
			fileContent_200 = new Buffer(fileContent_200).toString('base64');

			request.post(url)
			.set(headerConfig)
			.send("'/" + appnameEn + "/" + icon_200+"','"+fileContent_200+"'")
			.withCredentials()
			.then(function(respose){
				if(respose.text == "true"){
					res.send(JSON.stringify({success:true}));
				}else{
					res.send(JSON.stringify({success:false}));
				}
			 }).catch(function(erro) {
				res.send(JSON.stringify({success:false}));
			 });

		}	
		
	});

	app.get('*', function (req, res) {
	  	res.sendFile(path.resolve(__dirname, '../views/store.html'));
	});
	

}