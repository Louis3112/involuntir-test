import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import EventCard from '../components/EventCard';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try{
        setLoading(true);
        const data = await apiService.getEvents();
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data && Array.isArray(data.data)) {
          setEvents(data.data);
        } else if (data && Array.isArray(data.events)) {
          setEvents(data);
        } else {
          console.warn("Format data API tidak sesuai ekspektasi array.");
          setEvents([]); 
        }
      } catch (e) {
        setError('Gagal memuat data event.');
        console.error(e);
      }
      finally {
        setLoading(false);
      } 
    }

    fetchEvents();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600"></div>
    </div>
  );
  
  if(error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="font-bold text-lg mb-1">Terjadi Kesalahan</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Coba Refresh
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <img className='w-48 h-48' src='involuntir.webp'></img>
      <header className="mb-10 text-center md:text-left border-b border-gray-300 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Involuntir <span className="text-blue-600">Events</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Temukan kesempatan berkontribusi untuk komunitas di sekitarmu.
        </p>
      </header>

      {/* 4. Empty State (Jika array events kosong) */}
      {events.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <span className="text-4xl">📂</span>
          <p className="text-gray-500 text-lg mt-4 font-medium">Belum ada event tersedia saat ini.</p>
          <p className="text-gray-400 text-sm">Silakan cek kembali nanti.</p>
        </div>
      ) : (
        // Grid Layout (Responsive: Mobile 1 col, Tablet 2 col, Desktop 3 col)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}