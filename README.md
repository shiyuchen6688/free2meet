# Free2Meet

## High-Level Description

Our project is a responsive web app allowing users to invite others to events, accept or decline event invitations, and chat with other users. Notable features include Google Maps integration, the ability to upload images for events and avatars, and algorithm and NLP-based recommender systems to streamline the event planning process.

## Project Description

- Who is it for?
  Anyone that want to schedule a time and location for a meetup, including a business meeting, coffee talk, birthday party, dinner, and so on.
- What will it do?
  It will allow a group of people to register their availability for a meetup, they can choose a date, time, and even location. Users can register for new meetups, meetup history of users will be saved by the system. Future features include connecting with your friend, maps to visualize meetup location, generating visualizations of users' meetup history, and so on.
- What type of data will it store?
  - User information: Email, Name, User ID, Password, Tags
  - Meetup information: Title, Description, Location, Date, Time, Timezone, Meetup ID
  - Relationship between users: Friendships, Friend requests
  - Relationship between User and Meetup: Meetups Created, Meetups Attended, Available Times
- What will users be able to do with this data
  - See information about themselves and others
  - Review the history of meetups
  - Create new meetups and invite friends to join
- Additional functionality to add/remove based on time
  - Automatically generate best times and location for meetup based on existing user inputs
  - Email notifications
  - Profile page for each user

## Project Task Requirements

- Minimal requirements
  - [x] An account system that could handle signing up, logging in, and deleting the account. It should also store users' personal information with different visibility. (i.e. password/friend list are not supposed to be public; username/email can be public given users' permissions).
  - [x] A posting system that could handle posting a new event and joining an existing event.
  - [x] A scheduling system that contains the timezone information and the time slot information for each event and each user. It should calculate and return time slots during which all participating users are available for each event.
  - [x] A tracing system that could trace all events joined, all people met, etc.
  - [x] User-friendly frontend. Every webpage should contain all the necessary information and functions with an appropriate layout, and needs to be responsive and interactive. Support switching between light and dark mode following the OS setting.
- Standard requirements
  - [x] A connection system that could handle adding friends and removing friends.
  - [x] An invitation system that could invite users to join an event. Users would be able to view the event and decide whether to join or not with the invitation.
  - [x] Implement JSON web token to securely send user data between the website and the server.
  - [x] Profile page for each user and customized avatar.
  - [x] Visualization of location and time information for each event.
  - [x] A tagging system such that users/events/spaces could have different tags.
  - [x] Incorporate Google Maps API to let users easily add a location to their events.
  - [x] Incorporate AWS S3 API to store user uploaded images.
- Stretch requirements
  - [x] An algorithm-based recommender system that could automatically generate the best times and locations for meetups based on existing user inputs.
  - [x] Another NLP-based recommender to recommend tags to each event based on user inputs.
  - [x] A chat system such that the user could create different spaces (i.e. workspace, gamespace, etc.) with different group members. Users could chat with each other and send files to each other in the space.

## Project Tasks

- Account System
  - [x] Create a database to store account information such as email, username, password, friends, and tags
  - [x] Create UI to handle logging in to an account, and rejecting the login if the username and password do not match
  - [x] Create a UI that shows public (email) and private (username/password) account information
- Posting System
  - [x] Create database tables to store all event posts, and relations between posts and attendees
  - [x] Create UI that shows each event post, including its title, description, time, and who it's created by
  - [x] Create UI that allows any user to join the event

## Technology

### Unit 1 - HTML/CSS/Javascript

### Unit 2 - React

### Unit 3 - Node and Express

### Unit 4 - MongoDB

### Unit 5 - Release Engineering

## Above and Beyond Functionality

## Next Steps

## List of Contributions

- Runhe Guo (Josh)
- Shiyu Chen
- Banghua Xu
- Ming Gong


## Prototypes

![Image1](https://github.com/shiyuchen6688/free2meet/blob/main/p1.jpg?raw=true)
![Image2](https://github.com/shiyuchen6688/free2meet/blob/main/p2.jpg?raw=true)
![Image3](https://github.com/shiyuchen6688/free2meet/blob/main/p3.jpg?raw=true)
