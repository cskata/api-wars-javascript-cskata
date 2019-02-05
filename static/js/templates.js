export let templates = {
    createPlanetHeaderElement: function () {
        let header = document.createElement('tr');
        header.id = 'main-header';
        header.innerHTML =
            `
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
            `;

        return header;
    },
    createPlanetRow: function () {
        let newRow = document.createElement('tr');
        newRow.classList.add('planet-row');
        newRow.innerHTML =
            `
                <td class="planet-data"></td>
                <td class="planet-data"></td>
                <td class="planet-data"></td>
                <td class="planet-data"></td>
                <td class="planet-data"></td>
                <td class="planet-data"></td>
                <td class="planet-data"></td>
                <td class="planet-data"></td>
            `;

        return newRow;
    },
    createResidentHeaderElement: function () {
        let header = document.createElement('tr');
        header.id = 'resident-modal-header';
        header.innerHTML =
            `
                <th class="resident-header"></th>
                <th class="resident-header"></th>
                <th class="resident-header"></th>
                <th class="resident-header"></th>
                <th class="resident-header"></th>
                <th class="resident-header"></th>
                <th class="resident-header"></th>
                <th class="resident-header"></th>
            `;

        return header;
    },
    createResidentRow: function () {
        let newRow = document.createElement('tr');
        newRow.classList.add('planet-row');
        newRow.innerHTML =
            `
                <td class="resident-data"></td>
                <td class="resident-data"></td>
                <td class="resident-data"></td>
                <td class="resident-data"></td>
                <td class="resident-data"></td>
                <td class="resident-data"></td>
                <td class="resident-data"></td>
                <td class="resident-data"></td>
            `;

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
    }
};