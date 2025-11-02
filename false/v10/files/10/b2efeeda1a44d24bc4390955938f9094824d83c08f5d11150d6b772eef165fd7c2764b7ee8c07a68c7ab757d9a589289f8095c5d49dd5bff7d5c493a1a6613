import { type ConfigurationSetting, type ConfigurationSettingParam, type HttpOnlyIfChangedField, type HttpOnlyIfUnchangedField, type HttpResponseField, type HttpResponseFields, type ListRevisionsOptions, type ListSettingsOptions, type ListSnapshotsOptions, type ConfigurationSnapshot, type SnapshotResponse, type EtagEntity, type ListLabelsOptions } from "../models.js";
import type { FeatureFlagValue } from "../featureFlag.js";
import type { GetKeyValuesOptionalParams, GetLabelsOptionalParams, GetSnapshotsOptionalParams, KeyValue } from "../generated/src/models/index.js";
import type { SecretReferenceValue } from "../secretReference.js";
import type { OperationOptions } from "@azure/core-client";
/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface SendConfigurationSettingsOptions extends OperationOptions, ListSettingsOptions, EtagEntity {
    /**
     * A filter used get configuration setting for a snapshot. Not valid when used with 'key' and 'label' filters
     */
    snapshotName?: string;
}
/**
 * Options for listLabels that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface SendLabelsRequestOptions extends ListLabelsOptions {
}
/**
 * Formats the etag so it can be used with a If-Match/If-None-Match header
 * @internal
 */
export declare function quoteETag(etag: string | undefined): string | undefined;
/**
 * Checks the onlyIfChanged/onlyIfUnchanged properties to make sure we haven't specified both
 * and throws an Error. Otherwise, returns the properties properly quoted.
 * @param options - An options object with onlyIfChanged/onlyIfUnchanged fields
 * @internal
 */
export declare function checkAndFormatIfAndIfNoneMatch(objectWithEtag: EtagEntity, options: HttpOnlyIfChangedField & HttpOnlyIfUnchangedField): {
    ifMatch: string | undefined;
    ifNoneMatch: string | undefined;
};
/**
 * Transforms some of the key fields in SendConfigurationSettingsOptions and ListRevisionsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
export declare function formatFiltersAndSelect(listConfigOptions: ListRevisionsOptions): Pick<GetKeyValuesOptionalParams, "key" | "label" | "select" | "acceptDatetime" | "tags">;
/**
 * Transforms some of the key fields in SendConfigurationSettingsOptions
 * so they can be added to a request using AppConfigurationGetKeyValuesOptionalParams.
 * - `options.acceptDateTime` is converted into an ISO string
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter, labelFilter, snapshotName are moved to key, label, and snapshot respectively.
 *
 * @internal
 */
export declare function formatConfigurationSettingsFiltersAndSelect(listConfigOptions: SendConfigurationSettingsOptions): Pick<GetKeyValuesOptionalParams, "key" | "label" | "select" | "acceptDatetime" | "snapshot" | "tags">;
/**
 * Transforms some of the key fields in ListSnapshotsOptions
 * so they can be added to a request using AppConfigurationGetSnapshotsOptionalParams.
 * - `select` is populated with the proper field names from `options.fields`
 * - keyFilter and labelFilter are moved to key and label, respectively.
 *
 * @internal
 */
export declare function formatSnapshotFiltersAndSelect(listSnapshotOptions: ListSnapshotsOptions): Pick<GetSnapshotsOptionalParams, "name" | "select" | "status">;
/**
 * Transforms some of the key fields in ListLabelsOptions
 * so they can be added to a request using AppConfigurationGetLabelsOptionalParams.
 * - `select` is populated with the proper field names from `options.fields`
 * - `nameFilter` are moved to name
 *
 * @internal
 */
export declare function formatLabelsFiltersAndSelect(listLabelsOptions: ListLabelsOptions): Pick<GetLabelsOptionalParams, "name" | "select">;
/**
 * Handles translating a Date acceptDateTime into a string as needed by the API
 * @param newOptions - A newer style options with acceptDateTime as a date (and with proper casing!)
 * @internal
 */
export declare function formatAcceptDateTime(newOptions: {
    acceptDateTime?: Date;
}): {
    acceptDatetime?: string;
};
/**
 * Take the URL that gets returned from next link and extract the 'after' token needed
 * to get the next page of results.
 * @internal
 */
export declare function extractAfterTokenFromNextLink(nextLink: string): string;
/**
 * Take the header link that gets returned from 304 response and extract the 'after' token needed
 * to get the next page of results.
 *
 * @internal
 */
export declare function extractAfterTokenFromLinkHeader(link: string): string;
/**
 * Makes a ConfigurationSetting-based response throw for all of the data members. Used primarily
 * to prevent possible errors by the user in accessing a model that is uninitialized. This can happen
 * in cases like HTTP status code 204 or 304, which return an empty response body.
 *
 * @param configurationSetting - The configuration setting to alter
 */
export declare function makeConfigurationSettingEmpty(configurationSetting: Partial<Record<Exclude<keyof ConfigurationSetting, "key">, any>>): void;
/**
 * @internal
 */
export declare function transformKeyValue<T>(kvp: T & KeyValue): T & ConfigurationSetting;
/**
 * @internal
 */
export declare function serializeAsConfigurationSettingParam(setting: ConfigurationSettingParam | ConfigurationSettingParam<FeatureFlagValue> | ConfigurationSettingParam<SecretReferenceValue>): ConfigurationSettingParam;
/**
 * @internal
 */
export declare function transformKeyValueResponseWithStatusCode<T extends KeyValue>(kvp: T, status: number | undefined): ConfigurationSetting & {
    eTag?: string;
} & HttpResponseFields;
/**
 * @internal
 */
export declare function transformKeyValueResponse<T extends KeyValue & {
    eTag?: string;
}>(kvp: T): ConfigurationSetting;
/**
 * @internal
 */
export declare function transformSnapshotResponse<T extends ConfigurationSnapshot>(snapshot: T): SnapshotResponse;
/**
 * Translates user-facing field names into their `select` equivalents (these can be
 * seen in the `KnownEnum5`)
 *
 * @param fieldNames - fieldNames from users.
 * @returns The field names translated into the `select` field equivalents.
 *
 * @internal
 */
export declare function formatFieldsForSelect(fieldNames: (keyof ConfigurationSetting)[] | undefined): string[] | undefined;
/**
 * @internal
 */
export declare function errorMessageForUnexpectedSetting(key: string, expectedType: "FeatureFlag" | "SecretReference"): string;
export declare function assertResponse<T extends object>(result: T): asserts result is T & HttpResponseField<any>;
export declare function hasUnderscoreResponse<T extends object>(result: T): result is T & HttpResponseField<any>;
/**
 * Get the scope for the App Configuration service based on the endpoint and audience.
 * If the audience is provided, it will be used as the scope.
 * If not, the scope is defaulted to Azure Public Cloud when not specified.
 *
 * @internal
 */
export declare function getScope(appConfigEndpoint: string, appConfigAudience?: string): string;
//# sourceMappingURL=helpers.d.ts.map