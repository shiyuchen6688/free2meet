import React from 'react'
import Place from './Place'

function Places({placesList, selection, updateMethod, invitationState}) {
    return (
        <div>
            {placesList.map(place => (
                <Place 
                key={place.place_id} 
                item={place} 
                invitation={invitationState} 
                currentSelection={selection} 
                updateMethod={updateMethod}/>
            ))}
        </div>
    )
}

export default Places