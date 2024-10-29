import { authConfig } from '@/auth.config'
import axios from 'axios'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// import { login } from '@/services/auth/service'
// import { LoginFormData } from '@/app/(auth)/login/_validations/login'

// class CustomSigninError extends CredentialsSignin {
//   constructor(message: string) {
//     super()
//     this.message = message
//   }
// }

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('authorize: ', credentials)
        try {
          const res = await axios.post(
            'http://localhost:8081/api/login',
            credentials,
          )
          console.log('res: ', res.data)
          return {
            ...credentials,
            ...res.data,
          }
        } catch (error) {
          return null
        }

        // TODO: implement login
        // try {
        //   const res = await login(credentials as LoginFormData)
        //   if (res.success) {
        //     return res.data
        //   }
        //   throw new CustomSigninError('Invalid credentials')
        // } catch (error: any) {
        //   throw new CustomSigninError(
        //     error?.response?.data?.message || error.message,
        //   )
        // }
      },
    }),
  ],
})
