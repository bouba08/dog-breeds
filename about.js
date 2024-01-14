
async function fetchBreed(id){

    const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=1&breed_id=${id}&api_key=live_pZDit0tPCBJQLstiJzFrkmAGZ2jmmUJY81FMxoA3QNE59QGEenawebh3J2tVKsuS`)
    const data = await response.json()

    return data[0]["breeds"]
}

async function filterBreed(){
    const response = await fetch("https://api.thedogapi.com/v1/breeds")
    const data = await response.json()
    const filter = document.querySelector(".breed_select")
    let filterHTML = "<option></option>";

    for (let i = 0; i < 172;i++){
        filterHTML += `<option onchange="renderBreed()">${data[i].name}</option>`
    }

    filter.innerHTML = filterHTML

    return data
}

filterBreed()

async function renderBreed(){
    const filter = document.querySelector(".breed_select").value     
    const data = await filterBreed()
    let response = ""; 

    for (let i = 0;i < 172; i++){
        if (data[i].name === filter){
            response = await fetchBreed(data[i].id)
        }
    }
        
    const info = document.querySelector("#breed-info")
    const image = await fetch(`https://api.thedogapi.com/v1/images/${response[0].reference_image_id}`)
    const images = await image.json()
    
    infoHTML = 
    `<img src="${images.url}" alt="" class="breed-img">
    <div class="breed-description">
      <span>Name: ${response[0].name} </span>
      <span>Bred for: ${response[0].bred_for} </span>
      <span>Breed group: ${response[0].breed_group} </span>
      <span>Temperament: ${response[0].temperament} </span>
      <span>Weight: ${response[0].weight.metric} kg</span>
      <span>Height: ${response[0].height.metric} cm</span>
      <span>Life span: ${response[0].life_span}</span>
    </div>` 

    info.innerHTML = infoHTML

    console.log(response[0])
} 

renderBreed()