const Meetup = require('./meetup');
const User = require('./user');

// simple cache for users: usernames and emails
const userCache = new Map();

const queries = {
    // Returns all meetups
    getAllMeetups: async () => {
        let meetups = await Meetup.find({});
        // for each meetup, find the creator's email, get the creator's username, change the creator's email to {email: creatorEmail, username: creatorUsername}
        for (let i = 0; i < meetups.length; i++) {
            let username = null;
            let email = meetups[i].creator;
            if (userCache.has(email)) {
                username = userCache.get(email);
            } else {
                let user = await User.findOne({ email: email });
                username = user.username;
                userCache.set(email, username);
            }
            meetups[i] = { ...meetups[i]._doc, creator: { email: email, username: username } };
        }
        return meetups;
    },
    // Given a meetup id, returns the meetup
    getMeetupById: async (id) => {
        let meetup = await Meetup.findById(id);
        // find the creator's email, get the creator's username, change the creator's email to {email: creatorEmail, username: creatorUsername}
        let username = null;
        let email = meetup.creator;
        if (userCache.has(email)) {
            username = userCache.get(email);
        } else {
            let user = await User.findOne({ email: email });
            username = user.username;
            userCache.set(email, username);
        }
        meetup = { ...meetup._doc, creator: { email: email, username: username } };
        return meetup;
    },
    // Given a new meetup, returns the meetup
    addMeetup: async (meetup) => {
        return await Meetup.create(meetup);
    },
    // Given a user email, returns all meetups the user created
    getMeetupsCreated: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        if (user === null) {
            return;
        }
        let meetups = await Meetup.find({ id: { $in: user.meetupsCreated } });
        // for each meetup, find the creator's email, get the creator's username, change the creator's email to {email: creatorEmail, username: creatorUsername}
        for (let i = 0; i < meetups.length; i++) {
            let username = null;
            let email = meetups[i].creator;
            if (userCache.has(email)) {
                username = userCache.get(email);
            } else {
                let user = await User.findOne({ email: email });
                username = user.username;
                userCache.set(email, username);
            }
            meetups[i] = { ...meetups[i]._doc, creator: { email: email, username: username } };
        }
        // console.log(meetups);
        return meetups;
    },
    // Given a user email, returns all meetups that invited the user
    // include all pending, accepted and decline
    getMeetupsByInvitedUser: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        if (user === null) {
            return;
        }
        let meetupsPending = await Meetup.find({ id: { $in: user.meetupsPending } });

        meetupsAcceptedIds = user.meetupsAccepted.map(m => String(m.meetupId))
        let meetupsAccepted = await Meetup.find({ id: { $in: meetupsAcceptedIds } });

        let meetupsDeclined = await Meetup.find({ id: { $in: user.meetupsDeclined } });

        let allInvitedMeetup = meetupsPending.concat(meetupsAccepted, meetupsDeclined);
        return allInvitedMeetup
    },
    // Remove a user from invitees of a meetup
    deleteUserFromMeetupInvitees: async (userEmail, meetup) => {
        let newInvitees = meetup.invitees.filter(inviteeEmail => inviteeEmail != userEmail)
        return await Meetup.findOneAndUpdate({ id: meetup.id }, { invitees: newInvitees })
    },
    // Delete meetups by id
    deleteMeetupById: async (meetupId) => {
        return await Meetup.findOneAndRemove({ id: meetupId })
    },
    // Returns a list of all users
    getAllUsers: async () => {
        return await User.find({});
    },
    // Given a user email, returns the user object
    getUserByEmail: async (email) => {
        return await User.findOne({ email: email });
    },
    // Given a username, returns the user object
    getUserByUsername: async (username) => {
        return await User.findOne({ username: username });
    },
    // Given a user info, returns the user object
    addUser: async (user) => {
        return await User.create(user);
    },
    // Given a user email and a meetup, returns the updated user object
    addMeetupToUserCreator: async (userEmail, meetup) => {
        return await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsCreated: meetup } }, { new: true });
    },
    // Given an array of emails and meetupID, add the meetup to the meetupsPending of the user's invitees
    addMeetupToInvitees: async (invitees, meetup) => {
        let promises = [];
        for (let i = 0; i < invitees.length; i++) {
            promises.push(User.findOneAndUpdate({ email: invitees[i] }, { $push: { meetupsPending: meetup } }, { new: true }));
        }
        return await Promise.all(promises);
    },
    // Given a user email, returns all meetups the user are invited to but have not yet accepted or declined
    getInvitationsPending: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        let meetups = await Meetup.find({ id: { $in: user.meetupsPending } });
        // for each meetup, find the creator's email, get the creator's username, change the creator's email to {email: creatorEmail, username: creatorUsername}
        for (let i = 0; i < meetups.length; i++) {
            let username = null;
            let email = meetups[i].creator;
            if (userCache.has(email)) {
                username = userCache.get(email);
            } else {
                let user = await User.findOne({ email: email });
                username = user.username;
                userCache.set(email, username);
            }
            meetups[i] = { ...meetups[i]._doc, creator: { email: email, username: username } };
        }
        return meetups;
    },
    // Given a user email, returns all meetups the user are invited to and have accepted
    getInvitationsAccepted: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all accepted meetups for user
        let ids = [];
        for (let i = 0; i < user.meetupsAccepted.length; i++) {
            ids.push(user.meetupsAccepted[i].meetupId);
        }
        let meetups = await Meetup.find({ id: { $in: ids } });
        // for each meetup, find the creator's email, get the creator's username, change the creator's email to {email: creatorEmail, username: creatorUsername}
        for (let i = 0; i < meetups.length; i++) {
            let username = null;
            let email = meetups[i].creator;
            if (userCache.has(email)) {
                username = userCache.get(email);
            } else {
                let user = await User.findOne({ email: email });
                username = user.username;
                userCache.set(email, username);
            }
            meetups[i] = { ...meetups[i]._doc, creator: { email: email, username: username } };
        }
        return meetups;
    },
    // Given a user email, returns all meetups the user are invited to and have declined
    getInvitationsDeclined: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        let meetups = await Meetup.find({ id: { $in: user.meetupsDeclined } });
        // for each meetup, find the creator's email, get the creator's username, change the creator's email to {email: creatorEmail, username: creatorUsername}
        for (let i = 0; i < meetups.length; i++) {
            let username = null;
            let email = meetups[i].creator;
            if (userCache.has(email)) {
                username = userCache.get(email);
            } else {
                let user = await User.findOne({ email: email });
                username = user.username;
                userCache.set(email, username);
            }
            meetups[i] = { ...meetups[i]._doc, creator: { email: email, username: username } };
        }
        return meetups;
    },
    getInvitationState: async (userEmail, meetupId) => {
        let user = await User.findOne({ email: userEmail });
        for (let i = 0; i < user.meetupsPending.length; i++) {
            if (user.meetupsPending[i] === meetupId) {
                return 'pending';
            }
        }
        for (let i = 0; i < user.meetupsAccepted.length; i++) {
            if (user.meetupsAccepted[i].meetupId === meetupId) {
                return 'accepted';
            }
        }
        for (let i = 0; i < user.meetupsDeclined.length; i++) {
            if (user.meetupsDeclined[i] === meetupId) {
                return 'declined';
            }
        }
        return 'invalid';
    },
    // Given a user email, a meetup id and a timeslot, push the user email to meetup's schedule.schedule[timeslot]
    addUserToTimeslots: async (userEmail, meetupId, timeslots) => {
        let meetup = await Meetup.findOne({ id: meetupId });
        if (meetup.schedule.schedule !== undefined) {
            for (let i = 0; i < timeslots.length; i++) {
                try {
                    meetup.schedule.schedule[timeslots[i]].push(userEmail);
                } catch {
                    meetup.schedule.schedule[timeslots[i]] = [userEmail];
                }
            }
        }
        await Meetup.findOneAndUpdate({ id: meetupId }, { $set: { schedule: meetup.schedule } }, { new: true });
        return meetup;
    },
    // Given a user email, a meetup id and a timeslot, remove the user email from meetup's schedule.schedule[timeslot]
    removeUserFromTimeslots: async (userEmail, meetupId, timeslots) => {
        let meetup = await Meetup.findOne({ id: meetupId });
        if (meetup.schedule.schedule !== undefined) {
            for (let i = 0; i < timeslots.length; i++) {
                let index = meetup.schedule.schedule[timeslots[i]].indexOf(userEmail);
                if (index > -1) {
                    meetup.schedule.schedule[timeslots[i]].splice(index, 1);
                    if (meetup.schedule.schedule[timeslots[i]].length === 0) {
                        delete meetup.schedule.schedule[timeslots[i]];
                    }
                }
            }
        }
        await Meetup.findOneAndUpdate({ id: meetupId }, { $set: { schedule: meetup.schedule } }, { new: true });
        return meetup;
    },
    // Given a user email, a meetup id and list of location id, add the user email to the location's list of attendees
    addUserToLocations: async (userEmail, meetupId, locations) => {
        let meetup = await Meetup.findOne({ id: meetupId });
        if (meetup.location !== undefined) {
            let locationIds = [];
            for (let i = 0; i < meetup.location.length; i++) {
                locationIds.push(meetup.location[i].place_id);
            }
            for (let i = 0; i < locations.length; i++) {
                try {
                    meetup.location[locationIds.indexOf(locations[i])].attendees.push(userEmail);
                } catch {
                    meetup.location[locationIds.indexOf(locations[i])].attendees = [userEmail];
                }
            }
        }
        await Meetup.findOneAndUpdate({ id: meetupId }, { $set: { location: meetup.location } }, { new: true });
        return meetup;
    },
    // Given a user email, a meetup id and list of location id, remove the user email from the location's list of attendees
    removeUserFromLocations: async (userEmail, meetupId, locations) => {
        let meetup = await Meetup.findOne({ id: meetupId });
        if (meetup.location !== undefined) {
            let locationIds = [];
            for (let i = 0; i < meetup.location.length; i++) {
                locationIds.push(meetup.location[i].place_id);
            }
            for (let i = 0; i < locations.length; i++) {
                let index = meetup.location[locationIds.indexOf(locations[i])].attendees.indexOf(userEmail);
                if (index > -1) {
                    meetup.location[locationIds.indexOf(locations[i])].attendees.splice(index, 1);
                }
            }
        }
        await Meetup.findOneAndUpdate({ id: meetupId }, { $set: { location: meetup.location } }, { new: true });
        return meetup;
    },
    // Given a user email and a meetup id, returns all the meetups that the user has accepted
    declineInvitation: async (userEmail, meetup, availableLocations, availableTimeSlots) => {
        console.log("Declining invitation");
        let invitationState = await queries.getInvitationState(userEmail, meetup);
        if (invitationState === 'pending') {
            let promises = [];
            // remove meetup from user's meetupsPending
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true }));
            // add meetup to user's meetupsDeclined
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsDeclined: meetup } }, { new: true }));
            await Promise.all(promises);
        } else if (invitationState === 'accepted') {
            let promises = [];
            // remove meetup from user's meetupsAccepted
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsAccepted: { meetupId: meetup } } }, { new: true }));
            // add meetup to user's meetupsDeclined]
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsDeclined: meetup } }, { new: true }));
            promises.push(queries.removeUserFromTimeslots(userEmail, meetup, availableTimeSlots));
            promises.push(queries.removeUserFromLocations(userEmail, meetup, availableLocations));
            await Promise.all(promises);
        }
        // get all pending & accepted & declined meetups for user (run in parallel)
        let promises = [];
        promises.push(queries.getInvitationsPending(userEmail));
        promises.push(queries.getInvitationsAccepted(userEmail));
        promises.push(queries.getInvitationsDeclined(userEmail));
        let [meetupsPending, meetupsAccepted, meetupsDeclined] = await Promise.all(promises);
        return { invitationsPending: meetupsPending, invitationsDeclined: meetupsDeclined, invitationsAccepted: meetupsAccepted };
    },
    // Given a user email and a meetup id and availability (locations and time slots), returns all pending and accepted meetups for that user
    acceptInvitation: async (userEmail, meetup, availableLocations, availableTimeSlots) => {
        console.log("acceptInvitation");
        let invitationState = await queries.getInvitationState(userEmail, meetup);
        if (invitationState === 'pending') {
            let promises = [];
            // remove meetup from user's meetupsPending
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true }));
            // add meetup to user's meetupsAccepted
            let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlots };
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true }));
            promises.push(queries.addUserToTimeslots(userEmail, meetup, availableTimeSlots));
            // find the meetup by id， then add the user's email to the corresponding meetup.locations.attendees
            promises.push(queries.addUserToLocations(userEmail, meetup, availableLocations));
            await Promise.all(promises);
        } else if (invitationState === 'declined') {
            let promises = [];
            // remove meetup from user's meetupsDeclined
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsDeclined: meetup } }, { new: true }));
            // add meetup to user's meetupsAccepted
            let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlots };
            promises.push(User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true }));
            promises.push(queries.addUserToTimeslots(userEmail, meetup, availableTimeSlots));
            promises.push(queries.addUserToLocations(userEmail, meetup, availableLocations));
            await Promise.all(promises);
        }
        // get all pending & accepted & declined meetups for user (run in parallel)
        let promises = [];
        promises.push(queries.getInvitationsPending(userEmail));
        promises.push(queries.getInvitationsAccepted(userEmail));
        promises.push(queries.getInvitationsDeclined(userEmail));
        let [meetupsPending, meetupsAccepted, meetupsDeclined] = await Promise.all(promises);
        return { invitationsPending: meetupsPending, invitationsAccepted: meetupsAccepted, invitationsDeclined: meetupsDeclined };
    },
    // Given a meetupId, returns all users who have not accepted or declined the meetup
    checkIfMeetupIsComplete: async (meetupId) => {
        // get all users who have not accepted or declined the meetup
        let inviteesNoDecisions = await User.find({ meetupsPending: meetupId });
        // returns username and email fields for each invitee who have not accepted or declined the meetup
        return inviteesNoDecisions.map(invitee => {
            return { username: invitee.username, email: invitee.email };
        });
    },
    calculateMeetupBestLocationandTime: async (meetupId) => {
        let meetup = await Meetup.findOneAndUpdate({ id: meetupId }, { state: 'COMPLETED' }, { new: true });
        // find all users who have accepted the meetup
        let users = await User.find({ meetupsAccepted: { $elemMatch: { meetupId: meetupId } } });
        // find locations with the most users, if multiple locations have the same number of users, find all locations
        let maxLocations = 0;
        let maxLocationsIds = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let locations = user.meetupsAccepted.filter(m => m.meetupId === meetupId)[0].availableLocations;
            for (let j = 0; j < locations.length; j++) {
                if (maxLocationsIds.indexOf(locations[j]) === -1) {
                    let location = locations[j];
                    let usersAtLocation = users.filter(u => u.meetupsAccepted.filter(m => m.meetupId === meetupId)[0].availableLocations.includes(location));
                    if (usersAtLocation.length > maxLocations) {
                        maxLocations = usersAtLocation.length;
                        maxLocationsIds = [location];
                    } else if (usersAtLocation.length === maxLocations) {
                        maxLocationsIds.push(location);
                    }
                }
            }
        }
        // if no invitee selected the location, then use creator selected locations instead
        if (maxLocationsIds.length === 0) {
            for (let i = 0; i < meetup.location.length; i++) {
                maxLocationsIds.push(meetup.location[i].place_id);
            }
        }
        // find time slots with the most users, if multiple time slots have the same number of users, find all time slots
        let maxTimeSlots = 0;
        let maxTimeSlotsArray = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let userTimeSlots = user.meetupsAccepted.filter(m => m.meetupId === meetupId)[0].availableTimeSlot;
            for (let j = 0; j < userTimeSlots.length; j++) {
                if (maxTimeSlotsArray.indexOf(userTimeSlots[j]) === -1) {
                    let timeSlot = userTimeSlots[j];
                    let usersAtTimeSlot = users.filter(u => u.meetupsAccepted.filter(m => m.meetupId === meetupId)[0].availableTimeSlot.includes(timeSlot));
                    if (usersAtTimeSlot.length > maxTimeSlots) {
                        maxTimeSlots = usersAtTimeSlot.length;
                        maxTimeSlotsArray = [timeSlot];
                    } else if (usersAtTimeSlot.length === maxTimeSlots) {
                        maxTimeSlotsArray.push(timeSlot);
                    }
                }
            }
        }
        // if no invitee selected the time slot, then use creator selected time slots instead
        if (maxTimeSlotsArray.length === 0) {
            if (meetup.schedule.schedule !== undefined) {
                maxTimeSlotsArray = Object.keys(meetup.schedule.schedule);
            }
        }
        // update meetup with best location and time slot
        return await Meetup.findOneAndUpdate({ id: meetupId }, { bestLocation: maxLocationsIds, bestTime: maxTimeSlotsArray }, { new: true });
    },
    // check is user is friend with friendEmail
    isFriend: async (userEmail, friendEmail) => {
        let user = await User.findOne({ email: userEmail })
        console.log(userEmail, friendEmail)
        return user.friends.includes(friendEmail)
    },
    // Given a user email, returns the usernames and emails of all the friends of the user
    getFriends: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all users who are friends of the user
        let friends = await User.find({ email: { $in: user.friends } });
        // keep friends username and email fields
        return friends.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });
    },
    // return user and friend email if reqeust exist, otherwise return Null
    getFriendRequestSent: async (userEmail, friendEmail) => {
        let user = await User.findOne({ email: userEmail });
        let requestExist = user.friendRequestsSent && user.friendRequestsSent.includes(friendEmail)
        if (requestExist) {
            return { userEmail, friendEmail }
        }
        return null
    },
    // return user and friend email if reqeust exist, otherwise return Null
    getFriendRequestReceived: async (userEmail, fromEmail) => {
        let user = await User.findOne({ email: userEmail });
        console.log(user)
        let requestExist = user.friendRequests && user.friendRequests.includes(fromEmail)
        if (requestExist) {
            return { userEmail, fromEmail }
        }
        return null
    },
    // Given a user email, returns the usernames and emails of all the users who have sent the user a friend request
    getFriendRequests: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all users who are friends of the user
        let friendRequests = await User.find({ email: { $in: user.friendRequests } });
        // keep friends username and email fields
        return friendRequests.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });
    },
    // Given a user email, returns the usernames and emails of all the users who received the user's friend requests
    getFriendRequestsSent: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all users who are friends of the user
        let friendRequestsSent = await User.find({ email: { $in: user.friendRequestsSent } });
        // keep friends username and email fields
        return friendRequestsSent.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });
    },
    // Given a user email, returns the updated friend list of the user and the updated friend request list of the user
    acceptFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // remove friend request from friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friendRequestsSent: userEmail } }, { new: true });
        // add friend to user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friends: friendEmail } }, { new: true });
        // add user to friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friends: userEmail } }, { new: true });
        // return updated friend list (including username and email) of user
        let newFriends = await queries.getFriends(userEmail);
        // return updated friend request list (including username and email) of user
        let newFriendRequests = await queries.getFriendRequests(userEmail);
        return { friends: newFriends, friendRequests: newFriendRequests };
    },
    // Given a user email, returns the updated friend request list (including username and email) of the user
    declineFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // remove friend request from friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friendRequestsSent: userEmail } }, { new: true });
        return await queries.getFriendRequests(userEmail);
    },
    // Given a user email and a friend email, returns updated friend request sent list (including username and email) of the user
    sendFriendRequest: async (userEmail, friendEmail) => {
        // add friend request to user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friendRequestsSent: friendEmail } }, { new: true });
        // add friend request to friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friendRequests: userEmail } }, { new: true });
        // return await queries.getFriendRequestsSent(userEmail);
        return await queries.getUserByEmail(userEmail).friendRequestsSent;
    },
    // Given a user email and a friend email, returns usernames and emails of all friends of the user
    deleteFriend: async (userEmail, friendEmail) => {
        // remove friend from user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friends: friendEmail } }, { new: true });
        // remove user from friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friends: userEmail } }, { new: true });
        return await queries.getFriends(userEmail);
    },
    // Given a user email and new user object, returns updated user object
    updateUser: async (userEmail, user) => {
        // update user's username in cache
        userCache.set(userEmail, user.username);
        return await User.findOneAndUpdate({ email: userEmail }, user, { new: true });
    },
    patchUser: async (userEmail, newField) => {
        // update user's username in cache
        userCache.set(userEmail, newField.username);
        return await User.findOneAndUpdate({ email: userEmail }, newField, { new: true });
    },
    // Delete user by email
    deleteUserByEmail: async (userEmail) => {
        userCache.delete(userEmail);
        return await User.findOneAndDelete({ email: userEmail })
    }
};

module.exports = queries;