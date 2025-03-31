import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import CreateRead from './components/CreateRead.jsx';
import Delete from './components/Delete.jsx'
import './styles/app.css';

const HomePage = () => {
  return (
    <>
      <div className='container-home'>
        <h1>Bienvenido a la página principal</h1>
        <p>⚠️ Advertencia: El acceso, distribución o uso indebido de la información contenida en esta página es responsabilidad exclusiva del usuario. No nos hacemos responsables por el mal uso de los datos aquí expuestos. Si accedes a este sitio, aceptas hacerlo bajo tu propia responsabilidad y con pleno conocimiento de las leyes y normativas aplicables en tu jurisdicción.</p>
        <p>By: Juan Alvarez, Juan Forero, Sebastian Acosta.</p>
      </div>
    </>
  );
}

const App = () => {
  return (
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create_read">Create-Read</Link>
          </li>
          <li>
            <Link to="/update">Update</Link>
          </li>
          <li>
            <Link to="/delete">Delete</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/create_read" element={<CreateRead />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </div>
  );
}

export default App