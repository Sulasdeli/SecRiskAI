import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import useAppState from "../hooks/use-app-state";
import NumberFormat from 'react-number-format';
import {useDispatch} from "react-redux";
import {fetchPredictions} from "../reducers/Prediction/action";
import {
    AiOutlineInfoCircle,
    GiTrafficLightsGreen,
    GiTrafficLightsOrange,
    GiTrafficLightsRed
} from "react-icons/all";
import {CustomSpinner} from "../components/CustomSpinner";
import {fetchRecommendations} from "../reducers/Recommendation/action";
import {IconContext} from "react-icons";
import {ModalForm} from "../components/ModalForm";
import {toast} from "react-toastify";
import {Priorities} from "../const/priorities"
import {capitalize} from "../helpers/Capitalize";

export const Dashboard = () => {
    const {profile, serviceConfiguration} = useAppState(s => s.profile);
    const {predictions, pred_loading, pred_error} = useAppState(s => s.predictions)
    const {recommendations, rec_loading, rec_error} = useAppState(s => s.recommendations)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch();

    // Fetch Risk Predictions
    useEffect(() => {
        dispatch(fetchPredictions(profile))
    }, [profile, dispatch]);

    // Fetch Protection Service Recommendations
    useEffect(() => {
        if (predictions.ddos_risk_prediction !== "") {
            dispatch(fetchRecommendations({
                "region": [profile.region],
                "budget": profile.budget,
                "budgetWeight": profile.budgetWeight,
                ...serviceConfiguration
            }))
        }
    }, [predictions, profile, serviceConfiguration, dispatch])

    const getClassFromRisk = (risk: string) => {
        switch (risk) {
            case "HIGH":
                return <GiTrafficLightsRed className="nc-icon nc-notes text-danger"/>
            case "MEDIUM":
                return <GiTrafficLightsOrange className="nc-icon nc-notes text-warning"/>
            default:
                return <GiTrafficLightsGreen className="nc-icon nc-notes text-success"/>
        }

    }

    let {knn, mlp, svm, dtree} = predictions.overall_risk_prediction

    return (
        <Container fluid>
            <Row>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-money-coins text-success"/>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Business Value</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={profile.businessValue}
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
                                                value={profile.investedAmount}
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
                                        <i className="nc-icon nc-single-02"/>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Employees</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={profile.nrEmployees}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                // @ts-ignore
                                                renderText={(value, props) => <div {...props}>{value}</div>}/>
                                        </Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Training Level</p>
                                        <Card.Title as="h4">{capitalize(profile.employeeTraining)}</Card.Title>
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
                                        <i className="nc-icon nc-vector text-danger"/>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Successful Cyberattacks</p>
                                        <Card.Title as="h4">{profile.successfulAttacks}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Failed Cyberattacks</p>
                                        <Card.Title as="h4">{profile.failedAttacks}</Card.Title>
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
                                        <i className="nc-icon nc-umbrella-13 text-info"/>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Known Vulnerabilities</p>
                                        <Card.Title as="h4">{profile.knownVulnerabilities}</Card.Title>
                                    </div>

                                    <div className="numbers">
                                        <p className="card-category">External Cybersecurity Advisor</p>
                                        <Card.Title as="h4">{capitalize(profile.externalAdvisor)}</Card.Title>
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
            </Row>
            <Row>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Header>
                            <Card.Title>
                                <span style={{fontSize: 24}}>General Information</span>
                            </Card.Title>
                        </Card.Header>
                        <hr/>
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <IconContext.Provider value={{color: '#506680'}}>
                                        <div className="icon-big text-center icon-warning" style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <AiOutlineInfoCircle/>
                                        </div>
                                    </IconContext.Provider>

                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Company</p>
                                        <Card.Title as="h4">{profile.companyName}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Industry</p>
                                        <Card.Title as="h4">{capitalize(profile.industry)}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Operational Region</p>
                                        <Card.Title as="h4">{capitalize(profile.region)}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Available Budget -
                                            Priority: {Priorities[profile.budgetWeight]}</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={profile.budget}
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
                        <Card.Header>
                            <Card.Title>
                                <span style={{fontSize: 24}}>Overall Cyberattack Risk Prediction</span>
                            </Card.Title>
                        </Card.Header>
                        <hr/>
                        <Card.Body>
                            {pred_loading ? <CustomSpinner/> : (
                                pred_error ? <h5 className="text-danger text-md-center font-italic">Failed to fetch
                                    server...</h5> : (
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-notes" style={{color: "#3255a5"}}/>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">K-Nearest Neighbors</p>
                                                <Card.Title as="h4">{capitalize(knn)}</Card.Title>
                                            </div>

                                            <div className="numbers">
                                                <p className="card-category">Multi-Layer Perceptron</p>
                                                <Card.Title as="h4">{capitalize(mlp)}</Card.Title>
                                            </div>

                                            <div className="numbers">
                                                <p className="card-category">Support Vector Machine</p>
                                                <Card.Title as="h4">{capitalize(svm)}</Card.Title>
                                            </div>
                                            <div className="numbers">
                                                <p className="card-category">Decision Tree</p>
                                                <Card.Title as="h4">{capitalize(dtree)}</Card.Title>
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
                                <span style={{fontSize: 24}}>Attack Risk Prediction</span>
                            </Card.Title>
                        </Card.Header>
                        <hr/>
                        <Card.Body>
                            {pred_loading ? <CustomSpinner/> : (
                                pred_error ? <h5 className="text-danger text-md-center font-italic">Failed to fetch
                                    server...</h5> : (
                                    <div>
                                        <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning" style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                {getClassFromRisk(predictions.ddos_risk_prediction)}
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Distributed Denial-of-Service</p>
                                                <Card.Title as="h4">{capitalize(predictions.ddos_risk_prediction)}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                        <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning" style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                {getClassFromRisk(predictions.overall_risk_prediction.mlp)}
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Phishing</p>
                                                <Card.Title as="h4">{capitalize(predictions.overall_risk_prediction.mlp)}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                    </div>
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
                                <span style={{fontSize: 24}}>Protection Services Parameters</span>
                            </Card.Title>
                        </Card.Header>
                        <hr/>
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-settings-gear-64"
                                           style={{color: "#09637f"}}/>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Attack Type(s) Coverage</p>
                                        <Card.Title as="h4">{serviceConfiguration.attackType.map(capitalize).join(", ")}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Service Type(s)</p>
                                        <Card.Title as="h4">{serviceConfiguration.serviceType.map(capitalize).join(", ")}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Deployment Type -
                                            Priority: {Priorities[serviceConfiguration.deploymentTimeWeight]}</p>
                                        <Card.Title as="h4">{capitalize(serviceConfiguration.deploymentTime)}</Card.Title>
                                    </div>
                                    <div className="numbers">
                                        <p className="card-category">Leasing Period -
                                            Priority: {Priorities[serviceConfiguration.leasingPeriodWeight]}</p>
                                        <Card.Title as="h4">{capitalize(serviceConfiguration.leasingPeriod)}</Card.Title>
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
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Row>
                                <Col className="pr-1">
                                    <Card.Title style={{fontSize: 24}}>Protection Services</Card.Title>
                                    <p className="card-category">
                                        Recommendations provided by MENTOR
                                    </p>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-fill btn-info"
                                            onClick={() => setShowModal(true)}>
                                            <span className="btn-label">
                                                <i className="fas fa-cog"/>
                                            </span> Configure
                                    </button>
                                    {showModal &&
                                    <ModalForm
                                        close={() => setShowModal(false)}
                                        save={() => {
                                            toast.success("Service Parameter updated successfully!")
                                            setShowModal(false)
                                        }}
                                        isOpen={showModal}
                                    />
                                    }
                                </Col>
                            </Row>
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
                                                <th className="border-0">Attack Type(s) Covered</th>
                                                <th className="border-0">Deployment</th>
                                                <th className="border-0">Leasing Period</th>
                                                <th className="border-0">Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recommendations.map(service => (
                                                <tr key={service["id"]}>
                                                    <td><img width={100}
                                                             src={`data:image/png;base64,${service["image"]}`}
                                                             alt={service["providerName"]}/>
                                                    </td>
                                                    <td>{service["serviceName"]}</td>
                                                    <td>{service["description"]}</td>
                                                    <td>{service.features.map(capitalize).join(", ")}</td>
                                                    <td>{capitalize(service["deployment"])}</td>
                                                    <td>{capitalize(service["leasingPeriod"])}</td>
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
                                    ) : <h5 className="text-md-center font-italic">No recommendations
                                        available...</h5>
                                )
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
