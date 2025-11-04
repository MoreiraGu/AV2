import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/login.css";

export default function Login() {
  const { setUsuarioLogado } = useContext(AppContext)!;
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (usuario === "admin" && senha === "admin") {
      setUsuarioLogado({
        id: "0",
        nome: "Admin",
        telefone: "",
        endereco: "",
        usuario,
        senha,
        nivelPermissao: "ADMINISTRADOR",
      });
      alert("Login bem-sucedido!");
      navigate("/aeronave");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div>
      <header className="login-navbar">
        <h1 className="login-navbar-title">AeroCode</h1>
      </header>

      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <input
          className="login-input"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}