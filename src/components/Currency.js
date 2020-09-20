import React from 'react'
import './Currency.css'
import {Input} from './Utils'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
 

export  function DropdownInput() {
    return (
        <div className="dropdown">
            <div className="flag"></div>
            
            
        </div>
    )
}


function Currency() {
    return (
       <div className="home">
           <div className="currencyConvertor">
               <div className="currencyConvertorTop">
               <ReactFlagsSelect searchable={true}  alignOptions="right" defaultCountry="US"
                searchPlaceholder="Search for a country" 
               />
               </div>
               <div className="currencyConvertorTop">
                   <div className="dropdown">

                   </div>
                   <Input/>
               </div>

           </div> 
        </div>
    )
}


export default Currency
