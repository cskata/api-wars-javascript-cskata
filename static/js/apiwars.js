import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";
import {templates} from "./templates.js";
import {events} from "./events.js";


init();


function loadPlanetsData() {
    const mainPage = document.querySelector('#planets');
    const whichPage = mainPage.dataset.page;
    const targetURL = `https://swapi.co/api/planets/?page=${whichPage}`;

    const prevButton = document.querySelector('#prev-button');
    const nextButton = document.querySelector('#next-button');
    prevButton.disabled = true;
    nextButton.disabled = true;

    dom.addLoadingImage('#planet-data', 'loading3');
    dataHandler.getAllPlanetData(createPlanetTable, targetURL, prevButton, nextButton, whichPage);
}


function createPlanetTable(planets, prevButton, nextButton, whichPage) {
    dom.removeLoadingImage('#planet-data');
    dom.showPageNumber();
    const planetsPerPage = planets.length;
    dom.createPlanetDataRows(planetsPerPage);

    insertPlanetHeadersData();
    insertPlanetsData(planets);

    prevButton.disabled = false;
    nextButton.disabled = false;
    disablePaginationButtons(whichPage);

    const pageNumContainer = document.querySelector('#page-container');
    pageNumContainer.innerHTML = "";
    templates.createPageNumber(whichPage);

}


function insertPlanetsData(planets) {
    const table = document.querySelector('#planets');
    const planetDataKeys = templates.planetDataKeys;

    for (let i = 0; i < planets.length; i++) {
        let currentRow = table.children[i + 1];
        fillRowWithPlanetData(currentRow, planets[i], planetDataKeys);
        addResidentsButton(currentRow, planets[i]);
        addVoteButton(currentRow, planets[i]);
    }
    hidePlanetVotingHeader();
}


function hidePlanetVotingHeader() {
    const datasetContainer = document.querySelector('#all-content');
    if (datasetContainer.dataset.login === "") {
        const headers = document.querySelectorAll('.planet-header');
        const lastHeader = headers[templates.planetHeaderNames.length - 1];
        lastHeader.style.display = 'none';
    }
}


function insertPlanetHeadersData() {
    const planetHeaderCells = document.querySelector('#main-header').children;
    const planetHeaderNames = templates.planetHeaderNames;

    for (let i = 0; i < planetHeaderNames.length; i++) {
        planetHeaderCells[i].innerHTML = planetHeaderNames[i];
    }
}


function disablePaginationButtons(whichPage) {
    const prevButton = document.querySelector('#prev-button');
    const nextButton = document.querySelector('#next-button');

    if (parseInt(whichPage) === 1) {
        prevButton.disabled = true;
    } else if (parseInt(whichPage) > 1 && parseInt(whichPage) < 7) {
        prevButton.disabled = false;
        nextButton.disabled = false;
    } else if (parseInt(whichPage) === 7) {
        nextButton.disabled = true;
    }
}


function addResidentsButton(newRow, planet) {
    const residentsColumn = newRow.children[6];
    const noResidentText = 'No known residents';

    if (planet['residents'].length === 0) {
        residentsColumn.innerHTML = noResidentText;
    } else {
        const residentBtn = dom.createResidentButton(planet);
        residentsColumn.appendChild(residentBtn);
        residentBtn.parentElement.style.textAlign = 'center';
        residentBtn.addEventListener('click', openResidentsModal);
    }
    residentsColumn.style.textAlign = 'center';
}


function addVoteButton(newRow, planet) {
    const lastColumn = newRow.children[templates.planetHeaderNames.length - 1];
    const voteBtn = dom.createVoteButton(planet);
    lastColumn.appendChild(voteBtn);
    voteBtn.parentElement.style.textAlign = 'center';
    voteBtn.addEventListener('click', saveVote);

    const datasetContainer = document.querySelector('#all-content');

    if (datasetContainer.dataset.login === "") {
        voteBtn.style.display = 'none';
        voteBtn.parentElement.style.display = 'none';
    }
}


function saveVote(event) {
    const planetId = parseInt(event.target.dataset.planetid);
    const planetName = event.target.dataset.planetname;
    const userId = parseInt(document.querySelector('#all-content').dataset.userid);
    const currentDate = new Date();
    const submissionTime =
        currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + ' ' +
        currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

    const data = {
        planet_id: planetId,
        planet_name: planetName,
        user_id: userId,
        submission_time: submissionTime
    };

    dataHandler.saveVote(data);

    alert(`Your vote for planet ${planetName} is saved.`);
}


function fillRowWithPlanetData(newRow, planet, planetDataKeys) {
    const formattedPlanetData = formatPlanetData(planet);

    for (let i = 0; i < planetDataKeys.length; i++) {
        newRow.children[i].innerHTML = formattedPlanetData[`${planetDataKeys[i]}`];
        newRow.children[i].style.padding = '0 5px';
    }
}


function formatPlanetData(planet) {
    if (planet['diameter'] !== 'unknown') {
        // planet['diameter'] = planet['diameter'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        planet['diameter'] = parseInt(planet['diameter']).toLocaleString('en-US');
        planet['diameter'] = `${planet['diameter']} km`;
    }

    if (planet['surface_water'] !== 'unknown') {
        planet['surface_water'] = `${planet['surface_water']}%`;
    }

    if (planet['population'] !== 'unknown') {
        planet['population'] = planet['population'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        planet['population'] = `${planet['population']} people`;
    }

    return planet;
}


function switchPage(event) {
    const currentPage = document.querySelector('#planets');
    const currentPageNo = parseInt(document.querySelector('#planets').dataset.page);
    const step = parseInt(event.target.dataset.value);    //direction is stored in button's dataset (1/-1)
    const nextPage = currentPageNo + step;
    currentPage.dataset.page = nextPage.toString();

    currentPage.innerHTML = "";
    loadPlanetsData();
}


function insertResidentHeaderData() {
    const headers = [
        'Name', 'Height', 'Mass', 'Skin color', 'Hair color', 'Eye color', 'Birth year', 'Gender'
    ];

    let residentHeaders = document.querySelector('#resident-modal-header').children;

    for (let i = 0; i < headers.length; i++) {
        residentHeaders[i].innerHTML = headers[i];
    }
}


function formatResidentData(row, residentData) {
    if (residentData['height'] !== 'unknown') {
        const height = parseInt(residentData['height']) / 100;
        residentData['height'] = height.toString() + ' m';
    }

    if (residentData['mass'] !== 'unknown') {
        residentData['mass'] = residentData['mass'] + ' kg';
    }

    const icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-lg');
    icon.classList.add('centered-icon');

    const lastResidentCell = 7;

    if (residentData['gender'] === 'female') {
        icon.classList.add('fa-venus');
        icon.title = 'female';
        row.children[lastResidentCell].appendChild(icon);
    } else if (residentData['gender'] === 'male') {
        icon.classList.add('fa-mars');
        icon.title = 'male';
        row.children[lastResidentCell].appendChild(icon);
    } else {
        row.children[lastResidentCell].innerHTML = residentData['gender'];
        row.children[lastResidentCell].classList.add('centered-text');
    }

    return residentData;
}


function addDataToResidentsModal(residentData, table, i) {
    const row = table.childNodes[i + 1];
    const formattedResidentData = formatResidentData(row, residentData);
    const residentDataColumns = [
        'name', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color', 'birth_year', 'gender'
    ];

    for (let i = 0; i < residentDataColumns.length - 1; i++) {
        row.children[i].innerHTML = formattedResidentData[`${residentDataColumns[i]}`];
    }
    setTimeout(function () {
        dom.removeLoadingImage('#resident-table', 'residents');
        table.style.display = 'table';
    }, 500);
}

function openResidentsModal(event) {
    const modal = document.querySelector('#resident-container');
    modal.style.display = 'block';

    const planet = event.target.dataset.planet;

    const title = document.querySelector('#which-planet');
    title.innerHTML = `Residents of ${planet}`;

    dom.addLoadingImage('#resident-table', 'loading3', 'residents');
    createResidentsTable(event);
}


function createResidentsTable(event) {
    dom.createResidentHeader();
    insertResidentHeaderData();

    const table = document.querySelector('#residents');
    table.style.display = 'none';
    const residentsAsString = event.target.dataset.residents;   //list of residents is stored as 1 string in the dataset
    const residentsURLs = residentsAsString.split(',');    //splitting the string into separate URLs

    for (let i = 0; i < residentsURLs.length; i++) {
        dom.createResidentDataRows(table);
        dataHandler.getResidentsData(addDataToResidentsModal, table, residentsURLs, i)
    }
}


function closeResidentModal() {
    const table = document.querySelector('#residents');
    table.innerHTML = "";

    const modal = document.querySelector('#resident-container');
    modal.style.display = 'none';
}


function openVoteStatistics() {
    const modal = document.querySelector('#votes-container');
    modal.style.display = 'block';

    dataHandler.getVotes(listVotedPlanets);
}


function listVotedPlanets(response) {
    const table = document.querySelector('#votes');
    const voted_planets = response;
    table.dataset.votes = voted_planets.length;

    dom.createVotesHeader();

    for (const planet of voted_planets) {
        dom.createVotesDataRow(table, planet);
    }
}

function closeVoteStatistics() {
    const table = document.querySelector('#votes');
    table.innerHTML = "";

    const modal = document.querySelector('#votes-container');
    modal.style.display = 'none';
}


function addButtonClickEvents() {
    const nextButton = document.querySelector('#next-button');
    nextButton.addEventListener('click', switchPage);

    const prevButton = document.querySelector('#prev-button');
    prevButton.addEventListener('click', switchPage);

    const residentModalCloseButtonTopRight = document.querySelector('#close-resident-modal');
    residentModalCloseButtonTopRight.addEventListener('click', closeResidentModal);

    const residentModalCloseButtonTopLeft = document.querySelector('#close-resident-button');
    residentModalCloseButtonTopLeft.addEventListener('click', closeResidentModal);
}


function addVotingModalEvents() {
    const voteStatisticsLink = document.querySelector('#vote-stats');
    voteStatisticsLink.addEventListener('click', openVoteStatistics);

    const votingModalCloseButtonTopRight = document.querySelector('#close-votes');
    votingModalCloseButtonTopRight.addEventListener('click', closeVoteStatistics);

    const votingModalCloseButtonTopLeft = document.querySelector('#close-votes-button');
    votingModalCloseButtonTopLeft.addEventListener('click', closeVoteStatistics);
}


function init() {
    loadPlanetsData();
    addButtonClickEvents();

    const isUserLoggedIn = document.querySelector('#all-content').dataset.login;
    dom.changeNavBarElements(isUserLoggedIn);
    events.addAudioSound();

    if (isUserLoggedIn === 'True') {
        addVotingModalEvents();
    }
}
