import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  debug: false,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isOnRoot = nextUrl.pathname === '/'
      if (isOnRoot) return true

      const isOnDashboard = nextUrl.pathname.startsWith('/admin')
      const isLoggedIn = !!auth?.user

      if (isOnDashboard) {
        return isLoggedIn
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
