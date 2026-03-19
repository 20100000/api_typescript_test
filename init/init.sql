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