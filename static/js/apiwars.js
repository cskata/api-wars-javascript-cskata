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
            let row = table.insertRow(-1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            let cell8 = row.insertCell(7);

            cell1.innerHTML = planet['name'];
            cell2.innerHTML = planet['diameter'];
            cell3.innerHTML = planet['climate'];
            cell4.innerHTML = planet['terrain'];
            cell5.innerHTML = planet['surface_water'] + '%';
            cell6.innerHTML = planet['population'];
            cell7.innerHTML = planet['residents'].length;

            let votebtn = document.createElement('button');
            let text = document.createTextNode('Vote');
            votebtn.appendChild(text);
            cell8.appendChild(votebtn);
        }


        console.log(planets[0])
    }
});
