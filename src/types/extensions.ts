
export type ExtensionConfiguration = {
    author: string;
    version: string;
    name: string;
    description: string;
    permissions?: {
        files?: {
            read: boolean,
            write?: boolean
        }
    };
    source: string;
    enabled: boolean;
    loadOrder?: number;
}