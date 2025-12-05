import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createRequest = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "solicitudes"), data);
    return docRef.id;
  } catch (error) {
    throw new Error("Error al guardar solicitud: " + error.message);
  }
};
