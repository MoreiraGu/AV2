// src/pages/Teste/ListarTeste.tsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Teste, Aeronave } from "../../context/AppContext";
import "../../styles/Teste.css";

export default function ListarTeste() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const [testes, setTestes] = useState<Teste[]>([]);
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [resTestes, resAero] = await Promise.all([
          fetch("http://localhost:3000/testes"),
          fetch("http://localhost:3000/aeronaves")
        ]);

        const [dataTestes, dataAero] = await Promise.all([
          resTestes.json(),
          resAero.json()
        ]);

        setTestes(dataTestes);
        setAeronaves(dataAero);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        alert("Falha ao carregar testes ou aeronaves.");
      }
    };

    fetchDados();
  }, []);

  // Retorna o modelo da aeronave pelo código
  const getAeronaveModelo = (codigo: string) => {
    const aero = aeronaves.find(a => a.codigo === codigo);
    return aero ? aero.modelo : "Desconhecida";
  };

  return (
    <div className="teste-container">
      <h1>Lista de Testes</h1>

      {testes.length > 0 ? (
        <ul>
          {testes.map((t) => (
            <li key={t.id}>
              <strong>Aeronave:</strong> {t.aeronaveCodigo} - {getAeronaveModelo(t.aeronaveCodigo)} |{" "}
              <strong>Tipo:</strong> {t.tipo} | <strong>Resultado:</strong> {t.resultado}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum teste registrado ainda.</p>
      )}

      <div className="teste-buttons">
        <button onClick={() => navigate("/teste")}>Voltar</button>
      </div>
    </div>
  );
}
