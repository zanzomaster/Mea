import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from './components/navbar'
import ImageSection from './components/imageSection'
import Search from './components/search'
import Register from './components/Register'
import Login from './components/Login';
import Profile from './components/Profile';
import Education from "./components/Education";
import Mailbox from "./components/Mailbox";
import Internship from "./components/Internship";
import ZoneSelect from "./components/ZoneSelect";
import NewsEducation from "./components/news/Education";
import NewsJob from "./components/news/Job";
import NewsHoliday from "./components/news/Holiday";
import NewsTime from "./components/news/Time";
import Office from "./components/Office";
import Contact from "./components/Contact";
import ChangePassword from "./components/ChangePassword";
import Management from "./components/Management";
import SendInternship from "./components/sendInternship";
import SendManagement from "./components/sendManagement";
import AddLocation from "./components/addLocation";


function App() {
  // state สำหรับจำลองการล็อกอิน
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    if (name && role) {
      setUser({ name, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageSection />
              {/* <Search /> */}
              <Internship />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/education" element={<Education />} />
        <Route path="/mailbox" element={<Mailbox />} />
        <Route path="/news/education" element={<NewsEducation />} />
        <Route path="/news/job" element={<NewsJob />} />
        <Route path="/news/holiday" element={<NewsHoliday />} />
        <Route path="/news/time" element={<NewsTime />} />
        <Route path="/Office" element={<Office />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/management" element={<Management />} />
        <Route path="/send/:id" element={<SendInternship />} />
        <Route path="/sendmanagement/:id" element={<SendManagement />} />
        <Route path="/add-location" element={<AddLocation />} />
        {/* เพิ่มเส้นทางอื่น ๆ ตามต้องการ */}
      </Routes>
    </Router>
  );
}

export default App;