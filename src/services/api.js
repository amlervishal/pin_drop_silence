import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from "../firebase.js"; // Import the pre-initialized Firestore instance




export const getPosts = async () => {
  const postsCol = collection(db, 'posts');
  const postsSnapshot = await getDocs(query(postsCol, orderBy('createdAt', 'desc')));
  return postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPost = async (id) => {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Post not found');
  }
};

export const createPost = async (postData) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    ...postData,
    createdAt: new Date()
  });
  return docRef.id;
};

export const updatePost = async (id, postData) => {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, postData);
};

export const deletePost = async (id) => {
  const docRef = doc(db, 'posts', id);
  await deleteDoc(docRef);
};