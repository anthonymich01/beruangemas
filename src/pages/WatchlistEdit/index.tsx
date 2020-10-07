import React from "react"
import {
  IonContent,
  IonPage,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonInput,
  IonItem,
  IonLabel,
  withIonLifeCycle
} from "@ionic/react"
import * as api from "../../api"
import "./style.scss"

type WatchlistEditState = {
  symbols: Array<string>
  s: string
  listSymbols: Array<any>
}

class WatchlistEdit extends React.Component<any, WatchlistEditState> {
  state = { symbols: [], s: "", listSymbols: [] }

  ionViewWillEnter = async (): Promise<void> => {
    try {
      const response = await api.getUserWatchlist()
      if (response.status === 200) {
        this.setState({ symbols: response.data["symbols"] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleSearchChange = async (e: any): Promise<void> => {
    const newString = e.detail.value!.toUpperCase().trim()
    this.setState({ s: e.detail.value })

    if (newString.length > 1) {
      try {
        const request = { s: newString }
        const response = await api.getIDXStockList(request)
        if (response.status === 200) {
          this.setState({ listSymbols: response.data["list"] })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const { symbols, s, listSymbols } = this.state
    console.log(symbols, listSymbols)

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Watchlist</IonTitle>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonItem>
            <IonLabel position="floating">
              Cari Saham ( Contoh: <b>ASRI</b> )
            </IonLabel>
            <IonInput value={s} onIonChange={this.handleSearchChange} />
          </IonItem>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(WatchlistEdit)
