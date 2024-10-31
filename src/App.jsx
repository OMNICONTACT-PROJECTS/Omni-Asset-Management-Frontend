import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import '../src/assets/css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import OnboardingForm from './pages/admin/employees/onboardingForm/onboardingForm';
import EmployeeTable from './pages/admin/employees/EmployeeTable';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/add-employee" element={<OnboardingForm />} />
        <Route exact path="/employeetable" element={<EmployeeTable/>} />
      </Routes>
    </>
  );
}

export default App;
