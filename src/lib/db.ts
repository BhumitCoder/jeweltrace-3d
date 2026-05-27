import {
  collection, doc, getDocs, getDoc, setDoc, deleteDoc,
  query, orderBy, where,
} from "firebase/firestore";
import {
  ref, uploadString, getDownloadURL, deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";
import type { Client, Certificate, BlogPost, Visitor } from "./store";

// ─── Clients ─────────────────────────────────────────────────────────────────

export async function getClients(): Promise<Client[]> {
  const snap = await getDocs(query(collection(db, "clients"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => d.data() as Client);
}

export async function getClient(id: string): Promise<Client | undefined> {
  const snap = await getDoc(doc(db, "clients", id));
  return snap.exists() ? (snap.data() as Client) : undefined;
}

export async function saveClient(client: Client): Promise<void> {
  await setDoc(doc(db, "clients", client.id), client);
}

export async function deleteClient(id: string): Promise<void> {
  await deleteDoc(doc(db, "clients", id));
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export async function getCertificates(): Promise<Certificate[]> {
  const snap = await getDocs(
    query(collection(db, "certificates"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => d.data() as Certificate);
}

export async function getCertificate(id: string): Promise<Certificate | undefined> {
  const trimmed = id.trim();

  // Try direct doc lookup (id == reportNo stored as document ID)
  const direct = await getDoc(doc(db, "certificates", trimmed));
  if (direct.exists()) return direct.data() as Certificate;

  // Try uppercase variant (NDR-25-XXXXXX format)
  const upper = trimmed.toUpperCase();
  if (upper !== trimmed) {
    const upperSnap = await getDoc(doc(db, "certificates", upper));
    if (upperSnap.exists()) return upperSnap.data() as Certificate;
  }

  // Fallback: query by reportNo field
  const q = query(collection(db, "certificates"), where("reportNo", "==", upper));
  const qSnap = await getDocs(q);
  if (!qSnap.empty) return qSnap.docs[0].data() as Certificate;

  return undefined;
}

export async function getCertificatesByClient(clientId: string): Promise<Certificate[]> {
  const snap = await getDocs(
    query(
      collection(db, "certificates"),
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => d.data() as Certificate);
}

export async function saveCertificate(cert: Certificate): Promise<void> {
  let imageDataUrl = cert.imageDataUrl;

  // If it's a fresh base64 blob, upload to Storage and replace with URL
  if (imageDataUrl && imageDataUrl.startsWith("data:")) {
    const imgRef = ref(storage, `certificates/${cert.id}/image`);
    await uploadString(imgRef, imageDataUrl, "data_url");
    imageDataUrl = await getDownloadURL(imgRef);
  }

  await setDoc(doc(db, "certificates", cert.id), { ...cert, imageDataUrl: imageDataUrl ?? null });
}

export async function deleteCertificate(id: string): Promise<void> {
  try {
    await deleteObject(ref(storage, `certificates/${id}/image`));
  } catch {
    // image may not exist — ignore
  }
  await deleteDoc(doc(db, "certificates", id));
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const snap = await getDocs(query(collection(db, "blogPosts"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => d.data() as BlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const snap = await getDocs(
    query(collection(db, "blogPosts"), where("slug", "==", slug))
  );
  return snap.empty ? undefined : (snap.docs[0].data() as BlogPost);
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const snap = await getDoc(doc(db, "blogPosts", id));
  return snap.exists() ? (snap.data() as BlogPost) : undefined;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  let coverDataUrl = post.coverDataUrl;

  // If it's a fresh base64 blob, upload to Storage and replace with URL
  if (coverDataUrl && coverDataUrl.startsWith("data:")) {
    const coverRef = ref(storage, `blog/${post.id}/cover`);
    await uploadString(coverRef, coverDataUrl, "data_url");
    coverDataUrl = await getDownloadURL(coverRef);
  }

  await setDoc(doc(db, "blogPosts", post.id), { ...post, coverDataUrl: coverDataUrl ?? null });
}

export async function deleteBlogPost(id: string): Promise<void> {
  try {
    await deleteObject(ref(storage, `blog/${id}/cover`));
  } catch {
    // cover may not exist — ignore
  }
  await deleteDoc(doc(db, "blogPosts", id));
}

// ─── Visitors ─────────────────────────────────────────────────────────────────

export async function saveVisitor(visitor: Omit<Visitor, "id">): Promise<void> {
  const id = `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await setDoc(doc(db, "visitors", id), { ...visitor, id });
}

export async function getVisitors(): Promise<Visitor[]> {
  const snap = await getDocs(
    query(collection(db, "visitors"), orderBy("timestamp", "desc"))
  );
  return snap.docs.map((d) => d.data() as Visitor);
}
