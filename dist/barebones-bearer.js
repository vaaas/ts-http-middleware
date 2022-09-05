"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prefix = 'Bearer ';
const prefix_len = prefix.length;
function same_string(a, b, offset) {
    if (a.length !== b.length + offset)
        return false;
    for (let i = 0; i < b.length; i++)
        if (a[i + offset] !== b[i])
            return false;
    return true;
}
function default_1(token, callback) {
    return function (req, res) {
        if (req.headers.authorization
            && req.headers.authorization.startsWith(prefix)
            && same_string(req.headers.authorization, token, prefix_len))
            callback(req, res);
        else
            res.writeHead(401).end();
    };
}
exports.default = default_1;
