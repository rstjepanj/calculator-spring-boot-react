import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={'square ' + props.type} onClick={() => props.onClick(props.type, props.value)}>
            {props.value}
        </button>
    );
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            operator: '',
            operand1: '',
            operand2: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(type, value) {
        this.setState({ text: '' });
        if (type === 'operator') {
            if (this.state.operand1 === '' || this.state.operand2 !== '') // nije unesen prvi broj ili je već započet unos drugog broja
                return;
            this.setState({ operator: value });
        } else if (type === 'number') {
            if (value === '.') { // decimalni zarez
                if (this.state.operator === '') { // unos prvog broja
                    if (this.state.operand1.indexOf('.') > -1) // broj vec ima zarez
                        return;
                    this.setState({ operand1: this.state.operand1 + value });
                } else {
                    if (this.state.operand2.indexOf('.') > -1)
                        return;
                    this.setState({ operand2: this.state.operand2 + value });
                }
            } else { // broj
                if (this.state.operator === '') {
                    this.setState({ operand1: this.state.operand1 + value });
                } else {
                    this.setState({ operand2: this.state.operand2 + value });
                }
            }
        } else if (type === 'equals') {
            if (this.state.operator === '' || isNaN(this.state.operand1) || isNaN(this.state.operand2)) // nisu uneseni brojevi i operator
                return;
            if (this.state.operator === '+')
                this.setState({ text: addition(Number(this.state.operand1), Number(this.state.operand2)), operator: '', operand1: '', operand2: '' });
            else if (this.state.operator === '-')
                this.setState({ text: subtraction(Number(this.state.operand1), Number(this.state.operand2)), operator: '', operand1: '', operand2: '' });
            else if (this.state.operator === '×')
                this.setState({ text: multiplication(Number(this.state.operand1), Number(this.state.operand2)), operator: '', operand1: '', operand2: '' });
            else if (this.state.operator === '÷')
                this.setState({ text: division(Number(this.state.operand1), Number(this.state.operand2)), operator: '', operand1: '', operand2: '' });
        } else if (type === 'custom') {
            if (value === '⌫') {
                if (this.state.operand2.length > 0)
                    this.setState({ operand2: this.state.operand2.slice(0, -1) });
                else if (this.state.operator.length > 0)
                    this.setState({ operator: this.state.operator.slice(0, -1) });
                else if (this.state.operand1.length > 0)
                    this.setState({ operand1: this.state.operand1.slice(0, -1) });
            }
            else if (value === 'C') {
                this.setState({
                    text: '',
                    operator: '',
                    operand1: '',
                    operand2: ''
                });
            }
        }

    }

    render() {
        return (
            <div className="calculator">
                <div className="input-window">{this.state.text !== '' ? this.state.text : this.state.operand1 + this.state.operator + this.state.operand2}</div>
                <div className="row">
                    <Square type="custom" value="C" onClick={this.handleClick} />
                    <Square type="operator" value="÷" onClick={this.handleClick} />
                    <Square type="operator" value="×" onClick={this.handleClick} />
                    <Square type="custom" value="⌫" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Square type="number" value="7" onClick={this.handleClick} />
                    <Square type="number" value="8" onClick={this.handleClick} />
                    <Square type="number" value="9" onClick={this.handleClick} />
                    <Square type="operator" value="-" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Square type="number" value="4" onClick={this.handleClick} />
                    <Square type="number" value="5" onClick={this.handleClick} />
                    <Square type="number" value="6" onClick={this.handleClick} />
                    <Square type="operator" value="+" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Square type="number" value="1" onClick={this.handleClick} />
                    <Square type="number" value="2" onClick={this.handleClick} />
                    <Square type="number" value="3" onClick={this.handleClick} />
                    <Square type="equals" value="=" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Square type="empty" />
                    <Square type="number" value="0" onClick={this.handleClick} />
                    <Square type="number" value="." onClick={this.handleClick} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);

function addition(operand1, operand2) {
    return operand1 + operand2;
}
function subtraction(operand1, operand2) {
    return operand1 - operand2;
}
function multiplication(operand1, operand2) {
    return operand1 * operand2;
}
function division(operand1, operand2) {
    return operand1 / operand2;
}