import Header from "../../components/header/Header";
import Dashboard from "../../components/dashboard/Dashboard";
import Menu from "../../components/menu/MenuEventos";
import Footer from "../../components/footer/Footer";

function homepage() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default homepage;
