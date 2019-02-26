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
        const submitButton = document.querySelector('#reg-button');
        submitButton.addEventListener('click', this.checkUserName);
    },
    checkUserName: function () {
        const username = document.querySelector('#new_username');
        dataHandler.checkIfUsernameIsTaken(username.value);
    },
    addUserToDataBase: function () {
        const username = document.querySelector('#new_username');
        const password = document.querySelector('#new_password');
        const newUserData = {
            username: username.value,
            password: password.value
        };
        dataHandler.registerNewUser(newUserData);
    },
    allowLogin: function () {
        const username = document.querySelector('#username');
        const password = document.querySelector('#password');
        const submitButton = document.querySelector('#logbtn');
    }
};