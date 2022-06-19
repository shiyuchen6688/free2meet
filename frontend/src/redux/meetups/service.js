// Get all meetups
const getMeetups = async () => {
    const response = await fetch('http://localhost:3001/meetups', {
        method: 'GET'
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getMeetups')
    }
    return data
}

// Add new meetup
const addMeetup = async (meetup) => {
    console.log(meetup)
    const response = await fetch('http://localhost:3001/meetups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meetup)
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in addMeeup')
    }
    console.log(data)
    return data
}


export default {
    getMeetups,
    addMeetup
}