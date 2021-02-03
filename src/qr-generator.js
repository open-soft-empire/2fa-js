const crypto = require('crypto');
const qrcode = require('qrcode'); //External package for QR Genration
const base32 = require("hi-base32");
const constants = require('../utils/constants');

const qrGenerator = async(app_identifier, user_identifier, options) => {
	
	let length = 20;
	let b32_token;
	const reset = options.reset || false;
	const secret = options.secret || undefined;

	if(options.secret_rounds) length = secret_rounds;

	

	if(!app_identifier) {
		throw new Error(constants.missing_app_identifier);
	}

	if(!user_identifier) {
		throw new Error(constants.missing_user_identifier);
	}

	if(!secret && !reset) {
		const value = crypto.randomBytes(length);
	  	b32_token = base32.encode(value);
	}

	if(secret && !reset) throw new Error(constants.reset_error);

	if(secret && reset) b32_token = secret;

  	const otp_auth_url = `otpauth://totp/${app_identifier}${" "}(${user_identifier})?secret=${b32_token}`;

  	const qr_image = await qrcode.toDataURL(otp_auth_url);

  	return { qr_image, b32_token };
}

module.exports = qrGenerator;