export default function GameBoard({onChangeTurn, board}){

    //
    //    const [gameBoard, setGameBoard] = useState(initialGame)
    
    //    function handleSelectGame(rowIndex, colIndex){
    //        setGameBoard((prevGame)=>{
    //            const updateGame = [...prevGame.map(innerArray => [...innerArray])]
    //            updateGame[rowIndex][colIndex] = activePlayer
    //            return updateGame
    //        })
    //        onChangeTurn()
    //    }
    //
        return(
            <ol id="game-board">
                {board.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((symbol, colIndex) => (   
                                <li key={colIndex}>
                                    <button onClick={() => onChangeTurn( rowIndex, colIndex)} disabled={symbol !== null}>{symbol}</button>
                                </li>
                            ))}
                        </ol>
                    </li>
                    ))
                }
               
            </ol>
        )
    }

    
