import React from 'react'
import Place from './Place'

function Places({placesList, selection, updateMethod}) {
    return (
        <div>
            {placesList.map(place => (
                <Place 
                key={place.place_id} 
                item={place} 
                invitation={true} 
                currentSelection={selection} 
                updateMethod={updateMethod}/>
            ))}
        </div>
    )
}

export default Places