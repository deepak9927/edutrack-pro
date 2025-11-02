import type { ConfigurationSetting, ConfigurationSettingParam } from "./models.js";
/**
 * The prefix for feature flags.
 */
export declare const featureFlagPrefix = ".appconfig.featureflag/";
/**
 * The content type for a FeatureFlag
 */
export declare const featureFlagContentType = "application/vnd.microsoft.appconfig.ff+json;charset=utf-8";
/**
 * Value of a feature flag
 */
export interface FeatureFlagValue {
    /**
     * Id for the feature flag.
     */
    id?: string;
    /**
     * A Feature filter consistently evaluates the state of a feature flag.
     * Our feature management library supports three types of built-in filters: Targeting, TimeWindow, and Percentage.
     * Custom filters can also be created based on different factors, such as device used, browser types, geographic location, etc.
     *
     * [More Info](https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
     */
    conditions: {
        clientFilters: {
            name: string;
            parameters?: Record<string, unknown>;
        }[];
    };
    /**
     * Description of the feature.
     */
    description?: string;
    /**
     * Boolean flag to say if the feature flag is enabled.
     */
    enabled: boolean;
    /**
     * Display name for the feature to use for display rather than the ID.
     */
    displayName?: string;
}
/**
 * @internal
 */
export declare const FeatureFlagHelper: {
    /**
     * Takes the FeatureFlag (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
     */
    toConfigurationSettingParam: (featureFlag: ConfigurationSettingParam<FeatureFlagValue>) => ConfigurationSettingParam;
};
/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<FeatureFlagValue> by parsing the value string.
 */
export declare function parseFeatureFlag(setting: ConfigurationSetting): ConfigurationSetting<FeatureFlagValue>;
/**
 * Lets you know if the ConfigurationSetting is a feature flag.
 *
 * [Checks if the content type is featureFlagContentType `"application/vnd.microsoft.appconfig.ff+json;charset=utf-8"`]
 */
export declare function isFeatureFlag(setting: ConfigurationSetting): setting is ConfigurationSetting & Required<Pick<ConfigurationSetting, "value">>;
//# sourceMappingURL=featureFlag.d.ts.map