// import React from "react"
// import ReactDOM from "react-dom"
import "./index.css"
import App from "./App";

// import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// if(process.env.NODE_ENV === 'production') disableReactTools();

// ReactDOM.render(<App/>,document.getElementById("root"));


import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App  />);