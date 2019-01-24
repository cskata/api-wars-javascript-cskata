init();


function getData() {
    let whichPage = document.getElementById('planets').dataset.page;
    let targetURL = 'https://swapi.co/api/planets/?page=' + whichPage;

    let prevButton = document.getElementById('prev-button');
    let nextButton = document.getElementById('next-button');

    if (parseInt(whichPage) === 1) {
        prevButton.disabled = true;
    } else if (parseInt(whichPage) > 1 && parseInt(whichPage) < 7) {
        prevButton.disabled = false;
        nextButton.disabled = false;
    } else if (parseInt(whichPage) === 7) {
        nextButton.disabled = true;
    }


    $.ajax({
        dataType: "json",
        url: targetURL,
        success: function (response) {
            let table = document.getElementById('planets');
            let planets = response['results'];

            for (let planet of planets) {
                if (planet['diameter'] !== 'unknown') {
                    planet['diameter'] = planet['diameter'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    planet['diameter'] = planet['diameter'] + ' km';
                }

                if (planet['population'] !== 'unknown') {
                    planet['population'] = planet['population'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    planet['population'] = planet['population'] + ' people';
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
                addDataToCells(cell1, cell2, cell3, cell4, cell5, cell6, planet);

                if (planet['residents'].length === 0) {
                    cell7.innerHTML = 'No known residents';
                } else if (planet['residents'].length > 0) {
                    let residentBtn = document.createElement('button');

                    let noOfResidents = planet['residents'].length.toString();
                    let fullResidentTxt = noOfResidents + ' resident(s)';
                    let residentBtnTxt = document.createTextNode(fullResidentTxt);

                    residentBtn.appendChild(residentBtnTxt);
                    residentBtn.classList.add('btn');
                    residentBtn.classList.add('btn-secondary');
                    cell7.appendChild(residentBtn);
                }

                let voteBtn = document.createElement('button');
                voteBtn.classList.add('btn');
                voteBtn.classList.add('btn-secondary');

                let text = document.createTextNode('Vote');
                voteBtn.appendChild(text);
                cell8.appendChild(voteBtn);
            }
        }
    });
}


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

function addDataToCells(cell1, cell2, cell3, cell4, cell5, cell6, planet) {
    cell1.innerHTML = planet['name'];
    cell2.innerHTML = planet['diameter'];
    cell3.innerHTML = planet['climate'];
    cell4.innerHTML = planet['terrain'];
    cell5.innerHTML = planet['surface_water'];
    cell6.innerHTML = planet['population'];
}


function switchPage() {
    let currentPage = document.getElementById('planets');
    let currentPageNo = parseInt(document.getElementById('planets').dataset.page);
    let step = parseInt(event.target.dataset.value);
    let nextPage = currentPageNo + step;
    currentPage.dataset.page = nextPage.toString();

    deleteData();
    getData();
}


function deleteData() {
    let table = document.getElementById('planets');
    for (let i = 1; i < 11; i++) {
        table.childNodes[1].childNodes[1].remove();
    }
}


function init() {
    getData();

    let nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', switchPage);

    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', switchPage);
}