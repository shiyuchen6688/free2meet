const Meetup = require('./meetup');
const User = require('./user');

const queries = {
    getAllMeetups: async () => {
        return await Meetup.find({});
    },
    getMeetupById: async (id) => {
        return await Meetup.findById(id);
    },
    getMeetupByUserName: async (name) => {
        return await Meetup.find({ creator: name });
    },
    getMeetupByUserEmail: async (email) => {
        return await Meetup.find({ creator: email });
    },
    addMeetup: async (meetup) => {
        return await Meetup.create(meetup);
    },
    getAllUsers: async () => {
        return await User.find({});
    },
    getUserByEmail: async (email) => {
        return await User.findOne({ email: email });
    },
    getUserByUsername: async (username) => {
        return await User.findOne({ username: username });
    },
    addUser: async (user) => {
        return await User.create(user);
    },
    addMeetupToUserCreator: async (userEmail, meetup) => {
        return await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsCreated: meetup } }, { new: true });
    },
    addMeetupToInvitees: async (invitees, meetup) => {
        for (let i = 0; i < invitees.length; i++) {
            return await User.findOneAndUpdate({ email: invitees[i] }, { $push: { meetupsPending: meetup } }, { new: true });
        }
    },
    declineMeetup: async (userEmail, meetup) => {
        // remove meetup from user's meetupsPending
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
        // add meetup to user's meetupsDeclined
        await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsDeclined: meetup } }, { new: true });
        return checkIfMeetupIsComplete(meetup);
    },
    acceptMeetup: async (userEmail, meetup, availableLocations, availableTimeSlot) => {
        // remove meetup from user's meetupsPending
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
        // add meetup to user's meetupsAccepted
        let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlot };
        await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true });
        return checkIfMeetupIsComplete(meetup);
    },
    checkIfMeetupIsComplete: async (meetup) => {
        // find invitees' emails and check if their pending meetups contain the meetup and update state to COMPLETED if no pending meetups remain
        let invitees = await User.find({ meetupsPending: meetup });
        if (invitees.length === 0) {
            await Meetup.findOneAndUpdate({ id: meetup }, { state: 'COMPLETED' }, { new: true });
            // TODO: calculate best location and time slots for meetup
        }
        return invitees;
    },
    getFriends: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.friends;
    },
    getFriendRequests: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.friendRequests;
    },
    getFriendRequestsSent: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.friendRequestsSent;
    },
    acceptFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // add friend to user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friends: friendEmail } }, { new: true });
        // add user to friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friends: userEmail } }, { new: true });
        return true;
    },
    declineFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // remove friend request from friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friendRequestsSent: userEmail } }, { new: true });
        return true;
    },
    sendFriendRequest: async (userEmail, friendEmail) => {
        // add friend request to user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friendRequests: friendEmail } }, { new: true });
        // add friend request to friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friendRequestsSent: userEmail } }, { new: true });
        return true;
    },
    deleteFriend: async (userEmail, friendEmail) => {
        // remove friend from user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friends: friendEmail } }, { new: true });
        // remove user from friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friends: userEmail } }, { new: true });
        return true;
    },
    getMeetupsPending: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.meetupsPending;
    },
    getMeetupsAccepted: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.meetupsAccepted;
    },
    getMeetupsDeclined: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.meetupsDeclined;
    },
    getMeetupsCreated: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return user.meetupsCreated;
    },
    resetPassword: async (email, newPassword) => {
        return await User.findOneAndUpdate({ email: email }, { password: newPassword }, { new: true });
    }
};

module.exports = queries;