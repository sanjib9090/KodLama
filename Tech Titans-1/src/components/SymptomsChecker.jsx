import { useState } from 'react';
import { symptoms } from '../data/symptomsData';

function SymptomsChecker() {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const symptomsList = Object.keys(symptoms);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Symptoms Checker</h2>
      <select
        className="w-full p-2 mb-4 border rounded"
        value={selectedSymptom}
        onChange={(e) => setSelectedSymptom(e.target.value)}
      >
        <option value="">Select a symptom</option>
        {symptomsList.map((symptom) => (
          <option key={symptom} value={symptom}>
            {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
          </option>
        ))}
      </select>

      {selectedSymptom && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">
            {selectedSymptom.charAt(0).toUpperCase() + selectedSymptom.slice(1)}
          </h3>
          <div className="mb-4">
            <h4 className="font-semibold">Possible Causes:</h4>
            <ul className="list-disc ml-4">
              {symptoms[selectedSymptom].possibleCauses.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Recommendations:</h4>
            <ul className="list-disc ml-4">
              {symptoms[selectedSymptom].recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SymptomsChecker;