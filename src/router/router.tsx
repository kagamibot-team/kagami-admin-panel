import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/IndexPage";
import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import MessagePage from "../pages/MessagePage";
import LogPage from "../pages/LogPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        children: [
            {
                path: "/",
                element: <Index />
            },
            {
                path: "/messages",
                element: <MessagePage />
            },
            {
                path: "/log",
                element: <LogPage />
            }
        ]
    },
]);
