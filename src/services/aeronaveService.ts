// src/services/aeronaveService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/aeronaves";

export const listarAeronaves = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const cadastrarAeronave = async (aeronave: any) => {
  const res = await axios.post(API_URL, aeronave);
  return res.data;
};

export const atualizarAeronave = async (aeronave: any) => {
  const res = await axios.put(`${API_URL}/${aeronave.codigo}`, aeronave);
  return res.data;
};

export const deletarAeronave = async (codigo: string) => {
  const res = await axios.delete(`${API_URL}/${codigo}`);
  return res.data;
};
