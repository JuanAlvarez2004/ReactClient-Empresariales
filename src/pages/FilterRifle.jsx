import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const API_URL = 'http://localhost:8080/Arma'

const ReadRifle = () => {
    const [rifleFilName, setRifleFilName] = useState({
        nombre: '',
    })
    const [rifleName, setRifleName] = useState()

    const [rifleFilHD, setRifleFilHD] = useState({
        vida_minima: '', 
        dano_minimo: '',
    })
    const [riflesHD, setRiflesHD] = useState([])


    const handleInputChangeName = (e) => {
        const { name, value } = e.target
        let parsedValue = value.trim()

        if (name === 'nombre') {
            setRifleFilName({
                [name]: parsedValue
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let parsedValue = value.trim()

        setRifleFilHD(prev => ({
            ...prev,
            [name]: parseInt(parsedValue)
        }))
    }

    const handleSubmit = (e) => {
        const { name } = e.target;
        e.preventDefault();
    
        if (name === "formName") {
            {console.log(rifleFilName)}
            axios.post(`${API_URL}/buscarNombre`, rifleFilName)
                .then(({ data, status }) => {
                    if (status === 202){
                        alert('Se encontro el rifle')
                    } 
                    setRifleName(data)
                    setRifleFilName({
                        nombre: '',
                    })
                })
                .catch((error) => {
                    const { response , message } = error
                    alert(response.data)
                    console.error("Error al obtener los datos de vida:", message);
                })
        } else if (name === "formHD") {
            {console.log(rifleFilHD)}
            axios.post(`${API_URL}/filtrar`, rifleFilHD)
                .then(({ data, status }) => {
                    console.log("Rifles con H y D min: ", data)
                    if (status === 202){
                        alert('Se encontro o encontraron los rifles')
                    } 
                    setRiflesHD(data)
                    setRifleFilHD({
                        vida_minima: '', 
                        dano_minimo: '',
                    })
                })
                .catch((error) => {
                    const { response , message } = error
                    alert(response.data)
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
                    <input name="nombre" value={rifleFilName.nombre} onChange={handleInputChangeName} type="text" required/>
                </div>
                <button className='btnSubmit' type='submit'>Consultar</button>
            </form>
        </div>
        <div className='container-content'>
            <h1>Rifles</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cap. Municion</th>
                    <th>Daño</th> 
                    <th>Fecha Creacion</th>
                    <th>Munición</th> 
                    <th>Velocidad</th>
                    <th>Vida</th>
                    <th>Distancia</th>
                    <th>Tipo munición</th>
                </tr>
                </thead>
                <tbody>
                {
                (() => {
                    if (rifleName) {
                        return (
                            <tr key={rifleName.id}>
                                <td>{rifleName.nombre}</td>
                                <td>{rifleName.capMunicion}</td>
                                <td>{rifleName.daño}</td>
                                <td>{rifleName.fechaCreacion}</td>
                                <td>{rifleName.municion}</td>
                                <td>{rifleName.velocidad}</td>
                                <td>{rifleName.vida}</td>
                                <td>{rifleName.distancia}</td>
                                <td>{
                                    (() => {
                                        const {cadencia, dañoArea, nombre} = rifleName.tipoMunicion
                                        return <>
                                            <li style={{listStyleType: 'circle'}}>Cadencia: {cadencia}</li>
                                            <li style={{listStyleType: 'circle'}}>Daño Area: {dañoArea ? "true" : "false"}</li>
                                            <li style={{listStyleType: 'circle'}}>Nombre: {nombre}</li>
                                        </>
                                    })()
                                }</td>
                            </tr>
                        )
                    } 
                    return (
                        <tr>
                        <td colSpan="9" style={{textAlign: "center"}}>No hay rifles en este momento</td>
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
            <h1>Listar por vida y daño minimo</h1>
            <form name='formHD' onSubmit={handleSubmit}>
                <div>
                    <label>Vida mínima</label>
                    <input name="vida_minima" value={rifleFilHD.vida_minima === "" ? "" : rifleFilHD.vida_minima || ""} onChange={handleInputChange} type="number" min="0" required/>
                </div>
                <div>
                    <label>Daño mínimo</label>
                    <input name="dano_minimo" value={rifleFilHD.dano_minimo === "" ? "" : rifleFilHD.dano_minimo || ""} onChange={handleInputChange} type="number" min="0" required/>
                </div>
                <button className='btnSubmit' type='submit'>Listar</button>
            </form>
        </div>
        <div className='container-content'>
            <h1>Rifles</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cap. Municion</th>
                    <th>Daño</th> 
                    <th>Fecha Creacion</th>
                    <th>Munición</th> 
                    <th>Velocidad</th>
                    <th>Vida</th>
                    <th>Distancia</th>
                    <th>Tipo munición</th>
                </tr>
                </thead>
                <tbody>
                {
                (() => {
                    if (riflesHD.length > 0) {
                        return (riflesHD.map((rifle) => (
                            <tr key={rifle.id}>
                                <td>{rifle.nombre}</td>
                                <td>{rifle.capMunicion}</td>
                                <td>{rifle.daño}</td>
                                <td>{(() => {
                                    let year = rifle.fechaCreacion[0]
                                    let month = rifle.fechaCreacion[1]
                                    let day = rifle.fechaCreacion[2]
                                    return `${year}-${month}-${day}`
                                })()}
                                </td>
                                <td>{rifle.municion}</td>
                                <td>{rifle.velocidad}</td>
                                <td>{rifle.vida}</td>
                                <td>{rifle.distancia}</td>
                                <td>{
                                    (() => {
                                        const {cadencia, dañoArea, nombre} = rifle.tipoMunicion
                                        return <>
                                            <li style={{listStyleType: 'circle'}}>Cadencia: {cadencia}</li>
                                            <li style={{listStyleType: 'circle'}}>Daño Area: {dañoArea ? "true" : "false"}</li>
                                            <li style={{listStyleType: 'circle'}}>Nombre: {nombre}</li>
                                        </>
                                    })()
                                }</td>
                            </tr>
                        )))
                    }
                    return (
                        <tr>
                        <td colSpan="9" style={{textAlign: "center"}}>No hay rifles en este momento</td>
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

export default ReadRifle