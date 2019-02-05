import createPlanetTable from "./apiwars.js";

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
    getAllPlanetData: function (targetURL, headers, planetData,
                                prevButton, nextButton, whichPage) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: targetURL,
            success: function (response) {
                createPlanetTable(response['results'], headers,
                    planetData, prevButton, nextButton, whichPage);
            }
        });
    }
};