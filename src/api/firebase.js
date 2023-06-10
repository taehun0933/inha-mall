import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  onValue,
  remove,
} from "firebase/database";
import { setLocalStorageUser } from "./localStorageUser";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
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

export function writeProductData({
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

export function writePost({
  title,
  content,
  time,
  photoURL,
  displayName,
  imageUrl,
  writedUserUid,
}) {
  const db = getDatabase();
  const uuid = v4();
  return set(ref(db, "posts/" + uuid), {
    title,
    content,
    time,
    photoURL,
    displayName,
    imageUrl,
    writedUserUid,
    uuid,
  });
}

export async function getProductsData() {
  return get(ref(getDatabase(), "products/")).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  });
}

export async function getPostsData() {
  return get(ref(getDatabase(), "posts/")).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  });
}

export function getUserUid() {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  }
  return null;
}

export async function getCartProduct(dbRef) {
  return get(dbRef).then((snapshot) => {
    if (snapshot.exists()) return snapshot.val();
    return null;
  });
}

export async function addToCart(userId, product) {
  const dbRef = ref(getDatabase(), `carts/${userId}/${product.id}`);
  const cartProduct = await getCartProduct(dbRef);
  if (cartProduct && cartProduct.selected === product.selected) {
    return set(dbRef, { ...cartProduct, quantity: cartProduct.quantity + 1 });
  } else {
    return set(dbRef, { ...product, quantity: 1 });
  }
}

export function checkCartProducts(callBack) {
  const dbRef = ref(getDatabase(), `carts/${getUserUid()}`);
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callBack(Object.values(snapshot.val()));
    } else {
      console.log("data is null");
      callBack(null);
    }
  });
}

export function deleteProduct(productId) {
  const dbRef = ref(getDatabase(), `carts/${getUserUid()}/${productId}`);
  remove(dbRef);
}
export async function plusQuantity(productId) {
  const dbRef = ref(getDatabase(), `carts/${getUserUid()}/${productId}`);
  const cartProduct = await getCartProduct(dbRef);
  return set(dbRef, { ...cartProduct, quantity: cartProduct.quantity + 1 });
}
export async function minusQuantity(productId) {
  const dbRef = ref(getDatabase(), `carts/${getUserUid()}/${productId}`);
  const cartProduct = await getCartProduct(dbRef);
  if (cartProduct.quantity === 1) return;
  return set(dbRef, { ...cartProduct, quantity: cartProduct.quantity - 1 });
}

export function deletePost(postId) {
  const dbRef = ref(getDatabase(), `posts/${postId}`);
  remove(dbRef);
}
