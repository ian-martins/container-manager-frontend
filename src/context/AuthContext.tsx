import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface AuthContextData {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    function login(token: string) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: token !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser utilizado dentro de AuthProvider"
        );
    }

    return context;
}