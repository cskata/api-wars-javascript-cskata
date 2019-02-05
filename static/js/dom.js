import {templates} from "./templates.js";

export let dom = {
    createResidentButton: function (planet) {
        const residentBtn = document.createElement('button');

        const noOfResidents = planet['residents'].length;
        const fullResidentTxt = `${noOfResidents} resident(s)`;
        const residentBtnTxt = document.createTextNode(fullResidentTxt);
        residentBtn.appendChild(residentBtnTxt);

        residentBtn.classList.add('btn');
        residentBtn.classList.add('btn-secondary');

        residentBtn.dataset.planet = planet['name'];
        residentBtn.dataset.residents = planet['residents'];
        residentBtn.dataset.numberofresidents = planet['residents'].length;

        return residentBtn;
    },
    createVoteButton: function (planet) {
        const voteBtn = document.createElement('button');
        voteBtn.classList.add('btn');
        voteBtn.classList.add('btn-secondary');

        const text = document.createTextNode('Vote');
        voteBtn.appendChild(text);

        const planetId = (planet['url'].split("/"))[5];
        voteBtn.dataset.planetid = planetId;
        voteBtn.dataset.planetname = planet['name'];

        return voteBtn;
    },
    createPlanetDataRows: function (planetsPerPage) {
        const table = document.querySelector('#planets');
        const header = templates.createPlanetHeaderElement();
        table.appendChild(header);

        for (let i = 0; i < planetsPerPage; i++) {
            let newRow = templates.createPlanetRow();
            table.appendChild(newRow);
        }
    },
    createResidentHeader: function () {
        const table = document.querySelector('#residents');
        const header = templates.createResidentHeaderElement();
        table.appendChild(header);
    },
    createResidentDataRows: function (table) {
        const row = templates.createResidentRow();
        table.appendChild(row);
    },
    createVotesHeader: function () {
        const table = document.querySelector('#votes');
        const header = templates.createVotesHeaderElement();
        table.appendChild(header);
    }
};