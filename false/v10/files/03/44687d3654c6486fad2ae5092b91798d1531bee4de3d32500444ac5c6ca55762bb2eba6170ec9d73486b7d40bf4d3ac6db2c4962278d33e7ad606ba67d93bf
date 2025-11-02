import type { PipelinePolicy } from "@azure/core-rest-pipeline";
/**
 * The sync token header, as described here:
 * https://learn.microsoft.com/azure/azure-app-configuration/rest-api-consistency
 * @internal
 */
export declare const SyncTokenHeaderName = "sync-token";
/**
 * A policy factory for injecting sync tokens properly into outgoing requests.
 * @param syncTokens - the sync tokens store to be used across requests.
 * @internal
 */
export declare function syncTokenPolicy(syncTokens: SyncTokens): PipelinePolicy;
/**
 * Sync token tracker (allows for real-time consistency, even in the face of
 * caching and load balancing within App Configuration).
 *
 * (protocol and format described here)
 * https://learn.microsoft.com/azure/azure-app-configuration/rest-api-consistency
 *
 * @internal
 */
export declare class SyncTokens {
    private _currentSyncTokens;
    /**
     * Takes the value from the header named after the constant `SyncTokenHeaderName`
     * and adds it to our list of accumulated sync tokens.
     *
     * If given an empty value (or undefined) it clears the current list of sync tokens.
     * (indicates the service has properly absorbed values into the cluster).
     *
     * @param syncTokenHeaderValue - The full value of the sync token header.
     */
    addSyncTokenFromHeaderValue(syncTokenHeaderValue: string | undefined): void;
    /**
     * Gets a properly formatted SyncToken header value.
     */
    getSyncTokenHeaderValue(): string | undefined;
}
interface SyncToken {
    id: string;
    value: string;
    sequenceNumber: number;
}
/**
 * Parses a single sync token into it's constituent parts.
 *
 * @param syncToken - A single sync token.
 *
 * @internal
 */
export declare function parseSyncToken(syncToken: string): SyncToken;
export {};
//# sourceMappingURL=synctokenpolicy.d.ts.map