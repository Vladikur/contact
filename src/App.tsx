import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainLayout from "./tsx/layouts/MainLayout";
import Contacts from "./tsx/pages/Contacts";
import CreateContact from "./tsx/pages/CreateContact";
import PageNotFound from "./tsx/pages/PageNotFound";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<MainLayout /> } >
            <Route path="/contact" element={<Contacts />} />
            <Route path="/create-contact" element={<CreateContact />} />
        </Route>

          <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
