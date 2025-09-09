import { useState } from "react"

export default function Player({name, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(name)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing((editing) => !editing)
        if(isEditing){
            onChangeName(symbol, playerName)
        }
        
    }

    function handleChange(e){
        setPlayerName(e.target.value)
    }

    let playerNameEditing = <span className="player-name">{playerName}</span>

    if(isEditing){
        playerNameEditing = <input type="text" value={playerName} onChange={handleChange}/>
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerNameEditing}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>  
          </li>
          
    )
}