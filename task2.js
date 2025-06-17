function promiseFunction(error) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if (error) {
                reject(new Error("An error occurred"));
            }
            resolve(56);
        },2000)
    });
}
promiseFunction(true)
    .then(result => console.log("Resolved:", result))  // Will log "Resolved: 56" after 2 seconds
    .catch(error => console.error("Rejected:", error));

async function fetchAndLogUsername(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.name);
        return data.name;
    } catch(error) {
        console.log("Error fetching username:", error);
        throw error;
    }
}
fetchAndLogUsername()