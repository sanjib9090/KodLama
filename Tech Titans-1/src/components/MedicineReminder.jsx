import { useState } from 'react';
import { medicines } from '../data/medicineData';

function MedicineReminder() {
  const [reminders, setReminders] = useState(medicines);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Medicine Reminders</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reminders.map((medicine) => (
          <div key={medicine.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{medicine.name}</h3>
            <p>Dosage: {medicine.dosage}</p>
            <p>Frequency: {medicine.frequency}</p>
            <p>Times: {medicine.time.join(", ")}</p>
            <p>Duration: {medicine.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicineReminder;