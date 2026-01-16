import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          {/* Route Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Route Event List Page */}
          <Route path="/" 
            element={
              // Protected Route requires authentication
              <ProtectedRoute>
                <EventList />
              </ProtectedRoute>
            } 
          />
          
          {/* Route Event Detail Page */}
          <Route path="/events/:id" 
            element={
              // Protected Route requires authentication
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            } 
          />

          {/* Redirect unknown routes to Event List Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
