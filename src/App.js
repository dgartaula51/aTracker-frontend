import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import AppointmentsList from "./components/AppointmentsList";
import EditAppointment from "./components/EditAppointment";
import CreateAppointment from "./components/CreateAppointment";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<AppointmentsList />} />
          <Route path="/edit/:id" element={<EditAppointment />} />
          <Route path="/create" element={<CreateAppointment />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
