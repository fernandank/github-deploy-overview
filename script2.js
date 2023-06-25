const ul = document.querySelector('ul')

function getApiGitHub() {
    fetch('https://api.github.com/repos/fernandank/smart-brain/commits')
        .then(async res => {

            if (!res.ok) {
                throw new Error(res.status)
            }

            var data = await res.json()

            data.map(item => {
                let li = document.createElement('li')

                li.innerHTML = `
        <strong>${item.author.login}</strong>
        <span>URL: ${item.url}</span>
        <span>Data Criação: 
          ${Intl.DateTimeFormat('pt-BR')
                        .format(new Date(item.commit.author.date))}
        </span>
      `
                ul.appendChild(li)

            })

        }).catch(e => console.log(e))
}

getApiGitHub()