CREATE TABLE Employees(
	User_ID SERIAL NOT NULL PRIMARY KEY,
	Username VARCHAR(32) NOT NULL,
	Password VARCHAR(60) NOT NULL,
	First_Name VARCHAR(60) NOT NULL,
	Last_Name VARCHAR(60) NOT NULL,
	Email VARCHAR(60) NOT NULL,
	Admin_User_ID INT NULL
);

INSERT INTO Employees (Username, Password, First_Name, Last_Name, Email, Admin_User_ID) VALUES ('fred', '1A1DC91C907325C69271DDF0C944BC72', 'Fred', 'Johnston', 'fred@somewebsite.com', NULL);

CREATE TABLE Access_Codes(
	Access_Code_ID SERIAL NOT NULL PRIMARY KEY,
	Recovery_Code VARCHAR(60) NOT NULL,
	Access_Code VARCHAR(60) NOT NULL
);

INSERT INTO Access_Codes(Access_Code_ID, Recovery_Code, Access_Code) VALUES (1, 'SuPerSecUre!RecoVeryCode5545', 'flag{sql-injection-is-dangerous}');

CREATE TABLE session (
    "sid" VARCHAR NOT NULL PRIMARY KEY,
    "sess" JSON NOT NULL,
	"expire" TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);
