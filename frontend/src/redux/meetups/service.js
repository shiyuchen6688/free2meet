import axios from 'axios'
// Get all meetups

let url = 'http://localhost:3001/meetups/'

if (process.env.NODE_ENV === 'production') {
    url = 'meetups/';
}

const getMeetups = async (filterPeopleOption, filterByPerson, email) => {
    console.log("filter by person");
    console.log(filterByPerson);
    const response = await fetch(url.slice(0, -1) + `?filterPeopleOption=${filterPeopleOption}&filterByPerson=${filterByPerson}&selfEmail=${email}`, {
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
    const response = await fetch(url + `meetup?id=${id}`, {
        method: 'GET',
        mode: 'cors'
    });
    return response.json();
};

// Add new meetup
const addMeetup = async (meetup) => {
    console.log(meetup)
    const response = await fetch(url, {
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

const addImage = async (image) => {
    const API_ENDPOINT = 'https://cf73795wi5.execute-api.us-west-2.amazonaws.com/uploads' // e.g. https://ab1234ab123.execute-api.us-east-1.amazonaws.com/uploads
    console.log('Upload clicked')
    // Get the presigned URL
    const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
    })
    console.log('Response: ', response)
    console.log('Uploading: ', image)
    let binary = atob(image.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
    console.log('Uploading to: ', response.data.uploadURL)
    const result = await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: blobData
    })
    console.log('Result: ', result)
    // Final URL for the user doesn't need the query string params
    const uploadURL = response.data.uploadURL.split('?')[0]
    console.log(uploadURL)
    return uploadURL
}

// get meetups created by a user given user email
const getMeetupsCreated = async (email) => {
    const response = await fetch(url + `${email}/created`, {
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

export const calculateMeetupBestLocationandTime = async (id) => {
    const response = await fetch(url + `${id}/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        }
    });

    const data = await response.json()


    return data
}

export const getInvitteesNoResponse = async (id) => {
    const response = await fetch(url + `${id}/noresponse`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        }
    });

    const data = await response.json()

    return data
}



const exportedService = {
    getMeetups,
    getMeetup,
    addMeetup,
    addImage,
    getMeetupsCreated
}

export default exportedService;