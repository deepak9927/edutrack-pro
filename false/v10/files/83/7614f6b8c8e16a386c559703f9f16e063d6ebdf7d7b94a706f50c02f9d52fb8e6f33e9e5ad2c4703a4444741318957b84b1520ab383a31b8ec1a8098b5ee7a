"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretReferenceHelper = exports.secretReferenceContentType = void 0;
exports.parseSecretReference = parseSecretReference;
exports.isSecretReference = isSecretReference;
const logger_js_1 = require("./logger.js");
/**
 * content-type for the secret reference.
 */
exports.secretReferenceContentType = "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8";
/**
 * @internal
 */
exports.SecretReferenceHelper = {
    /**
     * Takes the SecretReference (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
     */
    toConfigurationSettingParam: (secretReference) => {
        logger_js_1.logger.info("Encoding SecretReference value in a ConfigurationSetting:", secretReference);
        if (!secretReference.value) {
            logger_js_1.logger.error(`SecretReference has an unexpected value`, secretReference);
            throw new TypeError(`SecretReference has an unexpected value - ${secretReference.value}`);
        }
        const jsonSecretReferenceValue = {
            uri: secretReference.value.secretId,
        };
        const configSetting = Object.assign(Object.assign({}, secretReference), { value: JSON.stringify(jsonSecretReferenceValue) });
        return configSetting;
    },
};
/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<SecretReferenceValue> by parsing the value string.
 */
function parseSecretReference(setting) {
    logger_js_1.logger.info("[parseSecretReference] Parsing the value to return the SecretReferenceValue", setting);
    if (!isSecretReference(setting)) {
        logger_js_1.logger.error("Invalid SecretReference input", setting);
        throw TypeError(`Setting with key ${setting.key} is not a valid SecretReference, make sure to have the correct content-type and a valid non-null value.`);
    }
    const jsonSecretReferenceValue = JSON.parse(setting.value);
    const secretReference = Object.assign(Object.assign({}, setting), { value: { secretId: jsonSecretReferenceValue.uri } });
    return secretReference;
}
/**
 * Lets you know if the ConfigurationSetting is a secret reference.
 *
 * [Checks if the content type is secretReferenceContentType `"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8"`]
 */
function isSecretReference(setting) {
    return (setting &&
        setting.contentType === exports.secretReferenceContentType &&
        typeof setting.value === "string");
}
//# sourceMappingURL=secretReference.js.map