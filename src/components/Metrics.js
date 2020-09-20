import React from 'react'
import { Route } from "react-router-dom"
import Common from './Common'
import conversions from './conversions.json'

function Metrics({match, metric}) {
    if (typeof(match.params.slug !== 'undefined')){
    const units = match.params.slug.split('-')
    var obj1 = conversions[metric]
    var obj2 = conversions[metric]
    var item1 = (obj1.find((value)=>{
        let selectedValue = value['unit']===units[0]
       return selectedValue}))
    var item2 = (obj2.find((value)=>{
        let selectedValue = value['unit']===units[1]
    return selectedValue}))}   
    return (
        <div>
                <Route path={`/${metric}/:slug`}  render={({match})=><Common
                   match={match} item1={item1} item2={item2}/>} />         
        </div>
    )
}

export default Metrics
