import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider } from '@mantine/core';
import Sign from './pages/sign/sign.jsx';
import Home from './pages/home/home.jsx';
import Search from './pages/search/search.jsx';
import Profile from './pages/profile/profile.jsx';
import Rells from './pages/rells/rells.jsx';
import EditProfile from './pages/profile/edit-profil/edit-profil.jsx';
import CreatePostingan from './pages/create-postingan/create-postingan.jsx';
import { getCookies } from './store/utils.js';
import ProfileByNamaPengguna from './pages/search/profile/profile_pengguna.jsx';
import CreateStatus from './pages/create-status/create-status.jsx';
import DaftarPengikutMengikuti from './pages/profile/pengikut-mengikuti/pengikut-mengikuti.jsx';
import DetailPostingan from './pages/detail-postingan/detail-postingan.jsx';
import DetailProfile from './pages/detail-profile/detail-profile.jsx';

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
function PrivatePage({ children }) {
  const isToken = getCookies('token')
  if (isToken) {
    return children
  }
  return <Navigate to="/" replace={true} />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign",
    element: <Sign />,
  },
  {
    path: "/home",
    element:
      <PrivatePage>
        <Home />
      </PrivatePage>,
  },
  {
    path: "/search",
    element:
      <PrivatePage>
        <Search />
      </PrivatePage>,
  },
  {
    path: "/search/:nama_pengguna",
    element:
      <PrivatePage>
        <ProfileByNamaPengguna />
      </PrivatePage>,
  },

  // + Postingan
  {
    path: "/detail-postingan/:id",
    element:
      <PrivatePage>
        <DetailPostingan />,
      </PrivatePage>,
  },


  // + Profile
  {
    path: "/profile",
    element:
      <PrivatePage>
        <Profile />,
      </PrivatePage>,
  },
  {
    path: "/detail-profile/:nama_pengguna",
    element:
      <PrivatePage>
        <DetailProfile />,
      </PrivatePage>,
  },
  {
    path: "/profile/edit-profile",
    element:
      <PrivatePage>
        <EditProfile />,
      </PrivatePage>,
  },
  {
    path: "/create-postingan",
    element:
      <PrivatePage>
        <CreatePostingan />,
      </PrivatePage>,
  },
  {
    path: "/edit-postingan/:id",
    element:
      <PrivatePage>
        <CreatePostingan />,
      </PrivatePage>,
  },
  {
    path: "profile/pengikut/:id",
    element:
      <PrivatePage>
        <DaftarPengikutMengikuti />,
      </PrivatePage>,
  },
  {
    path: "profile/mengikuti/:id",
    element:
      <PrivatePage>
        <DaftarPengikutMengikuti />,
      </PrivatePage>,
  },

  // + Status
  {
    path: "/create-status",
    element:
      <PrivatePage>
        <CreateStatus />,
      </PrivatePage>,
  },

  // + relss
  {
    path: "/rells",
    element:
      <PrivatePage>
        <Rells />,
      </PrivatePage>,
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MantineProvider>
)