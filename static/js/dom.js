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
    createPlanetDataTable: function () {
        const table = document.querySelector('#planets');
        const header = templates.createHeaderElement();
        table.appendChild(header);
        const planetsPerPage = 10;

        for (let i = 0; i < planetsPerPage; i++) {
            let newRow = templates.createPlanetRow();
            table.appendChild(newRow);
        }
    }
};