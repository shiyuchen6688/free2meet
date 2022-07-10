const Meetup = require('./meetup');
const User = require('./user');

const queries = {
    // Returns all meetups
    getAllMeetups: async () => {
        return await Meetup.find({});
    },
    // Given a meetup id, returns the meetup
    getMeetupById: async (id) => {
        return await Meetup.findById(id);
    },
    // Given a new meetup, returns the meetup
    addMeetup: async (meetup) => {
        return await Meetup.create(meetup);
    },
    // Given a user email, returns all meetups the user created
    getMeetupsCreated: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return await Meetup.find({ id: { $in: user.meetupsCreated } });
    },
    // Returns a list of all users
    getAllUsers: async () => {
        return await User.find({});
    },
    // Given a user email, returns the user object
    getUserByEmail: async (email) => {
        return await User.findOne({ email: email });
    },
    // Given a user info, returns the user object
    addUser: async (user) => {
        return await User.create(user);
    },
    // Given a user email and a meetup, returns the updated user object
    addMeetupToUserCreator: async (userEmail, meetup) => {
        return await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsCreated: meetup } }, { new: true });
    },
    // Given an array of emails, add the meetup to the meetupsPending of the user's invitees
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
        return await Meetup.find({ id: { $in: user.meetupsPending } });
    },
    // Given a user email, returns all meetups the user are invited to and have accepted
    getInvitationsAccepted: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all accepted meetups for user
        let ids = [];
        for (let i = 0; i < user.meetupsAccepted.length; i++) {
            ids.push(user.meetupsAccepted[i].meetupId);
        }
        let meetupsAccepted = await Meetup.find({ id: { $in: ids } });
        return meetupsAccepted;
    },
    // Given a user email, returns all meetups the user are invited to and have declined
    getInvitationsDeclined: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return await Meetup.find({ id: { $in: user.meetupsDeclined } });
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
    // Given a user email and a meetup id, returns all the meetups that the user has accepted
    declineInvitation: async (userEmail, meetup) => {
        let invitationState = await queries.getInvitationState(userEmail, meetup);
        if (invitationState === 'pending') {
            // remove meetup from user's meetupsPending
            await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
            // add meetup to user's meetupsDeclined
            await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsDeclined: meetup } }, { new: true });
        } else if (invitationState === 'accepted') {
            // remove meetup from user's meetupsAccepted
            await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsAccepted: {meetupId: meetup }} }, { new: true });
            // add meetup to user's meetupsDeclined
            await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsDeclined: meetup } }, { new: true });
        }
        // get all pending & accepted & declined meetups for user (run in parallel)
        let promises = [];
        promises.push(queries.getInvitationsPending(userEmail));
        promises.push(queries.getInvitationsAccepted(userEmail));
        promises.push(queries.getInvitationsDeclined(userEmail));
        promises.push(queries.checkIfMeetupIsComplete(meetup));
        let [meetupsPending, meetupsAccepted, meetupsDeclined] = await Promise.all(promises);
        return { invitationsPending: meetupsPending, invitationsDeclined: meetupsDeclined, invitationsAccepted: meetupsAccepted };
    },
    // Given a user email and a meetup id and availability (locations and time slots), returns all pending and accepted meetups for that user
    acceptInvitation: async (userEmail, meetup, availableLocations, availableTimeSlots) => {
        let invitationState = await queries.getInvitationState(userEmail, meetup);
        if (invitationState === 'pending') {
            // remove meetup from user's meetupsPending
            await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
            // add meetup to user's meetupsAccepted
            let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlots };
            await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true });
        } else if (invitationState === 'declined') {
            // remove meetup from user's meetupsDeclined
            await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsDeclined: meetup } }, { new: true });
            // add meetup to user's meetupsAccepted
            let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlots };
            await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true });
        }
        // get all pending & accepted & declined meetups for user (run in parallel)
        let promises = [];
        promises.push(queries.getInvitationsPending(userEmail));
        promises.push(queries.getInvitationsAccepted(userEmail));
        promises.push(queries.getInvitationsDeclined(userEmail));
        promises.push(queries.checkIfMeetupIsComplete(meetup));
        let [meetupsPending, meetupsAccepted, meetupsDeclined] = await Promise.all(promises);
        return { invitationsPending: meetupsPending, invitationsAccepted: meetupsAccepted, invitationsDeclined: meetupsDeclined };
    },
    // Given a meetupId, returns all users who have not accepted or declined the meetup
    checkIfMeetupIsComplete: async (meetupId) => {
        // get all users who have not accepted or declined the meetup
        let inviteesNoDecisions = await User.find({ meetupsPending: meetupId });
        // if there are no invitees, then the meetup is complete
        if (inviteesNoDecisions.length === 0) {
            await Meetup.findOneAndUpdate({ id: meetupId }, { state: 'COMPLETED' }, { new: true });
            // TODO: calculate best location and time slots for meetup
        }
        // returns username and email fields for each invitee who have not accepted or declined the meetup
        return inviteesNoDecisions.map(invitee => {
            return { username: invitee.username, email: invitee.email };
        });
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
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friendRequests: friendEmail } }, { new: true });
        // add friend request to friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friendRequestsSent: userEmail } }, { new: true });
        return await queries.getFriendRequestsSent(userEmail);
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
        return await User.findOneAndUpdate({ email: userEmail }, user, { new: true });
    }
};

module.exports = queries;