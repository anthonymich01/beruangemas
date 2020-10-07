import React from "react"
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react"
import * as api from "../../api"
import TVMarket from "../../util/tradingViewMarket"
import { settingsOutline } from "ionicons/icons"
import "./style.scss"

type WatchlistState = {
  symbols: Array<string>
}

class Watchlist extends React.Component<any, WatchlistState> {
  state = { symbols: [] }

  ionViewWillEnter = async (): Promise<void> => {
    try {
      const response = await api.getUserWatchlist()
      if (response.status === 200) {
        this.setState({ symbols: response.data["symbols"] })
      }
    } catch (error) {}
  }

  handleEditButton = () => this.props.history.push("/watchlist-edit")

  render() {
    const { symbols } = this.state

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Watchlist</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton autoHide={false} onClick={this.handleEditButton}>
                <IonIcon icon={settingsOutline} />
              </IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <TVMarket symbols={symbols} />
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(Watchlist)
