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
![alt text](https://freeimage.host/i/HPmaWjj)



## Future Improvements 
* The table is emptied When clicking on a cell with the value 0;
* the links for the commits shows in the first column of the table, I would rather show a cleaner list;
* For further developments, I would like to improve the experience by creating a react app. Because I relied a lot in the HTML tags I opted to deliver the project faster and working.
