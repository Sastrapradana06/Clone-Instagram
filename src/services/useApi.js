import { getCookies } from "../store/utils"
import { deleteImage } from "./db"

const endpoint = 'http://localhost:3000'
// const endpoint = 'https://jqg00d9f-3000.asse.devtunnels.ms'


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
export const getUser =  async () => {
  try {
    const res = await fetch(`${endpoint}/user/`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getUserByNamaPengguna =  async (nama_pengguna) => {
  try {
    const res = await fetch(`${endpoint}/user/get/${nama_pengguna}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getUserIncludeNamaPengguna =  async (nama_pengguna) => {
  try {
    const res = await fetch(`${endpoint}/user/pengguna/${nama_pengguna}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getUserById =  async (id) => {
  try {
    const res = await fetch(`${endpoint}/user/${id}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

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

export const handleIkutiUser = async (data) => {
  try {
    const res = await fetch(`${endpoint}/user/ikuti`, {
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

// + Posting
export const posting = async (data) => {
  try {
    const res = await fetch(`${endpoint}/posting`, {
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

export const getAllPostingan = async () => {
  try {
    const res = await fetch(`${endpoint}/posting/get-postingan`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getPostinganById = async (id) => {
  try {
    const res = await fetch(`${endpoint}/posting/get-postingan/${id}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const handleLovePostingan = async (data) => {
  try {
    const res = await fetch(`${endpoint}/posting/love`, {
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

export const handlebookmarkPostingan = async (data) => {
  try {
    const res = await fetch(`${endpoint}/posting/bookmark`, {
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

export const deletePostingan = async (id) => {
  try {
    const res = await fetch(`${endpoint}/posting/delete/${id}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

// + Status
export const createStatus = async (data) => {
  try {
    const res = await fetch(`${endpoint}/status/create`, {
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

export const getAllStatus = async () => {
  try {
    const res = await fetch(`${endpoint}/status/get`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getStatusById = async (user_id) => {
  try {
    const res = await fetch(`${endpoint}/status/get/${user_id}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const deleteStatusUser = async (id) => {
  try {
    const res = await fetch(`${endpoint}/status/delete/${id}`);
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const deleteStatusOld = async () => {
  try {
    const res = await fetch(`${endpoint}/status/delete`);
    const result = await res.json();
    if(result.status) {
      const {data} = result
      if(data.length > 0) {
        const deleteImg = data.map( async (item) => {
          await deleteImage(item.data.img_status)
        })
        await deleteImg
      }
    }
  } catch (error) {
    console.log(error);
    return error
  }
}

