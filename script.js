const user = 'fernandank';
const repo = 'smart-brain';
const commitMessages = [];
// dia
// autor
// qtd (expande para lista de commits)
const commitsPerDay = {}
const ul = document.querySelector('ul')

// 1 -> N M
// { 'dia' -> {'author' -> [], 'comm' -> [] }}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
// const d = Date.parse("2023-06-12T13:48:20Z") -> 1686577700000

fetch(`https://api.github.com/repos/${user}/${repo}/commits`)
    .then(res => res.json())
    .then(json => {
        json.forEach(data => {
            // const truncatedDate = node.commit.author.date.split("T")[0];
            const createdAt = (data.commit.author.date)
            const dateFormatted = new Date(createdAt)
            // const dateFormatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
            const author = (data.author.login)
            const url = data.url;
            console.log(dateFormatted)
            console.log(url)
            console.log(author)







            // // Ainda nao tem nenhum commit pra essa data no objeto
            // if (!commitsPerDay.keys().include(dateFormatted)) {
            //     commitsPerDay[dateFormatted] = {
            //         authors: [],
            //         commits: []
            //     }
            // }

            // commitsPerDay[dateFormatted].authors.append(data.commit.author);
            // commitsPerDay[dateFormatted].commits.append(data.commit);
        });
    });


