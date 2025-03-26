import { useState, useEffect } from 'react';
import { userData } from '../data/user';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
      <p className="text-gray-600 mt-2">{user.email}</p>
      <p className="text-gray-500 text-sm mt-1">Last Login: {user.lastLogin}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Your Preferences</h3>
        <ul className="list-disc ml-5 mt-2 text-gray-600">
          {user.preferences.map((pref, index) => (
            <li key={index}>{pref}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
