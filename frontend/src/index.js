import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import App from './App';
import Contact from './components/contact/Contact';
import CreateMeetup from './pages/CreateMeetup/CreateMeetup';
import History from './pages/History';
import Invitations from './pages/Invitations';
import Meetup from './components/Meetup';
import reportWebVitals from './reportWebVitals';
import Signup from './pages/Signup';
import './index.css';
import rootReducer from './redux/reducers';

const store = configureStore({ reducer: rootReducer });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/meetups/:id" element={<Meetup />} />
                    <Route path="/meetups/new" element={<CreateMeetup />} />
                    <Route path="/invitations" element={<Invitations />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
