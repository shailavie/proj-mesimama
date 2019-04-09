<template>
    <div class="home">
        <br>
        <button class="button1" v-if="notificationsSupported" @click="askPermission">Enable notifications ></button>
        <button class="button2" v-if="notificationsSupported" @click="sendNotification">Enable notifications ></button>
    </div>
</template>

<script>
import pushService from '../services/push-notifications-service.js'

export default {
    name: 'home',
    data() {
        return {
            notificationsSupported: false,
        }
    },
    methods: {
        askPermission() {
            if (this.notificationsSupported) {
                Notification.requestPermission(result => {
                    console.log('result from permission question', result);
                        if (result !== 'granted') {
                        alert('You probably do not like notifications?!');
                    } else {
                        console.log('A notification will be send from the service worker => This only works in production');
                        this.showNotification()
                    }
                })
            }
        },
        showNotification() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready // returns a Promise, the active SW registration
                    .then(swreg => swreg.showNotification('Notifications granted', {
                        body: 'Here is a first notification',
                        icon: '/img/icons/android-chrome-192x192.png',
                        image: '/img/autumn-forest.png',
                        vibrate: [300, 200, 300],
                        badge: '/img/icons/plint-badge-96x96.png',
                        // actions: [
                        //     { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
                        //     { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
                        // ],
                    }))
            }
        },
        sendNotification(){
            pushService.pushNotification()
              
            // if ('serviceWorker' in navigator) {
            //     navigator.serviceWorker.ready // returns a Promise, the active SW registration
            //         .then(swreg => swreg.showNotification('Hi Shai', {
            //             body: 'A new task was born',
            //             icon: '/assets/icons/baby_64.png',
            //             image: '/assets/icons/baby_64.png',
            //             vibrate: [300, 200, 300],
            //             badge: '/assets/icons/baby_64.png',
            //             actions: [
            //                 { action: 'confirm', title: 'Okay', icon: '/assets/icons/baby_64.png'},
            //                 { action: 'cancel', title: 'Cancel', icon: '/assets/icons/baby_64.png'}
            //             ],
            //         }))
            // }
        }
    },
    created() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            this.notificationsSupported = true
        }
    },
}
</script>

<style scoped lang="scss">
    .button1 {
        background: #1da025;
        color: #fff;
        padding: 10px 20px;
        font-size: 18px;
        margin-top: 20px;
        &:focus {
                outline: none;
        }
    }
    .button2 {
        background: #d45933;
        color: #fff;
        padding: 10px 20px;
        font-size: 18px;
        margin-top: 20px;
        &:focus {
                outline: none;
        }
    }
</style>