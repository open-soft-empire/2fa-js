const crypto = require('crypto');
const base32 = require('hi-base32');
const constants = require('../utils/constants');

const hotp = (secret, counter) => {

	const buffer_size = 8;
	let digestor = 'sha1';

	if(digestion_module) digestor = digestion_module;

	if(!digestion_module && process.env.HMAC_DIGESTION_MODULE) digestor = process.env.HMAC_DIGESTION_MODULE;

	if(!secret) throw new Error(constants.missing_secret);

	if(!counter) throw new Error(constants.missing_counter);

	const decoded_secret = base32.decode.asBytes(secret);
	
	let buffer = Buffer.alloc(buffer_size);
	
	for (let i = 0; i < buffer_size; i++) {
	  buffer[(buffer_size - 1) - i] = counter & 0xff;
	  counter = counter >> buffer_size;
	}
	
	let hmac = crypto.createHmac(digestor, Buffer.from(decoded_secret));
	
	hmac.update(buffer);
	
	let hmacValue = hmac.digest();
	const offset = hmacValue[hmacValue.length - 1] & 0xf;
	const code = ((hmacValue[offset] & 0x7f) << buffer_size * 3) |
	             ((hmacValue[offset + 1] & 0xff) << buffer_size * 2) |
	             ((hmacValue[offset + 2] & 0xff) << buffer_size * 1) |
	             (hmacValue[offset + 3] & 0xff);
	
	const hotp = code % (10 ** 6);
	return hotp;
}

module.exports = hotp;