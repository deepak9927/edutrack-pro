"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagHelper = exports.featureFlagContentType = exports.featureFlagPrefix = void 0;
exports.parseFeatureFlag = parseFeatureFlag;
exports.isFeatureFlag = isFeatureFlag;
const logger_js_1 = require("./logger.js");
/**
 * The prefix for feature flags.
 */
exports.featureFlagPrefix = ".appconfig.featureflag/";
/**
 * The content type for a FeatureFlag
 */
exports.featureFlagContentType = "application/vnd.microsoft.appconfig.ff+json;charset=utf-8";
/**
 * @internal
 */
exports.FeatureFlagHelper = {
    /**
     * Takes the FeatureFlag (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
     */
    toConfigurationSettingParam: (featureFlag) => {
        var _a;
        logger_js_1.logger.info("Encoding FeatureFlag value in a ConfigurationSetting:", featureFlag);
        if (!featureFlag.value) {
            logger_js_1.logger.error("FeatureFlag has an unexpected value", featureFlag);
            throw new TypeError(`FeatureFlag has an unexpected value - ${featureFlag.value}`);
        }
        let key = featureFlag.key;
        if (typeof featureFlag.key === "string" && !featureFlag.key.startsWith(exports.featureFlagPrefix)) {
            key = exports.featureFlagPrefix + featureFlag.key;
        }
        const jsonFeatureFlagValue = {
            id: (_a = featureFlag.value.id) !== null && _a !== void 0 ? _a : key.replace(exports.featureFlagPrefix, ""),
            enabled: featureFlag.value.enabled,
            description: featureFlag.value.description,
            conditions: {
                client_filters: featureFlag.value.conditions.clientFilters,
            },
            display_name: featureFlag.value.displayName,
        };
        const configSetting = Object.assign(Object.assign({}, featureFlag), { key, value: JSON.stringify(jsonFeatureFlagValue) });
        return configSetting;
    },
};
/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<FeatureFlagValue> by parsing the value string.
 */
function parseFeatureFlag(setting) {
    logger_js_1.logger.info("Parsing the value to return the FeatureFlagValue", setting);
    if (!isFeatureFlag(setting)) {
        logger_js_1.logger.error("Invalid FeatureFlag input", setting);
        throw TypeError(`Setting with key ${setting.key} is not a valid FeatureFlag, make sure to have the correct content-type and a valid non-null value.`);
    }
    const jsonFeatureFlagValue = JSON.parse(setting.value);
    let key = setting.key;
    if (typeof setting.key === "string" && !setting.key.startsWith(exports.featureFlagPrefix)) {
        key = exports.featureFlagPrefix + setting.key;
    }
    const featureflag = Object.assign(Object.assign({}, setting), { value: {
            id: jsonFeatureFlagValue.id,
            enabled: jsonFeatureFlagValue.enabled,
            description: jsonFeatureFlagValue.description,
            displayName: jsonFeatureFlagValue.display_name,
            conditions: { clientFilters: jsonFeatureFlagValue.conditions.client_filters },
        }, key, contentType: exports.featureFlagContentType });
    return featureflag;
}
/**
 * Lets you know if the ConfigurationSetting is a feature flag.
 *
 * [Checks if the content type is featureFlagContentType `"application/vnd.microsoft.appconfig.ff+json;charset=utf-8"`]
 */
function isFeatureFlag(setting) {
    return (setting && setting.contentType === exports.featureFlagContentType && typeof setting.value === "string");
}
//# sourceMappingURL=featureFlag.js.map