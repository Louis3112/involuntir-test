import { Link } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa';

export default function EventCard({ event }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.event_name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <FaCalendar className="mr-2"/> {formatDate(event.event_date)}
        </p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
            {event.event_description || 'Tidak ada deskripsi singkat.'}
        </p>
      </div>
      
      <Link 
        to={`/events/${event.id}`} 
        className="mt-4 block w-full text-center bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Lihat Detail
      </Link>
    </div>
  );
}