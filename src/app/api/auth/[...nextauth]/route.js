import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/utilities/client-promise';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'PetAdoptionUsers'
  }),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider ({
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET
    })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/'
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };