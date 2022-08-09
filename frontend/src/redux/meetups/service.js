import axios from 'axios'
import { resetTokenIfTokenExpired } from '../utils'

const getMeetups = async (filterPeopleOption, filterByPerson, email) => {
    const response = await fetch(`meetups?filterPeopleOption=${filterPeopleOption}&filterByPerson=${filterByPerson}&selfEmail=${email}`, {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
    }
    return data
}

// Get one meetup
const getMeetup = async (id) => {
    const response = await fetch(`meetup?id=${id}`, {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
        mode: 'cors'
    });

    const result = await response.json();

    if (!response.ok) {
        const errorMsg = result?.message;
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return result;
};

// Add new meetup
const addMeetup = async (meetup) => {
    const response = await fetch('new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify(meetup)
    });

    const data = await response.json()

    if (!response.ok) {
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

const addImage = async (image, fileType) => {
    if (!image || !fileType) {
        return;
    }
    console.log("FileType: " + fileType);
    const API_ENDPOINT = `https://cf73795wi5.execute-api.us-west-2.amazonaws.com/uploads?fileType=${fileType}` // e.g. https://ab1234ab123.execute-api.us-east-1.amazonaws.com/uploads
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

const removeImage = async (imageURL) => {
    console.log("remove image service");
    // change Image URL to empty string
    return "";
}

// get meetups created by a user given user email
const getMeetupsCreated = async (email) => {
    const response = await fetch(`meetups/${email}/created`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json()

    if (!response.ok) {
        const errorMsg = data?.message;
        resetTokenIfTokenExpired(errorMsg)
        throw new Error(errorMsg)
    }
    return data
}

export const calculateMeetupBestLocationandTime = async (id) => {
    const response = await fetch(`meetups/${id}/calculate`, {
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
    const response = await fetch(`meetups/${id}/noresponse`, {
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
    removeImage,
    getMeetupsCreated
}

export default exportedService;