document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('usernameInput').value;
    
    // Clear previous results
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('reposList').innerHTML = '';

    // Make a request to the GitHub User Search Endpoint
    fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(data => {
            const users = data.items;
            
            // Display user search results
            users.forEach(user => {
                displayUser(user);
            });
        })
        .catch(error => console.error('Error:', error));
});

function displayUser(user) {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    
    userCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login} Avatar">
        <span>${user.login}</span>
        <a href="${user.html_url}" target="_blank">Profile</a>
    `;

    userCard.addEventListener('click', function () {
        // Make a request to the User Repos Endpoint
        fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(repos => {
                // Display repositories for the selected user
                displayRepos(repos);
            })
            .catch(error => console.error('Error:', error));
    });

    document.getElementById('searchResults').appendChild(userCard);
}

function displayRepos(repos) {
    const reposList = document.getElementById('reposList');
    reposList.innerHTML = '<h2>Repositories:</h2>';

    if (repos.length === 0) {
        reposList.innerHTML += '<p>No repositories found.</p>';
    } else {
        const ul = document.createElement('ul');

        repos.forEach(repo => {
            const li = document.createElement('li');
            li.textContent = repo.name;
            ul.appendChild(li);
        });

        reposList.appendChild(ul);
    }
}
