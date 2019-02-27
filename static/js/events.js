import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

export let events = {
    addPlanetTableClickEvents: function () {
        const planetTable = dom.mainPlanetTable;
        planetTable.addEventListener('click', events.planetTableClickEvents);
    },
    planetTableClickEvents: function (event) {
        if (event.target.className === "btn btn-secondary vote-btn") {
            events.saveVote(event);
        }
        if (event.target.className === "btn btn-secondary btn-resident") {
            dom.residentTotalModal.style.display = 'block';
            const currentPlanet = event.target.dataset.planet;
            const residentModalTitle = document.querySelector('#which-planet');
            residentModalTitle.innerHTML = `Residents of ${currentPlanet}`;

            dom.addLoadingImage('#resident-table', 'loading3', 'residents');
            dom.createResidentsTable(event);
        }
    },
    addNavBarClickEvents: function () {
        events.regNavClickEvents();
        events.loginNavClickEvents();
    },
    regNavClickEvents: function () {
        const registrationLink = document.querySelector('#registration');
        registrationLink.addEventListener('click', dom.openRegModal);

        const registrationModalCloseButtonTopRight = document.querySelector('#close-reg-modal');
        registrationModalCloseButtonTopRight.addEventListener('click', dom.closeRegModal);

        const registrationModalCloseButtonTopLeft = document.querySelector('#close-reg-button');
        registrationModalCloseButtonTopLeft.addEventListener('click', dom.closeRegModal);
    },
    loginNavClickEvents: function () {
        const loginLink = document.querySelector('#login');
        loginLink.addEventListener('click', dom.openLoginModal);

        const loginModalCloseButtonTopRight = document.querySelector('#close-login-modal');
        loginModalCloseButtonTopRight.addEventListener('click', dom.closeLoginModal);

        const loginModalCloseButtonTopLeft = document.querySelector('#close-login-button');
        loginModalCloseButtonTopLeft.addEventListener('click', dom.closeLoginModal);
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
        this.addLaserSaberSound();
        this.addMainThemeSong();
        const userName = document.querySelector('#logged-in-username');
        if (userName && userName.innerHTML === 'menta') {
            this.addWoof();
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

        const votingModalCloseButtonTopRight = document.querySelector('#close-votes');
        votingModalCloseButtonTopRight.addEventListener('click', this.closeVoteStatistics);

        const votingModalCloseButtonTopLeft = document.querySelector('#close-votes-button');
        votingModalCloseButtonTopLeft.addEventListener('click', this.closeVoteStatistics);
    },
    openVoteStatistics: function () {
        const modal = document.querySelector('#votes-container');
        modal.style.display = 'block';

        const username = dom.datasetContainer.dataset.username;
        document.cookie = `username=${username}`;
        dataHandler.getVotes(dom.listVotedPlanets);
    },
    closeVoteStatistics: function () {
        dom.votesTable.innerHTML = "";

        const modal = document.querySelector('#votes-container');
        modal.style.display = 'none';
    },
    saveVote: function (event) {
        const planetId = parseInt(event.target.dataset.planetid);
        const planetName = event.target.dataset.planetname;
        const username = dom.datasetContainer.dataset.username;
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
    }
};