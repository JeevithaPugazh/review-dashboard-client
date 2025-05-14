import { API_BASE_URL  } from "../api-util";

export async function getUser(){
    try{
        const response = await fetch (`${API_BASE_URL }user`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error)
    }
}

