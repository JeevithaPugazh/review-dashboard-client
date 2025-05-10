export async function getUser(){
    try{
        const response = await fetch ('http://localhost:3000/api/user');
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error)
    }
}

