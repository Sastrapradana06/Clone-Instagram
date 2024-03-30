import NavBottom from "./nav-bottom";
import PropTypes from 'prop-types';
import { useEffect } from "react";


export default function AppShell({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
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