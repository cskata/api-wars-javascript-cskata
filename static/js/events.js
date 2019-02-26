import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

export let events = {
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
    }, playLaserSaberAudio: function () {
        const audio = document.querySelector('#laser-saber');
        audio.play();
    }, pauseLaserSaberAudio: function () {
        const audio = document.querySelector('#laser-saber');
        audio.pause();
        audio.currentTime = 0;
    },
    addMainThemeSong: function () {
        const pageNumber = document.querySelector('#page-container');
        pageNumber.addEventListener('mouseover', this.playMainTheme);
        pageNumber.addEventListener('mouseleave', this.pauseMainTheme);
    }, playMainTheme: function () {
        const audio = document.querySelector('#theme-song');
        audio.currentTime = 9;
        audio.play();
    }, pauseMainTheme: function () {
        const audio = document.querySelector('#theme-song');
        audio.pause();
    },
    addSounds: function () {
        this.addLaserSaberSound();
        this.addMainThemeSong();
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
    addUserToDataBase: function () {
        const username = document.querySelector('#new_username').value;
        const password = document.querySelector('#new_password').value;
        const newUserData = {
            username: username,
            password: password
        };
        console.log(newUserData);
        dataHandler.registerNewUser(newUserData);
    },
    allowLogin: function () {
        const submitLoginButton = document.querySelector('#logbtn');
        submitLoginButton.addEventListener('click', this.checkLoginUserName);
    },
    checkLoginUserName: function () {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        document.cookie = `username=${username}`;
        document.cookie = `password=${password}`;
        dataHandler.verifyUserAtLogin(username);
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
        const username = document.querySelector('#all-content').dataset.username;
        document.cookie = `username=${username}`;
        dataHandler.getVotes(dom.listVotedPlanets);
    },
    closeVoteStatistics: function () {
        const table = document.querySelector('#votes');
        table.innerHTML = "";

        const modal = document.querySelector('#votes-container');
        modal.style.display = 'none';
    }
};