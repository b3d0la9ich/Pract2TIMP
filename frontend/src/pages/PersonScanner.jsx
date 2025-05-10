import React, { useState } from 'react';
import axios from 'axios';
import './PersonScanner.css';

export default function PersonScanner() {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const [statusColor, setStatusColor] = useState('gray');

  const handleScan = async () => {
    setResult('');
    setStatusColor('gray');
    setScanning(true);

    setTimeout(async () => {
      try {
        const res = await axios.post('/api/scan_person');
        setResult(res.data.result);
        setStatusColor(res.data.incident ? 'red' : 'green');
      } catch (err) {
        console.error(err);
        setResult('Ошибка при сканировании');
        setStatusColor('black');
      }
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="scanner-container">
      <h2>🧍 Сканер человека</h2>
      <button onClick={handleScan} disabled={scanning}>
        {scanning ? 'Сканирую...' : 'Сканировать'}
      </button>

      <div className={`status-indicator ${statusColor}`}>
        {scanning ? '...' : result ? (statusColor === 'red' ? '🚨' : '✅') : ''}
      </div>

      {result && <p><strong>Результат:</strong> {result}</p>}
    </div>
  );
}
