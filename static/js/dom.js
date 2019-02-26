import {templates} from "./templates.js";
import {events} from "./events.js";

export let dom = {
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

        const text = document.createTextNode('Vote');
        voteBtn.appendChild(text);

        const planetId = (planet['url'].split("/"))[5];
        voteBtn.dataset.planetid = planetId;
        voteBtn.dataset.planetname = planet['name'];

        const datasetContainer = document.querySelector('#all-content');
        if (datasetContainer.dataset.login === "") {
            voteBtn.style.display = 'none';
        }

        return voteBtn;
    },
    createPlanetDataRows: function (planetsPerPage) {
        const table = document.querySelector('#planets');
        const header = templates.createPlanetHeaderElement();
        table.appendChild(header);

        for (let i = 0; i < planetsPerPage; i++) {
            const newRow = templates.createPlanetRow();
            table.appendChild(newRow);
        }
    },
    createResidentHeader: function () {
        const table = document.querySelector('#residents');
        const header = templates.createResidentHeaderElement();
        table.appendChild(header);
    },
    createResidentDataRows: function (table) {
        const row = templates.createResidentRow();
        table.appendChild(row);
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
            this.swapResidentModalBlack();
        } else {
            this.swapMainBackgroundsToBlack();
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
                this.swapResidentModalToNormal();
            } else {
                this.swapMainBackgroundsToNormal();
            }
            dataContainer.removeChild(dataContainer.lastChild);
        }
    },
    changeNavBarElements: function (isUserLoggedIn) {
        if (isUserLoggedIn === 'True') {
            const mainNavBar = document.querySelector('#main-navbar');
            const mainNavBarContent = templates.loggedInNavBar();
            mainNavBar.innerHTML = mainNavBarContent;

            const username = document.querySelector('#all-content').dataset.username;
            const userNameText = templates.displayUserName(username);

            const userNameNavBar = document.querySelector('#username-navbar');
            userNameNavBar.innerHTML = userNameText;
        } else {
            const mainNavBar = document.querySelector('#main-navbar');
            const mainNavBarContent = templates.notLoggedInNavBar();
            mainNavBar.innerHTML = mainNavBarContent;
            events.addNavBarClickEvents();

            const userNameNavBar = document.querySelector('#username-navbar');
            userNameNavBar.innerHTML = "";
        }
    },
    openRegModal: function () {
        const registrationModal = document.querySelector('#registration-container');
        registrationModal.style.display = 'block';
    },
    closeRegModal: function () {
        const registrationModal = document.querySelector('#registration-container');
        registrationModal.style.display = 'none';
    },
    openLoginModal: function () {
        const loginModal = document.querySelector('#login-container');
        loginModal.style.display = 'block';
    },
    closeLoginModal: function () {
        const loginModal = document.querySelector('#login-container');
        loginModal.style.display = 'none';
    },
    swapMainBackgroundsToBlack: function () {
        const body = document.querySelector('#main');
        body.style.backgroundImage = "url(/static/images/black.jpg)";

        const title = document.querySelector('#title');
        title.style.backgroundImage = "url(/static/images/black.jpg)";

        const mainTitle = document.querySelector('#main-title');
        mainTitle.style.backgroundImage = "url(/static/images/black.jpg)";

        this.hidePageNumber();
    },
    swapMainBackgroundsToNormal: function () {
        const body = document.querySelector('#main');
        body.style.backgroundImage = "url(/static/images/universe.jpg)";

        const title = document.querySelector('#title');
        title.style.backgroundImage = "url(/static/images/universe.jpg)";

        const mainTitle = document.querySelector('#main-title');
        mainTitle.style.backgroundImage = "url(/static/images/universe.jpg)";

        this.showPageNumber();
    },
    swapResidentModalBlack: function () {
        const resident = document.querySelector('#residents-inner-container');
        resident.classList.add('hide-res-bg');
    },
    swapResidentModalToNormal: function () {
        const resident = document.querySelector('#residents-inner-container');
        resident.classList.remove('hide-res-bg');
    },
    showPageNumber: function () {
        const pageNumContainer = document.querySelector('#page-container');
        pageNumContainer.style.opacity = '0.8';
    },
    hidePageNumber: function () {
        const pageNumContainer = document.querySelector('#page-container');
        pageNumContainer.innerHTML = "";
        pageNumContainer.style.opacity = '0';
    }
};