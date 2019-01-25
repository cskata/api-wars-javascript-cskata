init();


function getData() {
    let whichPage = document.getElementById('planets').dataset.page;
    let targetURL = 'https://swapi.co/api/planets/?page=' + whichPage;

    disableButtonIfNecessary(whichPage);

    $.ajax({
        type: "GET",
        dataType: "json",
        url: targetURL,
        success: function (response) {
            let table = document.getElementById('planets');
            let planets = response['results'];

            insertPlanetHeaders();

            for (let planet of planets) {
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

                addResidentsButton(cell7, planet);
                addVoteButton(cell8, table, planet);
            }
        }
    });
}

function insertPlanetHeaders() {
    let table = document.getElementById('planets');
    let header = table.insertRow(0);

    let head1 = header.insertCell(0);
    let head2 = header.insertCell(1);
    let head3 = header.insertCell(2);
    let head4 = header.insertCell(3);
    let head5 = header.insertCell(4);
    let head6 = header.insertCell(5);
    let head7 = header.insertCell(6);
    let head8 = header.insertCell(7);

    addClassToCells(head1, head2, head3, head4, head5, head6, head7, head8, 'planet-header');

    head1.innerHTML = 'Name';
    head2.innerHTML = 'Diameter';
    head3.innerHTML = 'Climate';
    head4.innerHTML = 'Terrain';
    head5.innerHTML = 'Surface Waters Percentage';
    head6.innerHTML = 'Population';
    head7.innerHTML = 'Residents';
    head8.innerHTML = '';
}


function disableButtonIfNecessary(whichPage) {
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
}


function addResidentsButton(cell7, planet) {
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
}


function addVoteButton(cell8, table, planet) {
    let voteBtn = document.createElement('button');
    voteBtn.classList.add('btn');
    voteBtn.classList.add('btn-secondary');

    let text = document.createTextNode('Vote');
    voteBtn.appendChild(text);
    cell8.appendChild(voteBtn);
    if (table.dataset.session === "") {
        voteBtn.style.visibility = "hidden";
    }
    let planetId = (planet['url'].split("/"))[5];
    voteBtn.dataset.planetid = planetId;
    voteBtn.dataset.planetname = planet['name'];

    voteBtn.addEventListener('click', saveVote);
}


function saveVote() {
    let planetId = parseInt(event.target.dataset.planetid);
    let planetName = event.target.dataset.planetname;
    let userId = parseInt(document.getElementById('planets').dataset.userid);
    let currentDate = new Date();
    let submissionTime = currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
        + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

    let data = {'planet_id': planetId, 'planet_name': planetName, 'user_id': userId, 'submission_time': submissionTime};

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/send-vote",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data)
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

    if (planet['diameter'] !== 'unknown') {
        planet['diameter'] = planet['diameter'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        planet['diameter'] = planet['diameter'] + ' km';
    }

    cell2.innerHTML = planet['diameter'];
    cell3.innerHTML = planet['climate'];
    cell4.innerHTML = planet['terrain'];

    if (planet['surface_water'] !== 'unknown') {
        planet['surface_water'] = planet['surface_water'] + '%';
    }

    cell5.innerHTML = planet['surface_water'];

    if (planet['population'] !== 'unknown') {
        planet['population'] = planet['population'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        planet['population'] = planet['population'] + ' people';
    }

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
    let planetTableLengthWithHeader = table.childNodes[1].childNodes.length;

    for (let i = 1; i <= planetTableLengthWithHeader; i++) {
        table.childNodes[1].childNodes[0].remove();
    }
}


function insertResidentHeaders() {
    let table = document.getElementById('residents');

    let header = table.insertRow(0);

    let head1 = header.insertCell(0);
    let head2 = header.insertCell(1);
    let head3 = header.insertCell(2);
    let head4 = header.insertCell(3);
    let head5 = header.insertCell(4);
    let head6 = header.insertCell(5);
    let head7 = header.insertCell(6);
    let head8 = header.insertCell(7);

    addClassToCells(head1, head2, head3, head4, head5, head6, head7, head8, 'resident-header');

    head1.innerHTML = 'Name';
    head2.innerHTML = 'Height';
    head3.innerHTML = 'Mass';
    head4.innerHTML = 'Hair color';
    head5.innerHTML = 'Skin color';
    head6.innerHTML = 'Eye color';
    head7.innerHTML = 'Birth year';
    head8.innerHTML = 'Gender';
}


function addGender(cell8, residentData) {
    let icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-lg');
    icon.classList.add('centered-icon');

    if (residentData['gender'] === 'female') {
        icon.classList.add('fa-venus');
        icon.title = "female";
        cell8.appendChild(icon);
    } else if (residentData['gender'] === 'male') {
        icon.classList.add('fa-mars');
        icon.title = "male";
        cell8.appendChild(icon);
    } else {
        cell8.innerHTML = residentData['gender'];
        cell8.classList.add('centered-text');
    }

}

function addKgToMass(cell3, residentData) {
    if (residentData['mass'] === "unknown") {
        cell3.innerHTML = residentData['mass'];
    } else {
        cell3.innerHTML = residentData['mass'] + ' kg';
    }
}

function convertHeightToMeters(cell2, residentData) {
    if (residentData['height'] === "unknown") {
        cell2.innerHTML = residentData['height'];
    } else {
        let height = parseInt(residentData['height']) / 100;
        cell2.innerHTML = height.toString() + ' m';
    }
}


function addDataToCellsAtResidentPage(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, residentData) {
    cell1.innerHTML = residentData['name'];
    convertHeightToMeters(cell2, residentData);
    addKgToMass(cell3, residentData);
    cell4.innerHTML = residentData['hair_color'];
    cell5.innerHTML = residentData['skin_color'];
    cell6.innerHTML = residentData['eye_color'];
    cell7.innerHTML = residentData['birth_year'];
    addGender(cell8, residentData);
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

    insertResidentHeaders();

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
                addDataToCellsAtResidentPage(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, residentData);
            }
        });
    }
}


function closeModal() {
    let modalCloseButton = document.getElementById('close-modal');
    let numberOfResidents = parseInt(modalCloseButton.dataset.numberofresidents);

    let table = document.getElementById('residents');

    for (let i = 1; i <= numberOfResidents + 1; i++) {
        table.childNodes[1].childNodes[0].remove();
    }

    let modal = document.getElementById('resident-container');
    modal.style.display = 'none';
}


function openVoteStatistics() {
    let modal = document.getElementById('votes-container');
    modal.style.display = 'block';

    let modalCloseButtonOne = document.getElementById('close-votes');
    let modalCloseButtonTwo = document.getElementById('close-votes-button');
    modalCloseButtonOne.addEventListener('click', closeVoteStatistics);
    modalCloseButtonTwo.addEventListener('click', closeVoteStatistics);

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://127.0.0.1:5000/get-vote",
        success: function (response) {
            console.log(response);
            let table = document.getElementById('votes');
            let voted_planets = response;
            table.dataset.votes = voted_planets.length;

            let row = table.insertRow(0);

            let head1 = row.insertCell(0);
            let head2 = row.insertCell(1);
            head1.innerHTML = 'Planet name';
            head2.innerHTML = 'Received votes';

            for (let planet of voted_planets) {
                let row = table.insertRow(-1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);

                cell1.innerHTML = planet['planet_name'];
                cell2.innerHTML = planet['count'];
            }
        }
    });
}

function closeVoteStatistics() {
    let table = document.getElementById('votes');
    let elements = parseInt(table.dataset.votes);

    for (let i = 1; i <= elements + 1; i++) {
        table.childNodes[1].childNodes[0].remove();
    }

    let modal = document.getElementById('votes-container');
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

    let voteStatistics = document.getElementById('vote-stats');
    voteStatistics.addEventListener('click', openVoteStatistics);
}
