import { getCookies } from "./utils";

const endpoint = 'http://localhost:3000'

// + Auth 
export const loginAkun = async (data) => {
  try {
    const res = await fetch(`${endpoint}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const registerAkun = async (data) => {
  try {
    const res = await fetch(`${endpoint}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
  }
}

// + User
export const editUserProfil = async (data) => {
  try {
    const res = await fetch(`${endpoint}/user/edit-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getUserLogin =  async () => {
  try {
    const dataCookies = getCookies('user_data')
    const {id} = JSON.parse(dataCookies)
    const res = await fetch(`${endpoint}/user/${id}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}