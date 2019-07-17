const uuidv4 = require('uuid/v4');
const {Session} = require('../../db/index.js')

const cookies = function(req,res,next) {
    const { ip } = req;
    var host = req.get('host');
    var origin = req.get('origin');
    var userIP = req.socket.remoteAddress;
    console.log(ip, host, origin, userIP);
    const id = uuidv4();
    if(origin === 'http://lowesproxy-env.6tim4uzsty.us-east-2.elasticbeanstalk.com' || origin === 'http://fec-proxy.us-east-1.elasticbeanstalk.com') {
        next();
    } else if(req.cookies.customerID === "s%3A3c9a12fc-5beb-42de-9645-89187ef12151555") {
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
                console.log('good cookie!: ', data.customerID)
                req.validSession = {id :data.customerID}
                next();
            }
        })
    }
}

module.exports = cookies