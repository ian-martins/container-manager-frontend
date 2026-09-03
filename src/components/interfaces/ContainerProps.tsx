export interface ContainerProps {
    ID: string;
    Names: string;
    Image: string;
    Status: string;
    onStart: (ID: string) => void;
    onStop: (ID: string) => void;
    onRemove: (ID: string) => void;
    onEdit: (ID: string) => void;
    children?: React.ReactNode;
}