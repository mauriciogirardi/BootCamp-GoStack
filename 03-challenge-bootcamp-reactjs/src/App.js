import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setReposirories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setReposirories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'https://github.com/mauriciogirardi/GameReact',
      techs: ['React.js', 'javascript'],
    })

    const repository = response.data

    setReposirories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setReposirories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
