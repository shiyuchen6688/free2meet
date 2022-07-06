// login
const login = async (user) => {

    const response = await fetch('http://localhost:3001/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in login')
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    user.setIsValidUser(true)
    return data
}


const register = async (user) => {

    const response = await fetch('http://localhost:3001/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in register')
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data
}

// reset password of a user given user email and new password
const resetPassword = async (email, password) => {
    const response = await fetch('http://localhost:3001/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in resetPassword')
    }
    return data
}

// get meetups created by a user given user email
const getMeetupsCreated = async (email) => {
    const response = await fetch(`http://localhost:3001/${email}/meetups/created`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getMeetupsCreated')
    }
    return data
}

// get pending meetups for a user given user email
const getMeetupsPending = async (email) => {
    const response = await fetch(`http://localhost:3001/${email}/meetups/pending`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getMeetupsPending')
    }
    return data
}

// get accepted meetups for a user given user email
const getMeetupsAccepted = async (email) => {
    const response = await fetch(`http://localhost:3001/${email}/meetups/accepted`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getMeetupsAccepted')
    }
    return data
}

// get declined meetups for a user given user email
const getMeetupsDeclined = async (email) => {
    const response = await fetch(`http://localhost:3001/${email}/meetups/declined`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getMeetupsDeclined')
    }
    return data
}

// accept a pending meetup for a user given user email and meetup id and availbale locations and time slots
const acceptMeetup = async (email, meetupId, availableLocations, availableTimeSlots) => {
    const response = await fetch(`http://localhost:3001/${email}/meetups/pending/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ meetupId, availableLocations, availableTimeSlots })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in acceptMeetup')
    }
    return data
}

// decline a pending meetup for a user given user email and meetup id
const declineMeetup = async (email, meetupId) => {
    const response = await fetch(`http://localhost:3001/${email}/meetups/pending/decline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ meetupId })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in declineMeetup')
    }
    return data
}

// get all friends for a user given user email
const getFriends = async (email) => {
    const response = await fetch(`http://localhost:3001/users/${email}/friends`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getFriends')
    }
    return data
}

// get all friend requests for a user given user email
const getFriendRequests = async (email) => {
    const response = await fetch(`http://localhost:3001/${email}/friends/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getFriendRequests')
    }
    return data
}

// get all friend requests for a user given user email
const getFriendRequestsSent = async (email) => {
    const response = await fetch(`http://localhost:3001/${email}/friends/requests/sent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getFriendRequestsSent')
    }
    return data
}

// accept a friend request for a user given user email and friend email
const acceptFriendRequest = async (email, friendEmail) => {
    const response = await fetch(`http://localhost:3001/${email}/friends/requests/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ friendEmail })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in acceptFriendRequest')
    }
    return data
}

// decline a friend request for a user given user email and friend email
const declineFriendRequest = async (email, friendEmail) => {
    const response = await fetch(`http://localhost:3001/${email}/friends/requests/decline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ friendEmail })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in declineFriendRequest')
    }
    return data
}

// send a friend request for a user given user email and friend email
const sendFriendRequest = async (email, friendEmail) => {
    const response = await fetch(`http://localhost:3001/${email}/friends/requests/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ friendEmail })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in sendFriendRequest')
    }
    return data
}

// delete a friend for a user given user email and friend email
const deleteFriend = async (email, friendEmail) => {
    const response = await fetch(`http://localhost:3001/${email}/friends/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ friendEmail })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in deleteFriend')
    }
    return data
}

const exportedService = {
    login,
    register,
    resetPassword,
    getMeetupsCreated,
    getMeetupsPending,
    getMeetupsAccepted,
    getMeetupsDeclined,
    acceptMeetup,
    declineMeetup,
    getFriends,
    getFriendRequests,
    getFriendRequestsSent,
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest,
    deleteFriend
}

export default exportedService;