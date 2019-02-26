import {dom} from "./dom.js";

export let templates = {
    planetHeaderNames: [
        'Name', 'Diameter', 'Climate', 'Terrain', 'Surface Waters Percentage', 'Population', 'Residents', ''
    ],
    planetDataKeys: [
        'name', 'diameter', 'climate', 'terrain', 'surface_water', 'population'
    ],
    residentHeaders: [
        'Name', 'Height', 'Mass', 'Skin color', 'Hair color', 'Eye color', 'Birth year', 'Gender'
    ],
    residentDataKeys: [
        'name', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color', 'birth_year', 'gender'
    ],
    columnsNumber: 8,
    createPlanetHeaderElement: function () {
        const header = document.createElement('tr');
        header.id = 'main-header';
        header.innerHTML = `<th class="planet-header"></th>`.repeat(this.columnsNumber);
        return header;
    },
    createPlanetRow: function () {
        const newRow = document.createElement('tr');
        newRow.classList.add('planet-row');
        newRow.innerHTML = `<td class="planet-data"></td>`.repeat(this.columnsNumber);
        return newRow;
    },
    createResidentHeaderElement: function () {
        const header = document.createElement('tr');
        header.id = 'resident-modal-header';
        header.innerHTML = `<th class="resident-header"></th>`.repeat(this.columnsNumber);
        return header;
    },
    createResidentRow: function () {
        const newRow = document.createElement('tr');
        newRow.classList.add('planet-row');
        newRow.innerHTML = `<td class="resident-data"></td>`.repeat(this.columnsNumber);
        return newRow;
    },
    createVotesHeaderElement: function () {
        const header = document.createElement('tr');
        header.id = 'votes-modal-header';
        header.innerHTML =
            `
            <th class="vote-header">Planet name</th>
            <th class="vote-header">Received votes</th>

            `;

        return header;
    },
    createVotesRow: function (planet) {
        const newRow = document.createElement('tr');
        newRow.innerHTML =
            `
            <td>${planet['planet_name']}</td>
            <td>${planet['count']}</td>
            `;

        return newRow;
    },
    notLoggedInNavBar: function () {
        const navBar =
            `
            <li class="nav-item active">
                <a class="nav-link" id="home" href="/">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item not-logged-in">
                <a class="nav-link" id="registration">Registration</a>
            </li>
            <li class="nav-item not-logged-in">
                <a class="nav-link" id="login">Login</a>
            </li>
            `;

        return navBar;
    },
    loggedInNavBar: function () {
        const navBar =
            `
            <li class="nav-item active">
                <a class="nav-link" id="home" href="/">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item logged-in">
                <a class="nav-link" id="vote-stats">Voting statistics</a>
            </li>
            <li class="nav-item logged-in">
                <a class="nav-link" id="logout" href="/logout">Logout</a>
            </li>
            `;

        return navBar;
    },
    displayUserName: function (username) {
        const userName =
            `
            <li class="signed-in-user logged-in">
                <span id="shown-username">Signed in as <span id="logged-in-username">${username}</span></span>
            </li>
            `;

        return userName;
    },
    createPageNumber: function (whichPage) {
        dom.pageNumber.innerHTML = `${whichPage} / 7`;
    }
};