import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { MdEventBusy } from "react-icons/md";
import { FaSearch, FaFilter } from 'react-icons/fa';
import EventCard from '../components/EventCard';
import LoadingAnimation from '../components/LoadingAnimation';
import ErrorCard from '../components/ErrorCard';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try{
        setLoading(true);
        const response = await apiService.getEvents();
        if (Array.isArray(response)) {
          setEvents(response);
        } else if (response && Array.isArray(response.data)) {
          setEvents(response.data);
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

  if (loading) {
    return (
      <LoadingAnimation/>
    );
  }
  if(error) {
    return (
      <ErrorCard error={error} />
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">

      <div className="flex justify-center items-center">
        <img className="w-4 mt-1" src="involuntir.webp"></img>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            nvoluntir
          </h1>
      </div>
      
      <div className="border-b border-gray-300 mb-8 pb-4">
        <h3 className=" text-center text-gray-500 mt-2 text-lg">
        Temukan <span className="font-bold text-sky-600">kesempatan</span> berkontribusi untuk sekitarmu.
        </h3>
      </div>
      
      {events.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 bg-gray-50 rounded-2xl border-gray-200">
          <MdEventBusy className="text-5xl text-gray-500"/>
          <p className="text-gray-500 text-lg font-medium">Belum ada event tersedia saat ini.</p>
          <p className="text-gray-400 text-sm">Silakan cek kembali nanti.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="p-2">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}