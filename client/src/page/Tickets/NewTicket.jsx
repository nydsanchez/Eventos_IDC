import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import Ticket from "../../components/form/Ticket";
import Footer from "../../components/footer/Footer";

export default function NewTicket() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Ticket />
      <Footer />
    </div>
  );
}
