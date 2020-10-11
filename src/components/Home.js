import './Home.css'
import React, { useState, useEffect } from 'react'
import { Input, Dropdown } from './Utils'
import Navtabs from './NavTabs'
import conversions from './conversions'
import { Link } from "react-router-dom"


const math = require('mathjs')
const commonLenCon = [{ 'name': 'cm to inches', 'slug': 'cm-in' }, { 'name': 'km to miles', 'slug': 'km-mi' }, { 'name': 'Feet to Metres', 'slug': 'ft-m' },
{ 'name': 'feet to cm', 'slug': 'ft-cm' }
]
const commonWeightCon = [{ 'name': 'grams to ounces', 'slug': 'g-oz' }, { 'name': 'pounds to ounces', 'slug': 'lb-oz' }, { 'name': 'ounces to grams', 'slug': 'oz-g' },
{ 'name': 'ounces to pounds', 'slug': 'oz-lb' }, { 'name': 'lbs to kg', 'slug': 'lb-kg' }
]
const metrics = ['length', 'weight', 'time', 'temperature']
const titles = {
    'length': 'measure length',
    'weight': 'measure weight',
    'time': '',
    'temperature': 'measure temperature'
}

const commonTempCon = [{ 'name': 'celcius to kelvin', 'slug': '°C-K' }, { 'name': 'kelvin to celcius', 'slug': 'K-°C' }, { 'name': 'Fahrenheit to Celsius', 'slug': '°F-°C' }
]
export const tabClick = (ele) => {
    var tablinks = document.getElementsByClassName("tablinks");
    document.getElementById('title').innerHTML = `${ele.id} Conversion`
    var i = 0
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace('active', '');
    }
    ele.classList.add('active')
}


function Home({ match }) {
    var activeMetic = 'weight'
    if (typeof match !== 'undefined') {
        if (metrics.includes(match.params.name) === true) {
            activeMetic = match.params.name
        }
    }
    document.querySelector('title').innerHTML = titles[activeMetic]
    const [convesionUnits, setConversionUnits] = useState(conversions[activeMetic])
    const inputChangedHandler = (event) => {
        const resultElement = document.querySelector('.conversionResult')
        var inputValue = document.querySelector('input[name="from"]').value;
        var outputEle = document.querySelector('input[name="to"]');
        var regex = /^[0-9.]+$/
        if (inputValue.match(regex)) {
            var fromUnit = document.querySelector('select[name="from"]').value
            var toUnit = document.querySelector('select[name="to"]').value
            var fromweights = (convesionUnits.find((value) => {
                let selectedValue = value['unit'] === fromUnit
                return selectedValue
            }))['weights']
            var toweights = (convesionUnits.find((value) => {
                let selectedValue = value['unit'] === toUnit
                return selectedValue
            }))['weights']
            var d = fromweights * inputValue / toweights
            if (d >= 1000000 || d <= -1000000) {
                d = math.format(math.number(d), { precision: 5 })
            }
            else {
                d = math.format(d, { notation: 'auto', precision: 5 })
            }

            var result = `<span>Result:</span> ${inputValue} ${fromUnit} = ${d} ${toUnit}`
            var convMetric = `1 ${fromUnit} = ${math.format(fromweights / toweights, { precision: 4 })} ${toUnit}`
            document.getElementById('convMetric').innerHTML = convMetric

            resultElement.innerHTML = result
            outputEle.value = `${d}`
        } else {
            if (inputValue !== '') {
                resultElement.innerHTML = 'invalid value'
                outputEle.value = 0
            }
            else {
                resultElement.innerHTML = ''
                outputEle.value = 0
            }
        }
        if (event.target.type === "select-one") {
            var el = document.querySelector(`div[name=${event.target.name}]>span`)
            el.innerHTML = event.target.value
        }
    }
    function unitsSwitch(event) {
        tabClick(event.currentTarget)
        setConversionUnits(conversions[`${event.currentTarget.id}`])
        document.querySelector('.conversionResult').innerHTML = ''
        document.getElementById('convMetric').innerHTML = ''
        document.querySelector('input[name="from"]').value = 1
        document.querySelector('input[name="to"]').value = 1;
    }
    useEffect(() => {
        if (typeof match !== 'undefined') {
            if (metrics.includes(match.params.name) === true) {
                var ele = document.getElementById(match.params.name)
                tabClick(ele)
                document.querySelector('title').innerHTML = titles[match.params.name]
                document.getElementById('title').innerHTML = `${activeMetic} Conversion`
            }
        }
    })

    return (
        <div className="home">
            <h1 id="title">Weight Conversion</h1>
            <div className="home__conversion">
                <Navtabs callback={unitsSwitch} />
                <div className="conversionResult">

                </div>
                <div className="home__conversionTop">
                    <div>
                        <h5>Value:</h5>
                        <Input placeHolder="milimitre" items={convesionUnits} fieldName="from" callback={inputChangedHandler} value={1} />
                    </div>
                    <div>
                        <h5>From:</h5>
                        <Dropdown items={convesionUnits} fieldName="from" callback={inputChangedHandler} />
                    </div>

                </div>

                <div className="home__conversionBottom">
                    <div id="toInput">
                        <h5>Result:</h5>
                        <Input placeHolder="milimitre" items={convesionUnits} fieldName="to" callback={inputChangedHandler} value={1} />
                    </div>
                    <div>
                        <h5>To:</h5>
                        <Dropdown items={convesionUnits} fieldName="to" callback={inputChangedHandler} />
                    </div>
                </div>
                <div id="convMetric"></div>
            </div>
            <div className="home__commonUnits">
                <h1>Common conversions</h1>
                <div>
                    <ul>
                        {commonLenCon.map((obj) => <li key={obj['name']}>
                            <Link to={`length/${obj.slug}`}>
                                <span style={{ 'fontSize': '1.5rem' }}>&rsaquo;</span> {obj.name}
                            </Link>
                        </li>)}
                    </ul>
                    <ul>
                        {commonWeightCon.map((obj) => <li key={obj['name']}>
                            <Link to={`weight/${obj.slug}`}>
                                <span style={{ 'fontSize': '1.5rem' }}>&rsaquo;</span> {obj.name}
                            </Link>
                        </li>)}
                    </ul>
                    <ul>
                        {commonTempCon.map((obj) => <li key={obj['name']}>
                            <Link to={`temperature/${obj.slug}`}>
                                <span style={{ 'fontSize': '1.5rem' }}>&rsaquo;</span> {obj.name}
                            </Link>
                        </li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home 
