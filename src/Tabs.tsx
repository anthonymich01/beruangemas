import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react"
import { home, playCircle, trendingUp, person, radioOutline } from "ionicons/icons"
import React from "react"
import { Route, Redirect } from "react-router"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Signal from "./pages/Signal"
import Video from "./pages/Video"
import Watchlist from "./pages/Watchlist"
import { getAuthToken } from "./api"

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route
        path="/tabs/home"
        exact
        render={(props) => {
          return !getAuthToken() ? <Redirect to="/welcome" from="/tabs/home" exact /> : <Home {...props} />
        }}
      />
      <Route
        path="/tabs/video"
        exact
        render={(props) => {
          return !getAuthToken() ? <Redirect to="/welcome" from="/tabs/video" exact /> : <Video {...props} />
        }}
      />
      <Route
        path="/tabs/signal"
        exact
        render={(props) => {
          return !getAuthToken() ? <Redirect to="/welcome" from="/tabs/signal" exact /> : <Signal {...props} />
        }}
      />
      <Route
        path="/tabs/watchlist"
        exact
        render={(props) => {
          return !getAuthToken() ? <Redirect to="/welcome" from="/tabs/watchlist" exact /> : <Watchlist {...props} />
        }}
      />
      <Route
        path="/tabs/account"
        exact
        render={(props) => {
          return !getAuthToken() ? <Redirect to="/welcome" from="/tabs/account" exact /> : <Account {...props} />
        }}
      />
      <Redirect to="/tabs/home" from="/tabs" exact />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="video" href="/tabs/video">
        <IonIcon icon={playCircle} />
        <IonLabel>Video</IonLabel>
      </IonTabButton>
      <IonTabButton tab="signal" href="/tabs/signal">
        <IonIcon icon={radioOutline} />
        <IonLabel>Live Signal</IonLabel>
      </IonTabButton>
      <IonTabButton tab="watchlist" href="/tabs/watchlist">
        <IonIcon icon={trendingUp} />
        <IonLabel>Watchlist</IonLabel>
      </IonTabButton>
      <IonTabButton tab="account" href="/tabs/account">
        <IonIcon icon={person} />
        <IonLabel>Account</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
)

export default Tabs
