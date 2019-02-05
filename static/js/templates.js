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
    }
};