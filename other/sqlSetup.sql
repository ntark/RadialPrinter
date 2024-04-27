CREATE DATABASE printer;

USE printer;

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(255) NOT NULL,
    host VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    method VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE USER 'printer'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON printer.* TO 'printer'@'localhost';
