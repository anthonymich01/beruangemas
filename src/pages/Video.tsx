import React from "react"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import ExploreContainer from "../components/ExploreContainer"
import "./Video.scss"

const Video: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  )
}

export default Video
