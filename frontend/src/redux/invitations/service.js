// Get all meetups

let url = 'http://localhost:3001/invitations/';

if (process.env.NODE_ENV === 'production') {
    url = 'invitations/';
}

const getInvitations = async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        console.log('Error in getInvitations')
    }
    return data
}


// get pending invitations for a user given user email
const getInvitationsPending = async (email) => {
    const response = await fetch(url + `${email}/pending`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        let newSchedule = {};
        if (data[i].schedule.schedule !== undefined) {
            let keys = Object.keys(data[i].schedule.schedule);
            for (let j = 0; j < keys.length; j++) {
                newSchedule[keys[j].replace('|', '.')] = data[i].schedule.schedule[keys[j]];
            }
        }
        data[i].schedule.schedule = newSchedule;
    }


    if (!response.ok) {
        console.log('Error in getInvitationsPending')
    }
    return data
}

// get accepted invitations for a user given user email
const getInvitationsAccepted = async (email) => {
    const response = await fetch(url + `${email}/accepted`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        let newSchedule = {};
        if (data[i].schedule.schedule !== undefined) {
            let keys = Object.keys(data[i].schedule.schedule);
            for (let j = 0; j < keys.length; j++) {
                newSchedule[keys[j].replace('|', '.')] = data[i].schedule.schedule[keys[j]];
            }
        }
        data[i].schedule.schedule = newSchedule;
    }

    if (!response.ok) {
        console.log('Error in getInvitationsAccepted')
    }
    return data
}

// get declined invitations for a user given user email
const getInvitationsDeclined = async (email) => {
    const response = await fetch(url + `${email}/declined`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
    });

    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        let newSchedule = {};
        if (data[i].schedule.schedule !== undefined) {
            let keys = Object.keys(data[i].schedule.schedule);
            for (let j = 0; j < keys.length; j++) {
                newSchedule[keys[j].replace('|', '.')] = data[i].schedule.schedule[keys[j]];
            }
        }
        data[i].schedule.schedule = newSchedule;
    }

    if (!response.ok) {
        console.log('Error in getInvitationsDeclined')
    }
    return data
}

// accept a pending invitation for a user given user email and invitation id and availbale locations and time slots
// info contains email, invitationID, availableLocations, availableTimeSlots
const acceptInvitation = async (info) => {
    const response = await fetch(url + `${info.email}/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify(info)
    });

    const data = await response.json()

    let types = ['invitationsAccepted', 'invitationsPending', 'invitationsDeclined']
    for (let a = 0; a < types.length; a++) {
        for (let i = 0; i < data[types[a]].length; i++) {
            let newSchedule = {};
            if (data[types[a]][i].schedule.schedule !== undefined) {
                let keys = Object.keys(data[types[a]][i].schedule.schedule);
                for (let j = 0; j < keys.length; j++) {
                    newSchedule[keys[j].replace('|', '.')] = data[types[a]][i].schedule.schedule[keys[j]];
                }
            }
            data[types[a]][i].schedule.schedule = newSchedule;
        }
    }

    console.log(data);

    if (!response.ok) {
        console.log('Error in acceptInvitation')
    }
    return data
}

// decline a pending invitation for a user given user email and invitation id
const declineInvitation = async (info) => {
    const response = await fetch(url + `${info.email}/decline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify(info)
    });

    const data = await response.json()

    let types = ['invitationsAccepted', 'invitationsPending', 'invitationsDeclined']
    for (let a = 0; a < types.length; a++) {
        for (let i = 0; i < data[types[a]].length; i++) {
            let newSchedule = {};
            if (data[types[a]][i].schedule.schedule !== undefined) {
                let keys = Object.keys(data[types[a]][i].schedule.schedule);
                for (let j = 0; j < keys.length; j++) {
                    newSchedule[keys[j].replace('|', '.')] = data[types[a]][i].schedule.schedule[keys[j]];
                }
            }
            data[types[a]][i].schedule.schedule = newSchedule;
        }
    }

    if (!response.ok) {
        console.log('Error in declineMeetup')
    }
    return data
}

const exportObject = {
    getInvitations,
    getInvitationsPending,
    getInvitationsAccepted,
    getInvitationsDeclined,
    acceptInvitation,
    declineInvitation,
};

export default exportObject;