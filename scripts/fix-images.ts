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
    id: "b005-diamond-fluorescence",
    coverDataUrl: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1200&q=80",
  },
  {
    id: "b006-why-certification-matters",
    coverDataUrl: "https://images.unsplash.com/photo-1617038260897-41a533f8f21e?w=1200&q=80",
  },
];

async function main() {
  console.log("Fixing broken cover images...\n");
  for (const fix of fixes) {
    await updateDoc(doc(db, "blogPosts", fix.id), { coverDataUrl: fix.coverDataUrl });
    console.log(`✓ Updated image for: ${fix.id}`);
  }
  console.log("\n✅ Done!");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
