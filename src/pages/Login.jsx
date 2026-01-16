import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { MdOutlineWarning  } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();

  // State for form data, loading, and error
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate login process
    try {
      await apiService.login(formData.email, formData.password);
      navigate('/');
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your email and password again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-500 mt-2">Please login with your email account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
            <span className="inline-flex"> <MdOutlineWarning/> </span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="user@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-md ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-sky-600 hover:bg-sky-500 hover:shadow-lg'
            }`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Since the API is for testing purposes, you can use any email and password to login.   
        </p>
      </div>
    </div>
  );
}