import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [healthProfile, setHealthProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load health profile data
    const healthProfiles = JSON.parse(localStorage.getItem('healthProfiles') || '{}');
    const userProfile = healthProfiles[user.id];
    setHealthProfile(userProfile);
    setLoading(false);
  }, [user.id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!healthProfile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Health Profile Not Found
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Please complete your health profile to view this information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className={`mb-6 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? 'text-gray-300 hover:bg-gray-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>

        <div className={`shadow rounded-lg overflow-hidden transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 bg-blue-600">
            <h3 className="text-lg leading-6 font-medium text-white">
              Health Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-blue-100">
              Personal and medical information
            </p>
          </div>

          {/* Content */}
          <div className={`border-t px-4 py-5 sm:px-6 transition-colors duration-200 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* Personal Information */}
              <div className="sm:col-span-2">
                <h4 className={`text-lg font-medium mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Personal Information</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Name</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{user.name}</dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Email</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{user.email}</dd>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="sm:col-span-2">
                <h4 className={`text-lg font-medium mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Health Information</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Blood Group</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{healthProfile.bloodGroup}</dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Gender</dt>
                    <dd className={`mt-1 text-sm capitalize ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{healthProfile.gender}</dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Age</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{healthProfile.age} years</dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Height</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{healthProfile.height} cm</dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Weight</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{healthProfile.weight} kg</dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>BMI</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {((healthProfile.weight / (healthProfile.height / 100) ** 2)).toFixed(1)}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="sm:col-span-2">
                <h4 className={`text-lg font-medium mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Medical Information</h4>
                <div className="space-y-4">
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Medical Conditions</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {healthProfile.medicalConditions || 'None reported'}
                    </dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Allergies</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {healthProfile.allergies || 'None reported'}
                    </dd>
                  </div>
                  <div>
                    <dt className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Current Medications</dt>
                    <dd className={`mt-1 text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {healthProfile.medications || 'None reported'}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="sm:col-span-2">
                <dt className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Last Updated</dt>
                <dd className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {new Date(healthProfile.updatedAt).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 