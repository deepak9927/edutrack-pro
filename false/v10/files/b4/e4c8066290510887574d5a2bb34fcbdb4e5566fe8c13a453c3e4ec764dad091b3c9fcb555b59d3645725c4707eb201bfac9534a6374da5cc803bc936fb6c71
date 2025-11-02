"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteETag = quoteETag;
exports.checkAndFormatIfAndIfNoneMatch = checkAndFormatIfAndIfNoneMatch;
exports.formatFiltersAndSelect = formatFiltersAndSelect;
exports.formatConfigurationSettingsFiltersAndSelect = formatConfigurationSettingsFiltersAndSelect;
exports.formatSnapshotFiltersAndSelect = formatSnapshotFiltersAndSelect;
exports.formatLabelsFiltersAndSelect = formatLabelsFiltersAndSelect;
exports.formatAcceptDateTime = formatAcceptDateTime;
exports.extractAfterTokenFromNextLink = extractAfterTokenFromNextLink;
exports.extractAfterTokenFromLinkHeader = extractAfterTokenFromLinkHeader;
exports.makeConfigurationSettingEmpty = makeConfigurationSettingEmpty;
exports.transformKeyValue = transformKeyValue;
exports.serializeAsConfigurationSettingParam = serializeAsConfigurationSettingParam;
exports.transformKeyValueResponseWithStatusCode = transformKeyValueResponseWithStatusCode;
exports.transformKeyValueResponse = transformKeyValueResponse;
exports.transformSnapshotResponse = transformSnapshotResponse;
exports.formatFieldsForSelect = formatFieldsForSelect;
exports.errorMessageForUnexpectedSetting = errorMessageForUnexpectedSetting;
exports.assertResponse = assertResponse;
exports.hasUnderscoreResponse = hasUnderscoreResponse;
exports.getScope = getScope;
const tslib_1 = require("tslib");
const models_js_1 = require("../models.js");
const featureFlag_js_1 = require("../featureFlag.js");
const secretReference_js_1 = require("../secretReference.js");
const core_util_1 = require("@azure/core-util");
const logger_js_1 = require("../logger.js");
/**
 * Formats the etag so it can be used with a If-Match/If-None-Match header
 * @internal
 */
function quoteETag(etag) {
    // https://tools.ietf.org/html/rfc7232#section-3.1
    if (etag === undefined || etag === "*") {
        return etag;
    }
    if (etag.startsWith('"') && etag.endsWith('"')) {
        return etag;
    }
    if (etag.startsWith("'") && etag.endsWith("'")) {
        return etag;
    }
    return `"${etag}"`;
}
/**
 * Checks the onlyIfChanged/onlyIfUnchanged properties to make sure we haven't specified both
 * and throws an Error. Otherwise, returns the properties properly quoted.
 * @param options - An options object with onlyIfChanged/onlyIfUnchanged fields
 * @internal
 */
function checkAndFormatIfAndIfNoneMatch(objectWithEtag, options) {
    if (options.onlyIfChanged && options.onlyIfUnchanged) {
        logger_js_1.logger.error("onlyIfChanged and onlyIfUnchanged are both specified", options.onlyIfChanged, options.onlyIfUnchanged);
        throw new Error("onlyIfChanged and onlyIfUnchanged are mutually-exclusive");
    }
    let ifMatch;
    let ifNoneMatch;
    if (options.onlyIfUnchanged) {
        ifMatch = quoteETag(objectWithEtag.etag);
    }
    if (options.onlyIfChanged) {
        ifNoneMatch = quoteETag(objectWithEtag.etag);
    }
    return {
        ifMatch: ifMatch,
        ifNoneMatch: ifNoneMatch,
    };
}
/**
 * Transforms some of the key fields in SendConfigurationSettingsOptions and ListRevisionsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
function formatFiltersAndSelect(listConfigOptions) {
    let acceptDatetime = undefined;
    if (listConfigOptions.acceptDateTime) {
        acceptDatetime = listConfigOptions.acceptDateTime.toISOString();
    }
    return {
        key: listConfigOptions.keyFilter,
        label: listConfigOptions.labelFilter,
        tags: listConfigOptions.tagsFilter,
        acceptDatetime,
        select: formatFieldsForSelect(listConfigOptions.fields),
    };
}
/**
 * Transforms some of the key fields in SendConfigurationSettingsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter, labelFilter, snapshotName are moved to key, label, and snapshot respectively.
 *
 * @internal
 */
function formatConfigurationSettingsFiltersAndSelect(listConfigOptions) {
    const { snapshotName: snapshot } = listConfigOptions, options = tslib_1.__rest(listConfigOptions, ["snapshotName"]);
    return Object.assign(Object.assign({}, formatFiltersAndSelect(options)), { snapshot });
}
/**
 * Transforms some of the key fields in ListSnapshotsOptions
 * so they can be added to a request using AppConfigurationGetSnapshotsOptionalParams.
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
function formatSnapshotFiltersAndSelect(listSnapshotOptions) {
    return {
        name: listSnapshotOptions.nameFilter,
        status: listSnapshotOptions.statusFilter,
        select: listSnapshotOptions.fields,
    };
}
/**
 * Transforms some of the key fields in ListLabelsOptions
 * so they can be added to a request using AppConfigurationGetLabelsOptionalParams.
 * - `select` is populated with the proper field names from `options.fields`
 * - `nameFilter` are moved to name
 *
 * @internal
 */
function formatLabelsFiltersAndSelect(listLabelsOptions) {
    return {
        name: listLabelsOptions.nameFilter,
        select: listLabelsOptions.fields,
    };
}
/**
 * Handles translating a Date acceptDateTime into a string as needed by the API
 * @param newOptions - A newer style options with acceptDateTime as a date (and with proper casing!)
 * @internal
 */
function formatAcceptDateTime(newOptions) {
    return {
        acceptDatetime: newOptions.acceptDateTime && newOptions.acceptDateTime.toISOString(),
    };
}
/**
 * Take the URL that gets returned from next link and extract the 'after' token needed
 * to get the next page of results.
 * @internal
 */
function extractAfterTokenFromNextLink(nextLink) {
    const searchParams = new URLSearchParams(nextLink);
    const afterToken = searchParams.get("after");
    if (afterToken == null || Array.isArray(afterToken)) {
        logger_js_1.logger.error("Invalid nextLink - invalid after token", afterToken, Array.isArray(afterToken));
        throw new Error("Invalid nextLink - invalid after token");
    }
    return decodeURIComponent(afterToken);
}
/**
 * Take the header link that gets returned from 304 response and extract the 'after' token needed
 * to get the next page of results.
 *
 * @internal
 */
function extractAfterTokenFromLinkHeader(link) {
    // Example transformation of the link header
    // link:
    // '</kv?api-version=2023-10-01&key=listResults714&after=bGlzdE4>; rel="next"'
    //
    // linkValue:
    // </kv?api-version=2023-10-01&key=listResults714&after=bGlzdE4>
    //
    // nextLink:
    // /kv?api-version=2023-10-01&key=listResults714&after=bGlzdE4
    const linkValue = link.split(";")[0];
    const nextLink = linkValue.substring(1, linkValue.length - 1);
    return extractAfterTokenFromNextLink(nextLink);
}
/**
 * Makes a ConfigurationSetting-based response throw for all of the data members. Used primarily
 * to prevent possible errors by the user in accessing a model that is uninitialized. This can happen
 * in cases like HTTP status code 204 or 304, which return an empty response body.
 *
 * @param configurationSetting - The configuration setting to alter
 */
function makeConfigurationSettingEmpty(configurationSetting) {
    const names = [
        "contentType",
        "etag",
        "label",
        "lastModified",
        "isReadOnly",
        "tags",
        "value",
    ];
    for (const name of names) {
        configurationSetting[name] = undefined;
    }
}
/**
 * @internal
 */
function transformKeyValue(kvp) {
    const setting = Object.assign(Object.assign({ value: undefined }, kvp), { isReadOnly: !!kvp.locked });
    delete setting.locked;
    if (!setting.label) {
        delete setting.label;
    }
    if (!setting.contentType) {
        delete setting.contentType;
    }
    return setting;
}
/**
 * @internal
 */
function isConfigSettingWithSecretReferenceValue(setting) {
    return (setting.contentType === secretReference_js_1.secretReferenceContentType &&
        (0, core_util_1.isDefined)(setting.value) &&
        typeof setting.value !== "string");
}
/**
 * @internal
 */
function isConfigSettingWithFeatureFlagValue(setting) {
    return (setting.contentType === featureFlag_js_1.featureFlagContentType &&
        (0, core_util_1.isDefined)(setting.value) &&
        typeof setting.value !== "string");
}
/**
 * @internal
 */
function isSimpleConfigSetting(setting) {
    return typeof setting.value === "string" || !(0, core_util_1.isDefined)(setting.value);
}
/**
 * @internal
 */
function serializeAsConfigurationSettingParam(setting) {
    if (isSimpleConfigSetting(setting)) {
        return setting;
    }
    try {
        if (isConfigSettingWithFeatureFlagValue(setting)) {
            return featureFlag_js_1.FeatureFlagHelper.toConfigurationSettingParam(setting);
        }
        if (isConfigSettingWithSecretReferenceValue(setting)) {
            return secretReference_js_1.SecretReferenceHelper.toConfigurationSettingParam(setting);
        }
    }
    catch (error) {
        return setting;
    }
    logger_js_1.logger.error("Unable to serialize to a configuration setting", setting);
    throw new TypeError(`Unable to serialize the setting with key "${setting.key}" as a configuration setting`);
}
/**
 * @internal
 */
function transformKeyValueResponseWithStatusCode(kvp, status) {
    const response = Object.assign(Object.assign({}, transformKeyValue(kvp)), { statusCode: status !== null && status !== void 0 ? status : -1 });
    if (hasUnderscoreResponse(kvp)) {
        Object.defineProperty(response, "_response", {
            enumerable: false,
            value: kvp._response,
        });
    }
    return response;
}
/**
 * @internal
 */
function transformKeyValueResponse(kvp) {
    const setting = transformKeyValue(kvp);
    if (hasUnderscoreResponse(kvp)) {
        Object.defineProperty(setting, "_response", {
            enumerable: false,
            value: kvp._response,
        });
    }
    delete setting.eTag;
    return setting;
}
/**
 * @internal
 */
function transformSnapshotResponse(snapshot) {
    if (hasUnderscoreResponse(snapshot)) {
        Object.defineProperty(snapshot, "_response", {
            enumerable: false,
            value: snapshot._response,
        });
    }
    return snapshot;
}
/**
 * Translates user-facing field names into their `select` equivalents (these can be
 * seen in the `KnownEnum5`)
 *
 * @param fieldNames - fieldNames from users.
 * @returns The field names translated into the `select` field equivalents.
 *
 * @internal
 */
function formatFieldsForSelect(fieldNames) {
    if (fieldNames == null) {
        return undefined;
    }
    const mappedFieldNames = fieldNames.map((fn) => {
        switch (fn) {
            case "lastModified":
                return "last_modified";
            case "contentType":
                return "content_type";
            case "isReadOnly":
                return "locked";
            default:
                return fn;
        }
    });
    return mappedFieldNames;
}
/**
 * @internal
 */
function errorMessageForUnexpectedSetting(key, expectedType) {
    return `Setting with key ${key} is not a valid ${expectedType}, make sure to have the correct content-type and a valid non-null value.`;
}
function assertResponse(result) {
    if (!hasUnderscoreResponse(result)) {
        Object.defineProperty(result, "_response", {
            enumerable: false,
            value: "Something went wrong, _response(raw response) is supposed to be part of the response. Please file a bug at https://github.com/Azure/azure-sdk-for-js",
        });
    }
}
function hasUnderscoreResponse(result) {
    return Object.prototype.hasOwnProperty.call(result, "_response");
}
/**
 * Get the scope for the App Configuration service based on the endpoint and audience.
 * If the audience is provided, it will be used as the scope.
 * If not, the scope is defaulted to Azure Public Cloud when not specified.
 *
 * @internal
 */
function getScope(appConfigEndpoint, appConfigAudience) {
    if (appConfigAudience) {
        return `${appConfigAudience}/.default`;
    }
    else if (appConfigEndpoint.endsWith("azconfig.azure.us") ||
        appConfigEndpoint.endsWith("appconfig.azure.us")) {
        return `${models_js_1.KnownAppConfigAudience.AzureGovernment}/.default`;
    }
    else if (appConfigEndpoint.endsWith("azconfig.azure.cn") ||
        appConfigEndpoint.endsWith("appconfig.azure.cn")) {
        return `${models_js_1.KnownAppConfigAudience.AzureChina}/.default`;
    }
    else {
        return `${models_js_1.KnownAppConfigAudience.AzurePublicCloud}/.default`;
    }
}
//# sourceMappingURL=helpers.js.map