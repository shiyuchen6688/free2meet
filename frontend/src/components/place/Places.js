import React from 'react';
import Place from './Place';

function Places({ placesList, selection, updateMethod, invitationState, showDelete }) {
    return (
        <div>
            {placesList.map(place => (
                <Place
                    key={place.place_id}
                    item={place}
                    invitation={invitationState}
                    currentSelection={selection}
                    updateMethod={updateMethod}
                    showDelete={showDelete}
                />
            ))}
        </div>
    )
}

export default Places