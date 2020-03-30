import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as math from "mathjs";
import "./styles.css";

export default function App() {
  const [result, setResult] = useState(0);
  const [equation, setEquation] = useState(0);
  const [decimalCount, setDecimalCount] = useState(0);
  const [firstOperator, toggleFirstOperator] = useState(true);
  const [lastButtonWasOp, toggleLastButtonWasOp] = useState(false);

  const handleNumber = buttonValue => {
    if (equation === 0 || equation === "0") {
      setEquation(buttonValue);
      toggleLastButtonWasOp(false);
    } else {
      setEquation(prev => prev + buttonValue);
      toggleLastButtonWasOp(false);
    }
  };

  const handleOperator = buttonValue => {
    if (firstOperator === true) {
      setEquation(prev => prev + buttonValue);
      toggleFirstOperator(false);
      toggleLastButtonWasOp(true);
      setDecimalCount(0);
    } else if (firstOperator === false) {
      setResult(equation);
      setEquation(prev => prev + buttonValue);
      toggleLastButtonWasOp(true);
      setDecimalCount(0);
    } else if (buttonValue === "-") {
      setEquation(prev => prev + buttonValue);
      toggleLastButtonWasOp(true);
      setDecimalCount(0);
    }
  };

  const handleDecimal = buttonValue => {
    const lastButton = equation.slice(-1);

    if (
      decimalCount > 0 ||
      lastButton === "." ||
      lastButton === "+" ||
      lastButton === "-" ||
      lastButton === "*" ||
      lastButton === "/"
    ) {
      setEquation(prev => prev);
    } else {
      setEquation(prev => prev + buttonValue);
      setDecimalCount(prev => prev + 1);
    }
  };

  const handleEquals = () => {
    const result = math.evaluate(equation);
    setEquation(result);
    setDecimalCount(0);
  };

  const handleClear = () => {
    setResult(0);
    setEquation(0);
    toggleFirstOperator(true);
    toggleLastButtonWasOp(false);
    setDecimalCount(0);
  };

  return (
    <div className="container">
      <Container id="container">
        <Row className="row">
          <Col>
            <div id="display">
              <p id="displayText">{equation}</p>
            </div>
          </Col>
        </Row>
        <div id="keysContainer">
          <Row>
            <Col xs={{ span: 6 }}>
              <Button variant="danger" id="clear" onClick={handleClear}>
                AC
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                id="divide"
                onClick={() => handleOperator("/")}
              >
                /
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                id="multiply"
                onClick={() => handleOperator("*")}
              >
                *
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                id="seven"
                onClick={() => handleNumber("7")}
              >
                7
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                id="eight"
                onClick={() => handleNumber("8")}
              >
                8
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                id="nine"
                onClick={() => handleNumber("9")}
              >
                9
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                id="add"
                onClick={() => handleOperator("+")}
              >
                +
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="secondary"
                id="four"
                onClick={() => handleNumber("4")}
              >
                4
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                id="five"
                onClick={() => handleNumber("5")}
              >
                5
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                id="six"
                onClick={() => handleNumber("6")}
              >
                6
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                id="subtract"
                onClick={() => handleOperator("-")}
              >
                -
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="secondary"
                id="three"
                onClick={() => handleNumber("3")}
              >
                3
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                id="two"
                onClick={() => handleNumber("2")}
              >
                2
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                id="one"
                onClick={() => handleNumber("1")}
              >
                1
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                id="decimal"
                onClick={() => handleDecimal(".")}
              >
                .
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <Button
                variant="secondary"
                id="zero"
                onClick={() => handleNumber("0")}
              >
                0
              </Button>
            </Col>
            <Col xs={6}>
              <Button variant="success" id="equals" onClick={handleEquals}>
                =
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
