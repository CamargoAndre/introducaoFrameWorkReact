class Quadrado extends React.Component {
  //não precisa mais do construtor
  /*
  constructor(props){
    super(props);
    this.state = {value:null,};
  }*/
  render() {
    return (
      React.createElement("button", { className: "quadrado",
        onClick: () => {this.props.onClick();} },
      this.props.value));


  }}




/*function Quadrado (props){
       return(
         <button className="square" onClick={props.onClick}>
         {props.value}
         </button>
       );
     }
     */


class Tabuleiro extends React.Component {

  //adicionar construtor
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xlsNext: true };

    //this.state = {quadrados : Array(9).fill(null)};
  }

  //ajuste no método
  renderizarQuadrado(i) {
    return (
      React.createElement(Quadrado, { value: this.state.quadrados[i], onClick: () => this.handleClick(i) })
      /*
                                                                                                              <Quadrado value={this.state.quadrados[i]} />
                                                                                                            -------------------------------------------------------------------- 
                                                                                                              <Quadrado
                                                                                                                value={this.props.quadrados[i]}
                                                                                                                onClick={() => {alert("Clicou " + (this.props.quadrados[i]))
                                                                                                               }}
                                                                                                               />
                                                                                                               */);

  }

  handleClick(i) {
    //faz uma copia do vetor
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert('Jogo já acabou');
      return;
    }
    if (quadrados[i]) {
      alert('Quadrado ocupado!');
      return;
    }

    quadrados[i] = this.state.xlsNext ? 'X' : 'O';
    this.setState({
      quadrados: quadrados,
      xlsNext: !this.state.xlsNext });

  }

  jogadaRandom() {

    let r = random();
    const quadrado = this.state.quadrados;

    if (calculateWinner(quadrado)) {
      alert('Jogo já acabou');
      return;
    }

    if (quadradosPreenchidos(quadrado)) {
      alert('O tabuleiro esta cheio');
      return;

    }

    let x = jogadaInteligente(quadrado);
    if (x >= 0) {

      quadrado[x] =
      this.state.xlsNext ? 'X' : 'O';this.setState(
      { quadrados: quadrado, xlsNext: !this.state.xlsNext });


      return;

    }
    while (quadrado[r]) {
      r = random();
    }

    quadrado[r] =
    this.state.xlsNext ? 'X' : 'O';this.setState(
    { quadrados: quadrado, xlsNext: !this.state.xlsNext });

  }

  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    let status;
    if (vencedor) {
      status = 'Vencedor: ' + vencedor;
    } else
    {
      status = 'Jogador: ' + (this.state.xlsNext ? 'X' : 'O');
    }

    //const status = 'Jogador: ' + (this.state.xlsNext ? 'X' : 'O');
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "status" }, status),
      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8)),

      React.createElement("div", null,
      React.createElement("table", null,
      React.createElement("tr", null,
      React.createElement("button", { onClick: () => this.jogadaRandom() }, " ", 'Random', " ")),

      React.createElement("tr", null,
      React.createElement("button", { onClick: () => this.setState({ quadrados: Array(9).fill(null), xlsNext: true }) }, " ", 'Reset', " "))))));





  }}


class Jogo extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },
      React.createElement("div", { className: "game-board" },
      React.createElement(Tabuleiro, { quadrados: Array(9).fill().map((value, pos) => pos) })),

      React.createElement("div", { className: "game-info" },
      React.createElement("ol", null, React.createElement("button", null, "Movimentos")))));



  }}


//--------------------------------------------------------

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function jogadaInteligente(square) {
  const lines = [
  [0, 1, 2], [1, 2, 0], [0, 2, 1],
  [3, 4, 5], [4, 5, 3], [3, 5, 4],
  [6, 7, 8], [7, 8, 6], [6, 8, 7],
  [0, 3, 6], [3, 6, 0], [0, 6, 3],
  [1, 4, 7], [4, 7, 1], [1, 7, 4],
  [2, 5, 8], [5, 8, 2], [2, 8, 5],
  [0, 4, 8], [4, 8, 0], [0, 8, 4],
  [2, 4, 6], [4, 6, 2], [2, 6, 4]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[b] && square[a] === square[b] && !square[c]) {
      return c;
    }
  }

  return null;

}


function quadradosPreenchidos(quadrados) {
  const x = 1;
  for (let j = 0; j < quadrados.length; j++) {

    if (!quadrados[j]) {

      return null;
    }

  }

  return x;
}

function random() {

  return r = getRandomInt(0, 9);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


//--------------------------------------------------------

ReactDOM.render(
React.createElement(Jogo, null),
document.getElementById("root"));



/*
                                  ReactDOM.render(
                                    <Tabuleiro quadrados={Array(9).fill().map((value,pos) => pos)} />,
                                    document.getElementById('root')
                                  );
                                  */
/*
                                     ReactDOM.render(
                                       <Quadrado 
                                         onClick={()=> {alert('Clicou!')}}
                                         value ={2+2} 
                                       />,
                                       document.getElementById('root')
                                     );
                                     */