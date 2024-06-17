import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import People from "../../components/form/People";

export default function NewPerson() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <People />
    </div>
  );
}
