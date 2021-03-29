import React, {useEffect, useState} from "react";
import {
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import useAppState from "../hooks/use-app-state";
import NumberFormat from 'react-number-format';
import {useDispatch} from "react-redux";
import {fetchPredictions} from "../reducers/Prediction/action";

export const Dashboard = () => {
    const {data} = useAppState(s => s.profile);
    const {predictions, loading} = useAppState(s => s.predictions)
    const dispatch = useDispatch();

    useEffect(() => {
        const { ['companyName']: _, ...profile } = data;
        dispatch(fetchPredictions(profile))
    }, [data]);


    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-money-coins text-success"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Business Value</p>
                                            <Card.Title as="h4">
                                                <NumberFormat
                                                    value={data.businessValue}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                    // @ts-ignore
                                                    renderText={(value, props) => <div {...props}>{value}</div>}/>
                                            </Card.Title>
                                        </div>

                                        <div className="numbers">
                                            <p className="card-category">Invested Amount in Cybersecurity</p>
                                            <Card.Title as="h4">
                                                <NumberFormat
                                                    value={data.investedAmount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                    // @ts-ignore
                                                    renderText={(value, props) => <div {...props}>{value}</div>}/>
                                            </Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-single-02"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Employees</p>
                                            <Card.Title as="h4">
                                                <NumberFormat
                                                    value={data.nrEmployees}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    // @ts-ignore
                                                    renderText={(value, props) => <div {...props}>{value}</div>}/>
                                            </Card.Title>
                                        </div>
                                        <div className="numbers">
                                            <p className="card-category">Training Level</p>
                                            <Card.Title as="h4">{data.employeeTraining}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-vector text-danger"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Successful Cyberattacks</p>
                                            <Card.Title as="h4">{data.successfulAttacks}</Card.Title>
                                        </div>
                                        <div className="numbers">
                                            <p className="card-category">Failed Cyberattacks</p>
                                            <Card.Title as="h4">{data.failedAttacks}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-umbrella-13 text-info"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Known Vulnerabilities</p>
                                            <Card.Title as="h4">{data.knownVulnerabilities}</Card.Title>
                                        </div>

                                        <div className="numbers">
                                            <p className="card-category">External Cybersecurity Advisor</p>
                                            <Card.Title as="h4">{data.externalAdvisor}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Header>
                                <Card.Title>
                                    <h4>Overall Cyberattack Risk Prediction</h4>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <hr></hr>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-notes text-warning"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">K-Nearest Neighbours</p>
                                            <Card.Title as="h4">{predictions.KNN_prediction}</Card.Title>
                                        </div>

                                        <div className="numbers">
                                            <p className="card-category">Multi-Layer Perceptron</p>
                                            <Card.Title as="h4">{predictions.MLP_prediction}</Card.Title>
                                        </div>

                                        <div className="numbers">
                                            <p className="card-category">Support Vector Machine</p>
                                            <Card.Title as="h4">{predictions.SVM_prediction}</Card.Title>
                                        </div>
                                        <div className="numbers">
                                            <p className="card-category">Decision Tree</p>
                                            <Card.Title as="h4">{predictions.DTree_prediction}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Header>
                                <Card.Title>
                                    <h4>DDoS Attack Risk</h4>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <hr></hr>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-notes text-warning"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Prediction</p>
                                            <Card.Title as="h4">{predictions.MLP_prediction}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
