import {templates} from "./templates.js";

export let dataHandler = {
    saveVote: function (data) {
        $.ajax({
            type: "POST",
            url: "/voting/save",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data)
        });
    },
    getAllPlanetData: function (createPlanetTable, targetURL, prevButton, nextButton, whichPage) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: targetURL,
            success: function (response) {
                createPlanetTable(response['results'], prevButton, nextButton, whichPage);
            }
        });
    },
    getVotes: function (listVotedPlanets) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/voting/show",
            success: function (response) {
                listVotedPlanets(response);
            }
        });
    },
    getResidentsData: function (addDataToCellsAtResidentPage, table, resident) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: resident,
            success: function (residentData) {
                const row = templates.createResidentRow();
                table.appendChild(row);
                addDataToCellsAtResidentPage(row, residentData);
            }
        });
    }
};