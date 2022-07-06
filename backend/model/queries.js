const Meetup = require('./meetup');
const User = require('./user');

const queries = {
    getAllMeetups: async () => {
        return await Meetup.find({});
    },
    getMeetupById: async (id) => {
        return await Meetup.findById(id);
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
        // await checkIfMeetupIsComplete(meetup);
        return await this.getMeetupsDeclined(userEmail);
    },
    acceptMeetup: async (userEmail, meetup, availableLocations, availableTimeSlots) => {
        // remove meetup from user's meetupsPending
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
        // add meetup to user's meetupsAccepted
        let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlots };
        await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true });
        // await checkIfMeetupIsComplete(meetup);
        return await this.getMeetupsAccepted(userEmail);
    },
    checkIfMeetupIsComplete: async (meetup) => {
        // find the number pending meetups ids and update state to COMPLETED if no pending meetups remain
        let invitees = await User.find({ meetupsPending: meetup });
        if (invitees.length === 0) {
            await Meetup.findOneAndUpdate({ id: meetup }, { state: 'COMPLETED' }, { new: true });
            // TODO: calculate best location and time slots for meetup
        }
        return invitees;
    },
    getFriends: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        let emails = user.friends;
        // get user friends' usernames from emails
        let friends = await User.find({ email: { $in: emails } });
        // keep friends username and email fields
        let friendsUsernames = friends.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });
        return friendsUsernames;
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
        let newFriends = await getFriends(userEmail);
        let newFriendRequests = await getFriendRequests(userEmail);
        return { friends: newFriends, friendRequests: newFriendRequests };
    },
    declineFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // remove friend request from friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friendRequestsSent: userEmail } }, { new: true });
        return await this.getFriendRequests(userEmail);
    },
    sendFriendRequest: async (userEmail, friendEmail) => {
        // add friend request to user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friendRequests: friendEmail } }, { new: true });
        // add friend request to friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friendRequestsSent: userEmail } }, { new: true });
        return await this.getFriendRequestsSent(userEmail);
    },
    deleteFriend: async (userEmail, friendEmail) => {
        // remove friend from user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friends: friendEmail } }, { new: true });
        // remove user from friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friends: userEmail } }, { new: true });
        return await this.getFriends(userEmail);
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
    updateUser: async (userEmail, user) => {
        return await User.findOneAndUpdate({ email: userEmail }, user, { new: true });
    }
};

module.exports = queries;