import React from 'react'
import {Link} from 'react-router-dom'
import './components.css'

export default function Nav() {
  return (
    <div >
      <div className='topnav'>
        <ul>
            <h1 className='title'>ToDo</h1>
            {/* <li className='title'><h1>ToDo</h1></li> */}
            <li className='navitems log'><Link to={"/"} onClick={() => window.localStorage.clear()}>logout</Link></li>
            <div className='midnav'>
              <li className='navitems'><Link to={"/complete"}>Completed</Link></li>
              <li className='navitems'><Link to={"/home"}>Home</Link></li>
            </div>
        </ul>
      </div>
    </div>
  )
}
