import axios from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { Candidato } from './components/card'
import lula from "./assets/lula.jpeg";
import bolso from "./assets/jair.jpeg";
import './modal.css';
import close from './assets/close.png';
import './loader.css';
import ProgressBar from './components/progressBar';


interface Candidato {
  nm: string;
  cc: string;
  n: string;
  nv: string;
  pvap: string;
  vap: string;
  seq: string;
  img: string;
  st: string
}
function App(props: any) {
  const [data, setData] = useState<Candidato[]>([]);
  const [urnas, setUrnas] = useState<string>('');
  const [totVot, setTotVot] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [att, setAtt] = useState<boolean>(true);
  const [modalCand, setModalCand] = useState<Candidato>();

  useEffect(() => {
    getitem()
  }, [])

  function getitem() {
    setAtt(false)
    axios({
      url: 'https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json',
      method: "GET",
      timeout: 5000,
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response: { data: { cand: SetStateAction<Candidato[]>; pst: string; st: SetStateAction<string>; }; }) => {
        setData(response.data.cand)
        setUrnas(response.data.pst.replace(',', "."))
        setTotVot(response.data.st)
        setAtt(true)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  function Img(img?: string) {
    if (img == "LULA") {
      return lula
    }
    else {
      return bolso
    }
  }

  const testData = [
    { bgcolor: "", completed: 60 },
    { bgcolor: "#00695c", completed: 30 },
    { bgcolor: "#ef6c00", completed: 53 },
  ];

  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);

  return (
    <div className="App">
      <h1 className='h1'>Apuração presidencial 2022</h1>

      <main>
        <div className="per">
          <h3>Porcentagem apurada até o momento</h3>
          <span>{totVot} Votos</span>
          <ProgressBar bgcolor={'#6a1b9a'} completed={urnas} />
        </div>

        <h3 className='title'>Candidatos</h3>

        {data.map(item => {
          return (
            <Candidato
              partido={item.cc.slice(0, 2)}
              votos={item.vap}
              name={item.nm}
              vice={item.nv}
              per={item.pvap}
              key={item.seq}
              img={Img(item.nm)}
              n={item.n}
              open={() => [setShowModal(true), setModalCand(item)]}
            />
          )
        })}

        {att &&
          <button className='att' onClick={getitem}>Atualizar porcentagem apurada</button>
        }

        {!att &&
          <div className="lds-dual-ring"></div>
        }
      </main>

      {showModal &&
        <div className="modal">
          <div className="cardModal">
            <div className='top'>
              <button onClick={() => setShowModal(false)}><img src={close} alt="" /></button>
            </div>
            <img src={Img(modalCand?.nm)} alt="" />
            <span className='votos'>{modalCand?.vap} Votos • {modalCand?.pvap}%</span>

            <span className='name'>{modalCand?.n} - {modalCand?.nm}</span>

            <hr />
            <div className='bottom'>
              <label htmlFor="vice">
                Vice-Presidente:
                <span id='vice'>{modalCand?.nv}</span>
              </label>

              <label htmlFor="partido">
                Partido:
                <span>{modalCand?.cc.slice(0, 2)}</span>
              </label>
              <label htmlFor="colig">
                Coligação / Federação:
                <span id='colig'>{modalCand?.cc}</span>
              </label>
            </div>
          </div>
        </div>
      }

      <footer>By Talison Cardoso</footer>
    </div>
  )
}

export default App
