// src/services/testeService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/testes";

export const listarTestes = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err: any) {
    console.error("Erro ao listar testes:", err.response?.data || err.message);
    throw err;
  }
};

export const listarTestesPorAeronave = async (codigo: string) => {
  try {
    const res = await axios.get(`${API_URL}/aeronave/${codigo}`);
    return res.data;
  } catch (err: any) {
    console.error("Erro ao listar testes por aeronave:", err.response?.data || err.message);
    throw err;
  }
};

export const cadastrarTeste = async (teste: {
  tipo: string;
  resultado: string;
  aeronaveCodigo: string;
}) => {
  try {
    const res = await axios.post(API_URL, teste, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err: any) {
    console.error("Erro ao cadastrar teste:", err.response?.data || err.message);
    throw err; // importante para o handleSubmit capturar
  }
};
