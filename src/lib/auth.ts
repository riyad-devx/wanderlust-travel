import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('wansderlust');

// Must match the values verified by the Express backend (wanderlust-server).
const JWT_ISSUER = "wanderlust";
const JWT_AUDIENCE = "wanderlust-api";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 

  plugins: [
    jwt({
      jwt: {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        expirationTime: "15m",
      },
    }),
  ],
  session: {
    cookieCache:{
      enabled: true,
      strategy:"jwt",
      maxAge: 7 * 24 * 60 * 60 
    }
  }

});