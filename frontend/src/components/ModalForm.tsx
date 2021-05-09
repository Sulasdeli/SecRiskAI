import React, {useState} from "react";
import useAppState from "../hooks/use-app-state";
import {
    Form,
    Button,
    ButtonToolbar,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal,
    TagPicker,
    RadioGroup,
    Radio, SelectPicker, Row, Col, Schema
} from "rsuite";
import {ActionTypes, ServiceConfiguration} from "../reducers/UserProfile/types";
import {ServiceTypes} from "../const/serviceTypes";
import {AttackTypes} from "../const/attackTypes";
import {DeploymentTimes} from "../const/deploymentTimes";
import {LeasingPeriods} from "../const/leasingPeriods";
import {useDispatch} from "react-redux";
const { StringType, ArrayType } = Schema.Types;

const model = Schema.Model({
  serviceType: ArrayType().isRequired('This field is required.'),
  attackType: ArrayType().isRequired('This field is required.'),
  deploymentTime: StringType().isRequired('This field is required.'),
  leasingPeriod: StringType().isRequired('This field is required.'),
});

interface ModalProps {
    close: () => any,
    save: () => any,
    isOpen: boolean
}

export const ModalForm = (props: ModalProps) => {
    const {serviceConfiguration} = useAppState(s => s.profile);
    const [formValue, setFormValue] = useState({...serviceConfiguration});
    const [formError, setFormError] = React.useState({});
    const dispatch = useDispatch();

    return (
        <Modal show={props.isOpen} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize: 24}}>Configure Service Parameters</Modal.Title>
            </Modal.Header>
            <hr/>
            <Form onCheck={setFormError} model={model} onChange={formValues => {
                setFormValue(formValues as ServiceConfiguration);
            }} onSubmit={() => {
                dispatch({
                    type: ActionTypes.UPDATING_SERVICE_CONFIGURATION,
                    serviceConfiguration: formValue
                })
                props.save()
            }} formValue={formValue}>
                <Modal.Body style={{paddingBottom: 0}}>
                    <Row>
                        <Col md={24}>
                            <FormGroup>
                                <ControlLabel>Service Type(s)</ControlLabel>
                                <FormControl
                                    style={{width: "40em"}}
                                    name="serviceType"
                                    accepter={TagPicker}
                                    data={ServiceTypes}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row style={{marginTop: 25}}>
                        <Col md={24}>
                            <FormGroup>
                                <ControlLabel>Attack Type(s)</ControlLabel>
                                <FormControl
                                    style={{width: "40em"}}
                                    name="attackType"
                                    accepter={TagPicker}
                                    data={AttackTypes}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 25}}>
                        <Col md={16}>
                            <FormGroup>
                                <ControlLabel>Deployment Time</ControlLabel>
                                <FormControl
                                    style={{width: "40em"}}
                                    name="deploymentTime"
                                    accepter={SelectPicker}
                                    data={DeploymentTimes}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <ControlLabel>Priority</ControlLabel>
                                <FormControl
                                    inline appearance="picker"
                                    name="deploymentTimeWeight"
                                    accepter={RadioGroup}
                                >
                                    <Radio value={1}>Low</Radio>
                                    <Radio value={2}>Medium</Radio>
                                    <Radio value={3}>High</Radio>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 25, marginBottom: 30}}>
                        <Col md={16}>
                            <FormGroup>
                                <ControlLabel>Leasing Period</ControlLabel>
                                <FormControl
                                    style={{width: "40em"}}
                                    name="leasingPeriod"
                                    accepter={SelectPicker}
                                    data={LeasingPeriods}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <ControlLabel>Priority</ControlLabel>
                                <FormControl
                                    inline appearance="picker"
                                    name="leasingPeriodWeight"
                                    accepter={RadioGroup}
                                >
                                    <Radio value={1}>Low</Radio>
                                    <Radio value={2}>Medium</Radio>
                                    <Radio value={3}>High</Radio>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                </Modal.Body>
                <Modal.Footer>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button disabled={Object.keys(formError).length !== 0} color="green" className="btn-fill pull-right" type="submit">Update</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}