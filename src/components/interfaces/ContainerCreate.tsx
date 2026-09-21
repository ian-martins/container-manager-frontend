export interface UsuariosProps {
    detached: boolean;
    interactive: boolean;
    remove: boolean;
    tty: boolean;
    save: boolean;

    name: string;
    cpus: string;
    memory: string;
    timeout: string;
    signal: string;

    environments: string[];
    ports: string[];
    volumes: string[];
    mounts: string[];

    image: string;
}

export default UsuariosProps 

