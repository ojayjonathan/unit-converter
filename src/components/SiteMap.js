import React from 'react'
import './Home.css'
import conversions from './conversions'
import { Link } from "react-router-dom"

const perMute = (arr) => {
    var mappings = arr.flatMap((v, i) => arr.slice(i + 1).map(w => ([v, w])));
    return mappings
}
function MapLinks({ metric, obj }) {
    return (
        <li key={`${obj[0]['name']}${obj[1]['unit']}`}>
            <Link to={`${metric}/${obj[0]['unit']}-${obj[1]['unit']}`} >
                <span style={{ 'fontSize': '1.5rem' }}>&rsaquo;</span> {obj[0]['name']} to {obj[1]['name']}
            </Link> 
            <Link to={`${metric}/${obj[1]['unit']}-${obj[0]['unit']}`} >
                <span style={{ 'fontSize': '1.5rem' }}>&rsaquo;</span>{obj[1]['name']} to {obj[0]['name']} 
            </Link>
        </li>

    )
}
function SiteMap() {
    return (
        <div className="home">
            <div className="home__commonUnits">
                <div>
                    {Object.keys(conversions).map((key) =>
                        <ul key={key}>
                            <li className="list-header">{key} conversion</li>
                            {perMute(conversions[key]).map((arr) =>
                                <MapLinks metric={key} obj={arr} key={`${arr[0]['name']}${arr[1]['unit']}`} />)}
                        </ul>



                    )}
                </div>
            </div>
        </div>
    )
}

export default SiteMap
