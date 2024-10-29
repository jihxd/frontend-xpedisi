'use client'

import { useEffect, useState, useCallback } from 'react'
import { messaging, getToken, onMessage } from '../lib/firebase'
import { Unsubscribe } from 'firebase/messaging'

const useFcmToken = () => {
  const [token, setToken] = useState('')
  const [retryLoadToken, setRetryLoadToken] = useState(0)

  const requestToken = useCallback(async () => {
    console.log('Requesting permission...')

    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission()

        if (permission === 'granted') {
          console.log('Notification permission granted.')

          const currentToken = await getToken(messaging!, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          })
          if (currentToken) {
            // TODO: Send the token to your server and save it to send notifications later
            setToken(currentToken)
            console.log('FCM Token:', currentToken)
          } else {
            console.log(
              'No registration token available. Request permission to generate one.',
            )
            setToken('')
          }
        } else {
          console.log('Unable to get permission to notify.')
        }
      }
    } catch (error) {
      console.error('An error occurred while retrieving token. ', error)
      setRetryLoadToken((prevRetryLoadToken) => {
        const newRetryLoadToken = prevRetryLoadToken + 1
        console.log('Retrying...', newRetryLoadToken)
        return newRetryLoadToken
      })
    }
  }, [])

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return

      const unsubscribe = onMessage(messaging!, (payload) => {
        if (Notification.permission !== 'granted') return

        console.log('Message received. ', payload)
        // Customize notification here
        if (payload.notification) {
          new Notification(payload.notification?.title!, {
            body: payload.notification?.body,
            icon: payload.notification?.icon,
          })
        }
      })

      return unsubscribe
    }

    let unsubscribe: Unsubscribe | null = null

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub
      }
    })

    return () => unsubscribe?.()
  }, [token])

  useEffect(() => {
    if (retryLoadToken > 3 || token) return
    requestToken()
  }, [requestToken, retryLoadToken, token])

  return { requestToken, token }
}

export default useFcmToken
