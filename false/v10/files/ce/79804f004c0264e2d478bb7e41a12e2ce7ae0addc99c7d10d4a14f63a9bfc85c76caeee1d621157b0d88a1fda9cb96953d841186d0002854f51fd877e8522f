import { type AddConfigurationSettingOptions, type AddConfigurationSettingParam, type AddConfigurationSettingResponse, type AppConfigurationClientOptions, type ConfigurationSetting, type ConfigurationSettingId, type CreateSnapshotOptions, type CreateSnapshotResponse, type DeleteConfigurationSettingOptions, type DeleteConfigurationSettingResponse, type GetConfigurationSettingOptions, type GetConfigurationSettingResponse, type GetSnapshotOptions, type GetSnapshotResponse, type ListConfigurationSettingPage, type ListConfigurationSettingsForSnapshotOptions, type ListConfigurationSettingsOptions, type ListLabelsOptions, type ListLabelsPage, type ListRevisionsOptions, type ListRevisionsPage, type ListSnapshotsOptions, type ListSnapshotsPage, type PageSettings, type SetConfigurationSettingOptions, type SetConfigurationSettingParam, type SetConfigurationSettingResponse, type SetReadOnlyOptions, type SetReadOnlyResponse, type SettingLabel, type SnapshotInfo, type UpdateSnapshotOptions, type UpdateSnapshotResponse } from "./models.js";
import type { ConfigurationSnapshot } from "./generated/src/models/index.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SyncTokens } from "./internal/synctokenpolicy.js";
import type { TokenCredential } from "@azure/core-auth";
import type { FeatureFlagValue } from "./featureFlag.js";
import type { SecretReferenceValue } from "./secretReference.js";
import type { OperationState, SimplePollerLike } from "@azure/core-lro";
/**
 * Provides internal configuration options for AppConfigurationClient.
 * @internal
 */
export interface InternalAppConfigurationClientOptions extends AppConfigurationClientOptions {
    /**
     * The sync token cache to use for this client.
     * NOTE: this is an internal option, not for general client usage.
     */
    syncTokens?: SyncTokens;
}
/**
 * Client for the Azure App Configuration service.
 */
export declare class AppConfigurationClient {
    private client;
    private _syncTokens;
    /**
     * Initializes a new instance of the AppConfigurationClient class.
     * @param options - Options for the AppConfigurationClient.
     */
    constructor(connectionString: string, options?: AppConfigurationClientOptions);
    /**
     * Initializes a new instance of the AppConfigurationClient class using
     * a TokenCredential.
     * @param endpoint - The endpoint of the App Configuration service (ex: https://sample.azconfig.io).
     * @param tokenCredential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
     * @param options - Options for the AppConfigurationClient.
     */
    constructor(endpoint: string, tokenCredential: TokenCredential, options?: AppConfigurationClientOptions);
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
    addConfigurationSetting(configurationSetting: AddConfigurationSettingParam | AddConfigurationSettingParam<FeatureFlagValue> | AddConfigurationSettingParam<SecretReferenceValue>, options?: AddConfigurationSettingOptions): Promise<AddConfigurationSettingResponse>;
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
    deleteConfigurationSetting(id: ConfigurationSettingId, options?: DeleteConfigurationSettingOptions): Promise<DeleteConfigurationSettingResponse>;
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
    getConfigurationSetting(id: ConfigurationSettingId, options?: GetConfigurationSettingOptions): Promise<GetConfigurationSettingResponse>;
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
    listConfigurationSettings(options?: ListConfigurationSettingsOptions): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage, PageSettings>;
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
    listConfigurationSettingsForSnapshot(snapshotName: string, options?: ListConfigurationSettingsForSnapshotOptions): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage, PageSettings>;
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
    listLabels(options?: ListLabelsOptions): PagedAsyncIterableIterator<SettingLabel, ListLabelsPage, PageSettings>;
    private sendLabelsRequest;
    private sendConfigurationSettingsRequest;
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
    listRevisions(options?: ListRevisionsOptions): PagedAsyncIterableIterator<ConfigurationSetting, ListRevisionsPage, PageSettings>;
    private sendRevisionsRequest;
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
    setConfigurationSetting(configurationSetting: SetConfigurationSettingParam | SetConfigurationSettingParam<FeatureFlagValue> | SetConfigurationSettingParam<SecretReferenceValue>, options?: SetConfigurationSettingOptions): Promise<SetConfigurationSettingResponse>;
    /**
     * Sets or clears a key's read-only status.
     * @param id - The id of the configuration setting to modify.
     */
    setReadOnly(id: ConfigurationSettingId, readOnly: boolean, options?: SetReadOnlyOptions): Promise<SetReadOnlyResponse>;
    /**
     * Adds an external synchronization token to ensure service requests receive up-to-date values.
     *
     * @param syncToken - The synchronization token value.
     */
    updateSyncToken(syncToken: string): void;
    /**
     * Begins creating a snapshot for Azure App Configuration service, fails if it
     * already exists.
     */
    beginCreateSnapshot(snapshot: SnapshotInfo, options?: CreateSnapshotOptions): Promise<SimplePollerLike<OperationState<CreateSnapshotResponse>, CreateSnapshotResponse>>;
    /**
     * Begins creating a snapshot for Azure App Configuration service, waits until it is done,
     * fails if it already exists.
     */
    beginCreateSnapshotAndWait(snapshot: SnapshotInfo, options?: CreateSnapshotOptions): Promise<CreateSnapshotResponse>;
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
    getSnapshot(name: string, options?: GetSnapshotOptions): Promise<GetSnapshotResponse>;
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
    recoverSnapshot(name: string, options?: UpdateSnapshotOptions): Promise<UpdateSnapshotResponse>;
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
    archiveSnapshot(name: string, options?: UpdateSnapshotOptions): Promise<UpdateSnapshotResponse>;
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
    listSnapshots(options?: ListSnapshotsOptions): PagedAsyncIterableIterator<ConfigurationSnapshot, ListSnapshotsPage, PageSettings>;
    private sendSnapShotsRequest;
}
//# sourceMappingURL=appConfigurationClient.d.ts.map