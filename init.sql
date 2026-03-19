-- init.sql
CREATE DATABASE sizeBay;
\c sizeBay;
CREATE TABLE IF NOT EXISTS shortenURLs (
    id SERIAL PRIMARY KEY,
    url VARCHAR(150) UNIQUE NOT NULL UNIQUE,
    shortCode VARCHAR(150) NOT NULL UNIQUE,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);
INSERT INTO shortenURLs (url, shortCode, createdAt, updatedAt) VALUES ('<https://www.example.com/some/long/url>', 'abc123', now(), now()),
    ('<https://www.example2.com/some/long/url>', 'abcd1234', now(), now());

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

INSERT INTO statistics (shortCode, accessCount, createdAt, updatedAt) VALUES ('abc123', 0, now(), now()),
    ('abcd1234', 0, now(), now());