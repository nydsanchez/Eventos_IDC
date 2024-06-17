import { Routes, Route } from "react-router-dom";

import PageNotFound from "./page/notFound/PageNotFound";

import Home from "./page/home/homepage";
import NewChurches from "./page/Churches/NewChurches";
import ChurchesList from "./page/Churches/ChurchesList";
import NewPerson from "./page/People/NewPerson";
import PeopleList from "./page/People/PeopleList";
import NewTicket from "./page/Tickets/NewTicket";
import TicketList from "./page/Tickets/TicketList";

function App() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/home" element={<Home />} />
      <Route path="/iglesia/nuevo" element={<NewChurches />} />
      <Route path="/iglesia/listado" element={<ChurchesList />} />
      <Route path="/personas" element={<NewPerson />} />
      <Route path="/personas/listado" element={<PeopleList />} />
      <Route path="/tickets" element={<NewTicket />} />
      <Route path="/tickets/listado" element={<TicketList />} />
    </Routes>
  );
}

export default App;
