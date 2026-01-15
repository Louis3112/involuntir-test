import { BrowserRouter, Routes, Route } from "react-router-dom"
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          <Route path="/" element={<EventList />} />
          
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
