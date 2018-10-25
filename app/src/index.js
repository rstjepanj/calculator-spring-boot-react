import React from 'react';
import ReactDOM from 'react-dom';
import "typeface-roboto";
import './index.css';

var BACKEND_URL = process.env.REACT_APP_BACKEND_URL === undefined ? 'https://calculator-spring-boot-react.herokuapp.com/' : process.env.REACT_APP_BACKEND_URL;

function Square(props) {
    return (
        <button className={'square ' + props.type} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            operatorSymbol: '',
            operatorName: '',
            operand1: '',
            operand2: ''
        };
        this.handleClickBackspace = this.handleClickBackspace.bind(this);
        this.handleClickClear = this.handleClickClear.bind(this);
        this.handleClickDecimalPoint = this.handleClickDecimalPoint.bind(this);
        this.handleClickEquals = this.handleClickEquals.bind(this);
        this.handleClickNumber = this.handleClickNumber.bind(this);
        this.handleClickOperator = this.handleClickOperator.bind(this);
    }

    handleClickOperator(operatorSymbol, operatorName) {
        if (this.state.operand1 === '' || this.state.operand2 !== '') // nije unesen prvi broj ili je već započet unos drugog broja
            return;
        this.setState({ operatorSymbol: operatorSymbol, operatorName: operatorName });
    }

    handleClickDecimalPoint() {
        this.setState({ text: '' });
        if (this.state.operatorName === '') { // unos prvog broja
            if (this.state.operand1.indexOf('.') > -1) // broj vec ima zarez
                return;
            this.setState({ operand1: this.state.operand1 + '.' });
        } else {
            if (this.state.operand2.indexOf('.') > -1)
                return;
            this.setState({ operand2: this.state.operand2 + '.' });
        }
    }

    handleClickNumber(number) {
        this.setState({ text: '' });
        if (this.state.operatorName === '') {
            this.setState({ operand1: this.state.operand1 + number });
        } else {
            this.setState({ operand2: this.state.operand2 + number });
        }
    }

    handleClickBackspace() {
        this.setState({ text: '' });
        if (this.state.operand2.length > 0)
            this.setState({ operand2: this.state.operand2.slice(0, -1) });
        else if (this.state.operatorSymbol.length > 0)
            this.setState({ operatorSymbol: this.state.operatorSymbol.slice(0, -1) });
        else if (this.state.operand1.length > 0)
            this.setState({ operand1: this.state.operand1.slice(0, -1) });
    }

    handleClickClear() {
        this.setState({
            text: '',
            operatorSymbol: '',
            operatorName: '',
            operand1: '',
            operand2: ''
        });
    }

    handleClickEquals() {
        if (this.state.operatorName === '' || isNaN(this.state.operand1) || isNaN(this.state.operand2)) // nisu uneseni brojevi i operator
            return;
        fetch(BACKEND_URL + this.state.operatorName + '?operand1=' + Number(this.state.operand1) + '&operand2=' + Number(this.state.operand2))
            .then(resp => resp.json())
            .then(result => {
                if (isNaN(result))
                    this.setState({ text: 'Error', operatorSymbol: '', operatorName: '', operand1: '', operand2: '' });
                else
                    this.setState({ text: result, operatorSymbol: '', operatorName: '', operand1: '', operand2: '' });
            });
    }

    render() {
        return (
            <div className="calculator">
                <div className="input-window">{this.state.text !== '' ? this.state.text : this.state.operand1 + this.state.operatorSymbol + this.state.operand2}</div>
                <div className="row">
                    <Square type="custom" value="C" onClick={this.handleClickClear} />
                    <Square type="operator" value="÷" onClick={() => this.handleClickOperator('÷', 'division')} />
                    <Square type="operator" value="×" onClick={() => this.handleClickOperator('×', 'multiplication')} />
                    <Square type="custom" value="⌫" onClick={this.handleClickBackspace} />
                </div>
                <div className="row">
                    <Square type="number" value="7" onClick={() => this.handleClickNumber('7')} />
                    <Square type="number" value="8" onClick={() => this.handleClickNumber('8')} />
                    <Square type="number" value="9" onClick={() => this.handleClickNumber('9')} />
                    <Square type="operator" value="-" onClick={() => this.handleClickOperator('-', 'subtraction')} />
                </div>
                <div className="row">
                    <Square type="number" value="4" onClick={() => this.handleClickNumber('4')} />
                    <Square type="number" value="5" onClick={() => this.handleClickNumber('5')} />
                    <Square type="number" value="6" onClick={() => this.handleClickNumber('6')} />
                    <Square type="operator" value="+" onClick={() => this.handleClickOperator('+', 'addition')} />
                </div>
                <div className="row">
                    <Square type="number" value="1" onClick={() => this.handleClickNumber('1')} />
                    <Square type="number" value="2" onClick={() => this.handleClickNumber('2')} />
                    <Square type="number" value="3" onClick={() => this.handleClickNumber('3')} />
                    <Square type="equals" value="=" onClick={this.handleClickEquals} />
                </div>
                <div className="row">
                    <Square type="empty" onClick={ function() {} } />
                    <Square type="number" value="0" onClick={() => this.handleClickNumber('0')} />
                    <Square type="number" value="." onClick={this.handleClickDecimalPoint} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
