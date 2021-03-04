import { Navigate, PartialRouteObject } from "react-router"
import { Dashboard } from "./components/App/Dashboard"
import { Home } from "./components/Home/Home"


interface Params {
    isLoggedIn:boolean
}

export const Routes = ({isLoggedIn}: Params): PartialRouteObject[] => {
    return [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "app",
            element: isLoggedIn ? <Dashboard/> : <Navigate to="/" />
        }
    ]
}