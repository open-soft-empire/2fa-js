const missing_token = 'Please provide a valid OTP token';
const missing_secret = 'Please provide a valid Secret key to validate totp';
const missing_app_identifier = 'An identifying parameter to denote your application is mandatory';
const missing_user_identifier = 'An identifying parameter to distinguish the user is mandatory';
const missing_counter = 'Counter is required to calculate the HMAC digested OTP';
const reset_error = 'For generating qr code with secret, reset option should be true';

module.exports = {
	missing_token,
	missing_secret,
	missing_app_identifier,
	missing_user_identifier,
	missing_counter,
	reset_error,
};