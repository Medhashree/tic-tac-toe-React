import { useState } from "react"

export default function Player({defaultName, symbol, isActive, onNameChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(defaultName);

    let playerName = <span className="player-name">{editName}</span>;

    function handleEditClick(){
        setIsEditing(editing => !editing);

        if(isEditing){
            onNameChange(symbol, editName);
        }
    }

    function handleNameChange(event){
        setEditName(event.target.value);
    }

    if(isEditing){
        playerName = <input type="text" required value={editName} onChange={handleNameChange}/>;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    )
}