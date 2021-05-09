import React from "react";
import {useLocation} from "react-router-dom";
import {Navbar, Container, Button} from "react-bootstrap";
import routes from "../routes/routes";


export const Header = () => {
    const location = useLocation();
    const mobileSidebarToggle = (e: any) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        let node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            // @ts-ignore
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-bars"/>
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e: any) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
            </Container>
        </Navbar>
    );
}
