import { CiWarning } from "react-icons/ci";

export default function ErrorCard({ error }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 max-w-md flex flex-col items-center text-center">
        <CiWarning className="text-5xl mb-2"/>
        <h3 className="font-bold text-lg mb-1">There was a problem</h3>
        <p>{error}</p>
      
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}