import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import Churches from "../../components/Tablas/Churches";

export default function ChurchesList() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Churches />
      <Footer />
    </div>
  );
}
