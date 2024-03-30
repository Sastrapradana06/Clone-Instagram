import AppShell from "../../components/layout/app-shell";
import NavHome from "./nav-home";
import Postingan from "./postingan";
import Status from "./status";

export default function Home() {
  return (
    <AppShell>
      <div className="min-w-full max-w-max h-max flex flex-col gap-2 items-center">
        <NavHome />
        <Status />
        <Postingan />
      </div>
    </AppShell>
  )
}