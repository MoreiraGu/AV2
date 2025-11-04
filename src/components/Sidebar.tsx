import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/aeronave" end>Aeronave</NavLink>
      <NavLink to="/etapa" end>Etapa</NavLink>
      <NavLink to="/peca" end>Peça</NavLink>
      <NavLink to="/teste" end>Teste</NavLink>

      <div className="sidebar-footer">
        v1.0
      </div>
    </aside>
  );
}
