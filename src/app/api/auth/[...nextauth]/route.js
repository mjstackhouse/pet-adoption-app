import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/utilities/client-promise';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'PetAdoptionUsers'
  }),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider ({
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET
    }),
    FacebookProvider ({
      clientId: process.env.FACEBOOK_OAUTH_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_SECRET
    }),
    EmailProvider ({
      server: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_SERVER_USER
    })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/',
    verifyRequest: '/verify-request',
    newUser: '/new-user'
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };