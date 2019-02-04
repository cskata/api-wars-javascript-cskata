init();


function loadPlanetData() {
    const whichPage = document.getElementById('planets').dataset.page;
    const targetURL = `https://swapi.co/api/planets/?page=${whichPage}`;
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    prevButton.disabled = true;
    nextButton.disabled = true;


    $.ajax({
        type: "GET",
        dataType: "json",
        url: targetURL,
        success: function (response) {
            const table = document.getElementById('planets');
            const planets = response['results'];

            insertPlanetHeaders(table);

            for (const planet of planets) {
                const row = table.insertRow(-1);

                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6);
                const cell8 = row.insertCell(7);

                addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, 'planet-data');
                addDataToCellsAtMainPage(cell1, cell2, cell3, cell4, cell5, cell6, planet);

                addResidentsButton(cell7, planet);
                addVoteButton(cell8, planet);

                prevButton.disabled = false;
                nextButton.disabled = false;
                disableButtonIfNecessary(whichPage);

            }
        }
    });

}


function insertPlanetHeaders(table) {
    const header = table.insertRow(0);

    const head1 = header.insertCell(0);
    const head2 = header.insertCell(1);
    const head3 = header.insertCell(2);
    const head4 = header.insertCell(3);
    const head5 = header.insertCell(4);
    const head6 = header.insertCell(5);
    const head7 = header.insertCell(6);
    const head8 = header.insertCell(7);

    head1.innerHTML = 'Name';
    head2.innerHTML = 'Diameter';
    head3.innerHTML = 'Climate';
    head4.innerHTML = 'Terrain';
    head5.innerHTML = 'Surface Waters Percentage';
    head6.innerHTML = 'Population';
    head7.innerHTML = 'Residents';
    head8.innerHTML = '';

    addClassToCells(head1, head2, head3, head4, head5, head6, head7, head8, 'planet-header');
}


function disableButtonIfNecessary(whichPage) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

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
    } else {
        const residentBtn = document.createElement('button');

        const noOfResidents = planet['residents'].length.toString();
        const fullResidentTxt = `${noOfResidents} resident(s)`;
        const residentBtnTxt = document.createTextNode(fullResidentTxt);
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


function addVoteButton(cell8, planet) {
    const voteBtn = document.createElement('button');
    voteBtn.classList.add('btn');
    voteBtn.classList.add('btn-secondary');

    const text = document.createTextNode('Vote');
    voteBtn.appendChild(text);
    cell8.appendChild(voteBtn);

    const datasetContainer = document.getElementById('all-content');

    if (datasetContainer.dataset.login === "") {
        voteBtn.style.visibility = "hidden";
    }

    const planetId = (planet['url'].split("/"))[5];
    voteBtn.dataset.planetid = planetId;
    voteBtn.dataset.planetname = planet['name'];

    voteBtn.addEventListener('click', saveVote);
}


function saveVote() {
    const planetId = parseInt(event.target.dataset.planetid);
    const planetName = event.target.dataset.planetname;
    const userId = parseInt(document.getElementById('all-content').dataset.userid);
    const currentDate = new Date();
    const submissionTime =
        currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + ' ' +
        currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

    const data = {
        planet_id: planetId,
        planet_name: planetName,
        user_id: userId,
        submission_time: submissionTime
    };

    $.ajax({
        type: "POST",
        url: "/voting",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data)
    });

    alert(`Your vote for ${planetName} is saved.`);
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
        planet['diameter'] = `${planet['diameter']} km`;
    }

    cell2.innerHTML = planet['diameter'];
    cell3.innerHTML = planet['climate'];
    cell4.innerHTML = planet['terrain'];

    if (planet['surface_water'] !== 'unknown') {
        planet['surface_water'] = `${planet['surface_water']}%`;
    }

    cell5.innerHTML = planet['surface_water'];

    if (planet['population'] !== 'unknown') {
        planet['population'] = planet['population'].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        planet['population'] = `${planet['population']} people`;
    }

    cell6.innerHTML = planet['population'];
}


function switchPage() {
    const currentPage = document.getElementById('planets');
    const currentPageNo = parseInt(document.getElementById('planets').dataset.page);
    const step = parseInt(event.target.dataset.value);    //direction is stored in button's dataset (1/-1)
    const nextPage = currentPageNo + step;
    currentPage.dataset.page = nextPage.toString();

    deleteData(currentPage);
    loadPlanetData();
}


function deleteData(table) {
    const planetTableLengthWithHeader = table.childNodes[0].childNodes.length;

    for (let i = 0; i < planetTableLengthWithHeader; i++) {
        table.childNodes[0].childNodes[0].remove();
    }
}


function insertResidentHeaders() {
    const table = document.getElementById('residents');

    const header = table.insertRow(0);

    const head1 = header.insertCell(0);
    const head2 = header.insertCell(1);
    const head3 = header.insertCell(2);
    const head4 = header.insertCell(3);
    const head5 = header.insertCell(4);
    const head6 = header.insertCell(5);
    const head7 = header.insertCell(6);
    const head8 = header.insertCell(7);

    addClassToCells(head1, head2, head3, head4, head5, head6, head7, head8, 'resident-header');

    head1.innerHTML = 'Name';
    head2.innerHTML = 'Height';
    head3.innerHTML = 'Mass';
    head4.innerHTML = 'Skin color';
    head5.innerHTML = 'Hair color';
    head6.innerHTML = 'Eye color';
    head7.innerHTML = 'Birth year';
    head8.innerHTML = 'Gender';
}


function addGender(cell8, residentData) {
    const icon = document.createElement('i');
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
        const height = parseInt(residentData['height']) / 100;
        cell2.innerHTML = height.toString() + ' m';
    }
}


function addDataToCellsAtResidentPage(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, residentData) {
    cell1.innerHTML = residentData['name'];
    convertHeightToMeters(cell2, residentData);
    addKgToMass(cell3, residentData);
    cell4.innerHTML = residentData['skin_color'];
    cell5.innerHTML = residentData['hair_color'];
    cell6.innerHTML = residentData['eye_color'];
    cell7.innerHTML = residentData['birth_year'];
    addGender(cell8, residentData);
}

function openModal() {
    const modal = document.getElementById('resident-container');
    modal.style.display = 'block';

    const planet = event.target.dataset.planet;

    const title = document.getElementById('which-planet');
    title.innerHTML = 'Residents of ' + planet;

    const numberOfResidents = event.target.dataset.numberofresidents;
    const modalCloseButton = document.getElementById('close-modal');
    modalCloseButton.dataset.numberofresidents = numberOfResidents;

    insertResidentHeaders();

    const residentsOrig = event.target.dataset.residents;
    const residents = residentsOrig.split(',');

    for (const resident of residents) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: resident,
            success: function (residentData) {
                const table = document.getElementById('residents');

                const row = table.insertRow(-1);

                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6);
                const cell8 = row.insertCell(7);

                addClassToCells(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, 'resident-data');
                addDataToCellsAtResidentPage(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, residentData);
            }
        });
    }
}


function closeModal() {
    const modalCloseButton = document.getElementById('close-modal');
    const numberOfResidents = parseInt(modalCloseButton.dataset.numberofresidents);

    const table = document.getElementById('residents');

    for (let i = 1; i <= numberOfResidents + 1; i++) {
        table.childNodes[0].childNodes[0].remove();
    }

    const modal = document.getElementById('resident-container');
    modal.style.display = 'none';
}


function openVoteStatistics() {
    const modal = document.getElementById('votes-container');
    modal.style.display = 'block';

    const modalCloseButtonOne = document.getElementById('close-votes');
    modalCloseButtonOne.addEventListener('click', closeVoteStatistics);

    const modalCloseButtonTwo = document.getElementById('close-votes-button');
    modalCloseButtonTwo.addEventListener('click', closeVoteStatistics);

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/voting",
        success: function (response) {
            listVotedPlanets(response);
        }
    });
}


function listVotedPlanets(response) {
    const table = document.getElementById('votes');
    const voted_planets = response;
    table.dataset.votes = voted_planets.length;

    const row = table.insertRow(0);

    const head1 = row.insertCell(0);
    const head2 = row.insertCell(1);

    head1.innerHTML = 'Planet name';
    head2.innerHTML = 'Received votes';

    head1.classList.add('vote-header');
    head2.classList.add('vote-header');

    for (const planet of voted_planets) {
        const row = table.insertRow(-1);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.innerHTML = planet['planet_name'];
        cell2.innerHTML = planet['count'];
    }
}

function closeVoteStatistics() {
    const table = document.getElementById('votes');
    const elements = parseInt(table.dataset.votes);

    for (let i = 1; i <= elements + 1; i++) {
        table.childNodes[0].childNodes[0].remove();
    }

    const modal = document.getElementById('votes-container');
    modal.style.display = 'none';
}


function init() {
    loadPlanetData();

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', switchPage);

    const prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', switchPage);

    const modalCloseButtonTopRight = document.getElementById('close-modal');
    modalCloseButtonTopRight.addEventListener('click', closeModal);

    const modalCloseButtonTopLeft = document.getElementById('close-button');
    modalCloseButtonTopLeft.addEventListener('click', closeModal);

    const isUserLoggedIn = document.getElementById('all-content').dataset.login;
    if (isUserLoggedIn === 'True') {
        const voteStatistics = document.getElementById('vote-stats');
        voteStatistics.addEventListener('click', openVoteStatistics);
    }
}
