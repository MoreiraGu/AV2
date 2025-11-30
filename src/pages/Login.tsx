import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/login.css";

export default function Login() {
  const { setUsuarioLogado } = useContext(AppContext)!;
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!usuario || !senha) {
    alert("Preencha usuário e senha");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:3000/funcionarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, senha }),
    });

    if (!response.ok) {
      throw new Error("Usuário ou senha inválidos");
    }

    const data = await response.json();

    setUsuarioLogado(data.funcionario); // salva apenas o funcionário

    alert("Login bem-sucedido!");
    navigate("/aeronave");
  } catch (error: any) {
    alert(error.message || "Erro ao tentar fazer login");
  } finally {
    setLoading(false);
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
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}
