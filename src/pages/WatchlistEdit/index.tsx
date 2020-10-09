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
  withIonLifeCycle,
  IonList,
  IonListHeader,
  IonItemDivider
} from "@ionic/react"
import * as api from "../../api"
import _ from "lodash"
import "./style.scss"
import { addCircleOutline, trashOutline } from "ionicons/icons"

type listSymbols = {
  code: string
  description: string
}

type WatchlistEditState = {
  symbols: Array<string>
  s: string
  listSymbols: Array<listSymbols>
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

  handleAddWatchlist = async (code: string) => {
    const symbols: Array<string> = this.state.symbols
    const findDuplicateSymbol = symbols.find((symbol) => symbol === code)
    if (findDuplicateSymbol) {
      return
    }

    const newSymbols: Array<string> = [...symbols, code]
    const request = { list: newSymbols }

    try {
      const res = await api.updateUserWatchlist(request)
      if (res.status === 200) {
        this.setState({ symbols: newSymbols })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleRemoveWatchlist = async (code: string) => {
    const symbols: Array<string> = this.state.symbols
    const newSymbols: Array<string> = _.without(symbols, code)
    const request = { list: newSymbols }

    try {
      const res = await api.updateUserWatchlist(request)
      if (res.status === 200) {
        this.setState({ symbols: newSymbols })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { symbols, s, listSymbols } = this.state

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
              Add Stock ( Ex: <b>ASRI</b> / <b>Alam Su...</b> )
            </IonLabel>
            <IonInput value={s} onIonChange={this.handleSearchChange} />
          </IonItem>
          {listSymbols.length >= 1 && (
            <IonList>
              <IonListHeader>
                <h3>Add To Watchlist</h3>
              </IonListHeader>
              {listSymbols.map((v, k) => (
                <IonItem key={k} button detail detailIcon={addCircleOutline} onClick={() => this.handleAddWatchlist(v["code"])}>
                  <IonLabel>
                    <h2>{v["code"]}</h2>
                    <p>{v["description"]}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
          <IonList>
            <IonItemDivider />
            <IonListHeader>
              <h3>My Watchlist</h3>
            </IonListHeader>
            {symbols.map((v, k) => (
              <IonItem key={k} button detail detailIcon={trashOutline} onClick={() => this.handleRemoveWatchlist(v)}>
                <IonLabel>
                  <h2>{v}</h2>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(WatchlistEdit)
