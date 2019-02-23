export let templates = {
    createPlanetHeaderElement: function () {
        let header = document.createElement('tr');
        header.id = 'main-header';
        header.innerHTML = `<th class="planet-header"></th>`.repeat(8);
        return header;
    },
    createPlanetRow: function () {
        let newRow = document.createElement('tr');
        newRow.classList.add('planet-row');
        newRow.innerHTML = `<td class="planet-data"></td>`.repeat(8);
        return newRow;
    },
    createResidentHeaderElement: function () {
        let header = document.createElement('tr');
        header.id = 'resident-modal-header';
        header.innerHTML = `<th class="resident-header"></th>`.repeat(8);
        return header;
    },
    createResidentRow: function () {
        let newRow = document.createElement('tr');
        newRow.classList.add('planet-row');
        newRow.innerHTML = `<td class="resident-data"></td>`.repeat(8);
        return newRow;
    },
    createVotesHeaderElement: function () {
        let header = document.createElement('tr');
        header.id = 'votes-modal-header';
        header.innerHTML =
            `
            <th class="vote-header">Planet name</th>
            <th class="vote-header">Received votes</th>

            `;

        return header;
    },
    createVotesRow: function (planet) {
        let newRow = document.createElement('tr');
        newRow.innerHTML =
            `
                <td>${planet['planet_name']}</td>
                <td>${planet['count']}</td>
            `;

        return newRow;
    },
    notLoggedInNavBar: function () {
        let navBar =
            `
            <li class="nav-item active">
                <a class="nav-link" id="home">Home<span class="sr-only">(current)</span></a>
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
        let navBar =
            `
            <li class="nav-item active">
                <a class="nav-link" id="home">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item logged-in">
                <a class="nav-link" id="vote-stats">Voting statistics</a>
            </li>
            <li class="nav-item logged-in">
                <a class="nav-link" id="logout">Logout</a>
            </li>
            `;
        return navBar;
    },
    displayUserName: function () {
       let userName =
            `
            <li class="signed-in-user logged-in">
                <span id="shown-username">Signed in as <span id="logged-in-username"></span></span>
            </li>
            `;
        return userName;
    }
};