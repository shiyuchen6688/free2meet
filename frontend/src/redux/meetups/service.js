// Get all meetups
const getMeetups = async (filterPeopleOption, filterByPerson, email) => {
    console.log("filter by person");
    console.log(filterByPerson);
    const response = await fetch(`http://localhost:3001/meetups?filterPeopleOption=${filterPeopleOption}&filterByPerson=${filterByPerson}&selfEmail=${email}`, {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        console.log('Error in getMeetups')
    }
    return data
}

// Get one meetup
const getMeetup = async (id) => {
    const response = await fetch(`http://localhost:3001/meetups/meetup?id=${id}`, {
        method: 'GET',
        mode: 'cors'
    });
    return response.json();
};

// Add new meetup
const addMeetup = async (meetup) => {
    console.log(meetup)
    const response = await fetch('http://localhost:3001/meetups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
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

const exportedService = {
    getMeetups,
    getMeetup,
    addMeetup
}

export default exportedService;