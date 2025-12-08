# flexibility-modeling
A web tool for displaying flexibility models or relevant scientific publications based on parameters selected by the user.

## 🌍 Live-Demo

🔗 [Flexibility Recommender](https://flexibility.offis.de/)

## ✨ Features

- Dynamic filtering of scientific publications related to flexibility models in the energy domain
- Personalized recommendations for suitable flexibility models based on user-defined parameters
- Comprehensive listing and categorization of relevant publications according to key parameters

## ⚙️ Installation

### Requirements
- PHP and Apache
- SQLite

### 📥 Clone Repository
git clone https://github.com/Digitalized-Energy-Systems/flexibility-modeling.git

## 🗄️ Database Management

The application uses SQLite for storing flexibility models and publications. To edit the database:

1. **Download DB Browser for SQLite**: Use the free [DB Browser for SQLite](https://sqlitebrowser.org/) tool to view and edit the database.
2. **Locate the database file**: The database file is typically located in the `db/` directory.
3. **Make your edits**: Open the database in DB Browser, edit tables as needed, and save changes.

## 🚀 Deployment

Currently, local code changes must be manually deployed to the production server:

1. **Prepare your local changes**: Ensure all code modifications are tested locally.
2. **Copy files to server**: Manually copy the modified files from your local repository to the web server.
   - On Linux servers, the webroot is typically located at `/var/www/html/` — this is where the website files are deployed.
   - Ensure all files have the correct permissions for the web server to read them.
3. **Database updates**: If you've modified the SQLite database, ensure the updated database file is also copied to the server.

> **Note**: In the future, automated deployment (e.g., via GitHub Actions or a CI/CD pipeline) should be set up to streamline this process.

## 📖 Usage
https://flexibility.offis.de/help.php offers a Step-by-Step Guide on how to use the recommender.