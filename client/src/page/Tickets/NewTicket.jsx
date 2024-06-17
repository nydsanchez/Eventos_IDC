import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import Ticket from "../../components/form/Ticket";

export default function NewTicket() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Ticket />
    </div>
  );
}
