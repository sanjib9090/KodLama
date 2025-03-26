import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MedicineReminder from './components/MedicineReminder';
import ClinicFinder from './components/ClinicFinder';
import SymptomsChecker from './components/SymptomsChecker';
import Login from './components/Login';
import Register from './components/Register';
import HealthProfile from './components/HealthProfile';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('medicines');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const tabs = [
    { id: 'medicines', label: 'Medicine Reminders', component: <MedicineReminder /> },
    { id: 'clinics', label: 'Clinic Finder', component: <ClinicFinder /> },
    { id: 'symptoms', label: 'Symptoms Checker', component: <SymptomsChecker /> },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`shadow-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <nav className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Health Companion
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                    } text-white text-lg font-semibold`}>
                      {user.name.charAt(0)}
                    </span>
                    <span className={`hidden sm:inline ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.name}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl p-4 z-10 transition-colors duration-200 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="border-b pb-2 mb-2">
                        <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className={`block w-full mt-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isDarkMode
                            ? 'text-blue-400 hover:bg-gray-700'
                            : 'text-blue-600 hover:bg-gray-100'
                        }`}
                      >
                        View Health Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full mt-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="animate-fade-in">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </main>

      <footer className={`border-t py-4 transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600"> 
          © {new Date().getFullYear()} Health Companion. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/health-profile"
              element={
                <ProtectedRoute>
                  <HealthProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;