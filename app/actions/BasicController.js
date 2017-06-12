var path = require('path');
var express = require('express');
const ROOT_PATH = path.resolve(__dirname, '../../');

module.exports = (app) => {

	app.use('/public', express.static(ROOT_PATH + '/public'));

	app.get('*', function (req, res) {
	  	res.sendFile(path.resolve(__dirname, '../views/store.html'));
	});

}