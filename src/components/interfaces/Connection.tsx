export interface Connection {
    id: string;
    desc: string;
    host: string;
    port: number;
    wsl: boolean;
    active: boolean;
}