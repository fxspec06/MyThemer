var Emoticons = function(set_name) {
	if (set_name) {
		this.set(set_name);
	}
};

// var CHARS_TO_ESCAPE = /[\\=!^$*+?.:|(){}[\]]/g;
//var CHARS_TO_ESCAPE = /[\\?|()]/g;
Emoticons.prototype.CHARS_TO_ESCAPE = /[\\=!^$*+?.:|(){}[\]]/g;

Emoticons.prototype.REGEX_OPEN = "(^|\\s)";
Emoticons.prototype.REGEX_CLOSE = "(\\s|$)";

Emoticons.prototype.set = function(set_name) {
	this.set = EmoticonSets[set_name];
	this.regexp = this.buildRegexp(this.set.mappings, this.set.regexOpen, this.set.regexClose);
};

/**
 * Create a regular expression to match all emoticons
 * defined for a particular emoticons set.
 *
 * Some characters must be escaped with a backslash "\"; many of
 * these may be present in emoticon character sequences. This function
 * adds the escape where necessary. Chars to be replaced are defined by
 * CHARS_TO_ESCAPE.
 */
Emoticons.prototype.buildRegexp = function(mappings, open, close) {
    var result = "";

	if (!open) open = this.REGEX_OPEN;
	if (!close) close = this.REGEX_CLOSE;

    for (smiley in mappings) {
        if (result > "") {
            result += "|";
        }
        result += smiley.replace(this.CHARS_TO_ESCAPE, "\\$&");
    }

	result = open+"("+result+")"+close;

    return new RegExp(result, "g");
};


Emoticons.prototype.apply = function(str) {
	//@* FIXME
	return str;
	
	
	var regexp    = this.regexp;
	var mappings  = this.set.mappings;
	var classes = this.set.classes;
	var imgPath   = this.set.imgPath;

	return str.replace(regexp, function(matched, p1, p2, p3) {

		if (p1 === undefined) { p1 = ''; }
		if (p3 === undefined) { p3 = ''; }

		return [
				p1+'<img ',
				'class="' + classes + ' emoticon" ',
				'src="'   + imgPath + mappings[p2] + '" ',
				'/>'+p3
		].join('');
	});
};

/*************************************
* Emoticon sets
**************************************/
var EmoticonSets = {};
