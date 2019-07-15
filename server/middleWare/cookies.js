const uuidv4 = require('uuid/v4');
const {Session} = require('../../db/index.js')

const cookies = function(req,res,next) {
    const { ip } = req;
    const id = uuidv4();
    if(req.cookies.customerID === "s%3A3c9a12fc-5beb-42de-9645-89187ef12151555") {
        req.validSession = false;
    } else if(req.signedCookies.customerID === false) {
        res.cookie('customerID', "s%3A3c9a12fc-5beb-42de-9645-89187ef12151555");
        req.validSession = false;
    } else if(!req.signedCookies.customerID) {
        res.cookie('customerID', id, {signed: true});
        req.validSession = {id, ip}
        let session = new Session({customerID : id, ip: ip});
        session.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        })
    } else if(req.signedCookies.customerID) {
        Session.findOne({customerID: req.signedCookies.customerID}).exec((err,data) => {
            if(err || !data){
                console.log(err)
            } else {
                req.validSession = {id :data.customerID, ip: data.ip}
                next();
            }
        })
    }
}

module.exports = cookies