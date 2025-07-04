import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {SnackbarProvider} from "notistack"
import App from "./App"

ReactDOM.render(
  <SnackbarProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>,
  document.getElementById("root")
)
