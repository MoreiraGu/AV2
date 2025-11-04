# ✈️ Aerocode: Sistema de Gestão de Produção Aeronáutica

O **Aerocode** é um sistema web de gerenciamento de produção aeronáutica, desenvolvido como uma **Single Page Application (SPA)** utilizando **React**. O objetivo é simular, de forma visual e interativa, a administração de todo o ciclo de produção, desde o gerenciamento de aeronaves e peças até as etapas de produção, testes e emissão de relatórios.

> ⚠️ **Observação Importante (Frontend Apenas):**
> O sistema é estritamente **frontend**. Todas as funcionalidades de cadastro, login, atualização e persistência de dados são **simuladas** e não possuem um backend ou banco de dados real. A interface apresentada foca na **visão do Administrador**, que possui acesso a todas as funcionalidades disponíveis. Também já foi utilizado alguns dados pelo próprio frontend para simulação.

---

## 🚀 Funcionalidades Principais

### 🔒 Login e Autenticação
O acesso ao sistema é simulado.

* **Credenciais Padrão:**
    * **Usuário:** `Admin`
    * **Senha:** `Admin`

### 🛩️ Gerenciamento de Aeronaves
Página dedicada à visualização e simulação de cadastro de aeronaves.

* **Detalhes Exibidos:**
    * Nome
    * Cliente
    * Data de entrega
* **Cadastro:** Botão “Cadastrar Aeronave” que abre um formulário de registro simulado.

### ⚙️ Etapas de Produção
Acompanhamento e gestão do fluxo de trabalho.

* **Listagem:** Exibe as etapas de produção com **nome** e **status**.
* **Gerenciamento:** Permite adicionar novas etapas.
* **Regra:** Etapas concluídas não podem ter o status revertido para pendente.

### 🧩 Peças
Visualização do inventário e status das peças associadas às aeronaves.

* **Detalhes Exibidos (em tabela/listagem):**
    * Código
    * Tipo
    * Status

### 🧪 Testes de Qualidade
Acompanhamento visual dos resultados de testes.

* **Lista de Testes:** Exibe a lista com os testes realizados.
* **Resultado Visual:**
    * ✅ **Aprovado**
    * ❌ **Reprovado**

### 👷 Funcionários
Página dedicada ao gerenciamento e visualização da equipe.

* **Listagem:** Tabela com visualização dos dados dos funcionários.

### 📊 Relatórios
Simulação da geração de relatórios detalhados por aeronave.

* **Conteúdo do Relatório:**
    * Dados da Aeronave
    * Cliente
    * Etapas de Produção
    * Peças
    * Resultados de Testes

---

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | **React** | Framework principal para construção da interface de usuário. |
| **Roteamento** | **React Router** | Gerenciamento de rotas e navegação da SPA. |
| **Linguagem** | **TypeScript** | Garante maior robustez e tipagem estática à lógica da aplicação. |
| **Estilização** | **CSS3 / Flexbox** | Estilização da interface e layout responsivo. |

---

## 💻 Como Executar o Projeto Localmente

Para rodar o **Aerocode** em sua máquina, siga os passos abaixo:

```bash
# 1. Clone o repositório
git clone [https://github.com/moreiragu/av2.git](https://github.com/moreiragu/av2.git)

# 2. Acesse o diretório do projeto
cd aerocode

# 3. Instale as dependências
npm install

# 4. Inicie a aplicação em modo desenvolvimento
npm run dev

# 5. Abra o navegador e acesse
http://localhost:5173/