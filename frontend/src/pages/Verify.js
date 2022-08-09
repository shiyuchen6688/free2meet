import React from 'react';
import ForgetPassword from './ForgetPassword';
import Signup from './Signup';

function Verify() {
    const currentURL = new URL(window.location.href);
    const mode = currentURL.searchParams.get('mode');
    return (
        <div>
            {mode === "resetPassword" ? <ForgetPassword /> : <Signup />}
        </div>
    )
}

export default Verify