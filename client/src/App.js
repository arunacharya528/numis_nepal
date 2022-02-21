import './App.scss';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "admin-lte/dist/css/adminlte.css";
import "admin-lte";
import { Nav } from './components/Nav';
import { Sidebar } from './components/Sidebar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Dashboard } from './contents/Dashboard';

import { Inventory } from './contents/Inventory/Inventory';
import { Client } from './contents/Client/Client';
import { Collectible } from './contents/Collectible/Collectible';
// import "popper";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Sidebar />

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/client" element={<Client />}></Route>
          <Route path="/collectible" element={<Collectible />}></Route >
          <Route path="/inventory" element={<Inventory />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
