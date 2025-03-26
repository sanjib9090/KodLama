import { useState } from 'react';
import { clinics } from '../data/clinicsData';

function ClinicFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Clinic Finder</h2>
      <input
        type="text"
        placeholder="Search clinics..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClinics.map((clinic) => (
          <div key={clinic.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{clinic.name}</h3>
            <p>{clinic.address}</p>
            <p>Phone: {clinic.phone}</p>
            <p>Specialties: {clinic.specialties.join(", ")}</p>
            <p>Rating: {clinic.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClinicFinder;