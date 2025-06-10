import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { AUTH_ENDPOINTS, AXIOS_CONFIG } from '../config/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Mengirim data login:', formData);
      
      const response = await axios.post(
        AUTH_ENDPOINTS.LOGIN,
        formData,
        AXIOS_CONFIG
      );

      console.log('Respons dari server:', response.data);

      if (response.data.success) {
        localStorage.setItem('twitter-clone-token', response.data.token);
        navigate('/feed');
      } else {
        // Jika server mengirim respons sukses tapi dengan flag success: false
        setError(response.data.message || 'Terjadi kesalahan pada login');
      }
    } catch (err) {
      console.error('Error saat login:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Koneksi timeout. Server mungkin sedang down atau lambat.');
      } else if (!err.response) {
        setError('Tidak dapat terhubung ke server. Pastikan server berjalan di http://localhost:5000');
      } else {
        const errorMessage = err.response?.data?.error || 
                           err.message || 
                           'Login gagal. Coba lagi nanti.';
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Masuk ke Akun Anda
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="contoh@email.com"
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password"
              required
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold
                     hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <TailSpin color="#fff" height={20} width={20} />
                Memproses...
              </div>
            ) : (
              'Masuk Sekarang'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/forgot-password" 
            className="text-blue-600 hover:underline text-sm"
          >
            Lupa password?
          </Link>
          
          <p className="mt-4 text-gray-600">
            Belum punya akun? 
            <Link to="/register" className="text-blue-600 hover:underline ml-2">
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;