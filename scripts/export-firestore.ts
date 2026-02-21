
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Timestamp } from "firebase/firestore";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase Client SDK
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const OUTPUT_DIR = path.join(process.cwd(), "data", "firestore_export");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function exportCollection(collectionName: string) {
  console.log(`Exporting collection: ${collectionName}...`);
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  
  const data = snapshot.docs.map((doc) => {
    const docData = doc.data();
    // Convert Timestamps to ISO strings for JSON compatibility
    const converted = Object.fromEntries(
      Object.entries(docData).map(([key, value]) => {
        if (value instanceof Timestamp) {
          return [key, value.toDate().toISOString()];
        }
        if (value && typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
             // Handle raw object if not instanceof Timestamp
             return [key, new Timestamp(value.seconds, value.nanoseconds).toDate().toISOString()];
        }
        return [key, value];
      })
    );
    return {
      id: doc.id,
      ...converted,
    };
  });

  const filePath = path.join(OUTPUT_DIR, `${collectionName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Saved ${data.length} documents to ${filePath}`);
}

async function main() {
  const collections = ["products", "categories"];
  
  for (const col of collections) {
    try {
      await exportCollection(col);
    } catch (error) {
      console.error(`Error exporting ${col}:`, error);
    }
  }
  // Client SDK keeps the process alive, so we need to exit explicitly
  process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
