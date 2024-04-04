import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { generateRandomString } from "./utils";

const firebaseConfig = {
  apiKey: "AIzaSyCI54smCNLtdNLco59uGNpPazA_ETLk8NE",
  authDomain: "insatagram-app.firebaseapp.com",
  projectId: "insatagram-app",
  storageBucket: "insatagram-app.appspot.com",
  messagingSenderId: "449579563996",
  appId: "1:449579563996:web:31dc3337f58ccc7e10ad19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

const handleFile = async (data) => {
  const storagePath = `${data.path}`;
  const storageRef = ref(storage, storagePath);
  let urlImage;
  
  await uploadBytes(storageRef, data.file)
  await getDownloadURL(storageRef)
    .then((url) => urlImage = url)
    .catch((err) => { throw err })
  return urlImage
}

export const uploadImages = async (file, user_id, nama_pengguna) => {
  try {
    const data = {
      path: `profil_user/${user_id}_${nama_pengguna}`,
      file,
    }
    const linkUrl = handleFile(data)
    return linkUrl

  } catch (err) {
    console.log({err});
    return false
  }

}

export const uploadPostingan = async (file, nama_pengguna) => {
  try {
    const key = generateRandomString()
    const data = {
      path: `img_postingan/${nama_pengguna}/${key}`,
      file,
    }
    const linkUrl = handleFile(data)
    return linkUrl

  } catch (err) {
    console.log({err});
    return false
  }

}
