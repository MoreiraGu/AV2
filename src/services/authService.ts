// src/services/authService.ts
export interface LoginData {
  usuario: string;
  senha: string;
}

export interface LoginResponse {
  mensagem: string;
  funcionario: {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    usuario: string;
    nivelPermissao: string;
  };
}

const API_URL = "http://localhost:3000"; // endereço da sua API

export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/funcionarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha incorretos.");
  }

  return response.json();
}
