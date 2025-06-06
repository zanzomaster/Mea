import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import ImageSection from './components/imageSection'
import Search from './components/search'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageSection />
              <Search />
              {/* เนื้อหาอื่น ๆ ของหน้าแรก */}
            </>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;