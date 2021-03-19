-- last updated: 18/03-23:00
SET GLOBAL time_zone = 'America/Sao_Paulo';
CREATE TABLE users(
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cpf VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE account_status(
    status VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO account_status (status)
VALUES ('pending'),('active'),('inactive');

CREATE TABLE account_types(
    type VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO account_types (type)
VALUES ('current'),('savings');

CREATE TABLE credit_status(
    status VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO credit_status (status)
VALUES ('pending'),('active'),('inactive');
CREATE TABLE invoice_status(
    status VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO invoice_status (status)
VALUES ('open'),('closed');
CREATE TABLE transition_status(
    status VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO transition_status (status)
VALUES ('pending'),('done'),('canceled');
CREATE TABLE transition_types(
    type VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO transition_types (type)
VALUES ('deposit'),('draft'),('spend_debit'),('spend_credit');

CREATE TABLE transfer_status(
    status VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);
INSERT INTO transfer_status (status)
VALUES ('pending'),('done'),('canceled');
CREATE TABLE transfer_banks(
    bank VARCHAR(255) NOT NULL,
    id INT NOT NULL PRIMARY KEY
);
INSERT INTO transfer_banks (bank, id)
VALUES ('main', 000);
CREATE TABLE accounts (
    id VARCHAR(255) PRIMARY KEY,
    cpf_user VARCHAR(255),
    type INT NOT NULL,
    status INT NOT NULL,
    credit_status INT NOT NULL,
    credit_limit DOUBLE NOT NULL DEFAULT '200.00',
    credit_balance DOUBLE NOT NULL DEFAULT '0.00',
    debit_balance DOUBLE NOT NULL DEFAULT '0.00',
    invoice_day VARCHAR(255) NOT NULL DEFAULT '05',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cpf_user) REFERENCES users(cpf),
    FOREIGN KEY (type) REFERENCES account_types(id),
    FOREIGN KEY (status) REFERENCES account_status(id),
    FOREIGN KEY (credit_status) REFERENCES credit_status(id)
);
CREATE TABLE invoices (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    id_account VARCHAR(255),
    open_date DATETIME NOT NULL,
    close_date DATETIME NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (id_account) REFERENCES accounts(id),
    FOREIGN KEY (status) REFERENCES invoice_status(id)
);
CREATE TABLE transitions (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    id_account VARCHAR(255),
    id_recipient VARCHAR(255) NOT NULL,
    id_payer VARCHAR(255) NOT NULL,
    type INT NOT NULL,
    status INT NOT NULL,
    value DOUBLE NOT NULL,
    description VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_account) REFERENCES accounts(id),
    FOREIGN KEY (type) REFERENCES transition_types(id),
    FOREIGN KEY (status) REFERENCES transition_status(id)
);
CREATE TABLE transfers (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    id_origin VARCHAR(255) NOT NULL,
    id_receiver VARCHAR(255) NOT NULL,
    bank INT NOT NULL,
    status INT NOT NULL,
    value DOUBLE NOT NULL,
    date DATETIME NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (bank) REFERENCES transfer_banks(id),
    FOREIGN KEY (status) REFERENCES transfer_status(id)
);
