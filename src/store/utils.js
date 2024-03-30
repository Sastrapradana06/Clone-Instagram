import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

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
    toast(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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
      theme: "light",
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
      theme: "light",
      transition: Bounce,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}
