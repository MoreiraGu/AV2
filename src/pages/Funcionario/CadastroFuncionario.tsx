import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Funcionario } from "../../context/AppContext";
import "../../styles/funcionario.css";

export default function CadastroFuncionario() {
  const { addFuncionario } = useContext(AppContext)!;
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelPermissao, setNivelPermissao] = useState<"ADMINISTRADOR" | "OPERADOR" | "ENGENHEIRO">("OPERADOR");


  const handleSubmit = () => {
    if (!id || !nome || !telefone || !endereco || !usuario || !senha) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novoFuncionario: Funcionario = {
      id,
      nome,
      telefone,
      endereco,
      usuario,
      senha,
      nivelPermissao
    };

    addFuncionario(novoFuncionario);
    alert("Funcionário criado com sucesso!");
    navigate("/funcionario");
  };

  return (
    <div className="funcionario-container">
  <h1>Cadastro de Funcionário</h1>

  <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
  <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
  <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
  <input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
  <input placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
  <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />

  <h3>Nível de Permissão</h3>
  <select value={nivelPermissao} onChange={e => setNivelPermissao(e.target.value as "ADMINISTRADOR" | "OPERADOR" | "ENGENHEIRO")}>
    <option value="ADMINISTRADOR">Administrador</option>
    <option value="OPERADOR">Operador</option>
    <option value="ENGENHEIRO">Engenheiro</option>
  </select>

  <div className="botoes">
    <button onClick={handleSubmit}>Cadastrar</button>
    <button onClick={() => navigate("/funcionario")}>Voltar</button>
  </div>
</div>

  );
}
