import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./GameOver"
import Player from "./components/Player"
import { WINNING_COMBINATIONS } from "./winning-combinations"


// Constantes iniciais, define os jogadores iniciais, 
// associando o símbolo X ao "Player 1" e O ao "Player 2".
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

// Inicializa o tabuleiro de jogo com todas as posições vazias (null).
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

// Função para derivar jogador ativo
// Se não houver jogadas, o primeiro jogador é o X
// Se a ultima jogada foi do X, o proximo jogador é o O
// Retorna o jogador atual
function deriveActivePlayer(prevTurn){
  let currentPlayer = 'X'

  if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
    currentPlayer = 'O'
  }
  
  return currentPlayer
}

// Componente principal (App)

// Estado players: guarda os nomes dos jogadores (Player 1 e Player 2). Pode mudar se o jogador editar o nome.
function App(){
  const [players, setPlayers] = useState(PLAYERS)

  //Estado gameTurns: guarda todas as jogadas realizadas no jogo.
  //Cada jogada é um objeto com o player e a posição escolhida.
  const [gameTurns, setGameTurns] = useState([])

  //Estado activePlayer: guarda o jogador atual. Pode mudar quando o jogador fizer uma jogada.
  const activePlayer = deriveActivePlayer(gameTurns)

  // gameBoard: gera uma matriz 3x3 com as jogadas já feitas.
  const gameBoard = deriveGameBoard(gameTurns)

  // winner: checa se alguém venceu.
  const winner = deriveWinner(gameBoard, players)

  // hasDraw: checa se deu empate (9 jogadas sem vencedor).
  const hasDraw = gameTurns.length === 9 && !winner

  
  // Funçoes internas:
  // Chamado quando alguém clica em uma célula do tabuleiro.
  // Atualiza o estado gameTurns para incluir a nova jogada.
  // Cada jogada contém: -square: posição (linha e coluna) - player: jogador que fez a jogada(X ou O).
  function handleSquareSymbol(rowIndex, colIndex){
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn)

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurn,
      ]

      return updatedTurns
    })
  }
  
  // Reseta o jogo (zera as jogadas).
  function handleRestart(){
    setGameTurns([])
  }

  // Atualiza o nome de um jogador (X ou O ) quando ele é alterado
  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }
  
  // Cria uma cópia do tabuleiro vazio
  // Percorre cada jogada (gameTurn) e marca X ou O na posição correspondente
  // Retorna o tabuleiro atualizado
  function deriveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
    
    for(const turn of gameTurns){
      const {player, square} = turn
      const {row, col} = square
      gameBoard[row][col] = player
    }
    
    return gameBoard
  }

  // Percorre todas as combinações vencedoras possíveis.
  // Verifica se as três posições da combinação têm o mesmo símbolo (X ou O).
  // Se sim, define o vencedor como o nome do jogador correspondente.
  function deriveWinner(gameBoard, players){

    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        return players[firstSquareSymbol]
      }
    }
    return null
  }

  // Renderização JSX
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name={players.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player name={players.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard board={gameBoard} onChangeTurn={handleSquareSymbol}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App;