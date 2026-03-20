<h1>Test URL Shortening Service</h1>
<p>This project object to be a programming test for the company SizeBay, developed by candidate Tiago.</p>
<h3>Technologies used in the project</h3>
Typescript with Node.js<br>
Framework Express<br>
PostgreSQL for database<br>
Swagger for documentation<br>
Docker compose for containerization<br>
<h3>Ports used</h3>
5432 Database<br>
3000 Back-end application<br>
<h3>Example for testing the application</h3>
<h4>1° Clone the project</h4> 
<pre>
    git clone git@github.com:20100000/api_typescript_test.git<br/>
    cd api_typescript_test
</pre>
<h4>2° Download the image and start containers, MySQL, and Node.js.</h4>
<pre>
    docker-compose up --build
</pre>
check containers command.
<pre>docker ps</pre>
The command below in docker-compose.yml will create tables and add items.
<pre>volumes: - ./init.sql:/docker-entrypoint-initdb.d/init.sql</pre>
If that doesn't work, add it via the SGDB ex: DBeaver.<br>
Login:
<pre>
      B_HOST: localhost
      DB_PORT: 5432
      DB_USER: tiago
      DB_PASSWORD: tiago@123
      DB_NAME: sizeBay
</pre>
commands:
<pre>
    CREATE TABLE IF NOT EXISTS shortenURLs (
        id SERIAL PRIMARY KEY,
        url VARCHAR(150) UNIQUE NOT NULL UNIQUE,
        shortCode VARCHAR(150) NOT NULL UNIQUE,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL
    );
    CREATE TABLE IF NOT EXISTS statistics (
        id SERIAL PRIMARY KEY,
        shortCode VARCHAR(150) NOT NULL UNIQUE,
        accessCount INT NOT NULL,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL,
        CONSTRAINT fk_code
            FOREIGN KEY (shortCode)
            REFERENCES shortenURLs (shortCode)
    );
</pre>

<h4>3° View Swagger documentation</h4>
<pre>http://localhost:3000/api-docs/</pre>
