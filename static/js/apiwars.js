import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";


init();


function loadPlanetsData() {
    const whichPage = document.getElementById('planets').dataset.page;
    const targetURL = `https://swapi.co/api/planets/?page=${whichPage}`;

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    prevButton.disabled = true;
    nextButton.disabled = true;

    dataHandler.getAllPlanetData(createPlanetTable, targetURL, prevButton, nextButton, whichPage);
}


function createPlanetTable(planets, prevButton, nextButton, whichPage) {
    const planetsPerPage = planets.length;
    dom.createPlanetDataRows(planetsPerPage);

    insertPlanetHeadersData();
    insertPlanetData(planets);

    prevButton.disabled = false;
    nextButton.disabled = false;
    disablePaginationButtons(whichPage);
}


function insertPlanetData(planets) {
    const planetDataKeys = [
        'name', 'diameter', 'climate', 'terrain', 'surface_water', 'population'
    ];

    const table = document.querySelector('#planets');

    for (let i = 0; i < planets.length; i++) {
        let currentRow = table.childNodes[i + 1];

        addDataToCellsAtMainPage(currentRow, planets[i], planetDataKeys);
        addResidentsButton(currentRow, planets[i]);
        addVoteButton(currentRow, planets[i]);
    }

    const datasetContainer = document.getElementById('all-content');
    if (datasetContainer.dataset.login === "") {
        const headers = document.querySelectorAll('.planet-header');
        const lastHeader = headers[7];
        lastHeader.style.visibility = "hidden";
    }
}


function insertPlanetHeadersData() {
    const headerNames = [
        'Name', 'Diameter', 'Climate', 'Terrain', 'Surface Waters Percentage', 'Population', 'Residents', ''
    ];

    const planetHeaderCells = document.querySelector('#main-header').children;

    for (let i = 0; i < headerNames.length; i++) {
        planetHeaderCells[i].innerHTML = headerNames[i];
    }
}


function disablePaginationButtons(whichPage) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

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
        residentBtn.addEventListener('click', openModal);
    }
}


function addVoteButton(newRow, planet) {
    const lastColumn = newRow.children[7];
    const voteBtn = dom.createVoteButton(planet);
    lastColumn.appendChild(voteBtn);
    voteBtn.addEventListener('click', saveVote);

    const datasetContainer = document.getElementById('all-content');

    if (datasetContainer.dataset.login === "") {
        voteBtn.style.visibility = "hidden";
        voteBtn.parentElement.style.visibility = "hidden";
    }
}


function saveVote() {
    const planetId = parseInt(event.target.dataset.planetid);
    const planetName = event.target.dataset.planetname;
    const userId = parseInt(document.getElementById('all-content').dataset.userid);
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


function addDataToCellsAtMainPage(newRow, planet, planetDataKeys) {
    const formattedPlanetData = formatPlanetData(planet);

    for (let i = 0; i < planetDataKeys.length; i++) {
        newRow.children[i].innerHTML = formattedPlanetData[`${planetDataKeys[i]}`];
    }
}


function formatPlanetData(planet) {
    if (planet['diameter'] !== 'unknown') {
        planet['diameter'] = planet['diameter'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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


function switchPage() {
    const currentPage = document.querySelector('#planets');
    const currentPageNo = parseInt(document.getElementById('planets').dataset.page);
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

    table.style.display = 'table';
}

function openModal() {
    const modal = document.getElementById('resident-container');
    modal.style.display = 'block';

    const planet = event.target.dataset.planet;

    const title = document.getElementById('which-planet');
    title.innerHTML = 'Residents of ' + planet;

    createResidentsTable();

    const residentsOrig = event.target.dataset.residents;
    const residentsURLs = residentsOrig.split(',');
    const table = document.querySelector('#residents');
    table.style.display = 'none';

    for (let i = 0; i < residentsURLs.length; i++) {
        dom.createResidentDataRows(table);
        dataHandler.getResidentsData(addDataToResidentsModal, table, residentsURLs, i)
    }
}


function createResidentsTable() {
    dom.createResidentHeader();
    insertResidentHeaderData();
}


function closeModal() {
    const table = document.getElementById('residents');
    table.innerHTML = "";

    const modal = document.getElementById('resident-container');
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
    const table = document.getElementById('votes');
    table.innerHTML = "";

    const modal = document.getElementById('votes-container');
    modal.style.display = 'none';
}


function addingButtonClickEvents() {
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', switchPage);

    const prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', switchPage);

    const residentModalCloseButtonTopRight = document.getElementById('close-modal');
    residentModalCloseButtonTopRight.addEventListener('click', closeModal);

    const residentModalCloseButtonTopLeft = document.getElementById('close-button');
    residentModalCloseButtonTopLeft.addEventListener('click', closeModal);
}


function votingModalCanBeOpenedAndClosed() {
    const voteStatistics = document.getElementById('vote-stats');
    voteStatistics.addEventListener('click', openVoteStatistics);

    const votingModalCloseButtonTopRight = document.getElementById('close-votes');
    votingModalCloseButtonTopRight.addEventListener('click', closeVoteStatistics);

    const votingModalCloseButtonTopLeft = document.getElementById('close-votes-button');
    votingModalCloseButtonTopLeft.addEventListener('click', closeVoteStatistics);
}


function init() {
    loadPlanetsData();
    addingButtonClickEvents();

    const isUserLoggedIn = document.getElementById('all-content').dataset.login;
    if (isUserLoggedIn === 'True') {
        votingModalCanBeOpenedAndClosed();
    }
}
