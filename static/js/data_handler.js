import {dom} from "./dom.js";
import {events} from "./events.js";

export let dataHandler = {
    saveVote: function (data) {
        $.ajax({
            type: "POST",
            url: "/voting",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data)
        });
    },
    getVotes: function (callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `/voting`,
            success: function (response) {
                callback(response);
            }
        });
    },
    getAllPlanetData: function (callback, targetURL, prevButton, nextButton, whichPage) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: targetURL,
            success: function (response) {
                callback(response['results'], prevButton, nextButton, whichPage);
            }
        });
    },
    getResidentsData: function (callback, table, residentsURLs, i) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: residentsURLs[i],
            success: function (residentData) {
                callback(residentData, table, i);
            }
        });
    },
    checkIfUsernameIsTaken: function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `/registration`,
            success: function (response) {
                if (response === false) {
                    events.addUserToDatabase();
                } else {
                    alert('Username is already taken, please choose something else.');
                    dom.emptyRegFormFields();
                }
            }
        });
    },
    registerNewUser: function (data) {
        $.ajax({
            type: "POST",
            url: "/registration",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: function () {
                dom.closeRegModal();
            }
        });
    },
    verifyUserAtLogin: function (data) {
        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (response) {
                if (response === false) {
                    alert('Invalid username or password!');
                    dom.emptyLoginFormFields();
                } else {
                    dom.showLoggedInElements('True', data['username']);
                    dom.closeLoginModal();
                }
            }
        });
    }
};