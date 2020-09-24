import React from "react"
import { Redirect, Route } from "react-router-dom"
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupConfig
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { home, person, playCircle, trendingUp } from "ionicons/icons"
import Home from "./pages/Home"
import Video from "./pages/Video"
import Signal from "./pages/Signal"
import Account from "./pages/Account"

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

/* Force theme to Material Design */
setupConfig({ mode: "md" })

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/video" component={Video} exact={true} />
          <Route path="/signal" component={Signal} exact={true} />
          <Route path="/account" component={Account} exact={true} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="video" href="/video">
            <IonIcon icon={playCircle} />
            <IonLabel>Video</IonLabel>
          </IonTabButton>
          <IonTabButton tab="signal" href="/signal">
            <IonIcon icon={trendingUp} />
            <IonLabel>Live Signal</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon icon={person} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
