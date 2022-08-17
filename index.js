let gifList=[]
//GIPHY API 0LJxG3Jt41usuMtiuynAQ1fdqJfpffg1
//AIzaSyCPiKMR2by_6WuWt630ApLlVQQtFidDKig
let limit = 10;
const clearSearch =()=>{
    const searchResult = document.getElementById("searchResult")
    searchResult.innerHTML=''
    const addMore = document.getElementById("addMore")
    addMore.textContent=""
}
const searchInput =()=>{
    const searchResult = document.getElementById("searchResult")
    searchResult.innerHTML='<p id="SearchBufferWait">Please Wait</p>'
    const addMore = document.getElementById("addMore")
    addMore.textContent=""
}
const resetDefaultGif=()=>{
    const searchResult = document.getElementById("searchResult")
    searchResult.innerHTML=`
        <p id="SearchReminder">Search For a gif to look things up</p>
    `
}
const appendGifToPage=(x,DomElement)=>{
    console.log(x)
    const GifDivThing = document.createElement('div')
    DomElement.appendChild(GifDivThing)
    GifDivThing.innerHTML=`
        <img id="giftContent" src="https://i.giphy.com/media/${x.id}/200.gif">
    `
}

const displayListOfStuff=()=>{
    clearSearch()
    const searchResult = document.getElementById("searchResult")
    console.log(gifList)
    const addMore = document.getElementById("addMore")
    addMore.textContent="Show More"
    let newGifList = gifList.slice(0,limit)
    newGifList.forEach(x=>{
        appendGifToPage(x,searchResult)
    })
    addMore.addEventListener('click',()=>{
        if(limit<50){
            limit+=10;
            displayListOfStuff()
        }else{
            addMore.textContent=""
        }
    })
}
const searchForGif=async()=>{
    const inputVal = document.getElementById("inputSearchGif").value
    if(inputVal=='' || inputVal==undefined){
        resetDefaultGif()
        return
    }
    searchInput()
    const listOfGifs = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=0LJxG3Jt41usuMtiuynAQ1fdqJfpffg1&q=${inputVal}&limit=50`)
    limit=10;
    gifList= listOfGifs.data.data
    displayListOfStuff()
}
const homePageEventListeners=()=>{
    const searchIcon = document.getElementById("searchIcon")
    searchIcon.addEventListener('click',()=>{
        searchForGif()
    })
}
const makeHomePage=()=>{
    const root = document.getElementById("root")
    root.innerHTML=`
    <div id="header" class="MainHeader">
        <p class="NameOfPage">Gif Explorer</p>
    </div>
    <div class="searchContent">
        <div class="searchBarDiv">
            <input id="inputSearchGif" class="searchForGif" placeholder="Search for a gif">
            <p id="searchIcon">
            <span id="searchIcon" class="material-symbols-outlined">
            search
            </span>
            </p>
        </div>
    </div>
    <div id="displayGifContent">
        <div id="searchResult">
            <p id="SearchReminder">Search For a gif to look things up</p>
        </div>
        <div id="addMore">
        </div>
    </div>
    `
}
const main =()=>{
    makeHomePage()
    homePageEventListeners()
}
main()