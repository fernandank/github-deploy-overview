
let searchBox = document.getElementById("formSubmit")
searchBox.addEventListener('submit', function (event) {
    event.preventDefault();
    const repoName = document.getElementById('reponame')
    const GitHubUser = document.getElementById('GitHubUser')
    console.log(repoName)

    fetch(`https://api.github.com/repos/${GitHubUser.value}/${repoName.value}/commits`)
        .then(response => response.json())
        .then(data => {
            // Extract commit information
            const commitData = [];
            for (const commit of data) {
                try {
                    const commitDate = commit.commit.committer.date.split("T")[0];
                    const authorLogin = commit.author.login;
                    const commitURL = commit.html_url;
                    commitData.push({ date: commitDate, author: authorLogin, commitURL: commitURL });

                } catch {
                    const commitDate = commit.commit.committer.date.split("T")[0];
                    const authorLogin = commit.commit.author.name;
                    const commitURL = commit.parents.html_url;
                    commitData.push({ date: commitDate, author: authorLogin, commitURL: commitURL });

                }
            }

            // Get unique dates and author logins
            const uniqueDates = [...new Set(commitData.map(commit => commit.date))];
            uniqueDates.sort();
            const uniqueAuthors = [...new Set(commitData.map(commit => commit.author))];

            // Create table body
            const tableBody = document.querySelector("#commitTable tbody");
            const tableHead = document.querySelector("#commitTable thead").getElementsByTagName("tr")[0]



            // Calculate sum of commits
            const commitSums = {};
            for (const commit of commitData) {
                if (!(commit.date in commitSums)) {
                    commitSums[commit.date] = {};
                }
                if (!(commit.author in commitSums[commit.date])) {
                    commitSums[commit.date][commit.author] = 0;
                }
                commitSums[commit.date][commit.author] += 1;
            }




            // add header
            function AddHeader() {
                for (const date of uniqueDates) {
                    const cell = document.createElement("th");
                    cell.textContent = date;
                    tableHead.appendChild(cell);
                }
            }
            AddHeader()

            // Populate table with commit sums
            function PopulateTable() {
                for (const author of uniqueAuthors) {
                    const row = document.createElement("tr");
                    const authorCell = document.createElement("td");
                    authorCell.textContent = author;
                    row.appendChild(authorCell);

                    for (const date of uniqueDates) {
                        const commitsCount = commitSums[date]?.[author] || 0;
                        const cell = document.createElement("td");
                        cell.textContent = commitsCount;
                        row.appendChild(cell);
                    }

                    tableBody.appendChild(row);
                }
            }
            PopulateTable();

            // Event listener for commit count cells
            tableBody.addEventListener('click', function (event) {
                const target = event.target;

                // Check if the clicked element is a commit count cell
                if (target.tagName === 'TD') {
                    const columnIndex = Array.from(target.parentNode.children).indexOf(target);
                    const selectedDate = uniqueDates[columnIndex - 1]; // Subtract 1 to account for the author column

                    // Get the author from the clicked row
                    const rowIndex = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);
                    const selectedAuthor = uniqueAuthors[rowIndex];

                    // Filter commits for the selected date and author
                    const selectedCommits = commitData.filter(commit => commit.date === selectedDate && commit.author === selectedAuthor);

                    // Display the list of commit URLs for the selected date and author
                    displayCommitURLs(selectedCommits);
                }
            });

            function displayCommitURLs(commits, commitURL) {
                // Clear any existing commit list
                const commitListContainer = document.getElementById('commitListContainer');
                commitListContainer.innerHTML = '';

                // Create the list element
                const commitList = document.createElement('ul');

                // Add each commit URL as a list item
                commits.forEach(commitURL => {
                    const listItem = document.createElement('li');
                    // const commitURL = commit.html_url;
                    const link = document.createElement('a');
                    if (commitURL.commitURL === undefined) {
                        textContent = 'this is the forked repo origin, no commits to show';
                        alert(textContent);
                        location.reload();
                    } else {
                        link.href = commitURL.commitURL;
                        link.textContent = commitURL.commitURL;
                        listItem.appendChild(link);
                        commitList.appendChild(listItem);
                    }

                });

                // Append the list element to the commitListContainer
                commitListContainer.appendChild(commitList);
            }
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
})