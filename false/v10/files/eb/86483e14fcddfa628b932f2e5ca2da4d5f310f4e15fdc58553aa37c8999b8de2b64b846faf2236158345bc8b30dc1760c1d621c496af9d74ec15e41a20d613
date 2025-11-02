import * as coreHttpCompat from "@azure/core-http-compat";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ApiVersion20231101, AppConfigurationOptionalParams, GetKeysOptionalParams, GetKeysResponse, CheckKeysOptionalParams, CheckKeysResponse, GetKeyValuesOptionalParams, GetKeyValuesResponse, CheckKeyValuesOptionalParams, CheckKeyValuesResponse, GetKeyValueOptionalParams, GetKeyValueResponse, PutKeyValueOptionalParams, PutKeyValueResponse, DeleteKeyValueOptionalParams, DeleteKeyValueResponse, CheckKeyValueOptionalParams, CheckKeyValueResponse, GetSnapshotsOptionalParams, GetSnapshotsResponse, CheckSnapshotsOptionalParams, CheckSnapshotsResponse, GetSnapshotOptionalParams, GetSnapshotResponse, ConfigurationSnapshot, CreateSnapshotOptionalParams, CreateSnapshotResponse, SnapshotUpdateParameters, UpdateSnapshotOptionalParams, UpdateSnapshotResponse, CheckSnapshotOptionalParams, CheckSnapshotResponse, GetLabelsOptionalParams, GetLabelsResponse, CheckLabelsOptionalParams, CheckLabelsResponse, PutLockOptionalParams, PutLockResponse, DeleteLockOptionalParams, DeleteLockResponse, GetRevisionsOptionalParams, GetRevisionsResponse, CheckRevisionsOptionalParams, CheckRevisionsResponse, GetOperationDetailsOptionalParams, GetOperationDetailsResponse, GetKeysNextOptionalParams, GetKeysNextResponse, GetKeyValuesNextOptionalParams, GetKeyValuesNextResponse, GetSnapshotsNextOptionalParams, GetSnapshotsNextResponse, GetLabelsNextOptionalParams, GetLabelsNextResponse, GetRevisionsNextOptionalParams, GetRevisionsNextResponse } from "./models/index.js";
/** @internal */
export declare class AppConfiguration extends coreHttpCompat.ExtendedServiceClient {
    endpoint: string;
    syncToken?: string;
    apiVersion: ApiVersion20231101;
    /**
     * Initializes a new instance of the AppConfiguration class.
     * @param endpoint The endpoint of the App Configuration instance to send requests to.
     * @param apiVersion Api Version
     * @param options The parameter options
     */
    constructor(endpoint: string, apiVersion: ApiVersion20231101, options?: AppConfigurationOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    /**
     * Gets a list of keys.
     * @param options The options parameters.
     */
    getKeys(options?: GetKeysOptionalParams): Promise<GetKeysResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param options The options parameters.
     */
    checkKeys(options?: CheckKeysOptionalParams): Promise<CheckKeysResponse>;
    /**
     * Gets a list of key-values.
     * @param options The options parameters.
     */
    getKeyValues(options?: GetKeyValuesOptionalParams): Promise<GetKeyValuesResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param options The options parameters.
     */
    checkKeyValues(options?: CheckKeyValuesOptionalParams): Promise<CheckKeyValuesResponse>;
    /**
     * Gets a single key-value.
     * @param key The key of the key-value to retrieve.
     * @param options The options parameters.
     */
    getKeyValue(key: string, options?: GetKeyValueOptionalParams): Promise<GetKeyValueResponse>;
    /**
     * Creates a key-value.
     * @param key The key of the key-value to create.
     * @param options The options parameters.
     */
    putKeyValue(key: string, options?: PutKeyValueOptionalParams): Promise<PutKeyValueResponse>;
    /**
     * Deletes a key-value.
     * @param key The key of the key-value to delete.
     * @param options The options parameters.
     */
    deleteKeyValue(key: string, options?: DeleteKeyValueOptionalParams): Promise<DeleteKeyValueResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param key The key of the key-value to retrieve.
     * @param options The options parameters.
     */
    checkKeyValue(key: string, options?: CheckKeyValueOptionalParams): Promise<CheckKeyValueResponse>;
    /**
     * Gets a list of key-value snapshots.
     * @param options The options parameters.
     */
    getSnapshots(options?: GetSnapshotsOptionalParams): Promise<GetSnapshotsResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param options The options parameters.
     */
    checkSnapshots(options?: CheckSnapshotsOptionalParams): Promise<CheckSnapshotsResponse>;
    /**
     * Gets a single key-value snapshot.
     * @param name The name of the key-value snapshot to retrieve.
     * @param options The options parameters.
     */
    getSnapshot(name: string, options?: GetSnapshotOptionalParams): Promise<GetSnapshotResponse>;
    /**
     * Creates a key-value snapshot.
     * @param name The name of the key-value snapshot to create.
     * @param entity The key-value snapshot to create.
     * @param options The options parameters.
     */
    beginCreateSnapshot(name: string, entity: ConfigurationSnapshot, options?: CreateSnapshotOptionalParams): Promise<SimplePollerLike<OperationState<CreateSnapshotResponse>, CreateSnapshotResponse>>;
    /**
     * Creates a key-value snapshot.
     * @param name The name of the key-value snapshot to create.
     * @param entity The key-value snapshot to create.
     * @param options The options parameters.
     */
    beginCreateSnapshotAndWait(name: string, entity: ConfigurationSnapshot, options?: CreateSnapshotOptionalParams): Promise<CreateSnapshotResponse>;
    /**
     * Updates the state of a key-value snapshot.
     * @param name The name of the key-value snapshot to update.
     * @param entity The parameters used to update the snapshot.
     * @param options The options parameters.
     */
    updateSnapshot(name: string, entity: SnapshotUpdateParameters, options?: UpdateSnapshotOptionalParams): Promise<UpdateSnapshotResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param name The name of the key-value snapshot to check.
     * @param options The options parameters.
     */
    checkSnapshot(name: string, options?: CheckSnapshotOptionalParams): Promise<CheckSnapshotResponse>;
    /**
     * Gets a list of labels.
     * @param options The options parameters.
     */
    getLabels(options?: GetLabelsOptionalParams): Promise<GetLabelsResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param options The options parameters.
     */
    checkLabels(options?: CheckLabelsOptionalParams): Promise<CheckLabelsResponse>;
    /**
     * Locks a key-value.
     * @param key The key of the key-value to lock.
     * @param options The options parameters.
     */
    putLock(key: string, options?: PutLockOptionalParams): Promise<PutLockResponse>;
    /**
     * Unlocks a key-value.
     * @param key The key of the key-value to unlock.
     * @param options The options parameters.
     */
    deleteLock(key: string, options?: DeleteLockOptionalParams): Promise<DeleteLockResponse>;
    /**
     * Gets a list of key-value revisions.
     * @param options The options parameters.
     */
    getRevisions(options?: GetRevisionsOptionalParams): Promise<GetRevisionsResponse>;
    /**
     * Requests the headers and status of the given resource.
     * @param options The options parameters.
     */
    checkRevisions(options?: CheckRevisionsOptionalParams): Promise<CheckRevisionsResponse>;
    /**
     * Gets the state of a long running operation.
     * @param snapshot Snapshot identifier for the long running operation.
     * @param options The options parameters.
     */
    getOperationDetails(snapshot: string, options?: GetOperationDetailsOptionalParams): Promise<GetOperationDetailsResponse>;
    /**
     * GetKeysNext
     * @param nextLink The nextLink from the previous successful call to the GetKeys method.
     * @param options The options parameters.
     */
    getKeysNext(nextLink: string, options?: GetKeysNextOptionalParams): Promise<GetKeysNextResponse>;
    /**
     * GetKeyValuesNext
     * @param nextLink The nextLink from the previous successful call to the GetKeyValues method.
     * @param options The options parameters.
     */
    getKeyValuesNext(nextLink: string, options?: GetKeyValuesNextOptionalParams): Promise<GetKeyValuesNextResponse>;
    /**
     * GetSnapshotsNext
     * @param nextLink The nextLink from the previous successful call to the GetSnapshots method.
     * @param options The options parameters.
     */
    getSnapshotsNext(nextLink: string, options?: GetSnapshotsNextOptionalParams): Promise<GetSnapshotsNextResponse>;
    /**
     * GetLabelsNext
     * @param nextLink The nextLink from the previous successful call to the GetLabels method.
     * @param options The options parameters.
     */
    getLabelsNext(nextLink: string, options?: GetLabelsNextOptionalParams): Promise<GetLabelsNextResponse>;
    /**
     * GetRevisionsNext
     * @param nextLink The nextLink from the previous successful call to the GetRevisions method.
     * @param options The options parameters.
     */
    getRevisionsNext(nextLink: string, options?: GetRevisionsNextOptionalParams): Promise<GetRevisionsNextResponse>;
}
//# sourceMappingURL=appConfiguration.d.ts.map