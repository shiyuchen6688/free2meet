import { resetTokenIfTokenExpired } from '../utils'

const login = async (user) => {

    const response = await fetch('users/login', {
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

const loginWithToken = async () => {
    console.log("loginWithToken")
    const response = await fetch('users/tokenlogin', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        }
    })

    const data = await response.json()
    console.log("loginWithToken after login", data)
    if (!response.ok) {
        console.log('Error in loginWithToken')
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

const register = async (user) => {

    const response = await fetch('users/register', {
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
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

// reset password of a user given user email and new password
const resetPassword = async (email, password) => {
    const response = await fetch('users/reset-password', {
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
        const errorMsg = data?.message;
        console.log(errorMsg)
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// user change password in profile page
const changePassword = async (email, oldPassword, newPassword) => {
    const response = await fetch(`users/${email}/change-password`, {
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
        console.log(errorMsg)
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
};

// user change email in profile page
const changeUsername = async (email, password, newUsername) => {
    console.log("email", email)
    console.log("password", password)
    console.log("newUsername", newUsername)
    const response = await fetch(`users/${email}/change-username`, {
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
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}


// get all friends for a user given user email
const getFriends = async (email) => {
    const response = await fetch(`users/${email}/friends`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getFriends')
        const errorMsg = data?.message;
        console.log(errorMsg)
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// get all tags for a user given user email
const getTags = async (email, text) => {
    const response = await fetch(`users/${email}/tags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token"),
            'text': text
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getTags')
        const errorMsg = data?.message;
        console.log(errorMsg)
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// get all friend requests for a user given user email
const getFriendRequests = async (email) => {
    const response = await fetch(`users/${email}/friends/requests`, {
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
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    console.log(data)
    return data
}

// get all friend requests for a user given user email
const getFriendRequestsSent = async (email) => {
    const response = await fetch(`users/${email}/friends/requests/sent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getFriendRequestsSent')
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// accept a friend request for a user given user email and friend email
const acceptFriendRequest = async (email, friendEmail) => {
    console.log("acceptFriendRequest", email, friendEmail)
    const response = await fetch(`users/${email}/friends/requests/accept`, {
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
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// decline a friend request for a user given user email and friend email
const declineFriendRequest = async (email, friendEmail) => {
    const response = await fetch(`users/${email}/friends/requests/decline`, {
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
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// send a friend request for a user given user email and friend email
const sendFriendRequest = async (email, friendEmail) => {
    console.log(email, friendEmail)
    const response = await fetch(`users/${email}/friends/requests/send`, {
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
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

// delete a friend for a user given user email and friend email
const deleteFriend = async (email, friendEmail) => {
    console.log(email)
    const response = await fetch(`users/${email}/friends/delete`, {
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
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

// Delete user's account
const deleteUserAccount = async (userEmail) => {
    const response = await fetch(`users/${userEmail}/delete-account`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        }
    })

    const data = await response.json()


    await fetch(`https://api-CB108BAB-EB6F-4BA7-A7C5-40E73836AAE1.sendbird.com/v3/users/${userEmail}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Api-Token': '75cb9083d46c3ed2de67310203dd7346a507b8c1'
        }
    });


    if (!response.ok) {
        console.log('Error in deleteUser')
        const errorMsg = data?.message;
        console.log(errorMsg)
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}


const exportedService = {
    login,
    loginWithToken,
    register,
    resetPassword,
    getFriends,
    getFriendRequests,
    getFriendRequestsSent,
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest,
    deleteFriend,
    changeUsername,
    changePassword,
    deleteUserAccount,
    getTags
}

export default exportedService;