import Header from "../../components/header/Header";
import Menu from "../../components/menu/MenuEventos";
import TicketTable from "../../components/Tablas/TicketTable";

export default function TicketList() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <TicketTable />
    </div>
  );
}
