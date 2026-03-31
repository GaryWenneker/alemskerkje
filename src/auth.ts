import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-mailadres', type: 'email' },
        password: { label: 'Wachtwoord', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        })

        if (!user || !user.isActive) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        )

        if (!isValid) return null

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
})
