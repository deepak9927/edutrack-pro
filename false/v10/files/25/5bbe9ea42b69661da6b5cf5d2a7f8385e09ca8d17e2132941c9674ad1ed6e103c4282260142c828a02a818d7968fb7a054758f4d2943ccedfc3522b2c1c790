// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { computeSha256Hash, computeSha256Hmac } from "@azure/core-util";
import { logger } from "./logger.js";
/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for AppConfig.
 */
export function appConfigKeyCredentialPolicy(credential, secret) {
    return {
        name: "AppConfigKeyCredentialPolicy",
        async sendRequest(request, next) {
            var _a;
            const verb = request.method;
            const utcNow = new Date().toUTCString();
            logger.info("[appConfigKeyCredentialPolicy] Computing SHA-256 from the request body");
            const contentHash = await computeSha256Hash(((_a = request.body) === null || _a === void 0 ? void 0 : _a.toString()) || "", "base64");
            const signedHeaders = "x-ms-date;host;x-ms-content-sha256";
            const url = new URL(request.url);
            const query = url.search;
            const urlPathAndQuery = query ? `${url.pathname}${query}` : url.pathname;
            const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.host};${contentHash}`;
            logger.info("[appConfigKeyCredentialPolicy] Computing a SHA-256 Hmac signature");
            const signature = await computeSha256Hmac(secret, stringToSign, "base64");
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