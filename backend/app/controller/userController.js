'use strict'

var userModel = require("../model/userModel.js");

exports.registerUser = function(req, res) {
    console.log("============ :::::::::::::: =====================",req.body);
	userModel.registerUser(req.body, function(data) {
		res.send(data);
	});
};

exports.login = function(req, res) {
    console.log("============ :::::::::::::: =====================",req.body);
	userModel.login(req.body, function(data) {
		res.send(data);
	});
};

exports.getAll = function(req, res) {
	userModel.getAll(function(data) {
		res.json(data.dataInfo)
	});
};

exports.delete = function(req, res) {
	userModel.delete(req.params,function(data) {
		res.json(data.dataInfo)
	});
};

exports.update = function(req, res) {
	userModel.update(req.body,function(data) {
		res.json(data.dataInfo)
	});
};