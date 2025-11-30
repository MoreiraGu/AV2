// src/services/funcionarioService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/funcionarios";

export const listarFuncionarios = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const cadastrarFuncionario = async (funcionario: any) => {
  const res = await axios.post(API_URL, funcionario);
  return res.data;
};

export const atualizarFuncionario = async (funcionario: any) => {
  const res = await axios.put(`${API_URL}/${funcionario.id}`, funcionario);
  return res.data;
};

export const deletarFuncionario = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
