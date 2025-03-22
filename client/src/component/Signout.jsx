import React, { useContext, useEffect } from 'react'
import  {AuthContext} from ".././context/AuthContext"
const Signout = () => {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
  }, [])
  return (
    <div>Signout</div>
  )
}

export default Signout