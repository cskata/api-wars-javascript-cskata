export let templates = {
    createTableElement: function () {
        let planetData = document.createElement('div');
        planetData.id = 'planet-data';
        planetData.innerHTML =
            `<table id="planets" data-page="1">
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
                <th class="planet-header"></th>
            </table>`;

        return planetData;
    },
    createHeaderElement: function () {
        let header = `
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
        let newPlanet =
        `<tr class="planet-row">
            <td class="planet-data"></td>
            <td class="planet-data"></td>
            <td class="planet-data"></td>
            <td class="planet-data"></td>
            <td class="planet-data"></td>
            <td class="planet-data"></td>
            <td class="planet-data"></td>
            <td class="planet-data"></td>
        </tr>`;

        return newPlanet;
    }
};