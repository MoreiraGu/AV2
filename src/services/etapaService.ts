// src/services/etapaService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/etapas";

export const listarEtapas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const cadastrarEtapa = async (etapa: any) => {
  const res = await axios.post(API_URL, etapa);
  return res.data;
};

export const iniciarEtapa = async (nome: string, aeronaveCodigo: string) => {
  const res = await axios.patch(`${API_URL}/iniciar/${encodeURIComponent(nome)}/${encodeURIComponent(aeronaveCodigo)}`);
  return res.data;
};

export const finalizarEtapa = async (nome: string, aeronaveCodigo: string) => {
  const res = await axios.patch(`${API_URL}/finalizar/${encodeURIComponent(nome)}/${encodeURIComponent(aeronaveCodigo)}`);
  return res.data;
};
export const associarFuncionario = async (nome: string, funcionarioId: string) => {
  const res = await axios.patch(`${API_URL}/associarFuncionario/${nome}`, { funcionarioId });
  return res.data;
};
