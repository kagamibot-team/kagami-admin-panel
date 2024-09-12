import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/IndexPage";
import App from "../pages/App";
import ErrorPage from "../pages/error/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        children: [
            {
                path: "/",
                element: <Index />
            }
        ]
    },
]);
