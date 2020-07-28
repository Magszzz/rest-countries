document.querySelector('#btn-mode').addEventListener('click', ()=>{
    const body = document.querySelector('body');
    const modeText = document.querySelector('#mode-text');

    body.classList.toggle('dark');
    if(modeText.innerHTML === 'Dark'){
        modeText.innerHTML = 'Light';
    }else{
        modeText.innerHTML = 'Dark';
    }
})

document.querySelector('#filter').addEventListener('click', ()=>{
    const filterBtn = document.querySelector('#filter');
    filterBtn.classList.toggle('open');
})

document.querySelector('#search').addEventListener('keyup', ()=>{
    const search = document.querySelector('#search').value.toUpperCase();
    const names = document.querySelectorAll('.country-name');

    names.forEach(name => {
        if(name.innerHTML.toUpperCase().indexOf(search) > -1){
            name.parentElement.parentElement.style.display = '';
        }else{
            name.parentElement.parentElement.style.display = 'none';
        }
    })
})

document.querySelectorAll('li').forEach(filter => {
    filter.addEventListener('click', ()=>{
        const region = filter.innerHTML;
        const countryRegion = document.querySelectorAll('.country-region');
        countryRegion.forEach(cr => {
            if(cr.innerHTML.indexOf(region) > -1 || region === "All"){
                cr.parentElement.parentElement.parentElement.style.display = '';
            }else{
                cr.parentElement.parentElement.parentElement.style.display = 'none';
            }
        })
    })
})

function countryCards(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(out => {
        const cardDiv = document.querySelector('.img-cards');
        const viewCard = document.querySelector('.view-card');
        out.forEach(element => {
            const div = document.createElement('div');
            div.setAttribute('class', 'cards');
            div.innerHTML = `
            <img src="${element.flag}">
            <div class="cards-info">
                <h3 class="country-name">${element.name}</h3>
                
                <p><span class="span">Populaiton:</span> ${element.population}</p>
                <p><span class="span">Region:</span><span class="country-region">${element.region}<span></p>
                <p><span class="span">Capital:</span> ${element.capital}</p>
            </div>`;

            div.addEventListener('click', () => {
                viewCard.style.display = "flex";
                showCard(element);
            })
            cardDiv.appendChild(div);
        });
    })
    .catch(err => console.error(err))
}

document.addEventListener('DOMContentLoaded', countryCards);

function showCard(info){
    const viewCard = document.querySelector('.content');
    const img = document.querySelector('img');
    img.src = info.flag;
    viewCard.innerHTML =`
    <h3>${info.name}</h3>
    <div class="country-infos">
        <div id="space">
            <p><Strong>Native Name:</Strong> ${info.nativeName}</p>
            <p><Strong>Population:</Strong> ${info.population}</p>
            <p><Strong>Region:</Strong> ${info.region}</p>
            <p><Strong>Sub Region: </Strong> ${info.subregion}</p>
            <p><Strong>Capital: </Strong> ${info.capital}</p>
        </div>
        <div>
            <p><Strong>Top Level Domain:</Strong> ${info.topLevelDomain}</p>
            <p><Strong>Currencies:</Strong> ${info.currencies.map(infos => infos.code)}</p>
            <p><Strong>Language/s:</Strong> ${info.languages.map(infos => infos.name)}</p>
        </div>
    </div>
    <br>
    <p><Strong>Border Countries: </Strong>${info.borders}</p>`;
}

document.querySelector('.back').addEventListener('click', () =>{
    const viewCard = document.querySelector('.view-card');
    viewCard.style.display = 'none';
})


