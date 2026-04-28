// src/pages/students/Scheme.jsx
import React, { useState } from 'react';
import campusMapImage from '/public/stud-gorodok.jpg';
import './Scheme.css';

// Данные о зданиях с координатами областей (нужно откалибровать под вашу карту)
const buildings = [
  {
    id: 1,
    name: 'Корпус №1 – ул. Космонавтов, 1',
    coords: [240, 40, 280, 40, 280, 80, 240, 80], // прямоугольник: x1,y1, x2,y2, x3,y3, x4,y4
    shape: 'poly',
    color: '#4caf50'
  },
  {
    id: 2,
    name: 'Корпус №2 – ул. Космонавтов, 8/3',
    coords: [360, 40, 400, 40, 400, 80, 360, 80],
    shape: 'poly',
    color: '#4caf50'
  },
  // Добавьте все остальные здания (3–19) по аналогии с вашим списком
  {
    id: 10,
    name: 'Общежитие №1 – ул. Космонавтов, 2',
    coords: [470, 200, 510, 200, 510, 240, 470, 240],
    shape: 'poly',
    color: '#2196f3'
  },
  // ... остальные
];

const Scheme = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleMouseEnter = (id) => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);
  const handleClick = (id, name) => {
    setSelectedId(id);
    console.log(`Выбрано здание: ${name}`);
  };

  // Получаем данные выбранного здания для отображения в панели
  const selectedBuilding = buildings.find(b => b.id === selectedId);
  const hoveredBuilding = buildings.find(b => b.id === hoveredId);

  return (
    <div className="campus-map-container">
      <div className="map-wrapper">
        {/* Картинка карты с областями */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <a href="https://yandex.ru/maps/-/CPG4IPjv" target="_blank" rel="noopener noreferrer">
            <img src={campusMapImage} alt="Схема" />
            </a>
          <map name="campus-map">
            {buildings.map((building) => (
              <area
                key={building.id}
                shape={building.shape}
                coords={building.coords.join(',')}
                href="#"
                onMouseEnter={() => handleMouseEnter(building.id)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(building.id, building.name);
                }}
                style={{ cursor: 'pointer' }}
                alt={building.name}
                title={building.name}
              />
            ))}
          </map>

          {/* Опционально: отображение всплывающей метки при наведении */}
          {hoveredBuilding && (
            <div
              className="hover-tooltip"
              style={{
                position: 'absolute',
                background: '#1e293b',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                transform: 'translate(-50%, -120%)',
                zIndex: 10,
              }}
            >
              {hoveredBuilding.name}
            </div>
          )}
        </div>
      </div>

      {/* Информационная панель */}
      <div className="info-panel">
        {selectedBuilding && (
          <div className="selected-info">
            <h3>Выбранный объект:</h3>
            <p>{selectedBuilding.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheme;