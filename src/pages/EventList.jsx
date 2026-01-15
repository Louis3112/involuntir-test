import { useEffect, useState, useMemo } from 'react';
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try{
        setLoading(true);
        const response = await apiService.getEvents();
        setEvents(response.data || []);
      } catch (e) {
        setError('Failed to load events');
        console.error(e);
      }
      finally {
        setLoading(false);
      } 
    }

    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = [...new Set(events.map(e => e.event_category).filter(Boolean))];
    return ["All", ...uniqueCats];
  }, [events]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.event_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.event_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
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
        Find a way <span className="font-bold text-sky-600">to contribute</span> for your surroundings.
        </h3>
      </div>
      
      <div className=" mb-8 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-4 z-10 backdrop-blur-md bg-opacity-95">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Find your event..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full md:w-1/4">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-8 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none bg-white cursor-pointer"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat === "All" ? "All" : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 bg-gray-50 rounded-2xl border-gray-200">
          <MdEventBusy className="text-5xl text-gray-500"/>
          <p className="text-gray-500 text-lg font-medium">There are no available events at this time.</p>
          <p className="text-gray-400 text-sm">Please check back later</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}