import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import People from "../../components/form/People";
import Footer from "../../components/footer/Footer";

export default function NewPerson() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <People />
      <Footer />
    </div>
  );
}
