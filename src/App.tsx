import React from "react"
import { Redirect, Route } from "react-router-dom"
import { IonApp, IonRouterOutlet, setupConfig } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

/* Add Push Notification Service */
import "./services/pushNotification"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import WatchlistEdit from "./pages/WatchlistEdit"
import Tabs from "./Tabs"

/* Force theme to Material Design */
setupConfig({ mode: "md" })

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/welcome" component={Welcome} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/watchlist-edit" component={WatchlistEdit} exact />
        <Route path="/tabs" component={Tabs} exact={false} />
        <Route path="/" render={() => <Redirect to="/welcome" from="/" exact />} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
