// src/services/pecaService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/pecas";

export const listarPecas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const cadastrarPeca = async (peca: any) => {
  const res = await axios.post(API_URL, peca);
  return res.data;
};

export const atualizarStatusPeca = async (nome: string, aeronaveCodigo: string, novoStatus: string) => {
  const res = await axios.patch(`${API_URL}/status`, { nome, aeronaveCodigo, novoStatus });
  return res.data;
};

export const listarPecasPorAeronave = async (codigo: string) => {
  const res = await axios.get(`${API_URL}/aeronave/${codigo}`);
  return res.data;
};
