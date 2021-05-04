import React, {useState} from "react";

import useAppState from "../hooks/use-app-state";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import NumberFormat from "react-number-format";
import {
    Row,
    Button,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    SelectPicker,
    TagPicker,
    Col,
    Schema, RadioGroup, Radio, Icon, Grid, HelpBlock
} from "rsuite";
import {Regions} from "../const/regions";
import {ExternalAdvisor} from "../const/externalAdvisor";
import Card from "react-bootstrap/Card";
import {ActionTypes, UserProfile} from "../reducers/UserProfile/types";

const {StringType, NumberType, ArrayType} = Schema.Types;

const model = Schema.Model({
    companyName: StringType().isRequired('This field is required.'),
    industry: StringType().isRequired('This field is required.'),
    region: ArrayType().isRequired('This field is required.'),
    businessValue: NumberType(),
    nrEmployees: NumberType(),
    budget: NumberType(),
    investedAmount: NumberType(),
    knownVulnerabilities: NumberType(),
    externalAdvisor: StringType().isRequired('This field is required.'),
    successfulAttacks: NumberType(),
    failedAttacks: NumberType(),
});

class AmountInput extends React.Component<{ onChange: any }> {
    render() {
        let {onChange, ...rest} = this.props;
        return (
            <NumberFormat
                {...rest}
                className="rs-input"
                displayType={'input'}
                onValueChange={(values) => {
                    const {value} = values;
                    onChange(parseInt(value))
                }}
                thousandSeparator={true}/>
        );
    }
}

class AmountField extends React.PureComponent {
    render() {
        // @ts-ignore
        const {name, message, label, accepter, error, iconName, ...props} = this.props;
        return (
            <FormGroup className={error ? 'has-error' : ''}>
                <ControlLabel>{label}</ControlLabel>
                <div className="rs-input-group rs-input-number" style={{width: "100%"}}>
                    <span className="rs-input-group-addon"><Icon icon={iconName}/></span>
                    <FormControl
                        name={name}
                        accepter={accepter}
                        errorMessage={error}
                        {...props}/>
                </div>
                <HelpBlock>{message}</HelpBlock>
            </FormGroup>
        );
    }
}

export const Profile = () => {
    const {profile} = useAppState(s => s.profile);
    const [formValue, setFormValue] = useState({...profile});
    const [formError, setFormError] = React.useState({});

    const dispatch = useDispatch();

    return (
        <Grid fluid>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h3">General Information</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <hr/>
                            <Form onCheck={setFormError} model={model} formValue={formValue} onChange={formValues => {
                                setFormValue(formValues as UserProfile);
                            }} onSubmit={() => {
                                dispatch({
                                    type: ActionTypes.UPDATING_PROFILE,
                                    profile: formValue
                                })
                            }}>
                                <Row style={{marginTop: 22}}>
                                    <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Company</ControlLabel>
                                            <div className="rs-input-group rs-input-number">
                                                <span className="rs-input-group-addon"><Icon icon="building-o"/></span>
                                                <FormControl
                                                    name="companyName"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <ControlLabel>Industry</ControlLabel>
                                            <FormControl style={{width: "14em"}} name="industry"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 22}}>
                                    <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Operational Region(s)</ControlLabel>
                                            <FormControl
                                                style={{width: "26em"}}
                                                name="region"
                                                accepter={TagPicker}
                                                data={Regions}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <AmountField
                                            // @ts-ignore
                                            name="businessValue"
                                            label="Business Value (Revenue)"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.businessValue}
                                            iconName="usd"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <AmountField
                                            // @ts-ignore
                                            name="nrEmployees"
                                            label="Number of Employees"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.nrEmployees}
                                            iconName="group"
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <ControlLabel>Employee Training</ControlLabel>
                                            <FormControl
                                                inline appearance="picker"
                                                name="employeeTraining"
                                                accepter={RadioGroup}>
                                                <Radio value={"LOW"}><span style={{fontSize: 12}}>Low</span></Radio>
                                                <Radio value={"MEDIUM"}><span style={{fontSize: 12}}>Medium</span></Radio>
                                                <Radio value={"HIGH"}><span style={{fontSize: 12}}>High</span></Radio>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <AmountField
                                            // @ts-ignore
                                            name="budget"
                                            label="Cybersecurity Budget"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.budget}
                                            iconName="usd"
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <ControlLabel>Priority</ControlLabel>
                                            <FormControl
                                                inline appearance="picker"
                                                name="budgetWeight"
                                                accepter={RadioGroup}
                                            >
                                                <Radio value={1}><span style={{fontSize: 12}}>Low</span></Radio>
                                                <Radio value={2}><span style={{fontSize: 12}}>Medium</span></Radio>
                                                <Radio value={3}><span style={{fontSize: 12}}>High</span></Radio>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <h3>Technical Details</h3>
                                <Row style={{marginTop: 22}}>
                                    <Col md={10}>
                                        <AmountField
                                            // @ts-ignore
                                            name="investedAmount"
                                            label="Invested Amount in Cybersecurity"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.investedAmount}
                                            iconName="usd"
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <AmountField
                                            // @ts-ignore
                                            name="knownVulnerabilities"
                                            label="Known Vulnerabilities"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.knownVulnerabilities}
                                            iconName="crosshairs"
                                        />

                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <ControlLabel>External Advisor</ControlLabel>
                                            <FormControl
                                                style={{width: "21.5em"}}
                                                name="externalAdvisor"
                                                accepter={SelectPicker}
                                                searchable={false}
                                                data={ExternalAdvisor}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col md={8}>
                                        <AmountField
                                            // @ts-ignore
                                            name="successfulAttacks"
                                            label="Successful Past Attacks"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.successfulAttacks}
                                            iconName="user-secret"
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <AmountField
                                            // @ts-ignore
                                            name="failedAttacks"
                                            label="Failed Past Attacks"
                                            accepter={AmountInput}
                                            // @ts-ignore
                                            error={formError.failedAttacks}
                                            iconName="shield"
                                        />
                                    </Col>
                                </Row>
                                <hr/>
                                <Button disabled={Object.keys(formError).length !== 0}
                                        onClick={() => toast.success("Profile updated successfully!")} color="green"
                                        className="btn-fill pull-right" type="submit">Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Grid>
    );
}
