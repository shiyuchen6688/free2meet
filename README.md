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

We used HTML by leveraging JSX, a custom language similar to HTML that allows us to incorporate React components alongside classic HTML tags. Rather than writing CSS files to style our site, our styling was provided by MaterialUI, a powerful React.js library that provides highly customizable UI components that can be styled through JSX tags, allowing us to follow best practices of making styling changes easier to locate. JavaScript is used throughout our frontend and backend to code our application logic, as it’s one of the most popular modern languages, allowing us to use many packages through Node.js and npm.

### Unit 2 - React

We used the React.js framework extensively throughout our frontend to create highly reusable UI components that allow user inputs to be updated and processed through React hooks while following best practices such as abstraction to reduce code complexity and duplicated code. We used Redux to simplify the structure of frontend application data by flattening the data structure and providing a single source of truth allowing all React components to update and access the data without worrying about the hierarchy of the React components.

### Unit 3 - Node and Express

We used the Express.js framework to build our backend logic, which routes API requests to our backend services running Node.js to process data sent from the frontend and store it in the MongoDB server if necessary. We also incorporated APIs such as the Google Maps API to show locations specified by users, SendBird to facilitate chats between users, Firebase to verify user emails, and an AWS API Gateway, Lambda function, and S3 bucket to store user-uploaded images under a randomized filename. In the backend, we also used an NLP-based recommender system to suggest tags for events, and an algorithm to recommend the best times and locations for events based on user submissions.

### Unit 4 - MongoDB

We used a NoSQL database on MongoDB to store application data that needs to persist between sessions, and NoSQL queries on our backend to query the database for relevant data. Our database consists of two collections, users, and meetups, with each document created using a schema specified on our backend using mongoose.

### Unit 5 - Release Engineering

Our web app is deployed to Heroku. Continuous Integration and Continuous Deployment is implemented by connecting the App to our GitHub repository, so any commits to the main branch on GitHub will be automatically deployed to our Heroku app. This approach was chosen over creating a GitHub action as our requirements were straightforward enough that Heroku already supported our use case and a GitHub action would require more complexity while adding an additional point of failure.

## Above and Beyond Functionality

### Google Maps

We incorporated the Google Maps API on the frontend allowing users to select where they want to host events, view locations on a dynamic map, and resize the map to fit several locations in the window.

### Fully Responsive frontend

We made our frontend fully responsive by changing the layout of items on the website based on the user’s screen size. For instance, we used a hamburger menu that includes the profile icon on the mobile version of the website, and a spaced-out horizontal menu on the desktop version. This was achieved using the “sx” property in Material UI, allowing us to make things “flexGrow” into their containers for instance, and show or hide UI components with the “display” property paired with a pre-set screen size.

### Dark Mode

We incorporated an automatic dark mode on the frontend of our website by checking the user’s system settings and applying dark mode on the website as needed. The dark mode is implemented through a Material UI theme retrieved using React’s useMemo hook to reduce the number of expensive calculations on each render, improving UI performance.

### SendBird Chat API + Friend relationship

In addition to basic meetup creation functionalities, we also incorporated the SendBird Chat API to allow users to chat with other users on the platform and have a friend relationship logic that allow users to send/accept/reject friend request and add/delete friend.

### Image Upload API

We are allowing users to upload a JPEG or PNG image when they create an event on our website. The frontend calls an AWS API Gateway with the particular request, which gets processed by an AWS Lambda function that validates the filetype, and returns a signed URL to a randomized AWS S3 object with the appropriate file extension. The frontend uploads the image to that S3 URL for persistent storage, and the image URL is added to the database when the event is created, allowing other users to see the image. Despite the complexity of this approach, generating a random filename on AWS is necessary as it circumvents the issue of naming when users upload images with the same filename.

### Support for Multiple Time zones

Our application allows people to select the time zone and time they wish to host their event in.

### Location Services

When users are creating an event, they have the option of using Location Services on their device to find their current location and set that as a location for the event.

### Optimal Location and Time Recommender Algorithm

We created an algorithm to find the most popular time and location based on the inputs of all the users that have responded to an event invite. The optimal time and location are set as the time and location for the final event.

### Utilizing ML/AI

We created an NLP recommender using the “natural” library from npm, allowing us to recommend tags to users, making their event more discoverable and searchable, especially users viewing the event have a lot of events to scour through.

### Email Authentication through FireBase

We used FireBase to facilitate email verification, allowing users to first verify their email before being able to sign up for the service, and allowing users to receive a password reset link in their email inbox if they forget their password.

### UX Design

We did some research for our UX design, allowing users to refresh the content with a button on the right bottom corner on certain pages to see the latest updates, incorporating custom calendar components with different depths of color for each time slot representing different numbers of people selected for that timeslot, having success or error feedback when sending friends requests from the server to the client, and having confirmation dialogs when users want to delete their account, change their password, change their username, delete their friends, and complete an meetup.

### Json Web Token Authentication

User authentication is done through Json Web Token, improve information security of the system.

## Next Steps

Our next steps are to devise a smarter recommendation algorithm for user events that can resolve ties between different dates and locations, suggest the best backup locations and times, and even suggest people that the user could invite. Another useful feature would be to send emails when a user gets invited to an event, or when an event organizer receives responses. We would also integrate the app with existing social media platforms such as Facebook, Instagram, and WeChat.

## List of Contributions

### Banghua Xu (r8x2b):

I led the following features: all schedule and invitation related frontend (React, Redux) and backend (Node & Express, MongoDB) including customized timetable component, create meetup schedule/invitation forms and send/accept/decline invitation; Firebase related password reset, email authentication, the link between Firebase and our account system; natural language processing based user customized tag recommender system, co-led the mono-repo Heroku deployment including route rearrangement with Runhe. I also participated in testing, fixing bugs, optimization, peer programming, and discussion of features led by other teammates.

### Runhe Guo (z8x2b):

I led the following features: Implemented Google Maps API with adding and deleting locations (React, Redux), MongoDB (setup, connection, schema, queries, mock data), chat API, dark mode for the website, connect scheduling meetups and get created meetups in frontend to backend (Node & Express, MongoDB), algorithm to calculate the best location and time slot for each meetup, home page including checking people not responding and completing meetups, co-lead the Heroku deployment with Banghua. I also participated in testing, fixing bugs, beautifying some UI, designing some frontend UI layouts, peer programming, optimization, and discussion of features led by other teammates.

### Shiyu Chen (d7d2b):

I led the following features: Initialised frontend structure (react, MUI), create meetup form (using redux), backend route structure (express), friend relationship including send/receive friend request, add/delete friend, JSON web token login, change username/password, delete user accounts. I also participated in fixing bugs, optimization, peer programming, and discussion of features led by other teammates.

### Ming Gong (u8g2b):

I led the following features: Implementing the frontend and backend for the History page to display and filter past meetups, the frontend and backend for the individual meetup page, the upload image feature (using AWS API Gateway, Lambda, and S3), making the site responsive by implementing the hamburger menu on mobile, writing the README posts, and facilitation communications. I also participated in testing, fixing bugs, peer programming, refactoring, optimization, and discussion of features led by other teammates.

## Prototypes

![Image1](https://github.com/shiyuchen6688/free2meet/blob/main/p1.jpg?raw=true)
![Image2](https://github.com/shiyuchen6688/free2meet/blob/main/p2.jpg?raw=true)
![Image3](https://github.com/shiyuchen6688/free2meet/blob/main/p3.jpg?raw=true)
