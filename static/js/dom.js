import {templates} from "./templates.js";
import {dataHandler} from "./data_handler.js";

export let dom = {
    createResidentButton: function (planet) {
        const residentBtn = document.createElement('button');

        const noOfResidents = planet['residents'].length;
        const fullResidentTxt = `${noOfResidents} resident(s)`;
        const residentBtnTxt = document.createTextNode(fullResidentTxt);
        residentBtn.appendChild(residentBtnTxt);

        residentBtn.classList.add('btn');
        residentBtn.classList.add('btn-secondary');

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

        return voteBtn;
    },
    createPlanetDataRows: function (planetsPerPage) {
        const table = document.querySelector('#planets');
        const header = templates.createPlanetHeaderElement();
        table.appendChild(header);

        for (let i = 0; i < planetsPerPage; i++) {
            let newRow = templates.createPlanetRow();
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
    addLoadingImage: function (tableId) {
        const dataContainer = document.querySelector(tableId);
        const loadingImage = document.createElement('img');
        loadingImage.setAttribute('src',
            'static/images/loading.gif');
        loadingImage.id = 'loading-image';
        dataContainer.appendChild(loadingImage);
        if (tableId === '#planet-data') {
            dataContainer.style.textAlign = 'center';
        }
    },
    removeLoadingImage: function (tableId) {
        const dataContainer = document.querySelector(tableId);
        if (tableId === '#planet-data') {
            dataContainer.style.textAlign = 'left';
        }

        if (dataContainer.lastChild.nodeName === 'IMG') {
            dataContainer.removeChild(dataContainer.lastChild);
        }
    },
    changeNavBarElements: function (isUserLoggedIn) {
        if (isUserLoggedIn === 'True') {
            const registrationLink = document.querySelector('#registration');
            registrationLink.style.display = 'none';

            const loginLink = document.querySelector('#login');
            loginLink.style.display = 'none';

            const votesLink = document.querySelector('#vote-stats');
            votesLink.style.display = 'block';

            const logout = document.querySelector('#logout');
            logout.style.display = 'block';

            const username = document.querySelector('#shown-username');
            username.style.display = 'block';
        }
        else {
            const registrationLink = document.querySelector('#registration');
            registrationLink.style.display = 'block';

            const loginLink = document.querySelector('#login');
            loginLink.style.display = 'block';

            const votesLink = document.querySelector('#vote-stats');
            votesLink.style.display = 'none';

            const logout = document.querySelector('#logout');
            logout.style.display = 'none';

            const username = document.querySelector('#shown-username');
            username.style.display = 'none';
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
    logUserIn: function () {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        const data = {
            username: username,
            password: password
        };

        dataHandler.sendLoginData(data);
    }
};