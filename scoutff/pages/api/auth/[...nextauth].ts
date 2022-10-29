import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongoose";
import MongooseAdapter from "../../../adapters/MongooseAdapter";
import bcrypt from "bcrypt"
import User from "../../../models/User";


import GoogleProvider from "next-auth/providers/google"



export default NextAuth({
  adapter: MongooseAdapter({client: clientPromise(), options: {databaseName: "login"}}),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
   
    async jwt({token, user}) {
      if (user) {
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },


    
  
  }
  ,
  
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "futbolcu@deneme.edul.bar" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {







          if (credentials?.email && credentials?.password) {
            const user = await User.findOne({ email: credentials.email });



            if (user && user.password) {
              const isValid = await bcrypt.compare(credentials.password, user.password);
              if (isValid) {
                return user;
              }
            }
          }
          

     
          // Return null if user data could not be retrieved
          return null
        }
      }),

      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),

      

      
    
    ]
  })

