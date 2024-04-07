import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Cookies from 'js-cookie';


export function formatPengikut(pengikut) {
  if (pengikut >= 1000) {
    const ribu = Math.floor(pengikut / 1000);
    const sisa = pengikut % 1000;
    if (sisa === 0) {
      return ribu + 'rb';
    } else {
      return ribu + '.' + sisa.toString().padStart(3, '0');
    }
  } else {
    return pengikut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

export const handleToast = (message, status) => {
  if(status === 'success') {
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } else if(status === 'info') {
    toast.info(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } else if(status === 'warning') {
    toast.warn(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } else if(status=== 'error') {
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } else {
    toast(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  }
}

export const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let token = '';
  for (let i = 0; i < 50; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return token;
};

export const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let token = '';
  for (let i = 0; i < 5; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return token;
};

export const createCookies = (name, value) => {
  Cookies.set(name, value, { expires: 1, })
}

export const getCookies = (name) => {
  return Cookies.get(name)
}

export const getUserIdByCookies = () => {
  const cookiesData = getCookies('user_data')
  const {id} = JSON.parse(cookiesData)
  return id
}

export const deleteAllCookies = () => {
  Cookies.remove('token')
  Cookies.remove('user_data')
}


export function formatFirestoreTimestamp(timestampFirestore) {
  const timestampDate = new Date(timestampFirestore._seconds * 1000 + timestampFirestore._nanoseconds / 1000000);

  const diffMilliseconds = Date.now() - timestampDate.getTime();
  const diffMinutes = Math.round(diffMilliseconds / (1000 * 60));
  const diffHours = Math.round(diffMilliseconds / (1000 * 60 * 60));
  const diffDays = Math.round(diffMilliseconds / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.round(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));
  const diffMonths = Math.round(diffMilliseconds / (1000 * 60 * 60 * 24 * 30));

  let timeAgoText = '';
  if (diffMinutes < 60) {
    timeAgoText = `${diffMinutes} menit lalu`;
  } else if (diffHours < 24) {
    timeAgoText = `${diffHours} jam lalu`;
  } else if (diffDays < 7) {
    timeAgoText = `${diffDays} hari lalu`;
  } else if (diffWeeks < 4) {
    timeAgoText = `${diffWeeks} minggu lalu`;
  } else {
    timeAgoText = `${diffMonths} bulan lalu`;
  }

  return timeAgoText;
}

