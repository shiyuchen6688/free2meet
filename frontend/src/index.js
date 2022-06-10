import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import App from './App';
import CreateMeetup from './CreateMeetup';
import Explore from './Explore';
import History from './History';
import './index.css';
import Invitations from './Invitations';
import Meetups from './Meetups';
import rootReducer from './reducers';
import reportWebVitals from './reportWebVitals';
import Signup from './Signup';

const store = configureStore({ reducer: rootReducer });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="/meetups" element={<Meetups />} />
          <Route path="/meetups/:meetupid" element={<Meetups />} />
          <Route path="/meetups/new" element={<CreateMeetup />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/history" element={<History />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="meetups" element={<TODO />}>
                <Route path=":meetupId" element={<TODO />} />
                <Route path="new" element={<TODO />} />
          </Route> */}
        </Routes>
      </BrowserRouter>

    </Provider>

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
