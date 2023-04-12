# final-project

A full stack JavaScript solo project.

## Getting Started

---

### Use this template to create a new repo on your GitHub account

1. Click green `Use this template` button, select `Create a new repository`
    1. Under `Owner` select your username
    1. Give your repoitory a name
    1. (Optional) Add a description
    1. Leave repository as `Public`
    1. **DO NOT** Include all branches
    1. Click green `Create repository from template` button

---

### Clone Newly created repo into `lfz-code`

1. From your newly created repo on GitHub, click the green `<> Code` button, then copy **SSH** URL
1. Open `lfz-code`, click on blue `><` button in bottom left of `lfz-code`
    1. Select `Clone Repository in Container Volume...`
    1. Paste **SSH** URL for your repo, click `Clone git repository from URL`
1. Copy `.env.example` to `.env`
    ```
    cp server/.env.example server/.env
    ```

---

### Run and test full-stack project setup

#### Setup Server

1. Start your `server`:
    ```sh
    cd server
    npm install
    npm run dev
    ```

#### Setup Client

1. A React app has already been created for you. Start your `client` in a separate terminal:
    ```sh
    cd client
    npm install
    npm start
    ```
1. Take a minute to look over the code in `client/src/App.js` to get an idea of what it is doing.
1. Go to [http://localhost:3000](http://localhost:3000) in your browser. You should see the message from the server below the React logo, and in the browsers console.
    ![](md.assets/client-server.png)
1. If you see the message from the server in your browser you are good to go, your client and server are communicating.

#### Setup Database

1. In your browser navigate to the site you used for your database design.
1. Export your database as PostgreSQL, this should generate the SQL code for creating your database tables.
    - Reach out to an instructor if you have any issues with this step
1. Copy the generated SQL code and paste it into `database/schema.sql` below the preexisting sql code in the file. The end result should look something like: *(You will likely have more tables)*
    ```SQL
    set client_min_messages to warning;

    -- DANGER: this is NOT how to do it in the real world.
    -- `drop schema` INSTANTLY ERASES EVERYTHING.
    drop schema "public" cascade;

    create schema "public";

    create table "public"."todos" (
        "todoId"      serial,
        "task"        text           not null,
        "isCompleted" boolean        not null,
        "createdAt"   timestamptz(6) not null default now(),
        "updatedAt"   timestamptz(6) not null default now(),
        primary key ("todoId")
    );
    ```
    - **NOTE:** Database design websites do not do a perfect job of generating SQL, so you may need to make some adjustments to your SQL for it to work correctly. Reach out to your instructor if you need assistance.
1. Now that we have a schema we can create our database.
    1. In a separate terminal, start PostgreSQL
        ```
        sudo service postgresql start
        ```
    1. Create database (replace `name-of-database` with a name of your choosing)
        ```
        createdb name-of-database
        ```
    1. In the `.env` file, in the `DATABASE_URL` replace `changeMe` with the name of your database, from the last step
    1. From the database directory, run `npm run db:import` to create your tables
1. Start pgweb to view your database, and verify your tables were created successfully
    ```
    pgweb --db name-of-database
    ```
1. In pgweb you should see your database and tables; if you do not, stop here and reach out to an instructor for help
1. At this point your database is setup and you are good to start using it. However there is no data in your database, which isn't necessarily a bad thing, but if you want some starting data in your database you need to add insert statements into the `database/data.sql` file. You can add whatever starting data you need/want. Here is an example:
    ```SQL
    insert into "todos" ("task", "isCompleted")
    values
        ('Learn to code', false),
        ('Build projects', false),
        ('Get a job', false);
    ```
1. After any changes to `database/schema.sql` or `database/data.sql` re-run the `npm run db:import` command to update your database. Use pgweb to verify your changes were successfully applied
    ![](md.assets/pgweb-with-data.png)

---

### Available `npm` commands explained

Below is an explanation of all included `npm` commands in the root `package.json`. These are primarily used for deployment purposes and should not be necessary for development.

1. `start`
    - The `start` script starts the Node server in `production` mode, without any file watchers.
1. `build`
    - The `build` script executes `npm run build` in the context of the `client` folder. This builds your React app for production. This is used during deployment, and not commonly needed during development.
1. `db:import`
    - The `db:import` script executes `npm db:import` in the context of the `database` folder. This executes the `database/schema.sql` and `database/data.sql` files to build and populate your database.
1. Not directly used by developer
    1. `preinstall`
        - The `preinstall` script is automatically run when you run `npm install`. It is executed before the dependencies are installed. Specifically for this project the `preinstall` script is used to install the `client`  and `server` dependencies. This is important for deployment purposes, to ensure the dependencies get installed onto the deployment server.
    1. `prepare`
        - The `prepare` script is similar to `preinstall` – it is executed before `preinstall`, and `install`. Specifically for this project it is used to install `husky`.

---

## Deployment

Once you are ready, deployment instructions can be found [HERE](https://lms.learningfuze.com/code-guides/Learning-Fuze/curriculum/heroku-deployment)
