export interface ContainerProps {
    ID: string;
    nome: string;
    imagem: string;
    status: string;
    onStart: (ID: string) => void;
    onStop: (ID: string) => void;
    onRemove: (ID: string) => void;
}