/// <reference path="../jquery/jquery.js" />
//string.format string.startWith string.padLeft string.padRight
(function () {
    String.prototype.format = function () {
        if (arguments.length > 0) {
            var args = (arguments.length = 1 && (arguments[0] instanceof Array || arguments[0] instanceof Object)) ? arguments[0] : arguments;
            return this.replace(/{(\w+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                  ? args[number]
                  : match
                ;
            });
        } else { return this; }
    };
    String.prototype.startWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length) == str)
            return true;
        else
            return false;
        return true;
    };
    String.prototype.padLeft = function (totalWidth, paddingChar) {
        if (paddingChar != null) {
            return this.PadHelper(totalWidth, paddingChar, false);
        } else {
            return this.PadHelper(totalWidth, ' ', false);
        }
    }
    String.prototype.padRight = function (totalWidth, paddingChar) {
        if (paddingChar != null) {
            return this.PadHelper(totalWidth, paddingChar, true);
        } else {
            return this.PadHelper(totalWidth, ' ', true);
        }

    }
    var PadHelper = function (totalWidth, paddingChar, isRightPadded) {
        if (this.length < totalWidth) {
            var paddingString = new String();
            for (i = 1; i <= (totalWidth - this.length) ; i++) {
                paddingString += paddingChar;
            }

            if (isRightPadded) {
                return (this + paddingString);
            } else {
                return (paddingString + this);
            }
        } else {
            return this;
        }
    }
    if (window.addEventListener && !window.attachEvent) {
        window.attachEvent = function (type, listener) {
            window.addEventListener(arguments[0], arguments[1]);
        }
    }
    if (window.attachEvent && !window.addEventListener) {
        window.addEventListener = function (type, listener, useCapture) {
            window.attachEvent(type, listener);
        }
    }
})();

//jQuery MD5 Plugin 1.2.1
//https://github.com/blueimp/jQuery-MD5
(function ($) {
    function safe_add(x, y) { var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 65535) } function bit_rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)) } function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b) } function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t) } function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t) } function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t) } function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t) } function binl_md5(x, len) { x[len >> 5] |= 128 << ((len) % 32); x[(((len + 64) >>> 9) << 4) + 14] = len; var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878; for (i = 0; i < x.length; i += 16) { olda = a; oldb = b; oldc = c; oldd = d; a = md5_ff(a, b, c, d, x[i], 7, -680876936); d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330); a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983); a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i + 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162); a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329); a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5_gg(b, c, d, a, x[i], 20, -373897302); a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848); a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501); a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734); a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556); a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640); a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5_hh(d, a, b, c, x[i], 11, -358537222); c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189); a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651); a = md5_ii(a, b, c, d, x[i], 6, -198630844); d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055); a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799); a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649); a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551); a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d = safe_add(d, oldd) } return [a, b, c, d] } function binl2rstr(input) { var i, output = ""; for (i = 0; i < input.length * 32; i += 8) { output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 255) } return output } function rstr2binl(input) { var i, output = []; output[(input.length >> 2) - 1] = undefined; for (i = 0; i < output.length; i += 1) { output[i] = 0 } for (i = 0; i < input.length * 8; i += 8) { output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << (i % 32) } return output } function rstr_md5(s) { return binl2rstr(binl_md5(rstr2binl(s), s.length * 8)) } function rstr_hmac_md5(key, data) { var i, bkey = rstr2binl(key), ipad = [], opad = [], hash; ipad[15] = opad[15] = undefined; if (bkey.length > 16) { bkey = binl_md5(bkey, key.length * 8) } for (i = 0; i < 16; i += 1) { ipad[i] = bkey[i] ^ 909522486; opad[i] = bkey[i] ^ 1549556828 } hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8); return binl2rstr(binl_md5(opad.concat(hash), 512 + 128)) } function rstr2hex(input) { var hex_tab = "0123456789abcdef", output = "", x, i; for (i = 0; i < input.length; i += 1) { x = input.charCodeAt(i); output += hex_tab.charAt((x >>> 4) & 15) + hex_tab.charAt(x & 15) } return output } function str2rstr_utf8(input) { return unescape(encodeURIComponent(input)) } function raw_md5(s) { return rstr_md5(str2rstr_utf8(s)) } function hex_md5(s) { return rstr2hex(raw_md5(s)) } function raw_hmac_md5(k, d) { return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)) } function hex_hmac_md5(k, d) { return rstr2hex(raw_hmac_md5(k, d)) } $.md5 = function (string, key, raw) { if (!key) { if (!raw) { return hex_md5(string) } else { return raw_md5(string) } } if (!raw) { return hex_hmac_md5(key, string) } else { return raw_hmac_md5(key, string) } }
}(typeof jQuery === "function" ? jQuery : this));

//jquery.purl.js
(function () {
    (function (factory) { if (typeof define === "function" && define.amd) { define(factory) } else { window.purl = factory() } })(function () { var tag2attr = { a: "href", img: "src", form: "action", base: "href", script: "src", iframe: "src", link: "href", embed: "src", object: "data" }, key = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], aliases = { "anchor": "fragment" }, parser = { strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ }, isint = /^[0-9]+$/; function parseUri(url, strictMode) { var str = decodeURI(url), res = parser[strictMode || false ? "strict" : "loose"].exec(str), uri = { attr: {}, param: {}, seg: {} }, i = 14; while (i--) { uri.attr[key[i]] = res[i] || "" } uri.param["query"] = parseString(uri.attr["query"]); uri.param["fragment"] = parseString(uri.attr["fragment"]); uri.seg["path"] = uri.attr.path.replace(/^\/+|\/+$/g, "").split("/"); uri.seg["fragment"] = uri.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"); uri.attr["base"] = uri.attr.host ? (uri.attr.protocol ? uri.attr.protocol + "://" + uri.attr.host : uri.attr.host) + (uri.attr.port ? ":" + uri.attr.port : "") : ""; return uri } function getAttrName(elm) { var tn = elm.tagName; if (typeof tn !== "undefined") { return tag2attr[tn.toLowerCase()] } return tn } function promote(parent, key) { if (parent[key].length === 0) { return parent[key] = {} } var t = {}; for (var i in parent[key]) { t[i] = parent[key][i] } parent[key] = t; return t } function parse(parts, parent, key, val) { var part = parts.shift(); if (!part) { if (isArray(parent[key])) { parent[key].push(val) } else { if ("object" == typeof parent[key]) { parent[key] = val } else { if ("undefined" == typeof parent[key]) { parent[key] = val } else { parent[key] = [parent[key], val] } } } } else { var obj = parent[key] = parent[key] || []; if ("]" == part) { if (isArray(obj)) { if ("" !== val) { obj.push(val) } } else { if ("object" == typeof obj) { obj[keys(obj).length] = val } else { obj = parent[key] = [parent[key], val] } } } else { if (~part.indexOf("]")) { part = part.substr(0, part.length - 1); if (!isint.test(part) && isArray(obj)) { obj = promote(parent, key) } parse(parts, obj, part, val) } else { if (!isint.test(part) && isArray(obj)) { obj = promote(parent, key) } parse(parts, obj, part, val) } } } } function merge(parent, key, val) { if (~key.indexOf("]")) { var parts = key.split("["); parse(parts, parent, "base", val) } else { if (!isint.test(key) && isArray(parent.base)) { var t = {}; for (var k in parent.base) { t[k] = parent.base[k] } parent.base = t } if (key !== "") { set(parent.base, key, val) } } return parent } function parseString(str) { return reduce(String(str).split(/&|;/), function (ret, pair) { try { pair = decodeURIComponent(pair.replace(/\+/g, " ")) } catch (e) { } var eql = pair.indexOf("="), brace = lastBraceInKey(pair), key = pair.substr(0, brace || eql), val = pair.substr(brace || eql, pair.length); val = val.substr(val.indexOf("=") + 1, val.length); if (key === "") { key = pair; val = "" } return merge(ret, key, val) }, { base: {} }).base } function set(obj, key, val) { var v = obj[key]; if (typeof v === "undefined") { obj[key] = val } else { if (isArray(v)) { v.push(val) } else { obj[key] = [v, val] } } } function lastBraceInKey(str) { var len = str.length, brace, c; for (var i = 0; i < len; ++i) { c = str[i]; if ("]" == c) { brace = false } if ("[" == c) { brace = true } if ("=" == c && !brace) { return i } } } function reduce(obj, accumulator) { var i = 0, l = obj.length >> 0, curr = arguments[2]; while (i < l) { if (i in obj) { curr = accumulator.call(undefined, curr, obj[i], i, obj) } ++i } return curr } function isArray(vArg) { return Object.prototype.toString.call(vArg) === "[object Array]" } function keys(obj) { var key_array = []; for (var prop in obj) { if (obj.hasOwnProperty(prop)) { key_array.push(prop) } } return key_array } function purl(url, strictMode) { if (arguments.length === 1 && url === true) { strictMode = true; url = undefined } strictMode = strictMode || false; url = url || window.location.toString(); return { data: parseUri(url, strictMode), attr: function (attr) { attr = aliases[attr] || attr; return typeof attr !== "undefined" ? this.data.attr[attr] : this.data.attr }, param: function (param) { return typeof param !== "undefined" ? this.data.param.query[param] : this.data.param.query }, fparam: function (param) { return typeof param !== "undefined" ? this.data.param.fragment[param] : this.data.param.fragment }, segment: function (seg) { if (typeof seg === "undefined") { return this.data.seg.path } else { seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; return this.data.seg.path[seg] } }, fsegment: function (seg) { if (typeof seg === "undefined") { return this.data.seg.fragment } else { seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; return this.data.seg.fragment[seg] } } } } purl.jQuery = function ($) { if ($ != null) { $.fn.url = function (strictMode) { var url = ""; if (this.length) { url = $(this).attr(getAttrName(this[0])) || "" } return purl(url, strictMode) }; $.url = purl } }; purl.jQuery(window.jQuery); return purl });
})();

//JSON.stringify JSON.parse
var JSType = { undefined: "undefined", boolean: "boolean", number: "number", string: "string", object: "object" };
var JSVType = { required: "required", email: "email", url: "url", int: "int", float: "float", maxLength: "maxLength", minLength: "minLength", rangeLength: "rangeLength", range: "range", regex: "regex" };
if (typeof JSON !== "object") { JSON = {} } (function () {
    function f(n) { return n < 10 ? "0" + n : n } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() } } var cx, escapable, gap, indent, meta, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }; JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) }
    } if (typeof JSON.parse !== "function") { cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } }
}());
(function () {
    JSON.encode = function (obj) {
        return JSON.stringify(obj);
    };
    JSON.decode = function (str) {
        var isString = typeof (str) == "string";
        return isString ? JSON.parse(str) : str;
    };
})();

//Math.uuid Math.uuidFast Math.uuidCompact
(function () {
    var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""); Math.uuid = function (len, radix) { var chars = CHARS, uuid = [], i; radix = radix || chars.length; if (len) { for (i = 0; i < len; i++) { uuid[i] = chars[0 | Math.random() * radix] } } else { var r; uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-"; uuid[14] = "4"; for (i = 0; i < 36; i++) { if (!uuid[i]) { r = 0 | Math.random() * 16; uuid[i] = chars[(i == 19) ? (r & 3) | 8 : r] } } } return uuid.join("") }; Math.uuidFast = function () { var chars = CHARS, uuid = new Array(36), rnd = 0, r; for (var i = 0; i < 36; i++) { if (i == 8 || i == 13 || i == 18 || i == 23) { uuid[i] = "-" } else { if (i == 14) { uuid[i] = "4" } else { if (rnd <= 2) { rnd = 33554432 + (Math.random() * 16777216) | 0 } r = rnd & 15; rnd = rnd >> 4; uuid[i] = chars[(i == 19) ? (r & 3) | 8 : r] } } } return uuid.join("") }; Math.uuidCompact = function () { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 3 | 8); return v.toString(16) }) }
})();

//http://jslinq.codeplex.com
(function () {
    var JSLINQ = window.jslinq = window.JSLINQ = function (dataItems) { return new JSLINQ.fn.init(dataItems) }, utils = { processLambda: function (clause) { if (utils.isLambda(clause)) { var expr = clause.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/); return new Function(expr[1], "return (" + expr[2] + ")") } return clause }, isLambda: function (clause) { return (clause.indexOf("=>") > -1) }, randomIndex: function (max, existing) { var q, r, f = function () { return this == r }; if (!existing) { return parseInt(Math.random() * max, 10) } else { q = JSLINQ(existing); r = -1; while (r < 0 || q.Where(f).Count() !== 0) { r = utils.randomIndex(max) } return r } } }; JSLINQ.fn = JSLINQ.prototype = { init: function (dataItems) { this.items = dataItems }, jslinq: "2.20", toArray: function () { return this.items }, where: function (clause) { var newArray = [], len = this.items.length; for (var i = 0; i < len; i++) { if (clause.apply(this.items[i], [this.items[i], i])) { newArray[newArray.length] = this.items[i] } } return JSLINQ(newArray) }, select: function (clause) { var item, newArray = [], field = clause; if (typeof (clause) !== "function") { if (clause.indexOf(",") === -1) { clause = function () { return this[field] } } else { clause = function () { var i, fields = field.split(","), obj = {}; for (i = 0; i < fields.length; i++) { obj[fields[i]] = this[fields[i]] } return obj } } } for (var i = 0; i < this.items.length; i++) { item = clause.apply(this.items[i], [this.items[i]]); if (item) { newArray[newArray.length] = item } } return JSLINQ(newArray) }, orderBy: function (clause) { var tempArray = []; for (var i = 0; i < this.items.length; i++) { tempArray[tempArray.length] = this.items[i] } if (typeof (clause) !== "function") { var field = clause; if (utils.isLambda(field)) { clause = utils.processLambda(field) } else { clause = function () { return this[field] } } } return JSLINQ(tempArray.sort(function (a, b) { var x = clause.apply(a, [a]), y = clause.apply(b, [b]); return ((x < y) ? -1 : ((x > y) ? 1 : 0)) })) }, orderByDescending: function (clause) { var tempArray = [], field; for (var i = 0; i < this.items.length; i++) { tempArray[tempArray.length] = this.items[i] } if (typeof (clause) !== "function") { field = clause; if (utils.isLambda(field)) { clause = utils.processLambda(field) } else { clause = function () { return this[field] } } } return JSLINQ(tempArray.sort(function (a, b) { var x = clause.apply(b, [b]), y = clause.apply(a, [a]); return ((x < y) ? -1 : ((x > y) ? 1 : 0)) })) }, selectMany: function (clause) { var r = []; for (var i = 0; i < this.items.length; i++) { r = r.concat(clause.apply(this.items[i], [this.items[i]])) } return JSLINQ(r) }, count: function (clause) { if (clause === undefined) { return this.items.length } else { return this.Where(clause).items.length } }, distinct: function (clause) { var item, dict = {}, retVal = []; for (var i = 0; i < this.items.length; i++) { item = clause.apply(this.items[i], [this.items[i]]); if (dict[item] === undefined) { dict[item] = true; retVal.push(item) } } dict = null; return JSLINQ(retVal) }, any: function (clause) { for (var i = 0; i < this.items.length; i++) { if (clause.apply(this.items[i], [this.items[i], i])) { return true } } return false }, all: function (clause) { for (var i = 0; i < this.items.length; i++) { if (!clause(this.items[i], i)) { return false } } return true }, reverse: function () { var retVal = []; for (var i = this.items.length - 1; i > -1; i--) { retVal[retVal.length] = this.items[i] } return JSLINQ(retVal) }, first: function (clause) { if (clause !== undefined) { return this.Where(clause).First() } else { if (this.items.length > 0) { return this.items[0] } else { return null } } }, last: function (clause) { if (clause !== undefined) { return this.Where(clause).Last() } else { if (this.items.length > 0) { return this.items[this.items.length - 1] } else { return null } } }, elementAt: function (i) { return this.items[i] }, concat: function (array) { var arr = array.items || array; return JSLINQ(this.items.concat(arr)) }, intersect: function (secondArray, clause) { var clauseMethod, sa = (secondArray.items || secondArray), result = []; if (clause !== undefined) { clauseMethod = clause } else { clauseMethod = function (item, index, item2, index2) { return item === item2 } } for (var a = 0; a < this.items.length; a++) { for (var b = 0; b < sa.length; b++) { if (clauseMethod(this.items[a], a, sa[b], b)) { result[result.length] = this.items[a] } } } return JSLINQ(result) }, defaultIfEmpty: function (defaultValue) { if (this.items.length === 0) { return defaultValue } return this }, elementAtOrDefault: function (i, defaultValue) { if (i >= 0 && i < this.items.length) { return this.items[i] } return defaultValue }, firstOrDefault: function (defaultValue) { return this.First() || defaultValue }, lastOrDefault: function (defaultValue) { return this.Last() || defaultValue }, take: function (count) { return this.Where(function (item, index) { return index < count }) }, skip: function (count) { return this.Where(function (item, index) { return index >= count }) }, each: function (clause) { var len = this.items.length; for (var i = 0; i < len; i++) { clause.apply(this.items[i], [this.items[i], i]) } return this }, random: function (count) { var len = this.Count(), rnd = []; if (!count) { count = 1 } for (var i = 0; i < count; i++) { rnd.push(utils.randomIndex(len - 1, rnd)) } rnd = JSLINQ(rnd); return this.Where(function (item, index) { return rnd.Where(function () { return this == index }).Count() > 0 }) } }; (function (fn) {
        fn.ToArray = fn.toArray; fn.Where = fn.where; fn.Select = fn.select; fn.OrderBy = fn.orderBy; fn.OrderByDescending = fn.orderByDescending; fn.SelectMany = fn.selectMany; fn.Count = fn.count; fn.Distinct = fn.distinct; fn.Any = fn.any; fn.All = fn.all;
        fn.Reverse = fn.reverse; fn.First = fn.first; fn.Last = fn.last; fn.ElementAt = fn.elementAt; fn.Concat = fn.concat; fn.Intersect = fn.intersect; fn.DefaultIfEmpty = fn.defaultIfEmpty; fn.ElementAtOrDefault = fn.elementAtOrDefault; fn.FirstOrDefault = fn.firstOrDefault; fn.LastOrDefault = fn.lastOrDefault; fn.Take = fn.take; fn.Skip = fn.skip; fn.Each = fn.each; fn.Random = fn.random;
    })(JSLINQ.fn); JSLINQ.fn.init.prototype = JSLINQ.fn
})();

//jquery.fn.get/setFormData
(function () {
    jQuery.fn.extend({
        getFormData: function () {
            var obj = {};
            this.find("input[name],select[name],textarea[name]").each(function () {
                obj[jQuery(this).attr("name")] = jQuery(this).val();
            });
            return obj;
        },
        setFormData: function (obj) {
            for (var name in obj) {
                this.find("input[name=" + name + "]").val(obj[name]);
                this.find("select[name=" + name + "]").val(obj[name]);
                this.find("textarea[name=" + name + "]").val(obj[name]);
            }
        }
    });
})();

//JSLINQ.groupBy
(function () {
    JSLINQ.prototype.groupBy = JSLINQ.prototype.GroupBy = function (clause) {
        var keys = this.select(clause);
        var temp = [];
        for (var i = 0; i < this.items.length; i++) {
            temp[i] = { md5: $.md5(JSON.encode(keys.items[i])), key: keys.items[i], item: this.items[i] };
        }
        var result = {};
        for (var i = 0; i < this.items.length; i++) {
            if (result[temp[i].md5]) {
                result[temp[i].md5].push(temp[i]);
            }
            else {
                result[temp[i].md5] = [temp[i]];
            }
        }
        var groups = []; var i = 0;
        for (var p in result) {
            groups[i] = JSLINQ(result[p]).select('item');
            groups[i].key = result[p][0].key;
            i++;
        }
        return JSLINQ(groups);
    };
    JSLINQ.prototype.select = jslinq.prototype.Select = function (clause) {
        var item, newArray = [], field = clause;
        if (typeof (clause) !== "function") {
            if (clause.indexOf(",") === -1) {
                clause = function () { return this[field]; };
            } else {
                clause = function () {
                    var i, fields = field.split(","), obj = {};
                    for (i = 0; i < fields.length; i++) {
                        obj[fields[i]] = this[fields[i]];
                    }
                    return obj;
                };
            }
        }

        // The clause was passed in as a Method that returns a Value
        for (var i = 0; i < this.items.length; i++) {
            item = clause.apply(this.items[i], [this.items[i]]);
            newArray[newArray.length] = item;
        }
        return JSLINQ(newArray);
    },
    JSLINQ.range = JSLINQ.Range = function (start, count) {
        var result = []; count = parseInt(count);
        for (var i = 0; i < count; i++) {
            result[i] = start + i;
        }
        return JSLINQ(result);
    };
})();

//Dengdu
(function () {
    var Dengdu = window.Dengdu = {};
    Dengdu.coalesce = function () {
        var n = arguments.length;
        for (i = 0; i < n; i++) {
            if (arguments[i]) return arguments[i];
        }
    };
    Dengdu.nwalert = function (text, width, height) {
        width = Dengdu.coalesce(width, 1024);
        height = Dengdu.coalesce(height, 768);
        var win = window.open("", "_blank", "width={0},height={1}".format(width, height));
        win.document.write(text);
    };
    Dengdu.ajaxSuccess = function (text) {
        var msg = JSON.decode(text);
        if (msg.message) window.alert(msg.message);
        if (msg.script) eval(msg.script);
        if (msg.reload) window.location.reload();
        if (msg.href) window.open(msg.href, msg.target);
        return msg.success;
    };
    Dengdu.ajax = function (url, data, success, error) {
        var rslt = 0;
        $.ajax({
            async: false, url: url, data: data, type: "post",
            success: function (text) {
                rslt = Dengdu.ajaxSuccess(text);
                if (success) success(text);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Dengdu.nwalert(jqXHR.responseText);
                if (error) error();
            }
        });
        return rslt;
    };
    Dengdu.asyncAjax = function (url, data, success, error) {
        $.ajax({
            async: true, url: url, data: data, type: "post",
            success: function (text) {
                Dengdu.ajaxSuccess(text);
                if (success) success(text);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Dengdu.nwalert(jqXHR.responseText);
                if (error) error();
            }
        });
    };
    Dengdu.ajaxGetJson = function (url, data) {
        var json;
        $.ajax({
            async: false, url: url, data: data, type: "post",
            success: function (text) { json = text; },
            error: function (jqXHR, textStatus, errorThrown) { Dengdu.nwalert(jqXHR.responseText); }
        });
        return json;
    };
    Dengdu.ajaxGetObj = function (url, data) {
        return JSON.decode(Dengdu.ajaxGetJson(url, data));
    };
    Dengdu.createFormSubmit = function (action, obj, method, target) {
        if (action) {
            obj = obj || {}; target = target || "_blank"; method = method || "post";
            if (action != "post") $.extend(obj, $.url(action).param());
            var form = $("<form></form>").attr('target', target).attr('action', action).attr('method', method);
            var attCount = 0;
            for (var att in obj) {
                var input = $("<input type=\"hidden\"/>").attr("name", att).attr("value", obj[att]);
                form.append(input);
                attCount++;
            }
            if (attCount > 0)
                form.appendTo("body").css('display', 'none').submit().remove();
            else window.open(action, target);
        }
        else alert("Action can't be null.");
    }
    Dengdu.Cookie = {
        get: function (name) {
            var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            var arr = document.cookie.match(reg);
            return arr ? unescape(arr[2]) : null;
        }
    }
    Dengdu.I18N = (function () {
        var self = {};
        self.default = "en-US";
        self.locale = Dengdu.Cookie.get("ASP.NET_Locale") || self.default;
        self.resources = {};
        self.config = function (locale, dct) {
            self.resources[locale] = $.extend(self.resources[locale] || {}, dct);
        }
        self.t = function (str, lc) {
            var locale = lc || self.locale;
            var resource = self.resources[locale] || self.resources[self.default] || {};
            return resource[str] || str;
        }
        $.t = self.t;
        self.config("en-US", {
            confirmMessage: "Are you sure?"
        });
        self.config("zh-Hans", {
            confirmMessage: "您确认吗?"
        });
        $(function () {
            $("[dd-i18n]").each(function () {
                var key = $(this).attr("dd-i18n");
                $(this).text($.t(key));
            });
        });
        return self;
    })();
})();
(function () {
    Dengdu.onload = {};
    Dengdu.onload.functions = [];
    Dengdu.onload.length = 0;
    Dengdu.onload.add = function (func, order) {
        if (typeof order == 'undefined') order = 10000;
        Dengdu.onload.functions.push(new Dengdu.onload.entity(func, Dengdu.onload.length, order));
        Dengdu.onload.length++;
    }
    Dengdu.onload.entity = function (func, seq, order) {
        this.func = func;
        this.seq = seq;
        this.order = order;
    };
    function sortfunc(left, right) {
        var order = left.order - right.order;
        if (order == 0) return left.seq - right.seq;
        return order;
    }
    if (typeof window.onload == 'function') {
        Dengdu.onload.oldonload = window.onload;
    }
    window.onload = function () {
        if (Dengdu.onload.oldonload) Dengdu.onload.oldonload();
        var funcs = Dengdu.onload.functions.sort(sortfunc);
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].func();
        }
    };
})();

Dengdu.onload.add(function () {
    $("table.table-merged").each(function () {
        var trs = $(this).find("tr");
        if (trs.length > 0) {
            var firstTr = trs[0]; var colspanCount = 0; var tds = $(firstTr).find("th,td");
            for (var i = 0; i < tds.length; i++) {
                colspanCount += parseInt($(tds[i]).attr("colspan") || 1);
            }
            for (var colIdx = 0; colIdx < colspanCount; colIdx++) {
                var that;
                $('tr', this).each(function (row) {
                    $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                        if (that != null && $(this).html() == $(that).html() && $(this).html().trim()) {
                            rowspan = $(that).attr("rowSpan");
                            if (rowspan == undefined) {
                                $(that).attr("rowSpan", 1);
                                rowspan = $(that).attr("rowSpan");
                            }
                            rowspan = Number(rowspan) + 1;
                            $(that).attr("rowSpan", rowspan);
                            $(this).hide();
                        } else {
                            that = this;
                        }
                    });
                });
            }
        }
    });
});
$(function () {
    if (jQuery.validator) {
        Dengdu.I18N.config("zh-Hans", {
            vtypeMsg: {
                regex: "请输入正确的格式",
                int: "请输入整数",
                float: "请输入实数"
            }
        });
        Dengdu.I18N.config("en-US", {
            vtypeMsg: {
                regex: "Please enter the correct format.",
                int: "Please enter a valid integer.",
                float: "Please enter a valid real number."
            }
        });
        var locale = Dengdu.I18N.locale;
        var vtypeMsg = Dengdu.I18N.t("vtypeMsg");
        if (locale.startWith("zh")) {
            jQuery.extend(jQuery.validator.messages, {
                required: "必选字段",
                remote: "请修正该字段",
                email: "请输入正确格式的电子邮件",
                url: "请输入合法的网址",
                date: "请输入合法的日期",
                dateISO: "请输入合法的日期 (ISO).",
                number: "请输入合法的数字",
                digits: "请输入整数",
                creditcard: "请输入合法的信用卡号",
                equalTo: "请再次输入相同的值",
                accept: "请输入拥有合法后缀名的字符串",
                maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
                minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
                rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
                range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
                max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
                min: jQuery.validator.format("请输入一个最小为 {0} 的值")
            });
        }
        jQuery.validator.addMethod("regex", function (value, element, params) {
            var exp = new RegExp(params);
            return this.optional(element) || exp.test(value);
        }, vtypeMsg.regex);
        jQuery.validator.addMethod("int", function (value, element, params) {
            return this.optional(element) || /^-?\d+$/.test(value);
        }, vtypeMsg.int);
        jQuery.validator.addMethod("float", function (value, element, params) {
            return this.optional(element) || $.isNumeric(value);
        }, vtypeMsg.float);
        $("[name][vtype]").each(function () {
            var self = $(this);
            var vtypes = self.attr("vtype").split(";");
            $(vtypes).each(function () {
                var params = this.split(":");
                if (params.length == 1) {
                    self.attr(params[0], "true");
                }
                else {
                    self.attr(params[0], params[1]);
                }
            });
        });
    }
});