let nextButton = document.getElementById('next-button');

let whichPage = document.getElementById('planets').dataset.page;
let targetURL = 'https://swapi.co/api/planets/?page=' + whichPage;


$.ajax({
    dataType: "json",
    url: targetURL,
    success: function (response) {
        let table = document.getElementById('planets');
        let planets = response['results'];

        for (let planet of planets) {
            planet['diameter'] = planet['diameter'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            if (planet['population'] !== 'unknown') {
                planet['population'] = planet['population'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            if (planet['surface_water'] !== 'unknown') {
                planet['surface_water'] = planet['surface_water'] + '%';
            }


            let row = table.insertRow(-1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            let cell8 = row.insertCell(7);

            addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8);
            addDataToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, planet);


            let voteBtn = document.createElement('button');
            let text = document.createTextNode('Vote');
            voteBtn.appendChild(text);
            cell8.appendChild(voteBtn);
        }
    }
});


function addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8) {
    cell1.classList.add('planet-data');
    cell2.classList.add('planet-data');
    cell3.classList.add('planet-data');
    cell4.classList.add('planet-data');
    cell5.classList.add('planet-data');
    cell6.classList.add('planet-data');
    cell7.classList.add('planet-data');
    cell8.classList.add('planet-data');
}

function addDataToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, planet) {
    cell1.innerHTML = planet['name'];
    cell2.innerHTML = planet['diameter'];
    cell3.innerHTML = planet['climate'];
    cell4.innerHTML = planet['terrain'];
    cell5.innerHTML = planet['surface_water'];
    cell6.innerHTML = planet['population'];
    cell7.innerHTML = planet['residents'].length;
}