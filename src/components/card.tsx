interface Cand {
  name: string;
  per: string;
  votos: string;
  partido: string;
  n: string;
  vice: string;
  img: string
  open: any;
}

export function Candidato( props: Cand) {

  return (
    <div className="card" role="button" onClick={() => props.open()}>
      <div className="lf">
        <img src={props.img} alt="imagem do candidato" />
        <span className="name">{props.name}</span>
        <span className="partid">
          {props.partido} - {props.n}
        </span>
        <span className="vice">Vice: {props.vice}</span>
      </div>

      <div className="rt">
        <span>
          {props.per}%
        </span>
        <span>
          {props.votos} Votos
        </span>
      </div>
    </div>
  )
}