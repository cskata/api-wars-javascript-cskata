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
        url: "/voting",
        success: function (response) {
            listVotedPlanets(response);
        }
    });
    }
};