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

                addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, 'planet-data');
                addDataToCellsAtMainPage(cell1, cell2, cell3, cell4, cell5, cell6, planet);

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
                    residentBtn.dataset.planet = planet['name'];
                    residentBtn.dataset.residents = planet['residents'];
                    residentBtn.dataset.numberofresidents = planet['residents'].length;
                    residentBtn.addEventListener('click', openModal);
                }

                let voteBtn = document.createElement('button');
                voteBtn.classList.add('btn');
                voteBtn.classList.add('btn-secondary');

                let text = document.createTextNode('Vote');
                voteBtn.appendChild(text);
                cell8.appendChild(voteBtn);
                if (table.dataset.session === "") {
                    voteBtn.style.visibility = "hidden";
                }
            }
        }
    });
}


function addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cellClass) {
    cell1.classList.add(cellClass);
    cell2.classList.add(cellClass);
    cell3.classList.add(cellClass);
    cell4.classList.add(cellClass);
    cell5.classList.add(cellClass);
    cell6.classList.add(cellClass);
    cell7.classList.add(cellClass);
    cell8.classList.add(cellClass);
}

function addDataToCellsAtMainPage(cell1, cell2, cell3, cell4, cell5, cell6, planet) {
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


function openModal() {
    let modal = document.getElementById('resident-container');
    modal.style.display = 'block';

    let planet = event.target.dataset.planet;

    let title = document.getElementById('which-planet');
    title.innerHTML = 'Residents of ' + planet;

    let residentsOrig = event.target.dataset.residents;
    let numberOfResidents = event.target.dataset.numberofresidents;
    let residents = residentsOrig.split(',');

    let modalCloseButton = document.getElementById('close-modal');
    modalCloseButton.dataset.numberofresidents = numberOfResidents;

    for (let resident of residents) {
        $.ajax({
            dataType: "json",
            url: resident,
            success: function (residentData) {
                let table = document.getElementById('residents');

                let row = table.insertRow(-1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                let cell8 = row.insertCell(7);

                addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, 'resident-data');
                addDataToCellsAtResidentPage(cell1, cell2, cell3, cell4, cell5, cell6, cell7, residentData);

                addGender(cell8, residentData);
            }
        });
    }
}

function addGender(cell8, residentData) {
    let icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-lg');
    icon.classList.add('centered-icon');

    if (residentData['gender'] === 'female') {
        icon.classList.add('fa-venus');
        cell8.appendChild(icon);
    } else if (residentData['gender'] === 'male') {
        icon.classList.add('fa-mars');
        cell8.appendChild(icon);
    } else {
        cell8.innerHTML = residentData['gender'];
        cell8.classList.add('centered-text');
    }

}


function addDataToCellsAtResidentPage(cell1, cell2, cell3, cell4, cell5, cell6, cell7, residentData) {
    cell1.innerHTML = residentData['name'];
    cell2.innerHTML = residentData['height'];
    cell3.innerHTML = residentData['mass'];
    cell4.innerHTML = residentData['hair_color'];
    cell5.innerHTML = residentData['skin_color'];
    cell6.innerHTML = residentData['eye_color'];
    cell7.innerHTML = residentData['birth_year'];
}


function closeModal() {
    let modalCloseButton = document.getElementById('close-modal');
    let numberOfResidents = parseInt(modalCloseButton.dataset.numberofresidents);

    let table = document.getElementById('residents');

    for (let i = 1; i <= numberOfResidents; i++) {
        table.childNodes[1].childNodes[1].remove();
    }

    let modal = document.getElementById('resident-container');
    modal.style.display = 'none';
}


function init() {
    getData();

    let nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', switchPage);

    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', switchPage);

    let modalCloseButtonTopRight = document.getElementById('close-modal');
    modalCloseButtonTopRight.addEventListener('click', closeModal);

    let modalCloseButtonTopLeft = document.getElementById('close-button');
    modalCloseButtonTopLeft.addEventListener('click', closeModal);
}
