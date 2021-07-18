import React from "react";
import {useLocation, NavLink} from "react-router-dom";

import {Nav} from "react-bootstrap";
import {route} from "../routes/routes";
import {Icon} from "rsuite";

interface SidebarProps {
    color: string,
    routes: route[]
}

export const Sidebar = (props: SidebarProps) => {
    const location = useLocation();
    const activeRoute = (routeName: string) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    return (
        <div className="sidebar" data-color={props.color}>
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a href="/#" className="simple-text">
                        <Icon size="2x" icon={"realtime"} /> SecRiskAI
                    </a>
                </div>
                <Nav>
                    {props.routes.map((prop, key) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={
                                        prop.upgrade
                                            ? "active active-pro"
                                            : activeRoute(prop.layout + prop.path)
                                    }
                                    key={key}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active">
                                        <i className={prop.icon}/>
                                        <p>{prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}
