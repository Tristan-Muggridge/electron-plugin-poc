
export type ExtensionConfiguration = {
    author: string;
    version: string;
    name: string;
    description: string;
    permissions: ExtensionPermissions[];
    source: string;
    enabled: boolean;
    loadOrder?: number;
}

export enum ExtensionPermissions {
    FILE_READ,
    FILE_WRITE,
}
