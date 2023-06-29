//
//                      functions 
// 


// this func add header to the table with unique dates of commits
function AddHeader(uniqueDates) {
    const tableHead = document.createElement("thead");
    const index = document.createElement("th")
    index.textContent = 'author/date'
    tableHead.appendChild(index);
    for (const date of uniqueDates) {
        const cell = document.createElement("th");
        cell.textContent = date;
        tableHead.appendChild(cell);
    }
    return tableHead;
}

// Populate table with the sums of the commits per day per author
function PopulateTable(commitSums, uniqueAuthors, uniqueDates) {
    const tableBody = document.createElement("tbody")
    tableBody.setAttribute("id", "commitListContainer")
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
    return tableBody;
}

// Display the urls of the commits of a certain day/author when the cell is clicked
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
        }
        else {
            link.href = commitURL.commitURL;
            link.textContent = commitURL.commitURL;
            listItem.appendChild(link);
            commitList.appendChild(listItem);
        }
    });

    // Append the list element to the commitListContainer
    commitListContainer.appendChild(commitList);
}

//Calculate sum of commits
function CalculateCommitSums(commitData) {
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
    return commitSums;
}

//
//                             main
//

// listen to the answers from html input to fetch from the github API
let searchBox = document.getElementById("formSubmit")
searchBox.addEventListener('submit', function (event) {
    event.preventDefault();
    const repoName = document.getElementById('reponame')
    const GitHubUser = document.getElementById('GitHubUser')


    fetch(`https://api.github.com/repos/${GitHubUser.value}/${repoName.value}/commits`)
        .then(response => response.json())
        .then(data => {
            // Extract commit information, some json returns with empty infos for commits from original repositories, so we try
            //to get some equivalent data to show
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

            // Get unique dates and author logins to display on tables
            const uniqueDates = [...new Set(commitData.map(commit => commit.date))];
            uniqueDates.sort();
            const uniqueAuthors = [...new Set(commitData.map(commit => commit.author))];

            // Create table body and reference the html
            const table = document.querySelector("#commitTable");
            const tableBody = document.querySelector("#commitTable tbody")
            const tableHead = document.querySelector("#commitTable thead")

            //Calculate sum of commits  
            const commitSums = CalculateCommitSums(commitData);



            // To prevent multiple tables and headers to append when button is pressed
            table.removeChild(tableHead);
            const newTableHead = AddHeader(uniqueDates)
            table.appendChild(newTableHead);

            table.removeChild(tableBody);
            const newTableBody = PopulateTable(commitSums, uniqueAuthors, uniqueDates);
            table.appendChild(newTableBody);

            // Event listener for commit count cells to show list of commits of the day
            newTableBody.addEventListener('click', function (event) {
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
        })
        .catch(TypeError => {
            alert('this repository doesn\'t exist, try again!');
        });
})

