import userService from './user.service.js'

export default {
    pushNotification,
    pushCustomNotification
}


function pushNotification(title,task) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(reg) {
          console.log('Service Worker Registered!', reg);
          reg.pushManager.getSubscription().then(function(sub) {
            if (sub === null) {
              // Update UI to ask user to register for Push
              _subscribeUser()
              console.log('Not subscribed to push service!');
            } else {
              // We have a subscription, update the database
              let currUser =  userService.getCurrUser()
              console.log('inside push service - got curr user', currUser)
              console.log('Subscription object: ', sub);
              currUser.pushSub = sub
              let updatedUser =  userService.updateUser(currUser)
              console.log('$@#$@#$@#$@#$@#$ currUser: ',updatedUser)
            }
          });
        })
         .catch(function(err) {
          console.log('Service Worker registration failed: ', err);
        });
      }
    
    console.log('PUSH NOTIFICATION!')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready // returns a Promise, the active SW registration
            .then(swreg => swreg.showNotification(title, {
                body: 'A new task was born'+task.title,
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

function _subscribeUser() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(reg) {
  
        reg.pushManager.subscribe({
          userVisibleOnly: true
        }).then(function(sub) {
            console.log('GRRRRRRRRRRRRRRRREAT SUCCESSSSSSSSSSSSSS')
          console.log('Endpoint URL: ', sub.endpoint);
        }).catch(function(e) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Unable to subscribe to push', e);
          }
        });
      })
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