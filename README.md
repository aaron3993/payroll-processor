[Database design](https://app.eraser.io/workspace/3NHeCDBLpOkdqjHbpO2q?origin=share&elements=eCFSZuJ3_OK5XyjWsyz6mA)

![Database schema](<Screen Shot 2025-03-13 at 4.24.11 PM.png>)

# Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js** (LTS version recommended) – [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) – Verify installation with:
  ```sh
  npm -v

**PostgreSQL** (latest stable version) – [Download here](https://www.postgresql.org/)

 Ensure PostgreSQL is running and accessible.
 Verify installation with:

 psql --version

**If using local devl container:**
Before using Docker, ensure you have the following installed:

- **Docker** – [Download here](https://www.docker.com/products/docker-desktop)
  - Verify installation with:
    ```sh
    docker --version
    ```

# Setup Instructions

1. Clone this repository
   ```sh
   git clone https://github.com/aaron3993/payroll-processor.git
   ```
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

**If using local dev container**

1. Ensure Docker is running
2. Clone this repository
   ```sh
   git clone https://github.com/aaron3993/payroll-processor.git
   ```
3. Open the folder in vscode as a workspace
4. Type `cmd + shift + p` to open the command palette
5. Type and select 'Dev Containers: Rebuild and Reopen in Container`

**If using Codespaces dev container**

1. In the current repository, click on the **Code** button, then navigate to the **Codespaces** tab and click **Start Codespace** on the `master` branch.
2. Once the Codespace is loaded, open the **Ports** panel from the **Activity Bar** on the left side, and set the port to **Public**.
3. Run the following command to reset the database:
   ```bash
   npm run db:reset
4. After the database is reset, get the **URL** of the Codespace from the **Ports** panel in the **Activity Bar** to make requests to the application.
