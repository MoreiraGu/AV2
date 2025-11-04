import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

interface NavbarProps {
  titulo: string;
}

export default function Navbar({ titulo }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">{titulo}</div>
      <div className="navbar-links">
        <Link to="/aeronave" className="navbar-link">Aeronave</Link>
        <Link to="/funcionario" className="navbar-link">Funcionário</Link>
        <Link to="/relatorio" className="navbar-link">Relatório</Link>
        <button className="navbar-link logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
}