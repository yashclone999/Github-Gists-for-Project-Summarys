const express = require('express');
const cors = require('cors');

const whitelist = ['http://localhost:3001'];

const corsOptionsFunction = (req, callBack) => {

    var corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callBack(null, corsOptions);
};

exports.validateForCORS = cors();
exports.validateForCORSSelective = cors(corsOptionsFunction);

