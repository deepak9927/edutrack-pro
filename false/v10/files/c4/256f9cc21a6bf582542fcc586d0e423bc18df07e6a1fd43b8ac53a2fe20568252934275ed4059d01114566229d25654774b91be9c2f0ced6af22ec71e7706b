// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getPagedAsyncIterator } from "@azure/core-paging";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { SyncTokens, syncTokenPolicy } from "./internal/synctokenpolicy.js";
import { isTokenCredential } from "@azure/core-auth";
import { assertResponse, checkAndFormatIfAndIfNoneMatch, extractAfterTokenFromLinkHeader, extractAfterTokenFromNextLink, formatAcceptDateTime, formatConfigurationSettingsFiltersAndSelect, formatFieldsForSelect, formatFiltersAndSelect, formatLabelsFiltersAndSelect, formatSnapshotFiltersAndSelect, getScope, makeConfigurationSettingEmpty, serializeAsConfigurationSettingParam, transformKeyValue, transformKeyValueResponse, transformKeyValueResponseWithStatusCode, transformSnapshotResponse, } from "./internal/helpers.js";
import { AppConfiguration } from "./generated/src/appConfiguration.js";
import { appConfigKeyCredentialPolicy } from "./appConfigCredential.js";
import { tracingClient } from "./internal/tracing.js";
import { logger } from "./logger.js";
import { appConfigurationApiVersion } from "./internal/constants.js";
const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;
const deserializationContentTypes = {
    json: [
        "application/vnd.microsoft.appconfig.kvset+json",
        "application/vnd.microsoft.appconfig.kv+json",
        "application/vnd.microsoft.appconfig.kvs+json",
        "application/vnd.microsoft.appconfig.keyset+json",
        "application/vnd.microsoft.appconfig.revs+json",
        "application/vnd.microsoft.appconfig.snapshotset+json",
        "application/vnd.microsoft.appconfig.snapshot+json",
        "application/vnd.microsoft.appconfig.labelset+json",
        "application/json",
    ],
};
/**
 * Client for the Azure App Configuration service.
 */
export class AppConfigurationClient {
    constructor(connectionStringOrEndpoint, tokenCredentialOrOptions, options) {
        var _a;
        let appConfigOptions = {};
        let appConfigCredential;
        let appConfigEndpoint;
        let authPolicy;
        let scope;
        if (isTokenCredential(tokenCredentialOrOptions)) {
            appConfigOptions = options || {};
            appConfigCredential = tokenCredentialOrOptions;
            appConfigEndpoint = connectionStringOrEndpoint.endsWith("/")
                ? connectionStringOrEndpoint.slice(0, -1)
                : connectionStringOrEndpoint;
            scope = getScope(appConfigEndpoint, appConfigOptions.audience);
            authPolicy = bearerTokenAuthenticationPolicy({
                scopes: scope,
                credential: appConfigCredential,
            });
        }
        else {
            appConfigOptions = tokenCredentialOrOptions || {};
            const regexMatch = connectionStringOrEndpoint === null || connectionStringOrEndpoint === void 0 ? void 0 : connectionStringOrEndpoint.match(ConnectionStringRegex);
            if (regexMatch) {
                appConfigEndpoint = regexMatch[1];
                authPolicy = appConfigKeyCredentialPolicy(regexMatch[2], regexMatch[3]);
            }
            else {
                throw new Error(`Invalid connection string. Valid connection strings should match the regex '${ConnectionStringRegex.source}'.` +
                    ` To mitigate the issue, please refer to the troubleshooting guide here at https://aka.ms/azsdk/js/app-configuration/troubleshoot.`);
            }
        }
        const internalClientPipelineOptions = Object.assign(Object.assign({}, appConfigOptions), { loggingOptions: {
                logger: logger.info,
            }, deserializationOptions: {
                expectedContentTypes: deserializationContentTypes,
            } });
        this._syncTokens = appConfigOptions.syncTokens || new SyncTokens();
        this.client = new AppConfiguration(appConfigEndpoint, (_a = options === null || options === void 0 ? void 0 : options.apiVersion) !== null && _a !== void 0 ? _a : appConfigurationApiVersion, internalClientPipelineOptions);
        this.client.pipeline.addPolicy(authPolicy, { phase: "Sign" });
        this.client.pipeline.addPolicy(syncTokenPolicy(this._syncTokens), { afterPhase: "Retry" });
    }
    /**
     * Add a setting into the Azure App Configuration service, failing if it
     * already exists.
     *
     * Example usage:
     * ```ts snippet:AddConfigurationSetting
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const result = await client.addConfigurationSetting({
     *   key: "MyKey",
     *   label: "MyLabel",
     *   value: "MyValue",
     * });
     * ```
     * @param configurationSetting - A configuration setting.
     * @param options - Optional parameters for the request.
     */
    addConfigurationSetting(configurationSetting, options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.addConfigurationSetting", options, async (updatedOptions) => {
            const keyValue = serializeAsConfigurationSettingParam(configurationSetting);
            logger.info("[addConfigurationSetting] Creating a key value pair");
            try {
                const originalResponse = await this.client.putKeyValue(configurationSetting.key, Object.assign({ ifNoneMatch: "*", label: configurationSetting.label, entity: keyValue }, updatedOptions));
                const response = transformKeyValueResponse(originalResponse);
                assertResponse(response);
                return response;
            }
            catch (error) {
                const err = error;
                // Service does not return an error message. Raise a 412 error similar to .NET
                if (err.statusCode === 412) {
                    err.message = `Status 412: Setting was already present`;
                }
                throw err;
            }
            throw new Error("Unreachable code");
        });
    }
    /**
     * Delete a setting from the Azure App Configuration service
     *
     * Example usage:
     * ```ts snippet:DeleteConfigurationSetting
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const deletedSetting = await client.deleteConfigurationSetting({
     *   key: "MyKey",
     *   label: "MyLabel",
     * });
     * ```
     * @param id - The id of the configuration setting to delete.
     * @param options - Optional parameters for the request (ex: etag, label)
     */
    deleteConfigurationSetting(id, options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.deleteConfigurationSetting", options, async (updatedOptions) => {
            let status;
            logger.info("[deleteConfigurationSetting] Deleting key value pair");
            const originalResponse = await this.client.deleteKeyValue(id.key, Object.assign(Object.assign(Object.assign({ label: id.label }, updatedOptions), checkAndFormatIfAndIfNoneMatch(id, options)), { onResponse: (response) => {
                    status = response.status;
                } }));
            const response = transformKeyValueResponseWithStatusCode(originalResponse, status);
            assertResponse(response);
            return response;
        });
    }
    /**
     * Gets a setting from the Azure App Configuration service.
     *
     * Example code:
     * ```ts snippet:GetConfigurationSetting
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const setting = await client.getConfigurationSetting({ key: "MyKey", label: "MyLabel" });
     * ```
     * @param id - The id of the configuration setting to get.
     * @param options - Optional parameters for the request.
     */
    async getConfigurationSetting(id, options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.getConfigurationSetting", options, async (updatedOptions) => {
            let status;
            logger.info("[getConfigurationSetting] Getting key value pair");
            const originalResponse = await this.client.getKeyValue(id.key, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, updatedOptions), { label: id.label, select: formatFieldsForSelect(options.fields) }), formatAcceptDateTime(options)), checkAndFormatIfAndIfNoneMatch(id, options)), { onResponse: (response) => {
                    status = response.status;
                } }));
            const response = transformKeyValueResponseWithStatusCode(originalResponse, status);
            // 304 only comes back if the user has passed a conditional option in their
            // request _and_ the remote object has the same etag as what the user passed.
            if (response.statusCode === 304) {
                // this is one of our few 'required' fields so we'll make sure it does get initialized
                // with a value
                response.key = id.key;
                // and now we'll undefine all the other properties that are not HTTP related
                makeConfigurationSettingEmpty(response);
            }
            assertResponse(response);
            return response;
        });
    }
    /**
     * Lists settings from the Azure App Configuration service, optionally
     * filtered by key names, labels and accept datetime.
     *
     * Example code:
     * ```ts snippet:ListConfigurationSettings
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const allSettingsWithLabel = client.listConfigurationSettings({ labelFilter: "MyLabel" });
     * ```
     * @param options - Optional parameters for the request.
     */
    listConfigurationSettings(options = {}) {
        const pageEtags = options.pageEtags ? [...options.pageEtags] : undefined;
        delete options.pageEtags;
        const pagedResult = {
            firstPageLink: undefined,
            getPage: async (pageLink) => {
                var _a, _b, _c;
                const etag = pageEtags === null || pageEtags === void 0 ? void 0 : pageEtags.shift();
                try {
                    const response = await this.sendConfigurationSettingsRequest(Object.assign(Object.assign({}, options), { etag }), pageLink);
                    const currentResponse = Object.assign(Object.assign({}, response), { items: response.items != null ? (_a = response.items) === null || _a === void 0 ? void 0 : _a.map(transformKeyValue) : [], continuationToken: response.nextLink
                            ? extractAfterTokenFromNextLink(response.nextLink)
                            : undefined, _response: response._response });
                    return {
                        page: currentResponse,
                        nextPageLink: currentResponse.continuationToken,
                    };
                }
                catch (error) {
                    const err = error;
                    const link = (_c = (_b = err.response) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.get("link");
                    const continuationToken = link ? extractAfterTokenFromLinkHeader(link) : undefined;
                    if (err.statusCode === 304) {
                        err.message = `Status 304: No updates for this page`;
                        logger.info(`[listConfigurationSettings] No updates for this page. The current etag for the page is ${etag}`);
                        return {
                            page: {
                                items: [],
                                etag,
                                _response: Object.assign(Object.assign({}, err.response), { status: 304 }),
                            },
                            nextPageLink: continuationToken,
                        };
                    }
                    throw err;
                }
            },
            toElements: (page) => page.items,
        };
        return getPagedAsyncIterator(pagedResult);
    }
    /**
     * Lists settings from the Azure App Configuration service for snapshots based on name, optionally
     * filtered by key names, labels and accept datetime.
     *
     * Example code:
     * ```ts snippet:ListConfigurationSettingsForSnashots
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const allSettingsWithLabel = client.listConfigurationSettingsForSnashots({
     *   snapshotName: "MySnapshot",
     * });
     * ```
     * @param options - Optional parameters for the request.
     */
    listConfigurationSettingsForSnapshot(snapshotName, options = {}) {
        const pagedResult = {
            firstPageLink: undefined,
            getPage: async (pageLink) => {
                var _a;
                const response = await this.sendConfigurationSettingsRequest(Object.assign({ snapshotName }, options), pageLink);
                const currentResponse = Object.assign(Object.assign({}, response), { items: response.items != null ? (_a = response.items) === null || _a === void 0 ? void 0 : _a.map(transformKeyValue) : [], continuationToken: response.nextLink
                        ? extractAfterTokenFromNextLink(response.nextLink)
                        : undefined });
                return {
                    page: currentResponse,
                    nextPageLink: currentResponse.continuationToken,
                };
            },
            toElements: (page) => page.items,
        };
        return getPagedAsyncIterator(pagedResult);
    }
    /**
     * Get a list of labels from the Azure App Configuration service
     *
     * Example code:
     * ```ts snippet:ListLabels
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const allSettingsWithLabel = client.listLabels({ nameFilter: "prod*" });
     * ```
     * @param options - Optional parameters for the request.
     */
    listLabels(options = {}) {
        const pagedResult = {
            firstPageLink: undefined,
            getPage: async (pageLink) => {
                var _a;
                const response = await this.sendLabelsRequest(options, pageLink);
                const currentResponse = Object.assign(Object.assign({}, response), { items: (_a = response.items) !== null && _a !== void 0 ? _a : [], continuationToken: response.nextLink
                        ? extractAfterTokenFromNextLink(response.nextLink)
                        : undefined, _response: response._response });
                return {
                    page: currentResponse,
                    nextPageLink: currentResponse.continuationToken,
                };
            },
            toElements: (page) => page.items,
        };
        return getPagedAsyncIterator(pagedResult);
    }
    async sendLabelsRequest(options = {}, pageLink) {
        return tracingClient.withSpan("AppConfigurationClient.listConfigurationSettings", options, async (updatedOptions) => {
            const response = await this.client.getLabels(Object.assign(Object.assign(Object.assign(Object.assign({}, updatedOptions), formatAcceptDateTime(options)), formatLabelsFiltersAndSelect(options)), { after: pageLink }));
            return response;
        });
    }
    async sendConfigurationSettingsRequest(options = {}, pageLink) {
        return tracingClient.withSpan("AppConfigurationClient.listConfigurationSettings", options, async (updatedOptions) => {
            const response = await this.client.getKeyValues(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, updatedOptions), formatAcceptDateTime(options)), formatConfigurationSettingsFiltersAndSelect(options)), checkAndFormatIfAndIfNoneMatch({ etag: options.etag }, { onlyIfChanged: true })), { after: pageLink }));
            return response;
        });
    }
    /**
     * Lists revisions of a set of keys, optionally filtered by key names,
     * labels and accept datetime.
     *
     * Example code:
     * ```ts snippet:ListRevisions
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const revisionsIterator = client.listRevisions({ keys: ["MyKey"] });
     * ```
     * @param options - Optional parameters for the request.
     */
    listRevisions(options) {
        const pagedResult = {
            firstPageLink: undefined,
            getPage: async (pageLink) => {
                const response = await this.sendRevisionsRequest(options, pageLink);
                const currentResponse = Object.assign(Object.assign({}, response), { items: response.items != null ? response.items.map(transformKeyValue) : [], continuationToken: response.nextLink
                        ? extractAfterTokenFromNextLink(response.nextLink)
                        : undefined });
                // let itemList = currentResponse.items;
                return {
                    page: currentResponse,
                    nextPageLink: currentResponse.continuationToken,
                };
            },
            toElements: (page) => page.items,
        };
        return getPagedAsyncIterator(pagedResult);
    }
    async sendRevisionsRequest(options = {}, pageLink) {
        return tracingClient.withSpan("AppConfigurationClient.listRevisions", options, async (updatedOptions) => {
            const response = await this.client.getRevisions(Object.assign(Object.assign(Object.assign(Object.assign({}, updatedOptions), formatAcceptDateTime(options)), formatFiltersAndSelect(updatedOptions)), { after: pageLink }));
            return response;
        });
    }
    /**
     * Sets the value of a key in the Azure App Configuration service, allowing for an optional etag.
     * @param key - The name of the key.
     * @param configurationSetting - A configuration value.
     * @param options - Optional parameters for the request.
     *
     * Example code:
     * ```ts snippet:SetConfigurationSetting
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * await client.setConfigurationSetting({ key: "MyKey", value: "MyValue" });
     * ```
     */
    async setConfigurationSetting(configurationSetting, options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.setConfigurationSetting", options, async (updatedOptions) => {
            const keyValue = serializeAsConfigurationSettingParam(configurationSetting);
            logger.info("[setConfigurationSetting] Setting new key value");
            const response = transformKeyValueResponse(await this.client.putKeyValue(configurationSetting.key, Object.assign(Object.assign(Object.assign({}, updatedOptions), { label: configurationSetting.label, entity: keyValue }), checkAndFormatIfAndIfNoneMatch(configurationSetting, options))));
            assertResponse(response);
            return response;
        });
    }
    /**
     * Sets or clears a key's read-only status.
     * @param id - The id of the configuration setting to modify.
     */
    async setReadOnly(id, readOnly, options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.setReadOnly", options, async (newOptions) => {
            let response;
            if (readOnly) {
                logger.info("[setReadOnly] Setting read-only status to ${readOnly}");
                response = await this.client.putLock(id.key, Object.assign(Object.assign(Object.assign({}, newOptions), { label: id.label }), checkAndFormatIfAndIfNoneMatch(id, options)));
            }
            else {
                logger.info("[setReadOnly] Deleting read-only lock");
                response = await this.client.deleteLock(id.key, Object.assign(Object.assign(Object.assign({}, newOptions), { label: id.label }), checkAndFormatIfAndIfNoneMatch(id, options)));
            }
            response = transformKeyValueResponse(response);
            assertResponse(response);
            return response;
        });
    }
    /**
     * Adds an external synchronization token to ensure service requests receive up-to-date values.
     *
     * @param syncToken - The synchronization token value.
     */
    updateSyncToken(syncToken) {
        this._syncTokens.addSyncTokenFromHeaderValue(syncToken);
    }
    /**
     * Begins creating a snapshot for Azure App Configuration service, fails if it
     * already exists.
     */
    beginCreateSnapshot(snapshot, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return tracingClient.withSpan(`${AppConfigurationClient.name}.beginCreateSnapshot`, options, (updatedOptions) => this.client.beginCreateSnapshot(snapshot.name, snapshot, Object.assign({}, updatedOptions)));
    }
    /**
     * Begins creating a snapshot for Azure App Configuration service, waits until it is done,
     * fails if it already exists.
     */
    beginCreateSnapshotAndWait(snapshot, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return tracingClient.withSpan(`${AppConfigurationClient.name}.beginCreateSnapshotAndWait`, options, (updatedOptions) => this.client.beginCreateSnapshotAndWait(snapshot.name, snapshot, Object.assign({}, updatedOptions)));
    }
    /**
     * Get a snapshot from Azure App Configuration service
     *
     * Example usage:
     * ```ts snippet:GetSnapshot
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const retrievedSnapshot = await client.getSnapshot("testsnapshot");
     * console.log("Retrieved snapshot:", retrievedSnapshot);
     * ```
     * @param name - The name of the snapshot.
     * @param options - Optional parameters for the request.
     */
    getSnapshot(name, options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.getSnapshot", options, async (updatedOptions) => {
            logger.info("[getSnapshot] Get a snapshot");
            const originalResponse = await this.client.getSnapshot(name, Object.assign({}, updatedOptions));
            const response = transformSnapshotResponse(originalResponse);
            assertResponse(response);
            return response;
        });
    }
    /**
     * Recover an archived snapshot back to ready status
     *
     * Example usage:
     * ```ts snippet:RecoverSnapshot
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const result = await client.recoverSnapshot("MySnapshot");
     * ```
     * @param name - The name of the snapshot.
     * @param options - Optional parameters for the request.
     */
    recoverSnapshot(name, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.recoverSnapshot", options, async (updatedOptions) => {
            logger.info("[recoverSnapshot] Recover a snapshot");
            const originalResponse = await this.client.updateSnapshot(name, { status: "ready" }, Object.assign(Object.assign({}, updatedOptions), checkAndFormatIfAndIfNoneMatch({ etag: options.etag }, Object.assign({ onlyIfUnchanged: true }, options))));
            const response = transformSnapshotResponse(originalResponse);
            assertResponse(response);
            return response;
        });
    }
    /**
     * Archive a ready snapshot
     *
     * Example usage:
     * ```ts snippet:ArchiveSnapshot
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const result = await client.archiveSnapshot({ name: "MySnapshot" });
     * ```
     * @param name - The name of the snapshot.
     * @param options - Optional parameters for the request.
     */
    archiveSnapshot(name, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return tracingClient.withSpan("AppConfigurationClient.archiveSnapshot", options, async (updatedOptions) => {
            logger.info("[archiveSnapshot] Archive a snapshot");
            const originalResponse = await this.client.updateSnapshot(name, { status: "archived" }, Object.assign(Object.assign({}, updatedOptions), checkAndFormatIfAndIfNoneMatch({ etag: options.etag }, Object.assign({ onlyIfUnchanged: true }, options))));
            const response = transformSnapshotResponse(originalResponse);
            assertResponse(response);
            return response;
        });
    }
    /**
     * List all snapshots from Azure App Configuration service
     *
     * Example usage:
     * ```ts snippet:ListSnapshots
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AppConfigurationClient } from "@azure/app-configuration";
     *
     * // The endpoint for your App Configuration resource
     * const endpoint = "https://example.azconfig.io";
     * const credential = new DefaultAzureCredential();
     * const client = new AppConfigurationClient(endpoint, credential);
     *
     * const snapshots = await client.listSnapshots();
     *
     * for await (const snapshot of snapshots) {
     *   console.log(`Found snapshot: ${snapshot.name}`);
     * }
     * ```
     * @param options - Optional parameters for the request.
     */
    listSnapshots(options = {}) {
        const pagedResult = {
            firstPageLink: undefined,
            getPage: async (pageLink) => {
                const response = await this.sendSnapShotsRequest(options, pageLink);
                const currentResponse = Object.assign(Object.assign({}, response), { items: response.items != null ? response.items : [], continuationToken: response.nextLink
                        ? extractAfterTokenFromNextLink(response.nextLink)
                        : undefined });
                return {
                    page: currentResponse,
                    nextPageLink: currentResponse.continuationToken,
                };
            },
            toElements: (page) => page.items,
        };
        return getPagedAsyncIterator(pagedResult);
    }
    async sendSnapShotsRequest(options = {}, pageLink) {
        return tracingClient.withSpan("AppConfigurationClient.listSnapshots", options, async (updatedOptions) => {
            const response = await this.client.getSnapshots(Object.assign(Object.assign(Object.assign({}, updatedOptions), formatSnapshotFiltersAndSelect(options)), { after: pageLink }));
            return response;
        });
    }
}
//# sourceMappingURL=appConfigurationClient.js.map