import "../styleCard.css"

interface Candidato {
  name: string;
  per: string
  vot: string
}

export function Candidato(props: Candidato) {
  return (
    <div className="candidato">
      <div className="nome">
        <h2>Candidato:</h2>
        <h2 className="h2">{props.name}</h2>
      </div>

      <div className="nome">
        <h2>Porcemtagem:</h2>
        <h2 className="h2">{props.per}</h2>
      </div>

      <div className="nome">
        <h2>Votos:</h2>
        <h1 className="h2">{props.vot}</h1>
      </div>

    </div>
  )
}