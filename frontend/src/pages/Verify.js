import React from 'react'
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';

function Verify() {
    const currentURL = new URL(window.location.href);
    const mode = currentURL.searchParams.get('mode');
    return (
        <div>
            {mode === "resetPassword" ? <ForgetPassword /> :  <Signup />}
        </div>
    )
}

export default Verify