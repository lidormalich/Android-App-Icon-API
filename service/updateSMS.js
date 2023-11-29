const SMS = require("../models/smsmodel");
function getDDMMYYdate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}
module.exports.updateSMSOK = function (userSender, smsSendTo, smsContent) {
    let createdAt = getDDMMYYdate();
    let all = { userSender, smsSendTo, smsContent, smsStatus: "ok", createdAt }
    SMS.create(all).then((data) => { return "ok"; })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
module.exports.updateSMSFail = function (userSender, smsSendTo, smsContent) {
    let createdAt = getDDMMYYdate();
    let all = { userSender, smsSendTo, smsContent, smsStatus: "Fail", createdAt }
    SMS.create(all).then((data) => { return "ok"; })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
module.exports.updateSMSwithStatus = function (userSender, smsSendTo, smsContent, status) {
    let createdAt = getDDMMYYdate();
    let all = { userSender, smsSendTo, smsContent, smsStatus: status, createdAt }
    SMS.create(all).then((data) => { return "ok"; })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
