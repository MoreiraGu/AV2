import React, { useEffect, useState } from "react";
import { listarFuncionarios } from "../../services/funcionarioService";
import { Funcionario } from "../../context/AppContext"; // tipo do funcionário
import { useNavigate } from "react-router-dom";
import "../../styles/funcionario.css";

export default function ListarFuncionario() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const navigate = useNavigate();

  // Carregar funcionários da API ao montar o componente
  useEffect(() => {
    listarFuncionarios()
      .then(setFuncionarios)
      .catch(err => {
        console.error("Erro ao carregar funcionários:", err);
        alert("Erro ao carregar funcionários");
      });
  }, []);

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
            {funcionarios.map((f) => (
              <tr key={f.id}>
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
