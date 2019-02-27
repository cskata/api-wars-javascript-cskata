import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";
import {templates} from "./templates.js";
import {events} from "./events.js";


function loadPlanetsData() {
    const whichPage = dom.elements.mainPlanetTable.dataset.page;
    const targetURL = `https://swapi.co/api/planets/?page=${whichPage}`;

    dom.elements.prevButton.disabled = true;
    dom.elements.nextButton.disabled = true;

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

    dom.elements.prevButton.disabled = false;
    dom.elements.nextButton.disabled = false;
    dom.whichPaginationIsDisabled(whichPage);

    templates.createPageNumber(whichPage);
    events.addPlanetTableClickEvents();
}


function insertPlanetsData(planets) {
    const table = dom.elements.mainPlanetTable;
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
    const currentPage = dom.elements.mainPlanetTable;
    const currentPageNo = parseInt(dom.elements.mainPlanetTable.dataset.page);
    const step = parseInt(event.target.dataset.value);    //direction is stored in button's dataset (1 / -1)
    const nextPage = currentPageNo + step;
    currentPage.dataset.page = nextPage.toString();

    currentPage.innerHTML = "";
    loadPlanetsData();
}


function allowPagination() {
    dom.elements.nextButton.addEventListener('click', switchPage);
    dom.elements.prevButton.addEventListener('click', switchPage);
}


function init() {
    loadPlanetsData();
    allowPagination();

    const isUserLoggedIn = dom.elements.datasetContainer.dataset.login;
    dom.changeNavBarElements(isUserLoggedIn);

    if (isUserLoggedIn === 'True') {
        events.addVotingModalEvents();
        // TODO ide jöjjön a logout eventje
    } else {
        events.allowRegistration();
        events.allowLogin();
    }
}


init();