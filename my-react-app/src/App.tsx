import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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
        {/* เพิ่มเส้นทางอื่น ๆ ตามต้องการ */}
      </Routes>
    </Router>
  );
}

export default App;