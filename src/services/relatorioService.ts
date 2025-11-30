// src/services/relatorioService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/relatorios";

export const gerarRelatorio = async (codigoAeronave: string) => {
  const res = await axios.post(`${API_URL}/gerar`, { codigoAeronave });
  return res.data;
};

export const listarRelatorios = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
