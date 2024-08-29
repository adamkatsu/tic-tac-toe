import { useState } from 'react';

function Square({value, onSquareClick}) {

  return (
    <button className='square' onClick={onSquareClick}>
      <span>{value}</span>
    </button>
  );
}

function Option({icon, onChooseClick}) {

  return (
    <button className='option' onClick={onChooseClick}>
      <span>{icon}</span>
    </button>
  )

}

function Restart({restartGame}) {

  return (
    <button className='restart' onClick={restartGame}>
      Restart
    </button>
  )

}

export default function Board() {
  const iconOptions = ['♥','☆', '☘', '☥'];
  const [player, setPlayer] = useState('Choose Your Icon');
  const [opponent, setOpponent] = useState('');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  
  function playerClick(icon) {
    if(opponent !== '' && opponent !== `Choose Opponent's Icon`){
      return;
    } else if(opponent === '') {
      setPlayer(icon);
      setOpponent(`Choose Opponent's Icon`)
    } else {
      setOpponent(icon);
    }
  }

  function handleClick(i) {
    // Check if square is not empty, do not run function (return nothing)
    if(squares[i] || calculateWinner(squares) || opponent === '' || opponent === `Choose Opponent's Icon`) {
      return;
    }

    const nextSquares = squares.slice();
    function randomNumber() {
      return Math.floor(Math.random() * 10);
    }
    const opponentIndex = randomNumber() 
    

    if(xIsNext) {
      nextSquares[i] = player;
    } else {
      nextSquares[i] = opponent;
    }

    // nextSquares[i] = player;

    // function findNull() {
    //   let foundNull = false;
    
    //   while (!foundNull) {
    //     const randomIndex = Math.floor(Math.random() * 10); // Generate a random index
    //     console.log(randomIndex);
    
    //     if (nextSquares[randomIndex] === null) {
    //       foundNull = true;
    //       nextSquares[randomIndex] = opponent; 
    //     }
    //   }
    // }
    // findNull()

    // Set squares array as nextSquares 
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

  }

  function handleRestart() {
    setSquares(squares.map((square) => null));
    setPlayer('Choose Your Icon');
    setOpponent('');
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status = '';
  if(winner) {
    status = 'Winner: ' + winner;
  }else if(squares.every(square => square !== null)) {
    status = 'Draw';
  } else {
    status = 'Next Player: ' + (xIsNext ? player : opponent);
  }

  return (
    <>
      <div className="board-wrapper">
        <div className="player"> Player: {player} </div>
        <div className="opponent"> Computer: {opponent} </div>
        <div className="choose">
          {
            iconOptions.map((iconOption) => (
              <Option icon={iconOption} onChooseClick={() => playerClick(iconOption)}/>
            ))
          }
        </div>
        <div className="status">{status}</div>
        <div className='board'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        <Restart restartGame={() => handleRestart()}/>
      </div>
      
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i = 0; i < lines.length; i++) {
    const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}

