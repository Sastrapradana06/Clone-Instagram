import NavBottom from "./nav-bottom";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from "../../store/store";



export default function AppShell({ children }) {
  const [dataUser, getUser] = useAppStore(
    useShallow((state) => [state.dataUser, state.getUser])
  )

  useEffect(() => {
    if (dataUser == undefined) {
      getUser()
    }

    window.scrollTo(0, 0);
  }, [dataUser])
  return (
    <div className="min-w-full max-w-max min-h-[100vh] max-h-max relative bg-zinc-900 flex justify-center text-white" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
      {children}
      <NavBottom />
    </div>
  )
}

AppShell.propTypes = {
  children: PropTypes.node.isRequired,
};