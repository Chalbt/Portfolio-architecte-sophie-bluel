async function getWork(){
    const work = await fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonWork => {
        console.log(jsonWork);
    });
}
