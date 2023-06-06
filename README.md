# OverLook

## A full stack web application for managers who want to keep track of their workers when they are not around.

## Why I Built This
As someone who love to be organized I had the great idea to make something to help manage your employees. I had a difficult time sending tasks out via phone calls and text. It always felt like I would never get a response in a way that satisfied my employer. This application was created for managers to send requests to employees and for them to get an instant response as to how and if the task can be completed in a short amount of time.
## Live Demo
<a href="overlook-fp.azurewebsites.net">Link to deployment hosted by Microsfot Azure</a>

## Preview
"fill in with gif later" 

## Technologies
Used React.js, Node.js PostgreSQL, CSS, HTML, Javascript

## Features
1. User can send requests to other users 
2. User can edit request and other members accounts 
3. User can delete any types of requests made 
4. User can sort through each item depending on how they want to sort 
5. User can log in as a manager and an employee 
6. User can log in as a leader and an employee 

## Stretch Features
1. User can view the status of completion in the request form created
2. User can create and send request to different groups of people. 

### System Requirements
- Node.js 14 or higher
- NPM 6 or higher
- PostgreSQL 13 or higer

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/Nathan-Chon/OverLook.git
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install --legacy-peer-deps
    ```

1. Import the database to PostgreSQL.

    ```shell
    createdb overlook
    sudo service postgresql start
    pgweb --db= overlook
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
