// Get all meetups
const getInvitations = async () => {
    const response = await fetch('http://localhost:3001/invitations', {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getInvitations')
    }
    return data
}


// get pending invitations for a user given user email
const getInvitationsPending = async (email) => {
    const response = await fetch(`http://localhost:3001/invitations/${email}/pending`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getInvitationsPending')
    }
    return data
}

// get accepted invitations for a user given user email
const getInvitationsAccepted = async (email) => {
    const response = await fetch(`http://localhost:3001/invitations/${email}/accepted`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getInvitationsAccepted')
    }
    return data
}

// get declined invitations for a user given user email
const getInvitationsDeclined = async (email) => {
    const response = await fetch(`http://localhost:3001/invitations/${email}/declined`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getInvitationsDeclined')
    }
    return data
}

// accept a pending invitation for a user given user email and invitation id and availbale locations and time slots
const acceptInvitation = async (email, invitationID, availableLocations, availableTimeSlots) => {
    const response = await fetch(`http://localhost:3001/invitations/${email}/pending/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ invitationID, availableLocations, availableTimeSlots })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in acceptInvitation')
    }
    return data
}

// decline a pending invitation for a user given user email and invitation id
const declineInvitation = async (email, invitationID) => {
    const response = await fetch(`http://localhost:3001/invitations/${email}/pending/decline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ invitationID })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in declineMeetup')
    }
    return data
}



export default {
    getInvitations,
    getInvitationsPending,
    getInvitationsAccepted,
    getInvitationsDeclined,
    acceptInvitation,
    declineInvitation,
}