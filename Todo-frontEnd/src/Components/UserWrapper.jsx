import React from 'react'
import { Outlet} from 'react-router-dom'
import NavBar from './NavBar'

function UserWrapper() {


  return (
<div className='w-full max-w-[1800px] mx-auto'>
    <NavBar/>
    <Outlet />

</div>

  )
}

export default UserWrapper