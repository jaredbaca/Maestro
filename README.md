<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<h1 align="center">Maestro</h1>

  <p align="center">
    Maestro is a scheduling software designed for reserving all manner of music spaces - from rehearsal rooms and practice rooms to recording studios and production suites. 
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
  </p>
</div>

<img width="1295" alt="Screen Shot 2024-02-28 at 9 24 46 PM" src="https://github.com/jaredbaca/SchedulingSite/assets/110132943/1ede156c-33c9-430d-89bf-dedf8380c4cd">
<img width="637" alt="Screen Shot 2024-02-28 at 7 11 24 PM" src="https://github.com/jaredbaca/SchedulingSite/assets/110132943/4bf4db77-f5b3-4d12-a540-4a60aa251357">
<img width="1469" alt="Screen Shot 2024-02-28 at 11 15 08 AM" src="https://github.com/jaredbaca/SchedulingSite/assets/110132943/a6dac386-5551-4962-914c-3e5bf46b3873">


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Resources</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The application contains a database of students, locations, and scheduled events. The web interface allows for viewing current bookings, reserving a space, and provides an admin view for editing and deleting events. Maestro enforces basic scheduling constraints, preventing scheduling conflicts and checking student ID numbers against the student information database.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<ul>
	<li><a href="https://nodejs.org/en">Node.js</a></li>
	<li><a href="https://expressjs.com">Express</a></li>
	<li><a href="https://www.mysql.com">MySQL</a></li>
	<li><a href="https://react.dev">React</a></li>
	<li><a href="https://getbootstrap.com/">Bootstrap</a></li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Installation

Working with Maestro in development mode requires Node.js and npm (Node Package Manager). See information for installing both here. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Once Node.js and npm have been installed, all additional dependencies can be installed by running the **npm install** terminal command in the root directory.

### Setting up the MySQL database

This project requires connecting to an existing MySQL database. The db_init file will create the necessary tables along with primary and foreign keys, as well as populate the database with initial data. To do so, it must have a database name, host, and login credentials. These details can be added to the .env file for use in the rest of the application. If forking this repository on GitHub, the .env file is not included for obvious reasons. In that case, simply create a .env file and place it in the root directory.

The following variables should be replaced or added to the .env file:

MYSQL_USERNAME
MYSQL_PASSWORD
HOST
DB_PORT
DB_NAME

With the database created and the environment variables set, run the db_init.js file to populate the database. The db_init.js file will create the User, Location, and Event tables (if they do not already exist) and populate those tables with dummy data (if they are empty). 

### Launching in Development Mode

1.	To launch the backend, open a terminal and navigate to the server directory, then run the following command:

node index.js

This will launch the Node.js server on localhost:4000

2.	To launch the frontend, cd into the frontend directory in a separate terminal window and run the command:

npm start
	
This will launch the React development server on localhost:3000. If a browser does not open automatically, manually open a browser and go to localhost:3000 to view the application.

The React frontend forwards all API requests to the Node.js server on port 4000. This is set with the “proxy” setting in the React package.json file. To make calls to the API directly, such as with Postman or in the browser, make sure to use port 4000. 
Usage



<!-- USAGE EXAMPLES -->
## Usage

The usage of the application should be straightforward. The navigation bar contains links to the master calendar, the booking form, and the admin page (this is included for convenience at the development stage, but will be removed in production). The booking form allows the user to select a date and time, a location from the dropdown list of available locations (which pulls from the database), and enter their First, Last, and Student ID. Of these, the Student ID is the only one that is required, as it pulls all relevant student data from the database.
	Backend validation provides a check that the dates are valid (end date is after start date, time is not outside available hours of 9am – 11:59pm, and most importantly that the selected location is not already booked for the desired time). These checks happen prior to making any database queries. If any of these validation checks fail, the user is presented with an error message and remains on the booking page. If the request is valid, the user receives a success message and is redirected to the home page (master calendar). 
	The admin page looks similar to the master calendar, but the events are clickable. Clicking an event brings up the event details form, which displays event information. The admin can update the dates, location, and Student ID number. The student data at the bottom of the form is read-only, and is pulled from the database based on Student ID. This form runs the same validation as the event booking form. At the very bottom of the form, the admin has the ability to delete the event, which removes it from the database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

### Features to be Added In the Short Term
•	More fleshed out admin page with the ability to edit, add, and delete both users and locations.
•	A “Room Type” field in the booking form that allows the user to filter locations by type (Studio, Ensemble Room, etc.). This will be more necessary as the number of locations grows.
•	More granular booking restrictions for individual spaces, such as that a student be in a specific major, instrument, or semester level.
•	Additional UI features such as forward/back arrows for the date, details available when hovering over calendar events, and confirmation prompt before deleting an event.
•	A user-facing event details page that is read-only

### Long Term Desirable Features
•	User accounts
•	Equipment checkout options 
•	Accompanying mobile app



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Jared Baca - jaredbacamusic@gmail.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## References

* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Forms in React with Hooks](https://javascript.plainenglish.io/forms-in-react-with-hooks-809a3f38ed4)
* [Passing Props through Link in react-router](https://www.daggala.com/passing-props-through-link-in-react-router/)
* [Passing Data via Links in React: A Guide to Effective Data Transfer](https://medium.com/@hammadrao891/passing-data-via-links-in-react-a-guide-to-effective-data-transfer-1e0b030e2a12#:~:text=In%20React%20Router%2C%20we%20can,data%20we%20want%20to%20pass.)
* [Validating, Creating, and Styling React-Bootstrap Forms](https://clerk.com/blog/validate-create-style-react-bootstrap-forms)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Node.js]:https://img.shields.io/badge/Node.js-black
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

