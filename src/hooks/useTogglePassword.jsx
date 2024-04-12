import { useState } from "react";

export default function useTogglePassword() {
  const [typePassword, setTypePassword] = useState('password')

  const togglePasswordVisibility = () => setTypePassword(typePassword === 'password' ? 'text' : 'password');

  return [typePassword, togglePasswordVisibility];


};
