import NextAuth, { NextAuthOptions, unstable_getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

import clientPromise from "../../../lib/mongoose";
import MongooseAdapter from "../../../adapters/MongooseAdapter";
import bcrypt from "bcrypt"
import User from "../../../models/User";


import GoogleProvider from "next-auth/providers/google"
import { decode, getToken } from "next-auth/jwt";

import { userToAdapterUser } from "../../../adapters/MongooseAdapter";

import jwt from "jsonwebtoken"




import {v2} from "cloudinary"

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.CLOUDINARY_SECURE === "true",
});





export const authOptions :  NextAuthOptions = {
  adapter: MongooseAdapter({client: clientPromise(), options: {databaseName: "login"}}),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.SECRET,

  
  callbacks: {
   
    async jwt({token, user}) {
    
      if (user) {
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }


      

      return token
      
    },
    async session({session, token}) {



   

     
      if (!session.original || token.email !== session.user.email ) {

        


        

        session.original = jwt.sign({email : token.email,role : token.role,sub : token.sub,aud : "football-uhuan"}, process.env.NEXTAUTH_SECRET!, {expiresIn: "30d"})


        session.user.id = token.sub!


        session.user.role = token.role



        

      }



      return session



    },

    

    async signIn({user, account, profile, email, credentials}) {

      //get baseurl from request
      const baseUrl = (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ?? process.env.NEXTAUTH_URL
      const errorPage = `${baseUrl}/error?error=EmailNotVerified`

      const userNotExist = `${baseUrl}/error?error=UserNotExist`

      const verificationRequest = email?.verificationRequest
      


      if (verificationRequest) 
          return await User.exists({email: user.email}) ? true : userNotExist
      

        
      //update user if email is verified
      if (!user.emailVerified  && account?.provider === "email") {
        const {email} = user
        user = await User.findOneAndUpdate({email}, {emailVerified: new Date()}, {new: true}).lean()


      }







      return user?.emailVerified ? true : errorPage

      

    }


    
  
  },
  
  
  pages: {
    signIn: "/auth/signin",
    signOut: "/api/auth/signout",
    error: "/api/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/api/auth/verify-request", // (used for check email message)
    newUser: "/profile" // If set, new users will be directed here on first sign in
  },

  


  

  
  
    providers: [
      EmailProvider({
        server : {
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM,
        normalizeIdentifier: (identifier) => identifier.toLowerCase(),
        
        
        
      }),

      CredentialsProvider({
        id : "login",
        name: 'Login',

        credentials: {
          email: { label: "Email", type: "text", placeholder: "futbolcu@deneme.edul.bar" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {



          await clientPromise()
          if (!credentials?.email || !credentials?.password) throw new Error('Please enter all fields')
          

          const user = await User.findOne({ email: credentials.email }).lean();



          if (!user) throw new Error('No user with that exists')



          if (!user?.password)  throw new Error('That user has no password')


          















          const isValid = await bcrypt.compare(credentials.password, user.password);


          if (!isValid) throw new Error('Invalid password or email')
          

  
          

     
          return  userToAdapterUser(user);
        }
      }),
      CredentialsProvider({
        id : "register",
        name: 'Register',
        credentials: {
          name: { label: "Name", type: "text", placeholder: "Futbolcu" },
          email: { label: "Email", type: "text", placeholder: "futbolcu@deneme.edul.bar" },
          password: {  label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          await clientPromise()



          

          if (!credentials?.email) throw new Error("Email cannot be empty")
          if (!credentials?.password) throw new Error("Password cannot be empty")
          if (!credentials?.name) throw new Error("Name cannot be empty")
          if (!credentials?.email.includes("@")) throw new Error("Email must be valid")
          


         

            const user = await User.findOne({ email: credentials!.email });


            if (user) throw new Error("User already exists")


            credentials!.password = await bcrypt.hash(credentials!.password, 8);


            const {name, email, password} = credentials!;
           
            const newUser = new User({name,email,password});
            await newUser.save();

            



            return userToAdapterUser(newUser);
          
        }
      }),
      CredentialsProvider({
        id :"update-account",
        name: 'Update Account',
        
  
        

        credentials: {
          name: { label: "Name", type: "text", placeholder: "" },
          password: {  label: "Password", type: "password" },
          image : {label:"Image", type:"file"},
        },
        
        async authorize(credentials,req) {
          await clientPromise()



          if (!credentials) throw new Error("Credentials cannot be empty")




          //Get only not empty values from credentials
          //Ignore other credentials
          let {name,password,image} = credentials

          if (image === "undefined") image = ""


          
          const update = {name,  password,image}





          

          







          //Remove empty values
          for (const [key,value] of Object.entries(update)) {

            if (!value) {
              const typedKey = key as keyof typeof update
              delete update[typedKey]
          }
        }









        const cookies = req.headers?.cookie.split(";")
        const sessionCookie = cookies?.find((cookie : String) => cookie.includes("next-auth.session-token"))

        const rawJwt = sessionCookie?.split("=")[1]

          
        




        if (!rawJwt) throw new Error("No session cookie found")




          //decode url encoded 
          const jwt = decodeURIComponent(rawJwt)


          try {
            const token =  await decode({
              secret: process.env.NEXTAUTH_SECRET ?? "",
              token: jwt,
            
            })

            console.log(token)
          }
          catch (err) {
            console.log(err)
          }





         const token =  await decode({
            secret: process.env.NEXTAUTH_SECRET ?? "",
            token: jwt,
          
          })

          


          if (!token) throw new Error("Token is not valid")
          if (!token?.email) throw new Error("Token is not valid")

        



          if (update.image) {
            //upload base64 image to cloudinary
            const fileName = `${token.sub}.jpg`

            //convert update.image to buffer
            
            try {
              const {secure_url} = await v2.uploader.upload(update.image, {
                folder: "next-auth",
                resource_type: "raw",
                public_id : fileName,
                unique_filename: true,
                overwrite: true,
                allowed_formats: ["jpg","png","jpeg"],
                transformation: {
                  width: 500,
                  height: 500,
                  crop: "fill"
                }
              })

              update.image = secure_url

            

            }
            catch (err) {
              console.log(err,"err")
            }
  
          }

         


         
    
          



          //Hash password if it is not empty
          if (update.password) {
            update.password = await bcrypt.hash(update.password, 8);
          }



          console.log(update)
        
          const user = await User.findOneAndUpdate({email: token.email}, update, {new: true}).lean();


        


          

          return userToAdapterUser(user);

          

        }
      }),



      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),

      

      
    
    ]
  }



export default NextAuth(authOptions)

