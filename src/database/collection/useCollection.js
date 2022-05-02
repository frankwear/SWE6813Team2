import { useEffect, useState, useRef } from "react"
import { firestoreDb } from "../firebase"
import { collection, doc, getDoc, setDoc, getDocs, query, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getDatabase, ref, push, set } from "firebase/database";

//used to get/query and sort data
export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current
  useEffect(() => {
    let ref = firestoreDb.collection(collection)
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }
    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })
    // unsubscribe on unmount
    return () => unsubscribe()
  }, [collection, query, orderBy])
  return { documents, error }
}