fetch("https://api.github.com/repos/fernandank/smart-brain/commits")
    .then(response => response.json())
    .then(data => {
        // Extract commit information
        const commitData = [];
        for (const commit of data) {
            try {
                const commitDate = commit.commit.committer.date.split("T")[0];
                const authorLogin = commit.author.login;
                commitData.push({ date: commitDate, author: authorLogin });
            } catch {
                const commitDate = commit.commit.committer.date.split("T")[0];
                const authorLogin = commit.commit.author.name;
                commitData.push({ date: commitDate, author: authorLogin });
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
        for (const date of uniqueDates) {
            const cell = document.createElement("th");
            cell.textContent = date;
            tableHead.appendChild(cell);
        }

        // Populate table with commit sums


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
    })
    .catch(error => {
        console.log("Error fetching data:", error);
    });
