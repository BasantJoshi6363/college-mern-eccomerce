import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
const Signout = () => {
    const { logout } = useAuth0()
    logout();
    return (
        <div>Signout</div>
    )
}

export default Signout