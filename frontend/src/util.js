// import { useDispatch, useSelector } from 'react-redux';


// export function tokenRelogin() {
//     const dispatch = useDispatch();
//     let username = useSelector(state => state.usersReducer.username);
//     if (isValidUser && username === null) {
//         console.log("before login with token", isLoggedIn())
//         dispatch(loginWithTokenAsync())
//         console.log("after login with token", isLoggedIn())
//     }
//     while (!!window.localStorage.getItem('token') && username === null) {
//         // loop waiting for login
//     }
// }