"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Modo = /** @class */ (function () {
    function Modo(_a) {
        var api_identifier = _a.api_identifier, api_secret = _a.api_secret;
        this.api_identifier = api_identifier;
        this.api_secret = api_secret;
    }
    Modo.prototype.token = function (api_uri, body) {
        var signVersion = 'MODO2';
        var header = { alg: 'HS256', typ: 'JWT' };
        var headerEncoded = utils_1.encodeUrl(header);
        var payload = {
            iat: Math.round(new Date().getTime() / 1000),
            api_identifier: this.api_identifier,
            api_uri: api_uri,
            body_hash: utils_1.encodeHash(body),
        };
        var payloadEncoded = utils_1.encodeUrl(payload);
        var combinedEncoded = headerEncoded + "." + payloadEncoded;
        var signature = utils_1.encodeHMAC(combinedEncoded, this.api_secret); // will need to pass this in.
        var signatureEncoded = utils_1.sanitizeString(signature); // TODO I don't know if this one is right
        var token = headerEncoded + "." + payloadEncoded + "." + signatureEncoded;
        return signVersion + " " + token;
    };
    return Modo;
}());
exports.default = Modo;
