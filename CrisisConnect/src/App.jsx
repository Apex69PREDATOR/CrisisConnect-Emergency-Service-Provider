import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Adminlogin from './components/Adminlogin';
import Dashexam from "./components/Dashexam";
import AdminDashboard from './components/AdminDashboard';
import PoliceDash from './components/PoliceDash';
import HospitalDash from './components/HospitalDash';
import MedicineDash from './components/MedicineDash';
import FireDash from './components/FireDash';
import FireAdmin from './components/FireAdmin';
import PoliceAdmin from './components/PoliceAdmin';
import HospitalAdmin from './components/HospitalAdmin';
import MedicineAdmin from './components/MedicineAdmin';
import ForgotPassword from './components/ForgotPassword';
import Admin_form from './components/admin_form';
import CoordContext from './context/coordinates/coordsContext';
import ServiceContext from './context/service/serviceRoute';
import { useState } from 'react';
function App() {
  const [coordinate,SetCoordinate]=useState({lat:0,lng:0})
  const [service,Setservice]=useState(null)
  return (
    <>
    <CoordContext.Provider value={coordinate}>
      <ServiceContext.Provider value={service}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/dashexam" element={<Dashexam />} />
        <Route path="/police" element={<PoliceDash />} />
        <Route path="/hospital" element={<HospitalDash />} />
        <Route path="/medicine" element={<MedicineDash />} />
        <Route path="/fire" element={<FireDash />} />
        <Route path="/fireadmin" element={<FireAdmin modifyCoordinate={SetCoordinate} service={Setservice}/>} />
        <Route path="/policeadmin" element={<PoliceAdmin modifyCoordinate={SetCoordinate} service={Setservice}/>} />
        <Route path="/hospitaladmin" element={<HospitalAdmin modifyCoordinate={SetCoordinate} service={Setservice}/>} />
        <Route path="/medicineadmin" element={<MedicineAdmin modifyCoordinate={SetCoordinate} service={Setservice}/>} />
        <Route path="/forgotpassword" element={<ForgotPassword modifyCoordinate={SetCoordinate} service={Setservice}/>} />
        <Route path="/find-nearest-place" element={<Admin_form/>} />
      </Routes>
    </Router>
    </ServiceContext.Provider>
    </CoordContext.Provider>
    </>
  );
}

export default App;
