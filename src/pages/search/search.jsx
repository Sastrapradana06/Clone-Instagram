import AppShell from "../../components/layout/app-shell";
import InputSearch from "./input-search";
import Content from "./content";


export default function Search() {

  return (
    <AppShell>
      <div className="w-full h-max mt-1">
        <InputSearch />
        <Content />
      </div>
    </AppShell>
  )
}