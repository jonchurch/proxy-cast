const secret = process.env.SECRET || require('./config').secret;
function authorize(req,res,next){
	if (req.headers.passphrase !== secret){
		res.status(403).sendFile(__dirname + '/images/newman.gif');
	} else {
		next();
	}
}

module.exports = authorize;
