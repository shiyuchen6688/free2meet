// Get all meetups
const getInvitations = async () => {
    const response = await fetch('http://localhost:3001/meetups', {
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


export default {
    getInvitations,
}