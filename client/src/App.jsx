import { Routes, Route } from "react-router-dom";

import Dashboard from "./component/dashboard/Dashboard";
import PageNotFound from "./page/notFound/PageNotFound";
import Church from "./component/form/Church";

import Ticket from "./component/form/Ticket";
import People from "./component/form/People";
import GetEvents from "./component/Tablas/GetEvents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetEvents />} />

      {/* <Route path="/eventos/:idevent/dashboard" element={<Dashboard />} />
      <Route path="/eventos/:idevent/nuevotickets" element={<Ticket />} />
      <Route path="/eventos/:idevent/attendance" element={<Ticket />} />
      <Route path="/eventos/:idevent/tickets" element={<Ticket />} />
      <Route path="/tickets/:idevent/:idticket" element={<Ticket />} />
      <Route path="/tickets/:idevent/attend" element={<Ticket />} /> */}

      <Route path="/congregaciones" element={<Church />} />
      <Route path="/eventos/dashboard" element={<Dashboard />} />
      <Route path="/tickets" element={<Ticket />} />
      <Route path="/participantes" element={<People isModal={false} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
