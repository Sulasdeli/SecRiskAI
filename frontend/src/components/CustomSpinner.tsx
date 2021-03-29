import {Col, Row} from "react-bootstrap";
import {ScaleLoader} from "react-spinners";
import React from "react";

export const CustomSpinner = () => {

    return (
        <Row><Col md={4}/><Col className="text-center" md={4}><ScaleLoader color={"#3255a5"}/></Col><Col md={4}/></Row>
    )
}