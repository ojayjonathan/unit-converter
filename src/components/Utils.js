import React from 'react'
import './Utils.css'


export function Input({items, fieldName,callback, value}) {
    return (
        <div className="input" name={fieldName} >
            <input defaultValue={value} onChange={callback} name={fieldName} autoComplete="off"/>
           {items && <span>{items && items[0].unit  }</span>} 
        </div>
    )
}



export function Dropdown({items,fieldName, callback}) {
    return (
        <div className="input readOnly">
            <select name={fieldName} id="units" onChange={callback} type='select'>
              {items.map((item)=><option value={item.unit} key={Math.random()}>{item.name + ' - ' + item.unit}</option>)}
            </select>
        <input defaultValue="" />    
        </div>
    )
}


