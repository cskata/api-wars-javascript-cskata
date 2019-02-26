import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";
import {templates} from "./templates.js";
import {events} from "./events.js";


init();


function loadPlanetsData() {
    const whichPage = dom.mainPlanetTable.dataset.page;
    const targetURL = `https://swapi.co/api/planets/?page=${whichPage}`;

    dom.prevButton.disabled = true;
    dom.nextButton.disabled = true;

    dom.addLoadingImage('#planet-data', 'loading3');
    dataHandler.getAllPlanetData(createPlanetTable, targetURL, whichPage);
}


function createPlanetTable(planets, whichPage) {
    dom.removeLoadingImage('#planet-data');
    dom.showPageNumber();

    const planetsPerPage = planets.length;
    dom.createPlanetDataRows(planetsPerPage);

    insertPlanetHeadersData();
    insertPlanetsData(planets);

    dom.prevButton.disabled = false;
    dom.nextButton.disabled = false;
    dom.whichPaginationIsDisabled(whichPage);

    templates.createPageNumber(whichPage);
}


function insertPlanetsData(planets) {
    const table = dom.mainPlanetTable;
    const planetDataKeys = templates.planetDataKeys;

    for (let i = 0; i < planets.length; i++) {
        let currentRow = table.children[i + 1];
        fillRowWithPlanetData(currentRow, planets[i], planetDataKeys);
        addResidentsButton(currentRow, planets[i]);
        dom.addVoteButton(currentRow, planets[i]);
    }
    dom.hidePlanetVotingHeader();
}


function insertPlanetHeadersData() {
    const planetHeaderCells = document.querySelector('#main-header').children;
    const planetHeaderNames = templates.planetHeaderNames;

    for (let i = 0; i < planetHeaderNames.length; i++) {
        planetHeaderCells[i].innerHTML = planetHeaderNames[i];
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


function fillRowWithPlanetData(newRow, planet, planetDataKeys) {
    const formattedPlanetData = dom.formatPlanetData(planet);

    for (let i = 0; i < planetDataKeys.length; i++) {
        newRow.children[i].innerHTML = formattedPlanetData[`${planetDataKeys[i]}`];
        newRow.children[i].style.padding = '0 5px';
    }
}


function switchPage(event) {
    const currentPage = dom.mainPlanetTable;
    const currentPageNo = parseInt(dom.mainPlanetTable.dataset.page);
    const step = parseInt(event.target.dataset.value);    //direction is stored in button's dataset (1/-1)
    const nextPage = currentPageNo + step;
    currentPage.dataset.page = nextPage.toString();

    currentPage.innerHTML = "";
    loadPlanetsData();
}


function insertResidentHeaderData() {
    let residentHeaders = document.querySelector('#resident-modal-header').children;

    for (let i = 0; i < templates.residentHeaders.length; i++) {
        residentHeaders[i].innerHTML = templates.residentHeaders[i];
    }
}


function addDataToResidentsModal(residentData, table, i) {
    const row = table.childNodes[i + 1];
    const formattedResidentData = dom.formatResidentData(row, residentData);

    for (let i = 0; i < templates.residentDataKeys.length - 1; i++) {
        row.children[i].innerHTML = formattedResidentData[`${templates.residentDataKeys[i]}`];
    }
    setTimeout(function () {
        dom.removeLoadingImage('#resident-table', 'residents');
        table.style.display = 'table';
    }, 500);
}

function openResidentsModal(event) {
    dom.residentTotalModal.style.display = 'block';

    const planet = event.target.dataset.planet;

    const title = document.querySelector('#which-planet');
    title.innerHTML = `Residents of ${planet}`;

    dom.addLoadingImage('#resident-table', 'loading3', 'residents');
    createResidentsTable(event);
}


function createResidentsTable(event) {
    dom.createResidentHeader();
    insertResidentHeaderData();

    dom.residentTable.style.display = 'none';
    const residentsAsString = event.target.dataset.residents;   //list of residents is stored as 1 string in the dataset
    const residentsURLs = residentsAsString.split(',');    //splitting the string into separate URLs

    for (let i = 0; i < residentsURLs.length; i++) {
        dom.createResidentDataRows(dom.residentTable);
        dataHandler.getResidentsData(addDataToResidentsModal, dom.residentTable, residentsURLs, i);
    }
}


function closeResidentModal() {
    dom.residentTable.innerHTML = "";
    dom.residentTotalModal.style.display = 'none';
}


function addButtonClickEvents() {
    dom.nextButton.addEventListener('click', switchPage);
    dom.prevButton.addEventListener('click', switchPage);

    const residentModalCloseButtonTopRight = document.querySelector('#close-resident-modal');
    residentModalCloseButtonTopRight.addEventListener('click', closeResidentModal);

    const residentModalCloseButtonTopLeft = document.querySelector('#close-resident-button');
    residentModalCloseButtonTopLeft.addEventListener('click', closeResidentModal);
}


function init() {
    loadPlanetsData();
    addButtonClickEvents();

    const isUserLoggedIn = dom.datasetContainer.dataset.login;
    dom.changeNavBarElements(isUserLoggedIn);
    events.addSounds();

    if (isUserLoggedIn === 'True') {
        events.addVotingModalEvents();
    } else {
        events.allowRegistration();
        events.allowLogin();
    }
}