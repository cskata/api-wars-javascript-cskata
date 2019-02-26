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
    getVotes: function (callback, username) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `/voting/${username}`,
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
    checkIfUsernameIsTaken: function (username) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `/registration/${username}`,
            success: function (response) {
                if (response === false) {
                    events.addUserToDataBase();
                } else {
                    alert('Username is already taken, please choose something else.');
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
    verifyUserAtLogin: function (username, password) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `/login/${username}/${password}`,
            success: function (response) {
                if (response === false) {
                    alert('Invalid username or password!');
                } else {
                    dom.changeNavBarAfterLogin('True', username);
                    dom.closeLoginModal();
                }
            }
        });
    }
};