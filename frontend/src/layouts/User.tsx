import React from "react";
import {useLocation, Route, Switch} from "react-router-dom";
import {Sidebar} from "../components/Sidebar";
import {Header} from "../components/Header";
import routes from "../routes/routes";
import {Footer} from "../components/Footer";
import {ToastContainer} from "react-toastify";

export const User = () => {
    const [color] = React.useState("black");
    const location = useLocation();
    const mainPanel = React.useRef(null);
    const getRoutes = (routes: any[]) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={(props) => <prop.component {...props} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        // @ts-ignore
        document.scrollingElement.scrollTop = 0;
        // @ts-ignore
        mainPanel.current.scrollTop = 0;
        if (
            window.innerWidth < 993 &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
            var element = document.getElementById("bodyClick");
            // @ts-ignore
            element.parentNode.removeChild(element);
        }
    }, [location]);
    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} routes={routes}/>
                <div className="main-panel" ref={mainPanel}>
                    <Header/>
                    <div className="content">
                        <ToastContainer />
                        <Switch>{getRoutes(routes)}</Switch>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}
