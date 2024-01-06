/* eslint-disable react/prop-types */
import { useState } from 'react'

function Square({value, onSquareClick}){

  return <button onClick={onSquareClick} className="square">{value}</button>
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)) return;
    const newSquare = squares.slice();
    newSquare[i] = xIsNext ? 'X' : 'O';
    onPlay(newSquare);
  }

  const winner = calculateWinner(squares);
  let status = '';
  if(winner){
    status = 'Winner: '+ winner;
  } else{
    status = 'Next player: '+ (xIsNext? 'X' : 'O');
  }

  return (
    <>
    <h1>{status}</h1>    
    <div className='board'>
       {squares.map((value, index) => (
        <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
      ))}
    </div>
    </>
  )
}

export default function Game(){
  const [history, seHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  function handlePlay(newSquares){
    const newHistory = [...history.slice(0, currentMove + 1), newSquares]
    seHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  const moves = history.map((squares, move)=>{
    let text = '';
    if(move > 0){
      text = 'Go to Move #' + move;
    } else{
      text = 'Go to game Start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {text}
        </button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
