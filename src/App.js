import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      url: 'www.google.com.br',
      techs: [
        "test1",
        "test2"
      ],
      likes: 0
    });

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return ( <div>
    <ul data-testid = "repository-list">

    {repositories.map(repo => ( <li key = {repo.id}>
        
        <h3><strong> Repository: </strong></h3><span> {repo.title}</span>

        <button onClick = {() => handleRemoveRepository(repo.id)}>Remover</button>
        </li>
      ))
    }
    </ul>

    <button onClick = {handleAddRepository}>Adicionar</button> 
    </div>
  );
}

export default App;
