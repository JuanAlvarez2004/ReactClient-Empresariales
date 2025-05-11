import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const API_URL = 'http://localhost:8080/Municion'

const ReadMunicion = () => {
    const [municionFilName, setMunicionFilName] = useState({
        nombre: '',
    })
    const [municionName, setMunicionName] = useState()

    const [municionFilCD, setMunicionFilCD] = useState({
        cadencia_minima: '', 
        danoArea: false,
    })
    const [municionesCD, setMunicionesCD] = useState([])


    const handleInputChangeName = (e) => {
        const { name, value } = e.target
        let parsedValue = value.trim()

        if (name === 'nombre') {
            setMunicionFilName({
                [name]: parsedValue
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target
        let parsedValue = value.trim()

        if (name === 'danoArea') {
            parsedValue = checked
        }

        if (name === 'cadencia_minima') {
            parsedValue = parseInt(parsedValue)
        }

        setMunicionFilCD(prev => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    const handleSubmit = (e) => {
        const { name } = e.target;
        e.preventDefault();
    
        if (name === "formName") {
            {console.log(municionFilName)}
            axios.post(`${API_URL}/buscarNombre/`, municionFilName)
                .then(({ data, status }) => {
                    console.log("Municion por nombre: ", data)
                    if (status === 202){
                        alert('Se encontro la munición')
                    } 
                    setMunicionName(data)
                    setMunicionFilName({
                        nombre: '',
                    })
                })
                .catch((error) => {
                    const { response , message } = error
                    alert(response.data)
                    console.error("Error al obtener los datos de vida:", message);
                })
        } else if (name === "formCD") {
            {console.log(municionFilCD)}
            axios.post(`${API_URL}/filtrarMunicion`, municionFilCD)
                .then(({ data, status }) => {
                    console.log("Rifles con C min y D: ", data)
                    if (status === 202){
                        alert('Se encontro o encontraron las municiones')
                    } 
                    setMunicionesCD(data)
                    setMunicionFilCD({
                        cadencia_minima: '', 
                        danoArea: false,
                    })
                })
                .catch((error) => {
                    const { message } = error
                    console.error("Error al obtener los datos de vida:", message);
                })
        }
    }
    

    return (
    <div id='read-container' className='container'>
        <div className='read-container'>
        <div className='container-content'>
            <h1>Consultar por nombre</h1>
            <form name='formName' onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input name="nombre" value={municionFilName.nombre} onChange={handleInputChangeName} type="text" required/>
                </div>
                <button className='btnSubmit' type='submit'>Consultar</button>
            </form>
        </div>
        <div className='container-content'>
            <h1>Municiones</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cadencia</th>
                        <th>Daño en área</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                    (() => {
                        if (municionName) {
                            return (
                                <tr key={municionName.id}>
                                    <td>{municionName.nombre}</td>
                                    <td>{municionName.cadencia}</td>
                                    <td>{String(municionName.danoArea)}</td>
                                </tr>
                            )
                        }
                        return (
                            <tr>
                            <td colSpan="3" style={{textAlign: "center"}}>No hay municiones en este momento</td>
                            </tr>
                        )
                    })()
                    }
                </tbody>
            </table>
        </div>
        </div>
        
        <div className='read-container'>
        <div className='container-content'>
            <h1>Listar por cadencia minima y daño en área</h1>
            <form name='formCD' onSubmit={handleSubmit}>
                <div>
                    <label>Cadencia mínima</label>
                    <input name="cadencia_minima" value={municionFilCD.cadencia_minima === "" ? "" : municionFilCD.cadencia_minima || ""} onChange={handleInputChange} type="number" min="0" required/>
                </div>
                <div>
                    <label>Daño en área</label>
                    <input style={{
                        accentColor: "green",       
                        width: "20px",            
                        height: "20px",
                        cursor: "pointer",        
                        margin: "5px",
                        verticalAlign: "middle"
                    }}  name='danoArea' checked={municionFilCD.danoArea} onChange={handleInputChange} type="checkbox" />
                </div>
                <button className='btnSubmit' type='submit'>Listar</button>
            </form>
        </div>
        <div className='container-content'>
            <h1>Municiones</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cadencia</th>
                    <th>Daño en área</th> 
                </tr>
                </thead>
                <tbody>
                {
                (() => {
                    if (municionesCD.length > 0) {
                        return (municionesCD.map((municion) => (
                            <tr key={municion.id}>
                            <td>{municion.nombre}</td>
                            <td>{municion.cadencia}</td>
                            <td>{String(municion.dañoArea)}</td>
                        </tr>
                        )))
                    }
                    return (
                        <tr>
                            <td colSpan="3" style={{textAlign: "center"}}>No hay municiones en este momento</td>
                        </tr>
                    )
                })()
                }
                </tbody>
            </table>
        </div>
        </div>
    </div>
    )

}

export default ReadMunicion