import React, {useState} from "react";

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import useAppState from "../hooks/use-app-state";
import {Formik} from "formik";
import * as yup from 'yup';
import {useDispatch} from "react-redux";
import {ActionTypes, UserProfile} from "../reducers/UserProfile/types";

export enum Levels {
    "High" = "HIGH",
    "Medium" = "MEDIUM",
    "Low" = "LOW"
}

export enum Advisor {
    "Yes" = "YES",
    "No" = "NO",
}

const schema = yup.object().shape({
    companyName: yup.string().required(),
    businessValue: yup.number().required(),
    nrEmployees: yup.number().required(),
    employeeTraining: yup.string().oneOf(Object.values(Levels)).required(),
    investedAmount: yup.number().required(),
    knownVulnerabilities: yup.number().required(),
    externalAdvisor: yup.string().oneOf(Object.values(Advisor)).required(),
    successfulAttacks: yup.number().required(),
    failedAttacks: yup.number().required(),
});

export const Profile = () => {
    const {data} = useAppState(s => s.profile);
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3">Edit Profile</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Formik
                                    validationSchema={schema}
                                    // @ts-ignore
                                    onSubmit={(values) => {
                                        console.log(values as UserProfile)
                                        dispatch({
                                        type: ActionTypes.UPDATING_PROFILE,
                                        loading: true,
                                        profile: values
                                    })
                                    }}
                                    initialValues={data}>
                                    {({
                                          handleSubmit,
                                          handleChange,
                                          values,
                                          errors,
                                      }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row>
                                                <Col className="pr-1" md="3">
                                                    <Form.Group>
                                                        <label>Company</label>
                                                        <Form.Control
                                                            defaultValue={values.companyName}
                                                            placeholder="Company"
                                                            name="company"
                                                            type="text"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.companyName}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Company Name is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <h3>General Information</h3>
                                            <Row>
                                                <Col className="pr-1" md="3">
                                                    <Form.Group>
                                                        <label>Business Value</label>
                                                        <Form.Control
                                                            defaultValue={values.businessValue}
                                                            placeholder="Business Value"
                                                            name="businessValue"
                                                            type="number"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.businessValue}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Business Value is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pr-1" md="3">
                                                    <Form.Group>
                                                        <label>Number of Employees</label>
                                                        <Form.Control
                                                            defaultValue={values.nrEmployees}
                                                            placeholder="Number of Employees"
                                                            name="nrEmployees"
                                                            type="number"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.nrEmployees}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Number of Employees is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>Employee Training Level</label>
                                                        <Form.Control as="select"
                                                                      defaultValue={values.employeeTraining}
                                                                      name="employeeTraining"
                                                                      onChange={handleChange}>
                                                            <option value="HIGH">High</option>
                                                            <option value="MEDIUM">Medium</option>
                                                            <option value="LOW">Low</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <h3>Technical Details</h3>
                                            <Row>
                                                <Col className="pr-1" md="3">
                                                    <Form.Group>
                                                        <label>Invested Amount</label>
                                                        <Form.Control
                                                            defaultValue={values.investedAmount}
                                                            name="investedAmount"
                                                            placeholder="Invested Amount"
                                                            type="number"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.investedAmount}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Invested Amount is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="3">
                                                    <Form.Group>
                                                        <label>Known Vulnerabilities</label>
                                                        <Form.Control
                                                            defaultValue={values.knownVulnerabilities}
                                                            name="knownVulnerabilities"
                                                            placeholder="Known Vulnerabilities"
                                                            type="number"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.knownVulnerabilities}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Known Vulnerabilities is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>External Advisor</label>
                                                        <Form.Control as="select"
                                                                      defaultValue={values.externalAdvisor}
                                                                      name="externalAdvisor"
                                                                      onChange={handleChange}>
                                                            <option value="YES">Yes</option>
                                                            <option value="NO">No</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="3">
                                                    <Form.Group>
                                                        <label>Successful Past Attacks</label>
                                                        <Form.Control
                                                            defaultValue={values.successfulAttacks}
                                                            name="successfulAttacks"
                                                            placeholder="Successful Past Attacks"
                                                            type="number"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.successfulAttacks}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Successful Attacks is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="3">
                                                    <Form.Group>
                                                        <label>Failed Past Attacks</label>
                                                        <Form.Control
                                                            defaultValue={values.failedAttacks}
                                                            name="failedAttacks"
                                                            placeholder="Failed Past Attacks"
                                                            type="number"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.failedAttacks}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Failed Attacks is required
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="btn-fill pull-right"
                                                type="submit"
                                                variant="info">Update</Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
