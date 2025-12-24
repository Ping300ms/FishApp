export const notificationService = {
    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) return false

        if (Notification.permission === 'granted') return true

        const permission = await Notification.requestPermission()
        return permission === 'granted'
    },

    async notify(
        title: string,
        body: string,
        options?: {
            icon?: string
            badge?: string
            tag?: string
        }
    ) {

        if (Notification.permission !== 'granted') return
        console.log("granted")
        if (!('serviceWorker' in navigator)) return
        console.log("sw")
        if (document.hasFocus()) return
        console.log("focus")

        const registration = await navigator.serviceWorker.ready

        await registration.showNotification(title, {
            body,
            icon: options?.icon ?? '/pwa-192x192.png',
            badge: options?.badge ?? '/pwa-192x192.png',
            tag: options?.tag
        })
    }
}
