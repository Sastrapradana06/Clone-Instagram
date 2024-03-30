import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import Sign from './pages/sign/sign.jsx';
import Home from './pages/home/home.jsx';
import Search from './pages/search/search.jsx';
import Profile from './pages/profile/profile.jsx';
import Rells from './pages/rells/rells.jsx';
import EditProfile from './pages/profile/edit-profil/edit-profil.jsx';
import PostinganUser from './pages/profile/postingan-user/postingan-user.jsx';
import PostinganSearch from './pages/search/postingan/postingan.jsx';
import CreatePostingan from './pages/create/create-postingan.jsx';

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
    element: <Home />,
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
    path: "/profile/postingan-user/:id",
    element: <PostinganUser />,
  },
  {
    path: "/rells",
    element: <Rells />,
  },
  {
    path: "/create-postingan",
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