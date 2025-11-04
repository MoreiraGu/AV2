import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../components/MainLayout";

// Aeronave
import AeronaveMenu from "../pages/Aeronave/AeronaveMenu";
import CadastroAeronave from "../pages/Aeronave/CadastroAeronave";
import ListarAeronave from "../pages/Aeronave/ListarAeronave";

// Funcionário
import FuncionarioMenu from "../pages/Funcionario/FuncionarioMenu";
import CadastroFuncionario from "../pages/Funcionario/CadastroFuncionario";
import ListarFuncionario from "../pages/Funcionario/ListarFuncionario";

// Etapa
import EtapaMenu from "../pages/Etapa/EtapaMenu";
import CadastroEtapa from "../pages/Etapa/CadastroEtapa";
import ListarEtapas from "../pages/Etapa/ListarEtapa";
import DetalhesEtapa from "../pages/Etapa/DetalhesEtapa";

// Peça
import PecaMenu from "../pages/Peca/PecaMenu";
import CadastroPeca from "../pages/Peca/CadastroPeca";
import ListarPeca from "../pages/Peca/ListarPeca";
import AtualizarStatusPeca from "../pages/Peca/AtualizarStatusPeca";

// Teste
import TesteMenu from "../pages/Teste/TesteMenu";
import RegistrarTeste from "../pages/Teste/RegistrarTeste";
import ListarTeste from "../pages/Teste/ListarTeste";

// Relatório
import RelatorioMenu from "../pages/Relatorio/RelatorioMenu";
import GerarRelatorio from "../pages/Relatorio/GerarRelatorio";
import ListarRelatorios from "../pages/Relatorio/ListarRelatorio";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

<Route path="/aeronave" element={<MainLayout showSidebar><AeronaveMenu /></MainLayout>} />
<Route path="/aeronave/cadastrar" element={<MainLayout showSidebar><CadastroAeronave /></MainLayout>} />
<Route path="/aeronave/listar" element={<MainLayout showSidebar><ListarAeronave /></MainLayout>} />

<Route path="/funcionario" element={<MainLayout ><FuncionarioMenu /></MainLayout>} />
<Route path="/funcionario/cadastrar" element={<MainLayout ><CadastroFuncionario /></MainLayout>} />
<Route path="/funcionario/listar" element={<MainLayout ><ListarFuncionario /></MainLayout>} />

<Route path="/etapa" element={<MainLayout showSidebar><EtapaMenu /></MainLayout>} />
<Route path="/etapa/cadastrar" element={<MainLayout showSidebar><CadastroEtapa /></MainLayout>} />
<Route path="/etapa/listar" element={<MainLayout showSidebar><ListarEtapas /></MainLayout>} />
<Route path="/etapa/detalhes/:index" element={<MainLayout showSidebar><DetalhesEtapa /></MainLayout>} />

<Route path="/peca" element={<MainLayout showSidebar><PecaMenu /></MainLayout>} />
<Route path="/peca/cadastrar" element={<MainLayout showSidebar><CadastroPeca /></MainLayout>} />
<Route path="/peca/listar" element={<MainLayout showSidebar><ListarPeca /></MainLayout>} />
<Route path="/peca/detalhes/:index" element={<MainLayout showSidebar><AtualizarStatusPeca /></MainLayout>} />

<Route path="/teste" element={<MainLayout showSidebar><TesteMenu /></MainLayout>} />
<Route path="/teste/registrar" element={<MainLayout showSidebar><RegistrarTeste /></MainLayout>} />
<Route path="/teste/listar" element={<MainLayout showSidebar><ListarTeste /></MainLayout>} />
        {/* Relatório */}
        <Route path="/relatorio" element={<MainLayout><RelatorioMenu /></MainLayout>} />
        <Route path="/relatorio/gerar" element={<MainLayout><GerarRelatorio /></MainLayout>} />
        <Route path="/relatorio/listar" element={<MainLayout><ListarRelatorios /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
