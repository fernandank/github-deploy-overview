## Description
Visualize the commits logs from a GitHub repository by date and author. 

The table sums the commits for the day and author, click on the cells to see the commits URL.

In this project, I used JavaScript, HTML, and CSS to create the MVP for the solutions. The site is responsive and fast, however I still faced some challenges:

* When clicking in the search button, the table multiplied and appended to each other, it was fixed by creating a new table every time the buttom was clicked
* If the repository was forked, the data from the API doesn't have the same informations, so I needed to bring similar data to replace what I wanted to show. But it still doensn't have the url for the commits.



## How to run the Project
Just git clone the repository and open the index.html file

or you can check the deployed version here: https://main--beamish-mermaid-e31570.netlify.app/

Insert both name of owner of the repository and name of the repository and press Search.

You can find the information in the URL of the repository, for example: 
https://github.com/fernandank/smart-brain

In this case:

Repo Name: smart-brain

GitHub User: fernandank

eg.:
![alt text](https://iili.io/HPmaWjj.png)

## Architecture

### front
Both HTML and CSS were created to be responsible, the <script> tag is placed after the body to read the DOM files and make the application run faster.

### fetching API
The app starts fetching the GitHub API that returns a JSON with informations of commits from a repository, using the inputs 1. Name of the repository 2. GitHub user that owns the repository

### creating table
After receiving the json file, we create two different sets with unique dates and authors date will be the header of the table and the first column, consecutively. 

To create the table we reference the HTML file with querySelectors, then, we populate the table with the sum of commits of the day per author. In this step, it was important to remove and append a new table, so if the user click on the buttom multiple times, the table doesn't append in itself. 

### showing commits of the day
to be able to show the url from the commits of a specif day and author, we added an eventListener that append the commits url. There are cases of forked repos that the API doesn't bring the urls for the commits. To find the commits of a original repo, you just need to add it's information in a new search.


## Future Improvements 
* The table is emptied When clicking on a cell with the value 0;
* the links for the commits shows in the first column of the table, I would rather show a cleaner list;
* I've test the code with mocha and manually, but with more time and more complexicity added, I would like to run more testing.
* Most functions depends on attibutes created outside their scope
* For further developments, I would like to improve the experience by creating a react app. Because I relied a lot in the HTML tags I opted to deliver the project faster and working.
