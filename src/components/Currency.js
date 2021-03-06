import React from 'react'
import { Input } from './Utils'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './Currency.css'
import customLabels from './customLabels1.json'
import rates from './rates'
import currencyObject from './currencyObject'
//import Chart from 'chart.js'

const math = require('mathjs')
const Chart = require('chart.js/dist/Chart.bundle')
const format = (e) => {
    return math.format(e, { notation: 'fixed', precision: 4 })
}
var fromCurrency = null
var toCurrency = null
var inputValue = null
var fromCurrencyUnit = null
var toCurrencyUnit = null
function CurrencyTable() {
    return (
        <div className="c_details d-flex-row" >
            <div className="currencyTable">
                <div></div>
            </div>
            <div className="chart">
                <h2>Course details</h2>
                <span className="muted"></span>
                <canvas id="myChart">
                    <h2>Select two Currencies to see the trends </h2>
                </canvas>
                <div className="muted">Select Currencies to see the detailed perfomance</div>
            </div>
        </div>

    )
}
function historyChart() {
    var ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sep 3', 'Sep 4', 'Sep 5', 'Sep 6', 'Sep 7'],
            datasets: [{
                label: 'Currency trends',
                // data: [12, 19, 3, 5, 2, 3],
                data: [{ x: 0.567, y: 0.455 }, { x: 0.7, y: 0.5 }, { x: 0.8, y: 1.0 }, { x: 0.7, y: 0.5 }, { x: 0.8, y: 1.0 }],
                backgroundColor: 'transparent',
                borderColor: 'orange',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            if (index === 2 || index === 4) {
                                return value;
                            }

                        }
                    }
                }]
            }
        }
    });
}

function Currency() {
    const to = (e) => {
        toCurrency = rates[e]
        toCurrencyUnit = currencyObject[e]
        calculate()
    }
    const from = (e) => {
        fromCurrency = rates[e]
        fromCurrencyUnit = currencyObject[e]
        calculate()
    }
    const setInputValue = (e) => {
        var regex = /^[0-9.]+$/
        if (e.target.value.match(regex)) {
            inputValue = e.target.value
        }
        else {
            inputValue = null
        }
        calculate(e)
        if (e.target.value !== '' && !e.target.value.match(regex)) {
            document.querySelector('input[name="to"]').value = 'Provide valid amount!'
        }

    }
    const calculate = (event) => {
        if (fromCurrency !== null && toCurrency !== null && inputValue !== null) {
            var d = format(fromCurrency * inputValue / toCurrency)
            document.querySelector('input[name="to"]').value = d

        }
        else {
            document.querySelector('input[name="to"]').value = ''

        }
        if (fromCurrency !== null && toCurrency !== null) {
            document.querySelector('.currencyTable>div').innerHTML = `<div> <h2>${fromCurrencyUnit}/${toCurrencyUnit} Conversion </h2> <span class="muted">${fromCurrencyUnit}/ ${toCurrencyUnit} in the last 24 hours</span><br/><br/>
            Selling 1 ${fromCurrencyUnit} <span>&rarr;</span>  ${format(fromCurrency / toCurrency)} ${toCurrencyUnit} </div>
            <div>Buying 1 ${fromCurrencyUnit} <span>&rarr;</span> ${format(fromCurrency / toCurrency)} ${toCurrencyUnit} </div> <br/><br/>`
            document.querySelector('.chart>span').innerHTML = `${fromCurrencyUnit}/ ${toCurrencyUnit} in the last 24 hours`
            historyChart()

        }


    }


    return (
        <div className="home conversionSection">
            <h1>Currency Converter</h1>
            <div className="currencyConvertor d-flex-row">
                <div className="d-flex">
                    <h5 className="mt-2">Currency I have:</h5>
                    <ReactFlagsSelect searchable={true}
                        searchPlaceholder="Search currency name"
                        customLabels={customLabels}
                        countries={Object.keys(customLabels)}
                        onSelect={from} className="c_from" />
                    <div className="c_label mt-2">
                        <h5 >Amount:</h5><span className="muted">Amount you have</span>
                    </div>
                    <Input fieldName="from" callback={setInputValue} />
                </div>
                <div className="d-flex">
                    <h5 className="mt-2" >Currency I  Want:</h5>
                    <ReactFlagsSelect searchable={true}
                        searchPlaceholder="Search currency name"
                        customLabels={customLabels}
                        countries={Object.keys(customLabels)}
                        onSelect={to} className="c_to" />
                    <div className="c_label mt-2">
                        <h5 >Amount:</h5><span className="muted">Amount you will get</span>
                    </div>
                    <Input fieldName="to" />
                </div>
                <CurrencyTable from_rates={0.76} to_rates={0.5}
                    fromCurrencyUnit={'USD'}
                    toCurrencyUnit={'KES'} />
                <div>
                    <p>
                        This currency calculator rates are not correct. Please don't use them
                    </p>
                </div>
            </div>
        </div>
    )
}



export default Currency
