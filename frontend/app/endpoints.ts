
export async function getRequest(url: string) {
    const response = await fetch(url)
    if(response.status == 404){
        throw new Error("Book not found!")
    }
    if(response.status == 500){
        throw new Error("Oops! Something went wrong!")
    }
    return await response.json()
}