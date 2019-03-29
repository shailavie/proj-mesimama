
export default {
    pushNotification,
    pushCustomNotification
}


function pushNotification() {
    console.log('PUSH NOTIFICATION!')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready // returns a Promise, the active SW registration
            .then(swreg => swreg.showNotification('Hi Shai', {
                body: 'A new task was born',
                icon: '/assets/icons/baby_64.png',
                image: '/assets/icons/baby_64.png',
                vibrate: [300, 200, 300],
                badge: '/assets/icons/baby_64.png',
                actions: [
                    { action: 'confirm', title: 'Okay', icon: '/assets/icons/baby_64.png' },
                    { action: 'cancel', title: 'Cancel', icon: '/assets/icons/baby_64.png' }
                ],
            }))
    }
}
function pushCustomNotification(body) {
    console.log('PUSH NOTIFICATION!')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready // returns a Promise, the active SW registration
            .then(swreg => swreg.showNotification('Hi there!', {
                body: body,
                icon: '/img/icons/android-chrome-192x192.png',
                image: '/img/icons/android-chrome-192x192.png',
                vibrate: [300, 200, 300],
                badge: '/img/icons/android-chrome-192x192.png',
                actions: [
                    { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png' },
                    { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png' }
                ],
            }))
    }
}