import React, { useState } from 'react';
import axios from 'axios';
import './BaggageScanner.css'; // Подключаем стили

const allowedItems = ['одежда', 'книги', 'зубная щётка', 'наушники', 'ноутбук', 'бутылка воды', 'вилка', 'пауэрбанк', 'плед'];
const forbiddenItems = ['нож', 'пистолет', 'взрывчатка'];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomBaggage() {
  const items = [...allowedItems];
  shuffle(items);
  let selected = items.slice(0, Math.floor(Math.random() * 4) + 2);
  if (Math.random() < 0.1) {
    const forbidden = forbiddenItems[Math.floor(Math.random() * forbiddenItems.length)];
    selected.splice(Math.floor(Math.random() * selected.length), 0, forbidden);
  }
  return selected.join(', ');
}

export default function BaggageScanner() {
  const [result, setResult] = useState('');
  const [baggage, setBaggage] = useState('');
  const [history, setHistory] = useState([]);

  const handleScan = async () => {
    const generated = getRandomBaggage();
    setBaggage(generated);
    try {
      const res = await axios.post('/api/scan_baggage', {
        contents: generated,
      });
      setResult(res.data.result);
      const newEntry = {
        contents: generated,
        result: res.data.result,
        incident: res.data.incident,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 4)]);
    } catch (err) {
      console.error(err);
      setResult('Ошибка при сканировании багажа');
    }
  };

  return (
    <div className="baggage-scanner">
      <h2>📦 Сканер багажа</h2>
      <button onClick={handleScan}>Сканировать</button>

      {result && (
        <p className={result.includes('Обнаружен') ? 'alert-text' : 'ok-text'}>
          <strong>Результат:</strong> {result}
        </p>
      )}

      <h3>Последние сканирования</h3>
      <ul className="scan-log">
        {history.map((item, idx) => (
          <li key={idx} className={item.incident ? 'alert' : 'ok'}>
            <strong>[{item.timestamp}]</strong> {item.contents} → {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}
