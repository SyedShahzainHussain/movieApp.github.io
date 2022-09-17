const APi = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const IMG = "https://image.tmdb.org/t/p/w1280";
const search = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

getApi(APi)

const main = document.getElementById('main')
const form = document.getElementById('form')
const searchText = document.getElementById('search')


async function getApi(url){

    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    MovieShow(data.results)
}



function MovieShow(movie){
    main.innerHTML = ""
    movie.forEach((movie)=>{
        const{poster_path,title,vote_average,overview}=movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
            <img src="${IMG + poster_path}" alt="${title}"/>
            <div class="info">

                <h3>
                   ${title}
                </h3>
                <span class="${getClassRate(vote_average)}">${vote_average}</span>
            </div>
            <div class ="overview">
            <h3>Overview:</h3>
            ${overview}
            </div>
     `;

            main.appendChild(movieEl)
    })
}


function getClassRate(vote){

    if(vote>=8){
        return "green"
    }else if(vote>=5){
        return "orange"
    }else{
        return "red"
    }

}



form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const searchItem = searchText.value 
    console.log(searchItem)

    if(searchItem){
       getApi(search + searchItem)
       searchText.value = ""
    
    }
})