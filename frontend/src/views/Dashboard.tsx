import React, {useEffect} from "react";
import {
    Card,
    Container,
    Row,
    Col,
    Table,
} from "react-bootstrap";
import useAppState from "../hooks/use-app-state";
import NumberFormat from 'react-number-format';
import {useDispatch} from "react-redux";
import {fetchPredictions} from "../reducers/Prediction/action";
import {GiTrafficLightsGreen, GiTrafficLightsOrange, GiTrafficLightsRed} from "react-icons/all";
import {CustomSpinner} from "../components/CustomSpinner";
import {fetchRecommendations} from "../reducers/Recommendation/action";

export const Dashboard = () => {
    const {data} = useAppState(s => s.profile);
    const {predictions, pred_loading, pred_error} = useAppState(s => s.predictions)
    const {recommendations, rec_loading, rec_error} = useAppState(s => s.recommendations)
    const dispatch = useDispatch();

    // Fetch Risk Predictions
    useEffect(() => {
        const {['companyName']: _, ...profile} = data; // eslint-disable-line
        dispatch(fetchPredictions(profile))
    }, [data, dispatch]);

    // Fetch Protection Service Recommendations
    useEffect(() => {
        console.log(predictions)
        if (predictions.ddos_prediction !== "") {
            dispatch(fetchRecommendations())
        }
    }, [predictions])

    const getClassfromRisk = (risk: string) => {
        switch (risk) {
            case "HIGH":
                return <GiTrafficLightsRed className="nc-icon nc-notes text-danger"/>
            case "MEDIUM":
                return <GiTrafficLightsOrange className="nc-icon nc-notes text-warning"/>
            default:
                return <GiTrafficLightsGreen className="nc-icon nc-notes text-success"/>
        }

    }


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
                                <hr/>
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
                                <hr/>
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
                                <hr/>
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
                                <hr/>
                                {pred_loading ? <CustomSpinner/> : (
                                    pred_error ? <h5 className="text-danger text-md-center font-italic">Failed to fetch
                                        server...</h5> : (
                                        <Row>
                                            <Col xs="5">
                                                <div className="icon-big text-center icon-warning">
                                                    <i className="nc-icon nc-notes" style={{color: "#3255a5"}}></i>
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
                                    )
                                )}
                            </Card.Body>
                            <Card.Footer>
                                <hr/>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Header>
                                <Card.Title>
                                    <h4>Attack Risks</h4>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <hr/>

                                {pred_loading ? <CustomSpinner/> : (
                                    pred_error ? <h5 className="text-danger text-md-center font-italic">Failed to fetch
                                        server...</h5> : (
                                        <Row>
                                            <Col xs="5">
                                                <div className="icon-big text-center icon-warning" style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    {getClassfromRisk(predictions.MLP_prediction)}
                                                </div>
                                            </Col>
                                            <Col xs="7">
                                                <div className="numbers">
                                                    <p className="card-category">Distributed Denial-of-Service</p>
                                                    <Card.Title as="h4">{predictions.MLP_prediction}</Card.Title>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                )}
                            </Card.Body>
                            <Card.Footer>
                                <hr/>
                                <div className="stats"/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">DDoS Protection Services</Card.Title>
                                <p className="card-category">
                                    Recommendations provided by MENTOR
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                {rec_loading ? <CustomSpinner/> : (
                                    rec_error ? <h5 className="text-danger text-md-center font-italic">Failed to fetch
                                        Recommendations from MENTOR</h5> : (
                                        recommendations.length > 0 ? (
                                            <Table className="table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th className="border-0">Provider</th>
                                                    <th className="border-0">Service Name</th>
                                                    <th className="border-0">Description</th>
                                                    <th className="border-0">Deployment</th>
                                                    <th className="border-0">Leasing Period</th>
                                                    <th className="border-0">Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {recommendations.map(service => (
                                                    <tr key={service["id"]}>
                                                        <td><img width={100}
                                                                 src={`data:image/png;base64,${service["image"]}`}/>
                                                        </td>
                                                        <td>{service["serviceName"]}</td>
                                                        <td>{service["description"]}</td>
                                                        <td>{service["deployment"]}</td>
                                                        <td>{service["leasingPeriod"]}</td>
                                                        <td>
                                                            <NumberFormat
                                                                value={service["price"]}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                // @ts-ignore
                                                                renderText={(value, props) =>
                                                                    <div {...props}>${value}</div>}/>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                        ) : <div/>
                                    )
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
