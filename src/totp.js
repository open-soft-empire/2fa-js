const crypto = require('crypto');
const base32 = require("hi-base32");
const hotp = require('./hotp');
const constants = require('../utils/constants');

const generateTOTP = (secret, window) => {
	const totpcounter = Math.floor(Date.now() / 30000);
	const totp = hotp(secret, totpcounter + window);
	let prevTotp;
	if(prev_token) {
		const prevtotpcounter = Math.floor((Date.now() - 30000) / 30000);
		prevTotp = hotp(secret, prevtotpcounter + window);
	}
	return {totp, prevTotp};
}

const totp = (token, secret, window_time, prev_token) => {

	if(!token) {
		throw new Error(constants.missing_token);
	}

	if(!secret) {
		throw new Error(constants.missing_secret);
	}

	let window;
	if(!window_value) {
		window = 0;
	} else {
		window = window_value;
	}


    if (Math.abs(+window) > 2) {
    	return false;
    }
    for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
  		const otp = generateTOTP(secret, errorWindow);
  		if ((!prev_token && token === otp.totp) || (prev_token && token == otp.totp && prev_token == otp.prevTotp)) {
    		return true;
  		}
  	} 
	return false;
}

module.exports = totp;