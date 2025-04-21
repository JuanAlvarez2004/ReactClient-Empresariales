import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CreateRifle from './pages/CreateRifle.jsx'
import ListRifle from './pages/ListRifle.jsx'
import FilterRifle from './pages/FilterRifle.jsx'
import UpdateRifle from './pages/UpdateRifle.jsx'
import DeleteRifle from './pages/DeleteRifle.jsx'
import CreateMunicion from './pages/CreateMunicion.jsx'
import ListMunicion from './pages/ListMunicion.jsx'
import UpdateMunicion from './pages/UpdateMunicion.jsx'
import DeleteMunicion from './pages/DeleteMunicion.jsx'
import FilterMunicion from './pages/FilterMunicion.jsx'
import './styles/app.css'

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

const RifleCRUD = () => {
  return (
    <ul className='ulNavDesplegable'>
      <li>
        <Link to="/createRifle">Create</Link>
      </li>
      <li>
        <Link to="/listRifle">List</Link>
      </li>
      <li>
        <Link to="/filterRifle">Filter</Link>
      </li>
      <li>
        <Link to="/updateRifle">Update</Link>
      </li>
      <li>
        <Link to="/deleteRifle">Delete</Link>
      </li>
    </ul>
  )
}

const MunicionCRUD = () => {
  return (
    <ul className='ulNavDesplegable'>
      <li>
        <Link to="/createMunicion">Create</Link>
      </li>
      <li>
        <Link to="/listMunicion">List</Link>
      </li>
      <li>
        <Link to="/filterMunicion">Filter</Link>
      </li>
      <li>
        <Link to="/updateMunicion">Update</Link>
      </li>
      <li>
        <Link to="/deleteMunicion">Delete</Link>
      </li>
    </ul>
  )
}

const App = () => {
  const [btnRifle, setBtnRifle] = useState(false)
  const [btnMunicion, setBtnMunicion] = useState(false)

  return (
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/"><img src="/home.svg" alt="home" /></Link>
          </li>
          <ul>
            <button 
            onClick={() => btnMunicion ? setBtnMunicion(false) : setBtnRifle(!btnRifle)}
            className={(btnRifle ? 'btnNav' : 'btnNavOff')}>
              Rifle
            </button>
            {btnRifle && <RifleCRUD />}
          </ul>

          <ul>
            <button 
            onClick={() => btnRifle ? setBtnRifle(false) : setBtnMunicion(!btnMunicion)}
            className={(btnMunicion ? 'btnNav' : 'btnNavOff')}>
              Munición
            </button>
            {btnMunicion && <MunicionCRUD />}
          </ul>
          
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/createRifle" element={<CreateRifle />} />
        <Route path="/listRifle" element={<ListRifle />} />
        <Route path="/filterRifle" element={<FilterRifle />} />
        <Route path="/updateRifle" element={<UpdateRifle />} />
        <Route path="/deleteRifle" element={<DeleteRifle />} />

        <Route path="/createMunicion" element={<CreateMunicion />} />
        <Route path="/listMunicion" element={<ListMunicion />} />
        <Route path="/updateMunicion" element={<UpdateMunicion />} />
        <Route path="/deleteMunicion" element={<DeleteMunicion />} /> 
        <Route path="/filterMunicion" element={<FilterMunicion />} />
        
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App