import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from 'next-auth/providers/apple'

import FacebookProvider from 'next-auth/providers/facebook'

import GoogleProvider from 'next-auth/providers/google'

import EmailProvider from "next-auth/providers/email";

export default NextAuth({
    providers: [
      // OAuth authentication providers...
      AppleProvider({
        clientId: process.env.APPLE_ID ?? "",
        clientSecret: process.env.APPLE_SECRE ?? ""
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID ?? "",
        clientSecret: process.env.FACEBOOK_SECRET ?? ""
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? ""
      }),

    ]
  })

