import React from 'react'
import {Input} from './Utils'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './Currency.css'
import customLabels from './customLabels1.json' 
import rates from './rates'
import currencyObject from './currencyObject'


const math = require('mathjs')
/*const apiCall = ()=>{
fetch('https://api.exchangeratesapi.io/latest?symbols=KES')
.then((resp) => resp.json())
.then((data) =>
{
    exchangeRates = data.rates
    console.log(exchangeRates)
})
}
apiCall()*/
const format =(e)=>{
    return math.format(e,{notation:'fixed',precision:3})
  }

function CurrencyTable({fromCurrencyUnit, toCurrencyUnit, from_rates, to_rates}){
    return(
        <div>
            <h1>currency</h1>
            {1} {fromCurrencyUnit}= {from_rates/to_rates} {toCurrencyUnit}
        </div>
    )
}

function Currency() {
    var fromCurrency =null
    var toCurrency =null
    var inputValue = null
    var fromCurrencyUnit =null
    var toCurrencyUnit = null
    const to = (e)=>{
          toCurrency = rates[e]
          toCurrencyUnit = currencyObject[e]
          calculate()
    }
    const from = (e) =>{
          fromCurrency = rates[e]  
          fromCurrencyUnit = currencyObject[e]  
          calculate()  
    }
    const setInputValue =(e) =>{
        var regex = /^[0-9.]+$/
        if (e.target.value.match(regex)){
        inputValue= e.target.value}
        else{
            inputValue = null
        }
        calculate(e)
        if (e.target.value !== '' && !e.target.value.match(regex)){
            document.querySelector('.conversionResult').innerHTML = '<span> Please provide valid value <span/>'
        }
       
    }
    const calculate = (event)=>{
        if (fromCurrency !== null && toCurrency!==null && inputValue!==null){
            var d = format(fromCurrency*inputValue/toCurrency)
           var result =`<span>Result:</span>${inputValue} ${fromCurrencyUnit}= ${d} ${toCurrencyUnit}`
            document.querySelector('.conversionResult').innerHTML = result
             document.querySelector('input[name="to"]').value= d
            
        }
        else{
            document.querySelector('input[name="to"]').value= ''
            document.querySelector('.conversionResult').innerHTML = ''
        }

    }
    /*const selectedCountry = (event) => {
        const resultElement = document.querySelector('.conversionResult')
        var inputEle = document.querySelector('input[name="from"]')
        var outputEle= document.querySelector('input[name="to"]');
        var inputValue= inputEle.value
        var regex = /^[0-9.]+$/
        var from_selected = (document.querySelector('.c_to .flag-select__option__label')).innerText
        var to_selected = (document.querySelector('.c_to .flag-select__option__label')).innerText
        var from_rates = exchangeRates[splitText(from_selected)]
        var to_rates = exchangeRates[splitText(to_selected)]
        if (inputValue.match(regex)){
            console.log(exchangeRates['KES'])
             console.log((document.querySelector('.c_to .flag-select__option__label')).innerText, outputEle)
             console.log(from_selected, to_selected, from_rates, to_rates)
               var d = from_rates*inputValue/to_rates
               if(d>=1000000 || d<=-1000000){   
                d= math.format(math.number(d),{precision:5})
                  } 
               else{
                d = format(d)}
               var result = `<span>Result:</span>${inputValue} ${CurrencyMap[from_selected]}= ${d}
                            ${CurrencyMap[to_selected]}`
                 resultElement.innerHTML = result
                 outputEle.value = `${d}`
              } 
         else {
         if (inputValue !==''){
              resultElement.innerHTML = '<span style="color:red">Provide a valid value</span>'
              outputEle.value = ''
              }
          else{
              resultElement.innerHTML = ''
              outputEle.value = ''
          }}
         }*/
    return (
       <div className="home conversionSection">
           <div className="currencyConvertor d-flex-row">
               <div className="d-flex">
                <h5 className="mt-2">Currency I have:</h5>   
               <ReactFlagsSelect searchable={true}
                        searchPlaceholder="Search currency name" 
                        customLabels={customLabels} 
                        countries={Object.keys(customLabels)}
                        onSelect={from} className="c_from"/>
                <div className="c_label mt-2">
                      <h5 >Amount:</h5><span className="muted">Amount you will have</span>     
                </div>            
               <Input  fieldName="from" callback={setInputValue} />
               </div>
               <div className="d-flex">
                   <h5 className="mt-2" >Currency I  Want:</h5>
                    <ReactFlagsSelect searchable={true}
                        searchPlaceholder="Search currency name" 
                        customLabels={customLabels} 
                        countries={Object.keys(customLabels)}
                        onSelect={to} className="c_to"/>   
                    <div className="c_label mt-2">
                      <h5 >Amount:</h5><span className="muted">Amount you will get</span>     
                    </div>       
                   <Input  fieldName="to"/>
               </div>
               <div>
                   <CurrencyTable />
                   
               </div>
               <div className="conversionResult"></div>
           </div>
          
        </div>
    )
}


export default Currency
