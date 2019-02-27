import {templates} from "./templates.js";
import {events} from "./events.js";
import {dataHandler} from "./data_handler.js";

export let dom = {
    datasetContainer: document.querySelector('#all-content'),
    registrationModal: document.querySelector('#registration-container'),
    loginModal: document.querySelector('#login-container'),
    mainPlanetTable: document.querySelector('#planets'),
    residentTable: document.querySelector('#residents'),
    residentTotalModal: document.querySelector('#resident-container'),
    prevButton: document.querySelector('#prev-button'),
    nextButton: document.querySelector('#next-button'),
    residentInnerModal: document.querySelector('#residents-inner-container'),
    mainNavBar: document.querySelector('#main-navbar'),
    userNameNavBar: document.querySelector('#username-navbar'),
    pageNumber: document.querySelector('#page-container'),
    createResidentButton: function (planet) {
        const residentBtn = document.createElement('button');

        const noOfResidents = planet['residents'].length;
        const fullResidentTxt = `${noOfResidents} resident(s)`;
        const residentBtnTxt = document.createTextNode(fullResidentTxt);
        residentBtn.appendChild(residentBtnTxt);

        residentBtn.classList.add('btn');
        residentBtn.classList.add('btn-secondary');
        residentBtn.classList.add('btn-resident');

        residentBtn.dataset.planet = planet['name'];
        residentBtn.dataset.residents = planet['residents'];
        residentBtn.dataset.numberofresidents = planet['residents'].length;

        return residentBtn;
    },
    createVoteButton: function (planet) {
        const voteBtn = document.createElement('button');
        voteBtn.classList.add('btn');
        voteBtn.classList.add('btn-secondary');
        voteBtn.classList.add('vote-btn');

        const text = document.createTextNode('Vote');
        voteBtn.appendChild(text);

        const planetId = (planet['url'].split("/"))[5];
        voteBtn.dataset.planetid = planetId;
        voteBtn.dataset.planetname = planet['name'];

        if (dom.datasetContainer.dataset.login === "") {
            voteBtn.style.display = 'none';
        }

        return voteBtn;
    },
    createPlanetDataRows: function (planetsPerPage) {
        const table = dom.mainPlanetTable;
        const header = templates.createPlanetHeaderElement();
        table.appendChild(header);

        for (let i = 0; i < planetsPerPage; i++) {
            const newRow = templates.createPlanetRow();
            table.appendChild(newRow);
        }
    },
    createResidentHeader: function () {
        const table = dom.residentTable;
        const header = templates.createResidentHeaderElement();
        table.appendChild(header);
    },
    createResidentDataRows: function (table) {
        const row = templates.createResidentRow();
        table.appendChild(row);
    },
    insertResidentHeaderData: function () {
        let residentHeaders = document.querySelector('#resident-modal-header').children;

        for (let i = 0; i < templates.residentHeaders.length; i++) {
            residentHeaders[i].innerHTML = templates.residentHeaders[i];
        }
    },
    createResidentsTable: function (event) {
        dom.createResidentHeader();
        dom.insertResidentHeaderData();

        dom.residentTable.style.display = 'none';
        const residentsAsString = event.target.dataset.residents;   //list of residents is stored as 1 string in the dataset
        const residentsURLs = residentsAsString.split(',');    //splitting the string into separate URLs

        for (let i = 0; i < residentsURLs.length; i++) {
            dom.createResidentDataRows(dom.residentTable);
            dataHandler.getResidentsData(dom.addDataToResidentsModal, dom.residentTable, residentsURLs, i);
        }
    },
    addDataToResidentsModal: function (residentData, table, i) {
        const row = table.childNodes[i + 1];
        const formattedResidentData = dom.formatResidentData(row, residentData);

        for (let i = 0; i < templates.residentDataKeys.length - 1; i++) {
            row.children[i].innerHTML = formattedResidentData[`${templates.residentDataKeys[i]}`];
        }
        setTimeout(function () {
            dom.removeLoadingImage('#resident-table', 'residents');
            table.style.display = 'table';
        }, 500);
    },
    createVotesHeader: function () {
        const table = document.querySelector('#votes');
        const header = templates.createVotesHeaderElement();
        table.appendChild(header);
    },
    createVotesDataRow: function (table, planet) {
        const row = templates.createVotesRow(planet);
        table.appendChild(row);
    },
    addLoadingImage: function (tableId, gifName, location = 'main') {
        const dataContainer = document.querySelector(tableId);
        const loadingImage = document.createElement('img');
        loadingImage.setAttribute('src',
            `static/images/${gifName}.gif`);
        loadingImage.id = 'loading-image';

        if (location === 'residents') {
            dom.residentInnerModal.classList.add('hide-res-bg');
        } else {
            dom.swapMainBackgrounds("url(/static/images/black.jpg)");
            dom.hidePageNumber();
        }

        dataContainer.appendChild(loadingImage);
        if (tableId === '#planet-data') {
            dataContainer.style.textAlign = 'center';
        }
    },
    removeLoadingImage: function (tableId, location = 'main') {
        const dataContainer = document.querySelector(tableId);
        if (tableId === '#planet-data') {
            dataContainer.style.textAlign = 'left';
        }

        if (dataContainer.lastChild.nodeName === 'IMG') {
            if (location === 'residents') {
                dom.residentInnerModal.classList.remove('hide-res-bg');
            } else {
                dom.swapMainBackgrounds("url(/static/images/universe.jpg)");
                dom.showPageNumber();
            }
            dataContainer.removeChild(dataContainer.lastChild);
        }
    },
    changeNavBarElements: function (isUserLoggedIn) {
        if (isUserLoggedIn === 'True') {
            const username = dom.datasetContainer.dataset.username;
            dom.mainNavBar.innerHTML = templates.loggedInNavBar();
            dom.userNameNavBar.innerHTML = templates.displayUserName(username);
        } else {
            dom.mainNavBar.innerHTML = templates.notLoggedInNavBar();
            dom.userNameNavBar.innerHTML = "";
            events.addNavBarClickEvents();
        }
    },
    changeNavBarAfterLogin: function (isUserLoggedIn, username) {
        document.querySelector('#all-content').dataset.username = username;
        document.querySelector('#all-content').dataset.login = 'True';

        dom.mainNavBar.innerHTML = templates.loggedInNavBar();
        dom.userNameNavBar.innerHTML = templates.displayUserName(username);

        events.addVotingModalEvents();
        events.addSounds();
    },
    openRegModal: function () {
        dom.registrationModal.style.display = 'block';
    },
    closeRegModal: function () {
        dom.emptyRegFormFields();
        dom.registrationModal.style.display = 'none';
    },
    openLoginModal: function () {
        dom.loginModal.style.display = 'block';
    },
    closeLoginModal: function () {
        dom.emptyLoginFormFields();
        dom.loginModal.style.display = 'none';
    },
    swapMainBackgrounds: function (backgroundImage) {
        const body = document.querySelector('#main');
        body.style.backgroundImage = backgroundImage;

        const title = document.querySelector('#title');
        title.style.backgroundImage = backgroundImage;

        const mainTitle = document.querySelector('#main-title');
        mainTitle.style.backgroundImage = backgroundImage;
    },
    showPageNumber: function () {
        dom.pageNumber.style.opacity = '0.8';
    },
    hidePlanetVotingHeader: function () {
        if (dom.datasetContainer.dataset.login === "") {
            const headers = document.querySelectorAll('.planet-header');
            const lastHeader = headers[templates.planetHeaderNames.length - 1];
            lastHeader.style.display = 'none';
        }
    },
    hidePageNumber: function () {
        dom.pageNumber.innerHTML = "";
        dom.pageNumber.style.opacity = '0';
    },
    addVoteButton: function (row, planet) {
        const lastColumn = row.children[templates.planetHeaderNames.length - 1];
        const voteBtn = dom.createVoteButton(planet);
        lastColumn.appendChild(voteBtn);
        voteBtn.parentElement.style.textAlign = 'center';

        if (dom.datasetContainer.dataset.login === "") {
            voteBtn.style.display = 'none';
            voteBtn.parentElement.style.display = 'none';
        }
    },
    listVotedPlanets: function (response) {
        const table = document.querySelector('#votes');
        const voted_planets = response;
        table.dataset.votes = voted_planets.length;

        dom.createVotesHeader();

        for (const planet of voted_planets) {
            dom.createVotesDataRow(table, planet);
        }
    },
    displayVotingColumn: function () {
        const planetTableRows = dom.mainPlanetTable.rows;

        for (const row of planetTableRows) {
            const lasCell = row.children[7];
            lasCell.style.display = 'table-cell';
        }
    },
    displayVoteButtons: function () {
        const voteButtons = document.querySelectorAll('.vote-btn');

        for (const button of voteButtons) {
            button.style.display = 'block';
        }
    },
    whichPaginationIsDisabled: function (whichPage) {
        if (parseInt(whichPage) === 1) {
            dom.prevButton.disabled = true;
        } else if (parseInt(whichPage) > 1 && parseInt(whichPage) < 7) {
            dom.prevButton.disabled = false;
            dom.nextButton.disabled = false;
        } else if (parseInt(whichPage) === 7) {
            dom.nextButton.disabled = true;
        }
    },
    showLoggedInElements: function (loginStatus, username) {
        dom.changeNavBarAfterLogin(loginStatus, username);
        dom.displayVotingColumn();
        dom.displayVoteButtons();
    },
    emptyLoginFormFields: function () {
        document.querySelector('#username').value = "";
        document.querySelector('#password').value = "";
    },
    emptyRegFormFields: function () {
        document.querySelector('#new_username').value = "";
        document.querySelector('#new_password').value = "";
    },
    formatPlanetData: function (planet) {
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
    },
    formatResidentData: function (row, residentData) {
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
};