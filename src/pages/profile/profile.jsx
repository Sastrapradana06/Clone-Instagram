import AppShell from "../../components/layout/app-shell";
// import { Flex } from '@mantine/core';
import NavProfile from "./nav-profile";
import UserProfile from "./user-profile";
import UserStatus from "./user-status";


export default function Profile() {
  return (
    <AppShell>
      <div className="w-full h-max">
        <NavProfile />
        <UserProfile />
        <UserStatus />
      </div>
    </AppShell>
  )
}