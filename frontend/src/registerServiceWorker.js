/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
  // self.addEventListener('push', function(e) {
  //   var options = {
  //     body: 'This notification was generated from a push!',
  //     icon: 'images/example.png',
  //     vibrate: [100, 50, 100],
  //     data: {
  //       dateOfArrival: Date.now(),
  //       primaryKey: '2'
  //     },
  //     actions: [
  //       {action: 'explore', title: 'Explore this new world',
  //         icon: 'images/checkmark.png'},
  //       {action: 'close', title: 'Close',
  //         icon: 'images/xmark.png'},
  //     ]
  //   };
  //   e.waitUntil(
  //     self.registration.showNotification('Hello world!', options)
  //   );
  // });
  self.addEventListener('push', function(e) {
    var body;
  
    if (e.data) {
      body = e.data.text();
    } else {
      body = 'Push message no payload';
    }
  
    var options = {
      body: body,
      // icon: 'images/notification-flat.png',
      icon,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'I don\'t want any of this',
          icon: 'images/xmark.png'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
}
