import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import UserContext from "../../../context/UserContext"; // Corrigido o nom

export default function Login() {
  const { setUserName } = useContext(UserContext);
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSendLogin = async (params: object) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (data) {
        sessionStorage.setItem("userToken", JSON.stringify(data));
        const userData = jwtDecode(data.token);
        setUserName(userData.name);
        
        // Alteração aqui
        router.push("/perfil"); // Usando o router do Next.js
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      console.log("finally");
    }
  };

  const handleClick = () => {
    const params = {
      login: login,
      password: password,
    };

    handleSendLogin(params);
  };

  return (
    <>
        <h1>Login</h1>
        <form>
            
        </form>
    </>

  );
}
