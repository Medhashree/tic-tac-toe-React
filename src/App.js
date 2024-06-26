import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { WINNING_COMBINATIONS } from "./components/WinningCombinations";
import GameOver from "./components/GameOver";
import { useState } from "react";

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';

      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let PLAYERS = {
  'X' : 'Player 1',
  'O' : 'Player 2'
}

function App() {
  let winner;
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);


  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    })
  }

  function handleNameChange(symbol, newName){
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol] : newName
      };
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <header>
      <img src='game-logo.png'></img>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player defaultName="Player 1" symbol="X" isActive={activePlayer === 'X' } onNameChange={handleNameChange}/>
          <Player defaultName="Player 2" symbol="O" isActive={activePlayer === 'O'} onNameChange={handleNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
    </main>
  )
}

export default App
