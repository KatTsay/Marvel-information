const charGridList = document.querySelector(".char__grid"),
    loadMoreBtn = document.querySelector("#load-more"),
    tryBtn = document.querySelector("#try-btn"),
    randomCharBlock = document.querySelector(".randomchar__block"),
    appMenu = document.querySelector(".app__menu"),
    comicsBtn = document.querySelector(".comics"),
    charactersBtn = document.querySelector(".characters"),
    comicsCard = document.querySelector(".comics-cards"),
    comicsBanner = document.querySelector(".comics-banner"),
    character = document.querySelector(".char"),
    comicsGridList = document.querySelector(".comics__grid"),
    loadMoreComicsBtn = document.querySelector("#load-more-comics"),
    infoChar = document.querySelector(".char__info"),
    singleComics = document.querySelector(".single-comic"),
    back = document.querySelector(".single-comic__back"),
    itemCreator = document.querySelector(".single-comic__info-item"),   
    searchInp = document.querySelector(".search");
    
const URL = "https://gateway.marvel.com:443/";
const allCharacters = "v1/public/characters?limit=";
const allComics = "v1/public/comics?limit=";
const API_KEY = "&apikey=33932ff5977978bc5ec23a0e46588e63";



let cardsCounter = 9;
let cardsComicsCounter = 8;

const getAllCharacters = async(limit) => {
    const req = await fetch(URL + allCharacters + limit + API_KEY);
    try {
        return await req.json();
    } catch(err) {
        console.log("Что-то пошло не так: ", err);
    }
}

const data = await getAllCharacters(100);
const dataResult = data.data.results;



const getAllComics = async(limit) => {
    const req = await fetch(URL + allComics + limit + API_KEY);

    try {
        return await req.json();
    } catch(err) {
        console.log("Что-то пошло не так: ", err);
    }
}

const dataComics = await getAllComics(100);
const dataResultComics = dataComics.data.results;



const renderCardCharacters = ({name, id, thumbnail}) => {
    const path = thumbnail.path;
    const extension = thumbnail.extension;
    const characterCard = `
    <li class="char__item" id="${id}">
        <img src="${path + "." + extension}" alt="${name}">
        <div class="char__name">${name}</div>
    </li>
    `;
    charGridList.insertAdjacentHTML("beforeend", characterCard);

}


const loadMoreCards = () => {
    cardsCounter += 9; 
    if(cardsCounter >= 100) {
        cardsCounter = 100;
        loadMoreBtn.style.display = "none";
    }

    charGridList.innerHTML = "";
    dataResult.forEach((item, index) => {
        if(index < cardsCounter) {
            renderCardCharacters(item);
        }
    })
}


const renderRandomCharacter = ({name, thumbnail, description, urls}) => {
    let wikiUrl;
    let homeUrl = urls[0].url;
    urls.length == 2 ? wikiUrl = "#" : wikiUrl = urls[1].url;
    description == true ? description : description = "";
    const path = thumbnail.path;
    const extension = thumbnail.extension;
    
    const randomCharCard = `
    <img src="${path + "." + extension}" alt="${name}" class="randomchar__img">
        <div class="randomchar__info">
            <p class="randomchar__name">${name}</p>
            <p class="randomchar__descr">${description}</p>
        <div class="randomchar__btns">
            <a href="${homeUrl}" class="button button__main">
            <div class="inner">homepage</div>
        </a>
        <a href="${wikiUrl}" class="button button__secondary">
            <div class="inner">Wiki</div>
        </a>
        </div>
    </div>
    `;
    randomCharBlock.innerHTML = "";
    randomCharBlock.insertAdjacentHTML("beforeend", randomCharCard);
}


const getRandomCharacter = () => {          
        let randomIndex = Math.floor(Math.random() * allCharacters.length)
        renderRandomCharacter(dataResult[randomIndex]);
}


const renderCharDescription = ({name, description, thumbnail, stories, urls}) => {
    let wikiUrl;
    let homeUrl = urls[0].url;
    urls.length == 2 ? wikiUrl = "#" : wikiUrl = urls[1].url;
    description == true ? description : description = "";
    const path = thumbnail.path;
    const extension = thumbnail.extension;
    const storiesCount = stories.items;
    const charComicsList = document.createElement("ul");
    charComicsList.classList.add(".char__comics-list");
    storiesCount.forEach((item) => {
        const charComicsItem = `
        <li class="char__comics-item">
            ${item.name}
        </li>
        `
        charComicsList.insertAdjacentHTML("beforeend",charComicsItem);
    })
    const charDescription = `
    <div class="char__basics">
    <img src="${path + "." + extension}" alt="abyss">
        <div>
            <div class="char__info-name">${name}</div>
            <div class="char__btns">
                <a href="${homeUrl}" class="button button__main">
                    <div class="inner">homepage</div>
                </a>
                <a href="${wikiUrl}" class="button button__secondary">
                    <div class="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    <div class="char__descr">
        ${description}
    </div>
    `;
    infoChar.innerHTML = charDescription;
    infoChar.append(charComicsList);
}

const selectChar = (e) => {
    const terget = e.target;
    const charCard = terget.closest(".char__item");
    if(charCard){
        const charId = charCard.id;
        const selectedChar = dataResult.find((item) => item.id == charId);
        renderCharDescription(selectedChar);
    }

}

const init = () => {
    dataResult.forEach((item, index) => {
        if(index > 8) {
            return;
        }
        renderCardCharacters(item);
    })

    getRandomCharacter();
}
init();



const renderCardComics = ({title, prices, thumbnail, id}) => {
    const path = thumbnail.path;
    const extension = thumbnail.extension;
    const price = prices[0].price;
    prices == true ? prices : prices = "";
    const comicsCard = `
    <li class="comics__item" id="${id}">
        <a href="#">
            <img src="${path + "." + extension}" alt="${title}" class="comics__item-img">
            <div class="comics__item-name">${title}</div>
            <div class="comics__item-price">${price}$</div>
        </a>
    </li>
    `;
    comicsGridList.insertAdjacentHTML("beforeend", comicsCard);
    
}


const loadMoreCardComics = () => {
    cardsComicsCounter += 8; 
    if(cardsComicsCounter >= 100) {
        cardsComicsCounter = 100;
        loadMoreComicsBtn.style.display = "none";
    }
    comicsGridList.innerHTML = "";
    dataResultComics.forEach((item, index) => {
        if(index < cardsComicsCounter) {
            renderCardComics(item);
        }
    });    
}

const getAllComicsCard = (e) => {
    let target = e.target;
    
    if(target.classList.contains("comics")) {
        comicsCard.classList.remove("hide"); 
        character.classList.add("hide");
    }
    if(target.classList.contains("characters")) {
        comicsCard.classList.add("hide"); 
        character.classList.remove("hide");
    }
}

const renderSingleComicsDescriprion = ({title, thumbnail, prices, pageCount, creators}) => {
    const path = thumbnail.path;
    const extension = thumbnail.extension;
    const price = prices[0].price;
    prices == true ? prices : prices = "0";


    const creatorsCom = creators.items;
    const singleComicsItem = document.createElement("ul");
    singleComicsItem.classList.add(".single-comic__creator");
    creatorsCom.forEach((item) => {
        const comicsCreators = `
        <li class="char__comics-item">
            ${item.name}
        </li>
        `
        singleComics.insertAdjacentHTML("beforeend",comicsCreators);
    });
    const singleComic = `
    <img src="${path + "." + extension}" alt="x-men" class="single-comic__img">
        <div class="single-comic__info">
            <h2 class="single-comic__name">${title}</h2>
            <p class="single-comic__descr">${pageCount}</p>
            <p class="single-comic__descr">Language: en-us</p>
            <div class="single-comic__price">${price}$</div>
        </div>
    `;
    singleComics.insertAdjacentHTML("beforeend", singleComic);
    // singleComics.insertAdjacentHTML("beforeend", comicsCreators);
    singleComics.append(back);
    // singleComics.append(comicsCreators);

}

const selectComics = (e) => {
    const target = e.target;
    const cardComics = target.closest(".comics__item");
    if(cardComics){
        comicsCard.classList.add("hide"); 
        comicsBanner.classList.remove("hide")
        const comicsId = cardComics.id;
        const selectedComics = dataResultComics.find((item) => item.id == comicsId);
        renderSingleComicsDescriprion(selectedComics);
    }
    const back = target.closest(".single-comic__back");
    if(target.contains(back)) {
        comicsCard.classList.remove("hide"); 
        comicsBanner.classList.add("hide")
        singleComics.innerHTML = "";
    }
} 

const initComics = () => {
    dataResultComics.forEach((item, index) => {
        if(index > 7) {
            return;
        }
        renderCardComics(item);
    })
}
initComics();

const searchCharacter = (event) => {
    let charSearchName = searchInp.value.trim().toLowerCase();
    if(event.keyCode === 13) {

        const result = dataResult.find((item) => charSearchName == item.name.trim().toLowerCase());

            infoChar.innerHTML = " ";

    renderCharDescription(result);

}
}



const initInfoChar = () => {
    dataResult.forEach((item) => {
        if(item.name) {
            return;

        }

        searchCharacter(item);
    })

}
initInfoChar();

searchInp.addEventListener("keydown", searchCharacter);

comicsBtn.addEventListener("click", getAllComicsCard);
charactersBtn.addEventListener("click", getAllComicsCard);
loadMoreBtn.addEventListener("click", loadMoreCards);
loadMoreComicsBtn.addEventListener("click", loadMoreCardComics);
tryBtn.addEventListener("click", getRandomCharacter);
charGridList.addEventListener("click", selectChar);
comicsGridList.addEventListener("click", selectComics);
back.addEventListener("click", selectComics);