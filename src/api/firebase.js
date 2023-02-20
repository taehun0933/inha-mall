import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { setLocalStorageUser } from "./localStorageUser";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  databaseURL:
    "https://shoppingmallproject-ae22f-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function checkUserIsLoggedIn(callBack) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await includeAdminVal(user) : null;
    // 로컬스토리지에 저장
    setLocalStorageUser(updatedUser);
    callBack(updatedUser);
  });
}

async function includeAdminVal(user) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, "admins/")).then((snapshot) => {
    if (snapshot.exists()) {
      const adminUids = snapshot.val();
      const isAdmin = adminUids.includes(user.uid);
      return { ...user, isAdmin };
    }
    return { ...user, isAdmin: false };
  });
}

export function writeUserData({
  imgUrl,
  name,
  price,
  category,
  description,
  options,
}) {
  const db = getDatabase();
  const uuid = v4();
  return set(ref(db, "products/" + uuid), {
    category,
    description,
    id: uuid,
    image: imgUrl,
    options: options.split(","),
    price,
    title: name,
  });
}
