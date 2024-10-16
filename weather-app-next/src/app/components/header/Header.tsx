import { useRouter } from "next/router"; // Importando useRouter
import { useUserContext } from "../../../context/UserContext"; // Importando o hook customizado
import {
    StyledHeader,
    StyledUserData,
    StyledUserDataButton,
} from "./Header.style";

interface HeaderProps {
    title: string;
    userName: string;
}

export const Header = ({ title, userName }: HeaderProps) => {
    const router = useRouter();
    const { setUserName } = useUserContext();
    const handleLogin = () => {
        router.push("/login");
    };

    const handleLogout = () => {
        sessionStorage.removeItem("userToken");
        setUserName("");
        router.push("/login");
    };

    return (
        <StyledHeader>
            <h1>{title}</h1>
            <div>
                {userName ? (
                    <StyledUserData>
                        <span>{userName}</span>
                        <StyledUserDataButton onClick={handleLogout}>
                            Sair
                        </StyledUserDataButton>
                    </StyledUserData>
                ) : (
                    <StyledUserDataButton onClick={handleLogin}>
                        Login
                    </StyledUserDataButton>
                )}
            </div>
        </StyledHeader>
    );
};
