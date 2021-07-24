# Assignment

## Description

Да се напише конзолно приложение за съхранение и обработка на авточасти в база данни.
Базата данни трябва да бъде MySQL, а програмният език е по желание.
В конзолата трябва да се показва меню, от което да може да се добавят, редактират, взимат или трият авточасти.
Всяка авточаст трябва да има марка и модел на автомобила, категория (спирачна система, трансмисия, филтри и т.н.), наличност и цена. Не е задължително да се изброяват всички марки, модели и части.
При взимане (купуване) на авточаст трябва да се прави проверка за наличност.
При неналична част поради грешно изписани данни за автомобил, част или друго, да се запазва лог в таблица в базата данни.
При успешно взимане на част да се изпраща имейл до посочен такъв в конзолата с данни за поръчката и да се запазва същата информация във файл.

## Built With

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/master/)
- [Passport](http://www.passportjs.org/)
- [Bootstrap](https://getbootstrap.com/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/genadi53/DSS-assignment.git
   ```
2. Install NPM packages
   ```sh
   npm install
   cd client
   npm install
   ```
3. Create your own database and add your connection credentials in `database/connecion.js`
   ```JS
   const DB_PASS = 'ENTER YOUR DB PASSWORD';
   ```
4. Run the app

   ```sh
    npm start
    // open new terminal tab
    cd client
    npm start

   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<!-- USAGE EXAMPLES -->
