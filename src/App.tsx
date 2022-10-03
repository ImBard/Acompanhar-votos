import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Candidato } from './components/candidato'

interface Candidato {
  nm: string;
  pvap: string;
  vot: string;
  vap: string;
  seq: string
}
function App() {
  const [data, setData] = useState<Candidato[]>([]);
  const [urnas, setUrnas] = useState<string>('');
  useEffect(() => {
    getitem()
  }, [])

  function getitem() {
    axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
      .then((response) => {
        console.log(response.data)
        setData(response.data.cand)
        setUrnas(response.data.pst)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="main">
      <div className="App">
        <h1 className='h1'>Votação Presidente 2022</h1>
        <div className="card">
          <div className='head'>
            <button className='button' onClick={getitem}>Atualizar votos</button>
            <p>Porcentagem das urnas apuradas: {urnas}%</p>
          </div>
          {data.map(item => {
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
        <footer>By Talison Cardoso</footer>
      </div>
    </div>
  )
}

export default App
