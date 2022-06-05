import { useState } from 'react'
import './App.css'
import SignIn from "./SignIn"
import Home from "./Home"


function App() {
  const [isValidUser, setIsValidUser] = useState(false);

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
