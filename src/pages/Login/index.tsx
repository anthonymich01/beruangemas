import React from "react"
import { IonContent, IonInput, IonPage, IonLabel, IonItem, IonToast, IonButton } from "@ionic/react"
import { isValidEmail } from "../../util/validator"
import { closeCircle } from "ionicons/icons"
import { loginUser } from "../../api"
import "./style.scss"

type LoginState = {
  inpEmail: string
  inpPassword: string

  isToast: boolean
  toastMsg: string
}

class Login extends React.Component<any, LoginState> {
  state = {
    inpEmail: "",
    inpPassword: "",

    isToast: false,
    toastMsg: ""
  }

  handleSubmitLogin = async (): Promise<void> => {
    const { inpEmail, inpPassword } = this.state

    if (!isValidEmail(inpEmail)) {
      this.setState({ isToast: true, toastMsg: "Format Email salah" })
      return
    } else if (inpPassword.length < 6) {
      this.setState({ isToast: true, toastMsg: "Password minimal 6 karakter" })
      return
    }

    const request = { email: inpEmail, password: inpPassword }

    try {
      const response = await loginUser(request)
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.access_token)
        window.location.replace("/tabs/home")
      }
    } catch (error) {
      const errData = error.response.data
      this.setState({ isToast: true, toastMsg: errData.error })
    }
  }

  handleRegisterButton = () => this.props.history.push("/welcome")

  render() {
    const { inpEmail, inpPassword, isToast, toastMsg } = this.state

    return (
      <IonPage>
        <IonContent fullscreen>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              pattern="email"
              name="email"
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
              name="password"
              value={inpPassword}
              onIonChange={(e) => this.setState({ inpPassword: e.detail.value!.trim() })}
              minlength={6}
              autocomplete="current-password"
              required
            ></IonInput>
          </IonItem>
          <IonButton color="primary" expand="block" onClick={this.handleSubmitLogin}>
            Login
          </IonButton>
          <p>Belum punya akun?</p>
          <IonButton color="secondary" expand="block" onClick={this.handleRegisterButton}>
            Buat Akun Baru
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

export default Login
