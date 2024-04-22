import React, { useState, useEffect } from 'react';
import StationService from './StationService';

const StationsComponent = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await StationService.getStations();
        setStations(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStations();
  }, []);

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <div className="stations-container">
        {stations.map((station) => (
          <div key={station._id}>
            <p>{station.station}</p>
            <p>{station.rating}</p>
            <p>{station.description}</p>
            <p>{station.createdAt.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationsComponent;
