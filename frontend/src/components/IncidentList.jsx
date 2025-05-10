import { useEffect, useState } from 'react';
import axios from 'axios';
import './IncidentList.css';

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const loadData = async () => {
    try {
      const res = await axios.get('/api/incidents');
      setIncidents(res.data);
    } catch (err) {
      console.error('Ошибка загрузки инцидентов:', err);
    }
  };

  const resolveIncident = async (id) => {
    try {
      await axios.post(
        `/api/resolve/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      loadData();
    } catch (err) {
      console.error('Ошибка при завершении инцидента:', err);
    }
  };

  const deleteIncident = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`, {
        headers: { Authorization: token },
      });
      loadData();
    } catch (err) {
      console.error('Ошибка при удалении инцидента:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="incident-list">
      <h2>📋 Журнал инцидентов</h2>
      {incidents.length === 0 ? (
        <p>Инцидентов пока нет.</p>
      ) : (
        incidents.map((i) => (
          <div
            key={i.id}
            className={`incident-card ${i.resolved ? 'resolved' : 'unresolved'}`}
          >
            <div className="incident-description">
              <strong>[{i.type}]</strong> {i.description} —{' '}
              {i.resolved ? (
                <span className="status-ok">✅ задержан!</span>
              ) : (
                <span className="status-alert">❗ тревога</span>
              )}
            </div>
            {role === 'admin' && (
              <div className="buttons">
                {!i.resolved && (
                  <button onClick={() => resolveIncident(i.id)}>Задержать!</button>
                )}
                <button className="delete" onClick={() => deleteIncident(i.id)}>
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
