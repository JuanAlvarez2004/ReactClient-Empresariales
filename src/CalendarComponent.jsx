import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ date, onChange }) => {
  // Usar la fecha proporcionada como prop o la fecha actual si no hay prop
  const [selectedDate, setSelectedDate] = useState(date ? new Date(date) : new Date());

  // Manejar el cambio de fecha en el calendario
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    
    // Formatear la fecha al formato requerido: YYYY-MM-DDThh:mm:ss
    const now = new Date(); // Hora actual
    
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    
    // Enviar la fecha formateada al componente padre
    if (onChange) {
      onChange(formattedDate);
    }
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={selectedDate} 
      />
      <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
    </div>
  );
}

export default MyCalendar;