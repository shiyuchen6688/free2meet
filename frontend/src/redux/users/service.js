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





export default {
    login,
    register
}