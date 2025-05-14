import { REACT_APP_API_URL } from "../api-util";

export async function getUser(){
    try{
        const response = await fetch (`${REACT_APP_API_URL}user`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error)
    }
}

