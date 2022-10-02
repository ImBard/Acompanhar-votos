import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Candidato } from './components/candidato'

function App() {

  const [data, setData] = useState<any[]>();
  useEffect(() => {
    getitem()
  }, [])

  function getitem() {
    axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
      .then((response) => {
        console.log(response.data.cand)
        setData(response.data.cand)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="App">
      <div className="card">
        <h1>Votação Presidente 2022</h1>

        {data?.map(item => {
          return (
            <Candidato
              name={item.nm}
              per={item.pvap}
              vot={item.vap}
              key={item.seq}
            />
          )
        })

        }

      </div>
    </div>
  )
}

export default App
