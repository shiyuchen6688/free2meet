# Free2Meet

## Deployment

https://free2meet.herokuapp.com/

## Authors (no particular order)

- Runhe Guo (Josh)
- Shiyu Chen
- Banghua Xu
- Ming Gong

## Project Description

- Who is it for?
  - Anyone that want to schedule a time and location for a meetup, including business meeting, coffee talk, birthday party, dinner, and so on.
- What will it do?
  - It will allow a group of people to register their availability for a meetup, they can choose a date, time, and even location. Users can register for new meetups, meetup history of users will be saved by the system. Future features include connecting with your friend, users have their relationship level based on the number of meetups they have, map to visualize the location of users and meetup location, filter or recommend attendees based on location and meetup history, generate visualizations of users meetup history, allow users to vote for party/meeting ideas
- What type of data will it store?
  - User information: Phone, Email, Name, Address, User ID, timezone
  - Meetup information: Location, Date, Time, Meetup Topic, Meetup ID
  - Relationship between users: level of relationship based on number of meetups
  - Relationship between User and Meetup: which users attended which meetup
  - Meetup Ideas: Idea topic, Idea description
- What will users be able to do with this data
  - See information about themselves and others
  - Review the history of meetups
  - Insert/Edit/Delete Meetup
- Additional functionality to add/remove based on time
  - User can have their avatar
  - Automatically generate best times and location for meetup based on existing user inputs
  - Adjust availability based on different timezone (useful for remote meetings)
  - Email notifications
  - Profile page for each user
  - Public meetup that can invite other users that are using the application

## Project Task Requirements

- Minimal requirements
  - [x] An account system that could handle signing up, logging in, and deleting account. It should also store user's personal information with different visibility. (i.e. password/friendlist are not supposed to be public; username/email can be public given users' permissions).
  - [x] A posting system that could handle posting a new event, joining an existing event, delete a posted event.
  - [x] A scheduling system that contains the timezone infomation and the time slots information for each event and each user. It should calculate and return time slots that all participating users are available for each event.
  - [x] A tracing system that could trace all events joined, all people met, etc.
  - [x] User-friend frontend. Every webpage should contain all the necessary information and functions with appropriate layout, and needs to be responsive and interactive.
- Standard requirements
  - [x] A connection system that could handle adding friends and removing friends.
  - [x] An invitation system that could invite users to join an event. Users would be able to view the event and decide whether to join or not with the invitation.
  - [x] Profile page for each user and customized avatar.
  - [x] A recommender system that could recommend/filter attendees based on location and meetup history, and time slots based on the current attendees' time availability.
  - [x] Visualization of location and time information for each event.
  - [x] A tagging system such that users/events/spaces could have different tags.
  - [x] Incorporate Google Maps API to let users easily add a location to their events.
- Stretch requirements
  - [x] A smarter recommender system that coule automatically generate best times and location for meetup based on existing user inputs.
  - [x] A chat system such that user could create different spaces (i.e. workspace, gamespace, etc.) with different group members. Users could chat with each other and send files to each other in the space.
  - [x] Implement use of JSON web token to securely send user data between the website and the server.

## Project Tasks

- Account System
  - [x] Create a database to store account information such as email, timezone, username, password
  - [x] Create UI to handle logging in to an account, and rejecting the login if the username and password do not match
  - [x] Create a UI that shows public (email/timezone) and private (username/password) account information
- Posting System
  - [x] Create database tables to store all event posts, and relations between posts and attendees
  - [x] Create UI that shows each event post, including its title, description, time, and who it's created by
  - [x] Create UI that allows any user to join the event
  - [x] Create UI that allows only the creator of the post to delete the event post

## Prototypes

![Image1](https://github.com/shiyuchen6688/free2meet/blob/main/p1.jpg?raw=true)
![Image2](https://github.com/shiyuchen6688/free2meet/blob/main/p2.jpg?raw=true)
![Image3](https://github.com/shiyuchen6688/free2meet/blob/main/p3.jpg?raw=true)
