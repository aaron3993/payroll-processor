[Database design](https://app.eraser.io/workspace/3NHeCDBLpOkdqjHbpO2q?origin=share&elements=eCFSZuJ3_OK5XyjWsyz6mA)

(![Database schema](<Screen Shot 2025-03-13 at 4.24.11 PM.png>))

1. Instructions on how to build/run your application

**Setup Instructions**  

1. Open **PostgreSQL** using `psql`:  
   ```sh
   psql -U your_username
    CREATE DATABASE payroll_db;
    \q
    ```
1. Create .env using .env.example:  
    ```sh
    cp .env.example .env
    ```
1. Add environment variables based on your preferred psql credentials
1. Install Dependencies
    ```sh
    npm install
    ```
1. Migrate database
    ```sh
    npm db:up
    ```
1. Start the application
    ```sh
    npm run dev
    ```
1. Make POST request to upload csv using Postman
    ```sh
    POST http://localhost:8080/api/csv
    body > form-data > key: "csv", value: (csv_upload_file)
    ```
1. Make GET request to retrieve JSON data
    ```sh
    GET http://localhost:8080/api/payroll
    ```
1. To restart the database
    ```sh
    npm run db:reset
    ```
