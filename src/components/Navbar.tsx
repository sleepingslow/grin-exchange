import { Link } from 'react-router-dom';
import { Coins, User, Wallet } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">Grin Exchange</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/exchange" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              Exchange
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/wallet" className="text-gray-300 hover:text-white px-3 py-2 rounded-md flex items-center space-x-1">
                  <Wallet className="h-5 w-5" />
                  <span>Wallet</span>
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}