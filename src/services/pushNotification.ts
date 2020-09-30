import { Plugins, Capacitor, PushNotification } from "@capacitor/core"
const { PushNotifications } = Plugins

if (Capacitor.platform !== "web") {
  PushNotifications.register()

  PushNotifications.addListener("pushNotificationReceived", (notification: PushNotification) => {
    alert("Push registration success: " + notification.title)
  })
}
