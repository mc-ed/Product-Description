const uuidv4 = require('uuid/v4');
const {Session} = require('../../db/index.js')

const cookies = function(req,res,next) {
    const { ip } = req;
    const id = uuidv4();
    if(req.cookies.customerID === "s%3A3c9a12fc-5beb-42de-9645-89187ef12151555") {
        console.log('cookie previously tampered with')
        req.validSession = false;
        next();
    } else if(req.signedCookies.customerID === false) {
        console.log('cookie tampered with!')
        res.cookie('customerID', "s%3A3c9a12fc-5beb-42de-9645-89187ef12151555");
        req.validSession = false;
        next();
    } else if(!req.signedCookies.customerID) {
        res.cookie('customerID', id, {signed: true});
        let session = new Session({customerID : id});
        session.save((err, data) => {
            if (err) {
                console.log('error creating cookie',err);
                req.validSession = false;
                next();
            } else {
                console.log("cookie created: ", id);
                req.validSession = {id}
                next();
            }
        })
    } else if(req.signedCookies.customerID) {
        Session.findOne({customerID: req.signedCookies.customerID}).exec((err,data) => {
            if(err || !data){
                console.log('not finding cookie:', err, data)
                req.validSession = false;
                next();
            } else {
                console.log('good cookie!')
                req.validSession = {id :data.customerID, ip: data.ip}
                next();
            }
        })
    }
}

module.exports = cookies