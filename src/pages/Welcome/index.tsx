import React from "react"
import { IonContent, IonInput, IonPage, IonLabel, IonItem, IonToast, IonButton } from "@ionic/react"
import { isValidEmail } from "../../util/validator"
import { closeCircle } from "ionicons/icons"
import { registerUser } from "../../api"
import "./style.scss"

type WelcomeState = {
  inpFullName: string
  inpEmail: string
  inpPassword: string

  isToast: boolean
  toastMsg: string
}

class Welcome extends React.Component<any, WelcomeState> {
  state = {
    inpFullName: "",
    inpEmail: "",
    inpPassword: "",

    isToast: false,
    toastMsg: ""
  }

  handleSubmitRegister = async (): Promise<void> => {
    const { inpFullName, inpEmail, inpPassword } = this.state

    if (inpFullName.length < 2) {
      this.setState({ isToast: true, toastMsg: "Nama tidak boleh kosong" })
      return
    } else if (!isValidEmail(inpEmail)) {
      this.setState({ isToast: true, toastMsg: "Format Email salah" })
      return
    } else if (inpPassword.length < 6) {
      this.setState({ isToast: true, toastMsg: "Password minimal 6 karakter" })
      return
    }

    const request = {
      full_name: inpFullName,
      email: inpEmail,
      password: inpPassword
    }

    try {
      const response = await registerUser(request)
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.access_token)
        window.location.replace("/tabs/home")
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleLoginButton = () => this.props.history.push("/login")

  render() {
    const { inpFullName, inpEmail, inpPassword, isToast, toastMsg } = this.state

    return (
      <IonPage>
        <IonContent fullscreen>
          <IonItem>
            <IonLabel position="floating">Nama Lengkap</IonLabel>
            <IonInput
              type="text"
              value={inpFullName}
              onIonChange={(e) => this.setState({ inpFullName: e.detail.value!.trim() })}
              autocapitalize="on"
              autocomplete="name"
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              pattern="email"
              value={inpEmail}
              onIonChange={(e) => this.setState({ inpEmail: e.detail.value!.trim() })}
              autocomplete="email"
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              pattern="password"
              value={inpPassword}
              onIonChange={(e) => this.setState({ inpPassword: e.detail.value!.trim() })}
              minlength={6}
              autocomplete="new-password"
              required
            ></IonInput>
          </IonItem>
          <IonButton color="primary" expand="block" onClick={this.handleSubmitRegister}>
            Buat Akun Baru
          </IonButton>
          <p>Sudah ada akun?</p>
          <IonButton color="secondary" expand="block" onClick={this.handleLoginButton}>
            Login disini
          </IonButton>
          <IonToast
            isOpen={isToast}
            onDidDismiss={() => this.setState({ isToast: false })}
            color="danger"
            message={toastMsg}
            duration={5000}
            buttons={[{ role: "cancel", icon: closeCircle }]}
          />
        </IonContent>
      </IonPage>
    )
  }
}

export default Welcome
