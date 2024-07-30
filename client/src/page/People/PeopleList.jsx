import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import PeopleTable from "../../components/Tablas/PeopleTable";

export default function PeopleList() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <PeopleTable />
      <Footer />
    </div>
  );
}
