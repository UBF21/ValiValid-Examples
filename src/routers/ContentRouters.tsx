import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import { ExampleBootstrap } from "../pages/examples/bootstrap/ExampleBootstrap";
import { ExampleFluentUI } from "../pages/examples/fluentUI/ExampleFluentUI";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "examples",
        children: [
            {
                path: "bootstrap",
                element: < ExampleBootstrap />
            },
            {
                path: "fluent-ui",
                element: <ExampleFluentUI />
            }
        ]
    }
]);