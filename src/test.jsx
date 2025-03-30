import React, { useState } from "react";

// Componente de Filtro
const Filter = ({ filterValue, onFilterChange }) => (
  <div>
    filter shown with{" "}
    <input 
      type="text" 
      onChange={onFilterChange} 
      value={filterValue} 
    />
  </div>
);

// Componente de Formulario de Persona
const PersonForm = ({ 
  onSubmit, 
  nameValue, 
  numberValue, 
  onNameChange, 
  onNumberChange 
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name:{" "}
      <input
        type="text"
        onChange={onNameChange}
        value={nameValue}
      />
    </div>
    <div>
      number:{" "}
      <input
        type="text"
        onChange={onNumberChange}
        value={numberValue}
      />
    </div>
    <div>
      <button type="submit">Añadir</button>
    </div>
  </form>
);

// Componente de Lista de Personas
const Persons = ({ persons, filterValue }) => {
  const filteredPersons = filterValue
    ? persons.filter((p) => 
        p.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    : persons;

  return (
    <>
      {filteredPersons.map((p, index) => (
        <div key={`${p.name}-${index}`}>
          <p>
            {p.name} {p.number}
          </p>
        </div>
      ))}
    </>
  );
};

// Componente Principal App
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

  const [filterPerson, setFilterPerson] = useState("");

  const handleChangeName = (event) => {
    setNewPerson((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleChangeNumber = (event) => {
    setNewPerson((prevState) => ({
      ...prevState,
      number: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newPerson.name || !newPerson.number) {
      alert("Por favor, introduce un nombre y número");
      return;
    }

    const personExists = persons.some((p) => p.name === newPerson.name);

    if (personExists) {
      alert(`${newPerson.name} ya está añadido a la agenda`);
      return;
    }

    setPersons([...persons, { ...newPerson, id: persons.length + 1 }]);
    setNewPerson({
      name: "",
      number: "",
    });
  };

  const handleFilter = (event) => {
    setFilterPerson(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        filterValue={filterPerson} 
        onFilterChange={handleFilter} 
      />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={handleSubmit}
        nameValue={newPerson.name}
        numberValue={newPerson.number}
        onNameChange={handleChangeName}
        onNumberChange={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons 
        persons={persons} 
        filterValue={filterPerson} 
      />
    </div>
  );
};

export default App;