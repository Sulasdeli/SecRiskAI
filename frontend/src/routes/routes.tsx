import Dashboard from "../views/Dashboard";
import {Profile} from "../components/Profile";

export interface route {
    path: string,
    name: string,
    icon: string,
    component: any,
    layout: string,
    redirect?: any,
    upgrade?: any
}

const dashboardRoutes: route[] = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "fas fa-tachometer-alt",
        component: Dashboard,
        layout: "/user"
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "nc-icon nc-circle-09",
        component: Profile,
        layout: "/user"
    },
];

export default dashboardRoutes;
