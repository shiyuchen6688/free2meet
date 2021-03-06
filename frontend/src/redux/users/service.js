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
    const response = await fetch('http://localhost:3001/users/reset-password', {
        method: 'PUT',
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

// user change password in profile page
const changePassword = async (email, oldPassword, newPassword) => {
    const response = await fetch(`http://localhost:3001/users/${email}/change-password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ oldPassword, newPassword })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in changePassword')
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data
};

// user change email in profile page
const changeUsername = async (email, password, newUsername) => {
    console.log("email", email)
    console.log("password", password)
    console.log("newUsername", newUsername)
    const response = await fetch(`http://localhost:3001/users/${email}/change-username`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ password, newUsername })
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in changeUsername')
        const errorMsg = data?.message;
        console.log(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

// get meetups created by a user given user email
const getMeetupsCreated = async (email) => {
    const response = await fetch(`http://localhost:3001/users/${email}/meetups/created`, {
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
    const response = await fetch(`http://localhost:3001/users/${email}/friends/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getFriendRequests')
        const errorMsg = data?.message;
        console.log(errorMsg)
        throw new Error(errorMsg)
    }
    console.log(data)
    return data
}

// get all friend requests for a user given user email
const getFriendRequestsSent = async (email) => {
    const response = await fetch(`http://localhost:3001/users/${email}/friends/requests/sent`, {
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
    console.log("acceptFriendRequest", email, friendEmail)
    const response = await fetch(`http://localhost:3001/users/${email}/friends/requests/accept`, {
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
    const response = await fetch(`http://localhost:3001/users/${email}/friends/requests/decline`, {
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
    console.log(email, friendEmail)
    const response = await fetch(`http://localhost:3001/users/${email}/friends/requests/send`, {
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
        console.log(data)
        const errorMsg = data?.message;
        console.log(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

// delete a friend for a user given user email and friend email
const deleteFriend = async (email, friendEmail) => {
    console.log(email)
    const response = await fetch(`http://localhost:3001/users/${email}/friends/delete`, {
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
        const errorMsg = data?.message;
        console.log(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

// Delete user's account
const deleteUserAccount = async (userEmail) => {
    const response = await fetch(`http://localhost:3001/users/${userEmail}/delete-account`, {
        method: 'DELETE'
    })

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in deleteUser')
        const errorMsg = data?.message;
        console.log(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

const exportedService = {
    login,
    register,
    resetPassword,
    getMeetupsCreated,
    getFriends,
    getFriendRequests,
    getFriendRequestsSent,
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest,
    deleteFriend,
    changeUsername,
    changePassword,
    deleteUserAccount
}

export default exportedService;