// Credit: These regular expressions were copied from
// https://github.com/aldeed/meteor-simple-schema/blob/master/simple-schema.js
// as a base. Thank you to @aldeed.

// this domain regex matches all domains that have at least one .
// sadly IPv4 Adresses will be caught too but technically those are valid domains
// this expression is extracted from the original RFC 5322 mail expression
// a modification enforces that the tld consists only of characters
var RX_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z-]*[a-z])?';
// this domain regex matches everythign that could be a domain in intranet
// that means "localhost" is a valid domain
var RX_NAME_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.|$))+';
// strict IPv4 expression which allows 0-255 per oktett
var RX_IPv4 = '(?:(?:[0-1]?\\d{1,2}|2[0-4]\\d|25[0-5])(?:\\.|$)){4}';
// strict IPv6 expression which allows (and validates) all shortcuts
var RX_IPv6 = '(?:(?:[\\dA-Fa-f]{1,4}(?::|$)){8}' // full adress
  + '|(?=(?:[^:\\s]|:[^:\\s])*::(?:[^:\\s]|:[^:\\s])*$)' // or min/max one '::'
  + '[\\dA-Fa-f]{0,4}(?:::?(?:[\\dA-Fa-f]{1,4}|$)){1,6})'; // and short adress
// this allows domains (also localhost etc) and ip adresses
var RX_WEAK_DOMAIN = '(?:' + [RX_NAME_DOMAIN,RX_IPv4,RX_IPv6].join('|') + ')';

Forms.regexp = {
	// We use the RegExp suggested by W3C in http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
	// This is probably the same logic used by most browsers when type=email, which is our goal. It is
	// a very permissive expression. Some apps may wish to be more strict and can write their own RegExp.
	EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

	DOMAIN: new RegExp('^' + RX_DOMAIN + '$'),
	WEAK_DOMAIN: new RegExp('^' + RX_WEAK_DOMAIN + '$'),

	IP: new RegExp('^(?:' + RX_IPv4 + '|' + RX_IPv6 + ')$'),
	IPV4: new RegExp('^' + RX_IPv4 + '$'),
	IPV6: new RegExp('^' + RX_IPv6 + '$'),
	// URL RegEx from https://gist.github.com/dperini/729294
	// http://mathiasbynens.be/demo/url-regex
	URL: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
	// unique id from the random package also used by minimongo
	// character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88
	// string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143
	ID: /^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/,
	// allows for a 5 digit zip code followed by a whitespace or dash and then 4 more digits
	// matches 11111 and 11111-1111 and 11111 1111
	ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/
};