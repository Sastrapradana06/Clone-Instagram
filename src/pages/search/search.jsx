import AppShell from "../../components/layout/app-shell";
import Content from "./content";


export default function Search() {

  return (
    <AppShell>
      <div className="w-full h-max mt-1">
        <Content />
      </div>
    </AppShell>
  )
}