import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Events from './pages/Events';
import Event from './pages/Event';
import Order from './pages/Order';
import Tickets from './pages/Tickets';
import Start from './pages/Start';
import { createContext, useState } from 'react';

// SKAPAR EN CONTEXT FÖR ETT GLOBALT STATE //
export const GlobalContext = createContext();

function App() {

  // SKAPAR DET GLOBALA STATET DÄR HELA ORDERN SKA SPARAS OCH SKICKAS TILL  //
  const [globalData, setGlobalData] = useState([]);

  return (
    <GlobalContext.Provider value={[globalData, setGlobalData]}>
      <Router>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/Events' element={<Events />} />
          <Route path='/Event' element={<Event />} />
          <Route path='/Order' element={<Order />} />
          <Route path='/Tickets' element={<Tickets />} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
