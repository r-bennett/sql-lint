import * as mysql from "mysql";

class Database {

    public connection: mysql.Connection;

    constructor(host: string, user: string, password: string) {
        this.connection = this.connect(host, user, password)
    }

    public connect(host: string, user: string, password: string) {
        const connection = mysql.createConnection({
            host,
            user,
            password
        });

        connection.connect(err => {
            if (err) {
                return console.log(err);
            }
        });

        return connection;
    }

    public getDatabases(connection: mysql.Connection, callback: any): void {
        const databases: string[] = [];
        connection.query('SHOW DATABASES', (error, results, fields) => {
            if (error) {
                return console.log(error);
            }

            callback(results);
        });
    }

    /**
     * Gets all databases for a table
     */
    public getTables(connection: mysql.Connection, database: string, callback: any): void {
        const databases: string[] = [];
        connection.query(`SHOW TABLES FROM ${database}`, (error, results, fields) => {
            if (error) {
                return console.log(error);
            }

            callback(results);
        });
    }
}

export { Database };
