import React from 'react'
import ReactDOM from 'react-dom';

const  scaleNames={
    c:'Celsius',
    f:'Fahrenheit'
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        // this.state={temperature:''}
    }

    handleChange(e){
        // this.setState({temperature:e.target.value});
        this.props.onTemperatureChange(e.target.value)
    }

    render(){
        const temperature=this.props.temperature;
        const scale=this.props.scale;
        return(
            <fieldset>
                <legend>
                    Enter temperature in {scaleNames[scale]}
                </legend>
                <input value={temperature} onChange={this.handleChange}></input>
            </fieldset>
        )
    }
}
function BoilingVerdict(props){
    if(props.celsius>=100){
        return <p>The water would boid!</p>
    }
    return <p>The water would not boil.</p>
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.handleCelsiusChange=this.handleCelsiusChange.bind(this);
        this.handleFahreheitChange=this.handleFahreheitChange.bind(this);
        this.state={
            temperature:'',
            scale:'c'
        }
    }
    handleCelsiusChange(temperature){
        this.setState({scale:'c',temperature})
    }
    handleFahreheitChange(temperature){
        this.setState({scale:'f',temperature})
    }
    render(){
        const scale=this.state.scale;
        const temperature=this.state.temperature;
        const celsius=scale==='f'?tryConvert(temperature,toCelsius):temperature;
        const fahrenheit=scale==='c'?tryConvert(temperature,toFahrenheit):temperature;

        return(
            <div>
                <TemperatureInput 
                scale="c"
                temperature={celsius}
                onTemperatureChange={this.handleCelsiusChange}></TemperatureInput>
                <TemperatureInput scale="f"
                temperature={fahrenheit}
                onTemperatureChange={this.handleFahreheitChange}></TemperatureInput>

                <BoilingVerdict celsius={parseFloat(celsius)}></BoilingVerdict>
            </div>
        )
    }
}


function toCelsius(fahreheit){
    return (fahreheit-32)*5/9;
}

function toFahrenheit(celsius){
    return (celsius*9/5)+32;
}

function tryConvert(temperature,convert){
    const input=parseFloat(temperature);
    if(Number.isNaN(input)){
        return ''
    }
    const output=convert(input);
    const rounded=Math.round(output*1000)/1000;
    return rounded.toString();
}

ReactDOM.render(
    <Calculator></Calculator>,
    document.getElementById('root')
)