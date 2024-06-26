import Header from "../../components/header/Header";
import Dashboard from "../../components/dashboard/Dashboard";
import Menu from "../../components/menu/MenuEventos";

function homepage() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Dashboard />
    </div>
  );
}

export default homepage;
