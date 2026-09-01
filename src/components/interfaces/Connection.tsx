export interface Connection {
    id:   string;
    name: string;
    host: string;
    port: string;
    wsl: boolean;
    active: boolean;
}