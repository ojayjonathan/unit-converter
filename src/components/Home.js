import './Home.css'
import React, { useState, useEffect } from 'react'
import { Input, Dropdown } from './Utils'
import Navtabs from './NavTabs'
import conversions from './conversions'
import { Link } from "react-router-dom"
import {setHeader} from './Common'

const format = (d) => {
    d = (d).toPrecision(10)
    d = Number(d)
    if (d >= 1_000_000 | d <= 0.0000001) {
        d = (d).toPrecision(7)
    }
    else {
        d = d.toPrecision()
    }
    return d
}
const commonLenCon = [{ 'name': 'cm to inches', 'slug': 'cm-in' }, { 'name': 'km to miles', 'slug': 'km-mi' }, { 'name': 'Feet to Metres', 'slug': 'ft-m' },
{ 'name': 'feet to cm', 'slug': 'ft-cm' }
]
const commonWeightCon = [{ 'name': 'grams to ounces', 'slug': 'g-oz' }, { 'name': 'pounds to ounces', 'slug': 'lb-oz' }, { 'name': 'ounces to grams', 'slug': 'oz-g' },
{ 'name': 'ounces to pounds', 'slug': 'oz-lb' }, { 'name': 'lbs to kg', 'slug': 'lb-kg' }
]
const metrics = ['length', 'weight', 'time', 'temperature']
const headerContent = {
    'length': {
        'description': 'Free online length converter - converts between 93 units of length, including meter , kilometer, decimeter, centimeter ,mile ,foot, and more.Explore many other unit converters or learn more about length unit conversions.',
        'title': 'Length Conversion',
        'keywords': 'Length Converter, Length Conversion, Convert Length, Online Length Converter'
    },
    'weight': {
        'description': 'Free online weight and mass converter - converts between units of weight and mass, including kilogram [kg], gram [g], milligram [mg], ton (metric) [t], etc. Also, explore many other unit converters or learn more about weight and mass unit conversions eith examples.',
        'title': 'Weight and mass Conversion',
        'keywords': 'Weight and Mass Converter, Weight and Mass Conversion, Convert Weight and Mass, Online Weight and Mass Converter'
    },
    'time': {
        'description': 'Free online time converter - converts between difference units of time, including second [s], millisecond [ms], minute [min], hour [h], etc. Also, explore many other unit converters or learn more about time unit conversions.',
        'title': 'Time Conversion',
        'keywords': 'Time Converter, Time Conversion, Convert Time, Online Time Converter'
    },
    'temperature': {
        'description': 'Free online temperature converter - converts between 3 units of temperature, including kelvin [K], Celsius [°C], Fahrenheit [°F], etc. Also, explore many other unit converters or learn more about temperature unit conversions.',
        'title': 'Temperature Conversion',
        'keywords': 'Temperature Converter, Temperature Conversion, Convert Temperature, Online Temperature Converter, '
    },
    'currency': {
        'description': 'Calculate live currency and foreign exchange rates with this free currency converter.',
        'title': 'Currency Conversion',
        'keywords': 'Currency Converter, Currency Conversion, Convert Currency, Online Currency Converter, '
    }
}

const commonTempCon = [{ 'name': 'celcius to kelvin', 'slug': '°C-K' }, { 'name': 'kelvin to celcius', 'slug': 'K-°C' }, { 'name': 'Fahrenheit to Celsius', 'slug': '°F-°C' }
]
export const tabClick = (ele) => {
    var tablinks = document.getElementsByClassName("tablinks");
    var m = headerContent[ele.id]
     setHeader(m.title, m.description, m.keywords)
    
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
    var m = headerContent[activeMetic]
    setHeader(m.title, m.description, m.keywords)
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
                d = format(d)
            }
            else {
                d = format(d)
            }

            var result = `<span>Result:</span> ${inputValue} ${fromUnit} = ${d} ${toUnit}`
            var convMetric = `1 ${fromUnit} = ${format(fromweights / toweights)} ${toUnit}`
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
