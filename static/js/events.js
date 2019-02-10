import {dom} from "./dom.js";

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
    }
};
