var express = require('express');
var router = express.Router();
var express = require("express");
const auth = require("../middlewares/auth");
const { updateSMS } = require('../service/updateSMS');
const { default: axios } = require('axios');


const convertToILphone = (phone) => {
    if (phone.startsWith('+972')) {
        let phone = phone.slice(4);
        phone += "0";
    }
    return phone;
}

const options = { headers: { "content-type": "application/json" } };

const check = async (key, user, pass) => {
    let requesteObject = { key, user, pass };
    let balance = 0;
    try {
        let ab = await axios.post('https://api.sms4free.co.il/ApiSMS/AvailableSMS', requesteObject, options)
        balance = ab.data;
    } catch (error) {
        console.log(error);
    }
    return balance;
}

module.exports.sendSms = async function (recipient, msg) {
    const smsKEY = process.env.sms4freeKEY || '';
    const user = process.env.user || "";
    const pass = process.env.pass || "";
    const sender = 'KosherNet';

    recipient = convertToILphone(recipient)


    let requesteObject = { key: smsKEY, user, pass, sender, recipient, msg };

    let counter = await check(smsKEY, user, pass);
    console.log({ counter });
    console.log({ recipient });


    let result2 = await axios.post('https://api.sms4free.co.il/ApiSMS/SendSMS', requesteObject, options)
        .then(data => {
            return "Sended"
        })
        .catch(error => { return "fail" });

    return result2;
}


