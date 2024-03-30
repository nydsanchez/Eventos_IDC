import { Routes, Route } from "react-router-dom";

import Header from "./component/header/Header";
import Menu from "./component/menu/Menu";
import Dashboard from "./component/dashboard/Dashboard";
import PageNotFound from "./page/notFound/PageNotFound";
import Church from "./component/form/Church";
import Event from "./component/form/Event";
import Ticket from "./component/form/Ticket";
import People from "./component/form/People";

function App() {
  return (
    <div className={"app"}>
      <Header />
      <Menu />
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/congregaciones" element={<Church />} />
        <Route path="/tickets" element={<Ticket />} />
        <Route path="/eventos" element={<Event />} />
        <Route path="/participantes" element={<People isModal={false} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
