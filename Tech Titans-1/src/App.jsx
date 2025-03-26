import { useState, useEffect } from 'react';
import MedicineReminder from './components/MedicineReminder';
import ClinicFinder from './components/ClinicFinder';
import SymptomsChecker from './components/SymptomsChecker';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('medicines');
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Simulated user data (in a real app, this would come from an API or auth system)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Default user for demo
      const defaultUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        lastLogin: new Date().toLocaleString(),
      };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // In a real app, this would also handle auth logout
  };

  const tabs = [
    { id: 'medicines', label: 'Medicine Reminders', component: <MedicineReminder /> },
    { id: 'clinics', label: 'Clinic Finder', component: <ClinicFinder /> },
    { id: 'symptoms', label: 'Symptoms Checker', component: <SymptomsChecker /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Health Companion</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                  >
                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {user.name.charAt(0)}
                    </span>
                    <span className="hidden sm:inline text-gray-700">{user.name}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-4 z-10">
                      <div className="border-b pb-2 mb-2">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Last Login: {user.lastLogin}
                      </p>
                      <button
                        onClick={handleLogout}
                        className="w-full mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="animate-fade-in">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600"> 
          © {new Date().getFullYear()} Health Companion. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;