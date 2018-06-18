
var Cookie = require("cookie");


var CookiesMiddleware = function (req, res, next) {
    req.cookies = res.cookies = res.cookies || new Cookies(req, res);
    next && next();
    return res.cookies;
};
var Cookies = function (req, res) {
    this.reqCookies = Cookie.parse(req.headers.cookie || "");
    this.resCookies = {};
    this.res = res;
};
Cookies.prototype.get = function (key) {
    return this.reqCookies[key];
};
Cookies.prototype.set = function (key, value, options) {
    var resCookies = this.resCookies;
    resCookies[key] = Cookie.serialize(key, value, options);
    this.res.setHeader("Set-Cookie", Object.keys(resCookies).map(function(key){return resCookies[key];}));
};
Cookies.prototype.unset = function (key) {
    var resCookies = this.resCookies;
    delete resCookies[key];
    this.res.setHeader("Set-Cookie", Object.keys(resCookies).map(function(key){return resCookies[key];}));
};
CookiesMiddleware.Cookies = Cookies;


module.exports = CookiesMiddleware;
