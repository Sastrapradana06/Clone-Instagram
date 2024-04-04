import AppShell from "../../components/layout/app-shell";
// import { Flex } from '@mantine/core';
import NavProfile from "./nav-profile";
import PostinganUser from "./postingan_user";
import UserProfile from "./user-profile";


export default function Profile() {
  return (
    <AppShell>
      <div className="w-full h-max">
        <NavProfile />
        <UserProfile />
        <PostinganUser />
      </div>
    </AppShell>
  )
}