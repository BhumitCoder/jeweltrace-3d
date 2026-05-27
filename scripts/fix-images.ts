import { initializeApp, getApps } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBse5vfsARbl8k6ub9Mir6qs-CsPdaNuGU",
  authDomain: "starlinkjewels109.firebaseapp.com",
  projectId: "starlinkjewels109",
  storageBucket: "starlinkjewels109.firebasestorage.app",
  messagingSenderId: "192385163202",
  appId: "1:192385163202:web:6499e21aa7c34cd9e7c05b",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app, "jewelscard");

const fixes = [
  {
    id: "b006-why-certification-matters",
    coverDataUrl: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=1200&q=80",
  },
  {
    id: "b007-gemstone-certification",
    coverDataUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80",
  },
];

async function main() {
  console.log("Fixing cover images...\n");
  for (const fix of fixes) {
    await updateDoc(doc(db, "blogPosts", fix.id), { coverDataUrl: fix.coverDataUrl });
    console.log(`✓ ${fix.id}`);
  }
  console.log("\n✅ Done!");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
