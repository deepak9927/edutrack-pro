"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigKeyCredentialPolicy = appConfigKeyCredentialPolicy;
const core_util_1 = require("@azure/core-util");
const logger_js_1 = require("./logger.js");
/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for AppConfig.
 */
function appConfigKeyCredentialPolicy(credential, secret) {
    return {
        name: "AppConfigKeyCredentialPolicy",
        async sendRequest(request, next) {
            var _a;
            const verb = request.method;
            const utcNow = new Date().toUTCString();
            logger_js_1.logger.info("[appConfigKeyCredentialPolicy] Computing SHA-256 from the request body");
            const contentHash = await (0, core_util_1.computeSha256Hash)(((_a = request.body) === null || _a === void 0 ? void 0 : _a.toString()) || "", "base64");
            const signedHeaders = "x-ms-date;host;x-ms-content-sha256";
            const url = new URL(request.url);
            const query = url.search;
            const urlPathAndQuery = query ? `${url.pathname}${query}` : url.pathname;
            const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.host};${contentHash}`;
            logger_js_1.logger.info("[appConfigKeyCredentialPolicy] Computing a SHA-256 Hmac signature");
            const signature = await (0, core_util_1.computeSha256Hmac)(secret, stringToSign, "base64");
            request.headers.set("x-ms-date", utcNow);
            request.headers.set("x-ms-content-sha256", contentHash);
            // Syntax for Authorization header
            // Reference - https://learn.microsoft.com/en-us/azure/azure-app-configuration/rest-api-authentication-hmac#syntax
            request.headers.set("Authorization", `HMAC-SHA256 Credential=${credential}&SignedHeaders=${signedHeaders}&Signature=${signature}`);
            return next(request);
        },
    };
}
//# sourceMappingURL=appConfigCredential.js.map