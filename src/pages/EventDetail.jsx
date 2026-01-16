import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiService } from "../services/api";
import { FaArrowLeft, FaCalendar, FaHashtag, FaCheck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdPerson, MdOutlineWarning  } from "react-icons/md";
import LoadingAnimation from "../components/LoadingAnimation";
import ErrorCard from "../components/ErrorCard";

export default function EventDetail() {
  // Get event ID from URL params
  const { id } = useParams();

  // State for event details, loading, error
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for join event
  const [isJoining, setIsJoining] = useState(false);
  const [joinStatus, setJoinStatus] = useState(null);
  
  useEffect(() => {
    // Fetch event details from API
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEventDetail(id);
        if(Array.isArray(response)){ 
          setEvent(response[0]);
        }
        else if(response.data){
          setEvent(response.data[0]);
        }
      } catch (e) {
        setError('Failed to load event details');
        console.error(e);
      } finally { 
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);
  
  // Handle join event action
  const handleJoinEvent = () => {
    setIsJoining(true);
    setJoinStatus(null);

    setTimeout(() => {
      setIsJoining(false);
      const isSuccess = Math.random() > 0.2; 
      
      if (isSuccess) {
        setJoinStatus('success');
      } else {
        setJoinStatus('error');
      }
    }, 1500);
  };

  // Loading State
  if(loading) {
    return (
      <LoadingAnimation/>
    );
  }
  // Error State
  if(error) {
    return (
      <ErrorCard error={error} />
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link to="/" className="inline-flex items-center  gap-2 text-gray-900 hover:text-sky-600 mb-6">
        <FaArrowLeft/> Back to Events
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-sky-600 p-8 text-white">
          <h1 className="text-center md:text-left text-3xl font-bold mb-2">{event.event_name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 text-sm opacity-90 mt-2"> 
            <span className="flex items-center gap-2">
              <FaCalendar className="text-sky-200" /> 
              {new Date(event.event_date).toLocaleDateString('en-GB', { dateStyle: 'full' })}
            </span>

            <span className="flex items-center gap-2">
              <FaLocationDot className="text-sky-200" /> 
              {event.event_location}
            </span>

            <span className="flex items-center gap-2">
              <FaHashtag className="text-sky-200" /> 
              {event.event_category}
            </span>
          </div>

          <div className="">
            <p className="text-sm mt-6 md:mt-2 flex items-center gap-2">
              {event.event_hashtag}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl text-center md:text-left font-semibold text-gray-800 mb-1">Description</h2>
            <p className="text-center md:text-left text-gray-800 leading-relaxed whitespace-pre-line">
              {event.event_description}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 bg-gray-50 p-6 rounded-lg">
             <div className="flex flex-col items-center md:items-start gap-2">
                <div>
                  <p className="text-center md:text-left text-sm text-gray-500">Event Organizer</p>
                  <p className="font-medium">{event.event_organizer}</p>
                </div>
                
                <div>
                  <p className="text-center md:text-left text-sm text-gray-500">Event Sponsor</p>
                  <p className="font-medium">{event.event_sponsor}</p>
                </div>
             </div>
             <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-center md:text-left text-sm text-gray-500">Total Attendances</p>
                  <span className="inline-flex items-center gap-2 font-medium text-center md:text-left text-sky-600">{event.event_attendees} <MdPerson className="mt-1"/></span>
                </div>

                <div>
                  <p className="text-center md:text-left text-sm text-gray-500">Website</p>
                  <a 
                    href={event.event_website}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-600 font-medium hover:underline text-center md:text-left break-all"
                  >
                    {event.event_website}
                  </a>
                </div>
             </div>
          </div>

          {/* Join Event Button */}
          <div className="border-t pt-6">
            {joinStatus === 'success' ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg flex justify-between items-center">
                <span className="inline-flex items-center gap-4"> <FaCheck/>You have successfully joined {event.event_name}</span>
                <button onClick={() => setJoinStatus(null)} className="text-sm underline">Reset</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {joinStatus === 'error' && (
                  <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
                    <span className="inline-flex items-center gap-4 md:gap-2"> <MdOutlineWarning/>Failed to join, Please try again! </span>
                  </div>
                )}
                
                <button
                  onClick={handleJoinEvent}
                  disabled={isJoining}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${
                    isJoining 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {isJoining ? 'Loading...' : 'Join Now!'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}