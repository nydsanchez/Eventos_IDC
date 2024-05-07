import { Routes, Route } from "react-router-dom";

import Dashboard from "./component/dashboard/Dashboard";
import PageNotFound from "./page/notFound/PageNotFound";
import Church from "./component/form/Church";
import Event from "./component/form/Event";
import Ticket from "./component/form/Ticket";
import People from "./component/form/People";
import GetEvents from "./component/Tablas/GetEvents";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<GetEvents />} />
      <Route path="/congregaciones" element={<Church />} />
      <Route path="/tickets" element={<Ticket />} />
      <Route path="/eventos" element={<Event />} />
      <Route path="/evento" element={<Dashboard />} />

      <Route path="/participantes" element={<People isModal={false} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
