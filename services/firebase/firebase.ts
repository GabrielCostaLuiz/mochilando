import "server-only"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Validate required environment variables
if (!process.env.FIREBASE_PROJECT_ID || 
    !process.env.FIREBASE_CLIENT_EMAIL || 
    !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("Missing required Firebase environment variables")
}

// Safely decode the private key
let decodedKey: string
try {
  decodedKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY, "base64").toString("utf-8")
  
  // Basic validation that it looks like a private key
  if (!decodedKey.includes("PRIVATE KEY")) {
    throw new Error("Invalid private key format")
  }
} catch (error) {
  throw new Error(`Failed to decode Firebase private key: ${error instanceof Error ? error.message : 'Unknown error'}`)
}

// Create the cert
export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
})

// Initialize Firebase as a singleton
const apps = getApps()
if (!apps.length) {
  try {
    initializeApp({
      credential: firebaseCert,
    })
  } catch (error) {
    throw new Error(`Failed to initialize Firebase app: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Get Firestore instance
export const db = getFirestore()