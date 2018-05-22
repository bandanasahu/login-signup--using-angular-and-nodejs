'use strict'


var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/angularNewApp';
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.registerUser = function (data, callback) {
    var userData = {
        "firstname": data.firstname,
        "lastname": data.lastname,
        "email": data.email,
        "password": data.password,
        "confirm-password": data.cpassword
    }

    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('userTable');
        collection.insert(userData, function (err, records) {
            console.log('============== records',records)
            var result = {
                code: 200,
                message: "Register Successfully!!!!"
            }
            callback(result)
        })
    });
}

exports.login = function (data, callback) {
    var userData = {
        "email": data.email,
        "password": data.password
    }

    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('userTable');
        collection.findOne(userData, function (err, data) {
            if (data) {
                let token = jwt.sign(data, config.token.secret, {
                    expiresIn: config.token.expiresIn
                });
                var response = {
                    dataInfo: data,
                    code: 200,
                    token: token,
                    message: "Login Successfully"
                }
            }
            else {
                var response = {
                    code: 400,
                    message: "Wrong Credentials!"
                }
            }
            callback(response)
        });
    });
}

exports.getAll = function (callback) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('userTable');
        collection.find({}).toArray(function (err, data) {
            if (data) {
                var response = {
                    dataInfo: data,
                    code: 200,
                    message: "all data"
                }
                callback(response)
            }
        });
    });
}

exports.delete = function (data, callback) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('userTable');
        collection.findOne({
            _id: ObjectID(data.id)
        }, function (err, data) {
            if (data) {
                collection.remove({
                    _id: ObjectID(data._id)
                }, function (err, data) {
                    if (err)
                        throw err;
                    callback({
                        code: 200,
                        msg: "deleted"
                    });
                });
            }
        });
    });
}

exports.update = function (data, callback) {
    console.log(data)
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('userTable');
        collection.findOne({
            _id: ObjectID(data._id)
        }, function (err, data) {
            if (data) {
                collection.update({
                    _id: ObjectID(data._id)
                }, {
                        $set: {
                            "firstname": data.firstname,
                            "lastname": data.lastname,
                            "email": data.email
                        }
                    }, function (err, updateData) {
                        if (err)
                            throw err;
                        callback({
                            code: 200,
                            msg: "updated successfully!!"
                        })
                    });
            }
        });
    });
}
