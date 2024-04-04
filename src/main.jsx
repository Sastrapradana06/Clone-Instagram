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

import { MantineProvider } from '@mantine/core';
import Sign from './pages/sign/sign.jsx';
import Home from './pages/home/home.jsx';
import Search from './pages/search/search.jsx';
import Profile from './pages/profile/profile.jsx';
import Rells from './pages/rells/rells.jsx';
import EditProfile from './pages/profile/edit-profil/edit-profil.jsx';
import PostinganSearch from './pages/search/postingan/postingan.jsx';
import CreatePostingan from './pages/create/create-postingan.jsx';
import { getCookies } from './store/utils.js';
import DetailPostinganUser from './pages/profile/detail-postingan/detail.jsx';

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
    element: <PrivatePage>
      <Home />
    </PrivatePage>,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/search/postingan/:id",
    element: <PostinganSearch />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/profile/detail-postingan/:id",
    element: <DetailPostinganUser />,
  },
  {
    path: "/rells",
    element: <Rells />,
  },
  {
    path: "/create-postingan",
    element: <CreatePostingan />,
  },
  {
    path: "/edit-postingan/:id",
    element: <CreatePostingan />,
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MantineProvider>
)