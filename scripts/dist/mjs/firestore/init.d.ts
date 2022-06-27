import { DocumentData, CollectionReference } from "firebase/firestore";
export declare const firestore: import("@firebase/firestore").Firestore;
export declare const createCollection: <T = DocumentData>(collectionName: string) => CollectionReference<T>;
