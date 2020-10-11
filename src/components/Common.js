import React from 'react'
import './Common.css'
import { Input} from "./Utils"

const math = require ('mathjs')
const format =(e)=>{
  return math.format(e,{notation:'fixed',precision:3})
}
/*const setInputWidth= ()=>{
  var lengths= []
  var inputs = document.querySelectorAll('.input')
  var i = 0
  for (i = 0; i < inputs.length; i++) {
     lengths.push(inputs[i].offsetWidth)
 }
  for (i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("style",`width:${Math.min(...lengths)}px !important`)
}
}*/

function Common({item1, item2}) {
    const inputChangedHandler = (event) => {
        const resultElement = document.querySelector('.conversionResult')
        var inputEle = document.querySelector('input[name="from"]')
        var outputEle= document.querySelector('input[name="to"]');
        var inputValue= event.target.value
        var regex = /^[0-9.]+$/
        if (inputValue.match(regex)){
            var fromweights =item1['weights'] 
            var toweights = item2['weights']   
               var d = fromweights*inputValue/toweights 
               if(d>=1000000 || d<=-1000000){   
                d= math.format(math.number(d),{precision:5})
                  } 
               else{
                d = format(d)}
               if (event.target.name==="from"){
                var result = `<span>Result:</span> ${inputValue} ${item1['name']} = ${d} ${item2['name']}`
                 if (event.target.value === ""){
                  outputEle.value = ''
                 }else{
                  outputEle.value = `${d}`
                 }
                }
                if(event.target.name==="to"){
                  result = `<span>Result:</span> ${inputValue} ${item2['name']} = ${d} ${item1['name']}`
                  if (event.target.value === ""){
                    inputEle.value = ''
                   }else{
                    inputEle.value = `${d}`
                   }
                 }
                 resultElement.innerHTML = result
              
               
        } 
         else {
          if (inputValue !==''){
              resultElement.innerHTML = '<span style="color:red">Invalid Number</span>'
              if (event.target.name==="from"){
                outputEle.value = ''
              }else{
                inputEle.value = ''
              }

          }
          else{
              resultElement.innerHTML = ''
              outputEle.value = ''
              outputEle.value= ''
          }}
         
    }
       
    return (
        <div className="home">
            <h1>Convert <span>{ item1['name'] } to { item2['name'] }</span></h1>
            <p>Provide values below to convert <span className="lowercase"> {item1['name']} [{item1['unit']}] to {item2['name']} [{item2['unit']}] </span>  <i>vice versa.</i></p> 
           <div className="home__conversion">
              <div className="conversionResult">

              </div>
              <div className="common__conversion pt-2">
                 <span style={{width:'40px'}}>From:</span> 
                <Input fieldName="from" callback={inputChangedHandler}/>
                <span className="lowercase"> {item1['name']} </span>
              </div>
              <div className="common__conversion pt-2">
                 <span style={{width:'40px'}}>To:</span> 
                <Input fieldName="to" callback={inputChangedHandler}/>
                <span className="lowercase"> {item2['name']} </span>
              </div>
          </div>
          <div className="px-2">
            <h1 className="pt-2">Conversion Metrics</h1>
             <p className="pt-2">
               1 {item1['name']} = {format(item1['weights']/item2['weights'])} {item2['name']} <br/>
               1 {item2['name']} = {format(item2['weights']/item1['weights'])} {item1['name']}
             </p>
            {/* item1 and item2 are metric objects with conversion details*/ }
                 <h1 className="pt-2">How to Convert <span>{item1['name']} to {item2['name']}</span>?</h1>
                 <p className="pt-2">We can convert {item1['unit']} to {item2['unit']} as follows.</p>
                 <div className="mathSection">
                   <h2>Example</h2><br/>
                 <p>Convert 8 {item1['unit']} to {item2['unit']} ?</p>
                 <p>We know 1  <span> {item1['name']} = {format(item1['weights']/item2['weights'])} {item2['name']}; <br/> 
                 1 {item2['name']} ={format(item2['weights']/item1['weights'])} {item1['name']}.</span></p>
                 <p>8 {item1['unit']} = __{item2['unit']}</p>
                 <p>8x{format(item1['weights']/item2['weights'])} = {format(8*item1['weights']/item2['weights'])} 
                  {item2['unit']} (we know 1{item1['unit']}= {format(item1['weights']/item2['weights'])}{item2['unit']})</p>
                  <p>Answer:</p>
                  <p>8{item1['unit']} = {format(8*item1['weights']/item2['weights'])}{item2['unit']} </p>
                 </div>
           </div> 
        </div>
    )
}

export default Common
