import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from './components/navbar'
import ImageSection from './components/imageSection'
import Search from './components/search'
import Register from './components/Register'
import Login from './components/Login';

function App() {
  // state สำหรับจำลองการล็อกอิน
  const [user, setUser] = useState<{ name: string } | null>(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageSection />
              <Search />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;