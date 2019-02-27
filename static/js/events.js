import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

export let events = {
    addPlanetTableClickEvents: function () {
        const planetTable = dom.elements.mainPlanetTable;
        planetTable.addEventListener('click', events.planetTableClickEvents);
    },
    planetTableClickEvents: function (event) {
        if (event.target.className === "btn btn-secondary vote-btn") {
            events.saveVote(event);
        }
        if (event.target.className === "btn btn-secondary btn-resident") {
            dom.elements.residentTotalModal.style.display = 'block';
            dom.elements.residentInnerModal.addEventListener('click', events.closeResidentModal);

            const currentPlanet = event.target.dataset.planet;
            const residentModalTitle = document.querySelector('#which-planet');
            residentModalTitle.innerHTML = `Residents of ${currentPlanet}`;

            dom.addLoadingImage('#resident-table', 'loading3', 'residents');
            dom.createResidentsTable(event);
        }
    },
    closeResidentModal: function (event) {
        if (event.target.id === "close-resident-button" ||
            event.target.id === "close-resident-modal" ||
            event.target.id === "x-res") {
            dom.elements.residentTable.innerHTML = "";
            dom.elements.residentTotalModal.style.display = 'none';
        }
    },
    addNavBarClickEvents: function (isUserLoggedIn) {
        if (isUserLoggedIn === 'True') {
            events.addVotingModalEvents();
            events.addLogOutEvent();
        } else {
            events.regNavClickEvents();
            events.loginNavClickEvents();
        }
    },
    regNavClickEvents: function () {
        const registrationLink = document.querySelector('#registration');
        registrationLink.addEventListener('click', events.openRegModal);
    },
    loginNavClickEvents: function () {
        const loginLink = document.querySelector('#login');
        loginLink.addEventListener('click', events.openLoginModal);
    },
    openRegModal: function () {
        dom.elements.registrationModal.style.display = 'block';
        const innerRegModal = document.querySelector('#inner-reg-modal');
        innerRegModal.addEventListener('click', events.closeRegModal);
    },
    closeRegModal: function (event) {
        if (event.target.id === "close-reg-modal" ||
            event.target.id === "close-reg-button" ||
            event.target.id === "reg-x") {
            dom.emptyRegFormFields();
            dom.elements.registrationModal.style.display = 'none';
        }
        if (event.target.id === "reg-button") {
            dom.elements.registrationModal.style.display = 'none';
        }
    },
    openLoginModal: function () {
        dom.elements.loginModal.style.display = 'block';
        const innerLoginModal = document.querySelector('#inner-login-modal');
        innerLoginModal.addEventListener('click', events.closeLoginModal);
    },
    closeLoginModal: function (event) {
        if (event.target.id === "close-login-modal" ||
            event.target.id === "close-login-button" ||
            event.target.id === "log-x") {
            dom.emptyLoginFormFields();
            dom.elements.loginModal.style.display = 'none';
        }
        if (event.target.id === "logbtn") {
            dom.elements.loginModal.style.display = 'none';
        }
    },
    addLaserSaberSound: function () {
        const navItems = document.querySelectorAll('.nav-link');

        for (const item of navItems) {
            item.addEventListener('mouseover', this.playLaserSaberAudio);
            item.addEventListener('mouseleave', this.pauseLaserSaberAudio);
        }
    },
    playLaserSaberAudio: function () {
        const audio = document.querySelector('#laser-saber');
        audio.play();
    },
    pauseLaserSaberAudio: function () {
        const audio = document.querySelector('#laser-saber');
        audio.pause();
        audio.currentTime = 0;
    },
    addMainThemeSong: function () {
        const pageNumber = document.querySelector('#page-container');
        pageNumber.addEventListener('mouseover', this.playMainTheme);
        pageNumber.addEventListener('mouseleave', this.pauseMainTheme);
    },
    playMainTheme: function () {
        const audio = document.querySelector('#theme-song');
        audio.currentTime = 9;
        audio.play();
    },
    pauseMainTheme: function () {
        const audio = document.querySelector('#theme-song');
        audio.pause();
    },
    addWoof: function () {
        const userName = document.querySelector('#logged-in-username');
        userName.addEventListener('mouseover', this.playBarking);
        userName.addEventListener('mouseleave', this.pauseBarking);
    },
    playBarking: function () {
        const audio = document.querySelector('#woof');
        audio.play();
    },
    pauseBarking: function () {
        const audio = document.querySelector('#woof');
        audio.pause();
        audio.currentTime = 0;
    },
    addSounds: function () {
        events.addLaserSaberSound();
        events.addMainThemeSong();
        const userName = document.querySelector('#logged-in-username');
        if (userName && userName.innerHTML === 'menta') {
            events.addWoof();
        }
    },
    allowRegistration: function () {
        const submitRegButton = document.querySelector('#reg-button');
        submitRegButton.addEventListener('click', this.checkUserName);
    },
    checkUserName: function () {
        const username = document.querySelector('#new_username').value;
        document.cookie = `username=${username}`;
        dataHandler.checkIfUsernameIsTaken(username);
    },
    addUserToDatabase: function () {
        const username = document.querySelector('#new_username').value;
        const password = document.querySelector('#new_password').value;
        const newUserData = {
            username: username,
            password: password
        };
        dataHandler.registerNewUser(newUserData);
    },
    allowLogin: function () {
        const submitLoginButton = document.querySelector('#logbtn');
        submitLoginButton.addEventListener('click', this.checkLoginUserName);
    },
    checkLoginUserName: function () {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const userData = {
            username: username,
            password: password
        };
        dataHandler.verifyUserAtLogin(userData);
    },
    addVotingModalEvents: function () {
        const voteStatisticsLink = document.querySelector('#vote-stats');
        voteStatisticsLink.addEventListener('click', this.openVoteStatistics);
    },
    openVoteStatistics: function () {
        dom.elements.votesModal.style.display = 'block';

        const username = dom.elements.datasetContainer.dataset.username;
        document.cookie = `username=${username}`;
        dataHandler.getVotes(dom.listVotedPlanets);

        const innerVotesModal = document.querySelector('#inner-vote-modal');
        innerVotesModal.addEventListener('click', events.closeVoteStatistics);
    },
    closeVoteStatistics: function (event) {
        if (event.target.id === "close-votes-modal" ||
            event.target.id === "close-votes-button" ||
            event.target.id === "vote-x") {
            dom.elements.votesTable.innerHTML = "";
            dom.elements.votesModal.style.display = 'none';
        }
    },
    saveVote: function (event) {
        const planetId = parseInt(event.target.dataset.planetid);
        const planetName = event.target.dataset.planetname;
        const username = dom.elements.datasetContainer.dataset.username;
        const currentDate = new Date();
        const submissionTime =
            currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + ' ' +
            currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

        const data = {
            planet_id: planetId,
            planet_name: planetName,
            username: username,
            submission_time: submissionTime
        };

        dataHandler.saveVote(data);

        alert(`Your vote for planet ${planetName} is saved.`);
    },
    addLogOutEvent: function () {
        const logOutButton = document.querySelector('#logout');
        logOutButton.addEventListener('click', events.logUserOut);
    },
    logUserOut: function () {
        dataHandler.logUserOut();
        // dom.changeNavBarAfterLogOut();
    },

};