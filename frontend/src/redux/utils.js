export const REQUEST_STATE = {
    IDLE: 'IDLE',
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
};

export function resetTokenIfTokenExpired(error_msg) {
    if (error_msg === "Token verification failed") {
        console.log("resetting token")
        window.localStorage.removeItem('token')
    }
} 