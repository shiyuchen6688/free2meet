import { useState } from 'react'
import './App.css'
import SignIn from "./SignIn"
import Home from "./Home"



function App() {

  // chec if window has local storage, TODO: can change to cookie later
  const isLoggedIn = () => {
    return !!window.localStorage.getItem('user-info'); // !! to cast to boolean
  }

  const [isValidUser, setIsValidUser] = useState(isLoggedIn());


  // if not signed in
  if (!isValidUser) {
    return <SignIn setIsValidUser={setIsValidUser} />
  }

  // alredy sign in
  return (
    <div className="App">
      <Home />

    </div>
  );
}

export default App;
