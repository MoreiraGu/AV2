import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../styles/funcionario.css";

export default function ListarFuncionario() {
  const { funcionarios } = useContext(AppContext)!;
  const navigate = useNavigate();

  return (
    <div className="funcionario-container">
      <h1>Lista de Funcionários</h1>

      {funcionarios.length === 0 ? (
        <p>Nenhum funcionário cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Usuário</th>
              <th>Nível de Permissão</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f, index) => (
              <tr key={index}>
                <td>{f.id}</td>
                <td>{f.nome}</td>
                <td>{f.telefone}</td>
                <td>{f.endereco}</td>
                <td>{f.usuario}</td>
                <td>{f.nivelPermissao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="botoes">
        <button onClick={() => navigate("/funcionario")}>Voltar ao Menu</button>
      </div>
    </div>
  );
}
