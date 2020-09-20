import './NavTabs.css'
import React from 'react'
import {useHistory} from 'react-router-dom'


function NavTabs({callback}) {
    const history = useHistory()
    return (    
      <div className="tab">
            <button className="tablinks active" onClick={(event)=>{history.push('/weight') 
            callback(event)}} id='weight'>Weight</button>
            <button className="tablinks" onClick={(event)=>{history.push("/temperature")
            callback(event)}} id='temperature'>Temperature</button>
            <button className="tablinks" onClick={(event)=>{history.push('/length')
            callback(event) }} id='length'>Length</button>
            <button className="tablinks" onClick={(event)=>{history.push('/time')
            callback(event) }} id="time">Time</button>
            <button className="tablinks" id="currency">Currency</button>
        </div>
    )
}

export default NavTabs
