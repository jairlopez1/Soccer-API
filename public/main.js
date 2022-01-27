window.addEventListener("DOMContentLoaded", function() {

    document.getElementById("createForm").style.display = "none";
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("deleteForm").style.display = "none";
    document.getElementById("findByIdForm").style.display = "none";
    document.getElementById("findByNameForm").style.display = "none";


    document.getElementById("selectAction").addEventListener("change", selectForm);
    document.getElementById("getAllBTN").addEventListener("click", getAllTeams);
    document.getElementById("createBTN").addEventListener("click", insertTeam);
    document.getElementById("findNameBTN").addEventListener("click", getTeamByName);
    document.getElementById("findIDBTN").addEventListener("click", getTeamByID);
    document.getElementById("updateBTN").addEventListener("click", updateTeam);
    document.getElementById("deleteBTN").addEventListener("click", deleteTeam);

    function selectForm() {
        let action = document.getElementById("selectAction").value;

        if (action == "displayById") {
            document.getElementById("createForm").style.display = "none";
            document.getElementById("updateForm").style.display = "none";
            document.getElementById("deleteForm").style.display = "none";
            document.getElementById("findByIdForm").style.display = "block";
            document.getElementById("findByNameForm").style.display = "none";
        } else if (action == "displayByName") {
            document.getElementById("createForm").style.display = "none";
            document.getElementById("updateForm").style.display = "none";
            document.getElementById("deleteForm").style.display = "none";
            document.getElementById("findByIdForm").style.display = "none";
            document.getElementById("findByNameForm").style.display = "block";
        } else if (action == "update") {
            document.getElementById("createForm").style.display = "none";
            document.getElementById("updateForm").style.display = "block";
            document.getElementById("deleteForm").style.display = "none";
            document.getElementById("findByIdForm").style.display = "none";
            document.getElementById("findByNameForm").style.display = "none";
        } else if (action == "delete") {
            document.getElementById("createForm").style.display = "none";
            document.getElementById("updateForm").style.display = "none";
            document.getElementById("deleteForm").style.display = "block";
            document.getElementById("findByIdForm").style.display = "none";
            document.getElementById("findByNameForm").style.display = "none";
        } else if (action == "create") {
            document.getElementById("createForm").style.display = "block";
            document.getElementById("updateForm").style.display = "none";
            document.getElementById("deleteForm").style.display = "none";
            document.getElementById("findByIdForm").style.display = "none";
            document.getElementById("findByNameForm").style.display = "none";
        }
    }

    async function getAllTeams() {
        var html = "<table><tr> <th></th> <th>ID</th> <th>Name</th> <th>Country</th> <th>Trophies</th> <th>Players</th></tr>";
        const response = await fetch('/api/teams/find');
        const teams = await response.json();
        for (const t of teams) {
            html += `<tr><th><a href="edit"></th><th>${t._id}</th> <th>${t.name}</th> <th>${t.country}</th> <th>${t.trophies}</th><th>`;
            var players = t.players;
            html += '<ul>'
            players.forEach(p => html += `<li>${p}</li>`);
        }

        html += '</ul></th></tr>';
        document.querySelector("#teamsDiv").innerHTML = html;

    }

    async function insertTeam() {

        const team = {
            _id: document.getElementById("createId").value,
            name: document.getElementById("name").value,
            country: document.getElementById("country").value,
            trophies: document.getElementById("trophies").value,
            players: document.getElementById("players").value.split("\n")
        };

        const response = await fetch('/api/teams/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
        });

        // ok is true if status is 200-299
        if (response.ok) {
            const team = await response.json();
            console.log('Added team with ID ' + team.id);
        } else {
            const err = await response.json();
            console.log('Error:', err);
        }
    }

    async function getTeamByName() {
        var name = document.getElementById("nameSearch").value;
        var html = "<table><tr> <th>ID</th> <th>Name</th> <th>Country</th> <th>Trophies</th> <th>Players</th></tr>";
        const response = await fetch('/api/teams/find?name=' + name);
        console.log(response);
        const teams = await response.json();
        for (const t of teams) {
            html += `<tr><th>${t._id}</th> <th>${t.name}</th> <th>${t.country}</th> <th>${t.trophies}</th><th>`;
            var players = t.players;
            html += '<ul>'
            players.forEach(p => html += `<li>${p}</li>`);
        }

        html += '</ul></th></tr>';
        document.querySelector("#teamsDiv").innerHTML = html;
    }

    async function getTeamByID() {
        var id = document.getElementById("IDSearch").value;
        var html = "<table><tr> <th>ID</th> <th>Name</th> <th>Country</th> <th>Trophies</th> <th>Players</th></tr>";
        const response = await fetch('/api/teams/' + id);
        console.log(response);
        const t = await response.json();
        html += `<tr><th>${t._id}</th> <th>${t.name}</th> <th>${t.country}</th> <th>${t.trophies}</th><th>`;
        var players = t.players;
        html += '<ul>'
        players.forEach(p => html += `<li>${p}</li>`);

        html += '</ul></th></tr>';
        document.querySelector("#teamsDiv").innerHTML = html;

    }

    async function deleteTeam() {
        var id = document.getElementById("deleteID").value;
        const response = await fetch('/api/teams/' + id, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Delete successful');
        } else {
            const err = await response.json();
            console.log('Error:', err);
        }
    }

    async function updateTeam() {
        console.log("HERE");
        var id = document.getElementById("updateID").value;
        console.log(id);

        const team = {
            name: document.getElementById("updateName").value,
            country: document.getElementById("updateCountry").value,
            trophies: document.getElementById("updateTrophies").value,
            players: document.getElementById("updatePlayers").value.split("\n")
        };

        console.log(team);

        const response = await fetch('/api/teams/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
        });

        if (response.ok) {
            console.log('Update successful');
        } else {
            const err = await response.json();
            console.log('Error:', err);
        }
    }
});