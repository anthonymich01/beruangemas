import React from "react"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
  IonList,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonIcon,
  IonAlert
} from "@ionic/react"
import * as api from "../../api"
import "./style.scss"
import { keyOutline, logOutOutline, personOutline, walletOutline } from "ionicons/icons"

type AccountState = {
  isLogin: boolean | undefined
  isLogoutAlert: boolean
}

class Account extends React.Component<any, AccountState> {
  state = { isLogin: undefined, isLogoutAlert: false }

  ionViewWillEnter = async (): Promise<void> => {
    try {
      const response = await api.getUserDetail()
      if (response.status === 200) {
        this.setState({ isLogin: true })
      }
    } catch (error) {
      this.setState({ isLogin: false })
    }
  }

  handleLogoutButton = () => this.setState({ isLogoutAlert: true })

  handleLogout = () => {
    localStorage.clear()
    window.location.replace("/login")
  }

  render() {
    const { isLogoutAlert } = this.state

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            <IonItemDivider>
              <IonLabel>Utama</IonLabel>
            </IonItemDivider>
            <IonItem button detail>
              <IonIcon icon={walletOutline} style={{ marginRight: "5px" }} />
              <IonLabel>Pembelian</IonLabel>
            </IonItem>
            <IonItemDivider style={{ marginTop: "15px" }}>
              <IonLabel>Akun</IonLabel>
            </IonItemDivider>
            <IonItem button detail>
              <IonIcon icon={personOutline} style={{ marginRight: "5px" }} />
              <IonLabel>Ubah Profile</IonLabel>
            </IonItem>
            <IonItem button detail>
              <IonIcon icon={keyOutline} style={{ marginRight: "5px" }} />
              <IonLabel>Ubah Password</IonLabel>
            </IonItem>
            <IonItemDivider style={{ marginTop: "15px" }}>
              <IonLabel>Lainnya</IonLabel>
            </IonItemDivider>
            <IonItem button detail={false} onClick={this.handleLogoutButton}>
              <IonIcon icon={logOutOutline} color="danger" style={{ marginRight: "5px" }} />
              <IonLabel color="danger">Keluar</IonLabel>
            </IonItem>
          </IonList>
          <IonAlert
            isOpen={isLogoutAlert}
            onDidDismiss={() => this.setState({ isLogoutAlert: false })}
            message="Apakah kamu yakin untuk keluar?"
            buttons={[
              {
                text: "Tidak",
                handler: () => this.setState({ isLogoutAlert: false })
              },
              {
                text: "Ya, Keluar",
                handler: this.handleLogout
              }
            ]}
          />
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(Account)
