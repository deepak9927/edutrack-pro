import type { ConfigurationSetting, ConfigurationSettingParam } from "./models.js";
/**
 * content-type for the secret reference.
 */
export declare const secretReferenceContentType = "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8";
/**
 * Necessary fields for updating or creating a new secret reference.
 */
export interface SecretReferenceValue {
    /**
     * Id for the secret reference.
     */
    secretId: string;
}
/**
 * @internal
 */
export declare const SecretReferenceHelper: {
    /**
     * Takes the SecretReference (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
     */
    toConfigurationSettingParam: (secretReference: ConfigurationSettingParam<SecretReferenceValue>) => ConfigurationSettingParam;
};
/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<SecretReferenceValue> by parsing the value string.
 */
export declare function parseSecretReference(setting: ConfigurationSetting): ConfigurationSetting<SecretReferenceValue>;
/**
 * Lets you know if the ConfigurationSetting is a secret reference.
 *
 * [Checks if the content type is secretReferenceContentType `"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8"`]
 */
export declare function isSecretReference(setting: ConfigurationSetting): setting is ConfigurationSetting & Required<Pick<ConfigurationSetting, "value">>;
//# sourceMappingURL=secretReference.d.ts.map