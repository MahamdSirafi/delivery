# Delivery

## API Explanation: Food Delivery System

This document provides an explanation of the API endpoints for a food delivery system. The system consists of several tables/entities, including:
- Restaurant: Represents a restaurant that offers food delivery services.
- Location: Represents the location/address associated with a restaurant.
- User: Represents a user of the food delivery system, who can have multiple roles.
- Order: Represents a food delivery order placed by a user.
- Product: Represents a food item available for ordering.
- Delivery Person: Represents a delivery person responsible for delivering orders.
- Review: Represents a review/rating given by a user for a restaurant.

## Database Seed

- create an admin user in the database

## Install

Some basic Git commands are:

```
$ git clone https://github.com/MahamdSirafi/delivery.git
$ cd delivery
$ npm install
```

## Start development

```
$ npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

## API Endpoints

### user Endpoints

- `GET /users`: Get a list of all users.
- `GET /users/:id`: Get details of a specific users identified by `id`.
- `POST /users`: Create new user with role.
- `PATCH /users/:id`: Update details of a specific users identified by `id`.
- `DELETE /users/:id`: Delete a specific users identified by `id`.
- `POST /signup`: Create a new users.
- `POST /login`: Log in to an account.
- `POST /forgotPassword`: Request to forget your password.
- `PATCH /resetPassword/:token`: Reset password.
- `PATCH /activeMe`: Activate the account.
- `DELETE /deleteMe`: Deactivate the account.
- `GET /me`: Get my profile.
- `GET /users/:id`: Get details of a specific users identified by `id`.
- `POST /users`: Create new user with role.
- `PATCH /updateMyPassword`: Update Password of a me .
- `PATCH /updateMeAndUpload/`: Update my profile with Upload imges.
- `PATCH /updateMe`: Update my profile.


### Restaurant Endpoints

- `GET /restaurants`: Retrieves a list of all restaurants.
- `GET /restaurants/:id`: Retrieves information about a specific restaurant.
- `GET /restaurants/inRegion/:region`: Retrieves a list of all restaurants in a specific region.
- `GET /restaurants/statistics/:year/:month`:  Get statistics related to orders for a restaurant in a specific year and month.
- `POST /restaurants`: Creates a new restaurant.
- `PATCH /restaurants/:id`: Updates information for a specific restaurant.
- `PATCH /restaurants/:id/uplode`: Updates information for a specific restaurant and uploading pictures.
- `DELETE /restaurants/:id`: Deletes a specific restaurant.

### Location

- `GET /locations`: get a list of all locations.
- `GET /locations/:id`: get information about a specific location.
- `POST /locations`: Creates a new location.
- `PATCH /locations/:id`: Updates information for a specific location.
- `DELETE /locations/:id`: Deletes a specific location.
- `GET /locations/region`: get a list of all region.


### Order

- `GET /orders`: Retrieves a list of all orders.
- `GET /orders/:id`: Retrieves information about a specific order.
- `POST /orders`: Creates a new order.
- `DELETE /orders/:id`: Deletes a specific order.
- `GET /orders/work_me`: Retrieve a list of all orders belonging to a delivery worker.
- `GET /orders/need_work`: Retrieve a list of all orders need delivery worker.
- `PATCH /orders/:id/accepted`: Updates the order status to Accepted.
- `PATCH /orders/:id/cancelled`: Updates the order status to Cancelled.
- `PATCH /orders/:id/preparing`: Updates the order status to Preparing.
- `PATCH /orders/:id/delivereing`: Updates the order status to Out For Delivery.
- `PATCH /orders/:id/completed`: Updates the order status to Completed.
- `PATCH /orders/:id/paid`: Updates the order paid to true.
- `PATCH /orders/:id/err`: Updates information for a specific order After checking the status of the order.

### Product

- `GET /restaurants/:id/products`: Retrieves a list of all products in the restaurant.
- `GET /restaurants/:id/products/:id`: Retrieves information about a specific product.
- `GET /restaurants/:id/products/category`: Retrieves a list of all category in the restaurant.
- `GET /restaurants/:id/products/category/:category`: Retrieve a list of all products in the specified category present in the restaurant.
- `POST /restaurants/:id/products`: Creates a new product in the restaurant.
- `PATCH /restaurants/:id/products/:id`: Updates information for a specific product in the restaurant.
- `PATCH /restaurants/:id/products/:id/uplode`: Updating information about a specific product in the restaurant and uploading pictures.
- `DELETE /restaurants/:id/products/:id`: Deletes a specific product in the restaurant.

### Delivery worker

- `GET /deliverys`: Retrieves a list of all delivery worker.
- `GET /deliverys/statistics/:year/:month`: Get statistics about a delivery worker related to the orders he worked on during a specific year and month.
- `GET /deliverys/:id`: Retrieves information about a specific delivery worker.
- `POST /deliverys`: Create a new delivery worker with his own new account.
- `PATCH /deliverys/:id`: Updates information for a specific delivery worker.
- `DELETE /deliverys/:id`: Deletes a specific delivery worker.

#### Review

- `GET /reviews`: Retrieves a list of all reviews.
- `GET /reviews/:id`: Retrieves information about a specific review.
- `GET /reviews/me`: Retrieves a list of all my reviews.
- `GET /reviews/myRestaurant`: Retrieves a list of all my restaurant reviews.
- `POST /reviews`: Creates a new review.
- `PATCH /reviews/:id`: Updates information for a specific review.
- `DELETE /reviews/:id`: Deletes a specific review.

These API endpoints allow interaction with the food delivery system, enabling the retrieval, creation, updating, and deletion of various entities, such as restaurants, locations, users, orders, products, delivery persons, and reviews. By utilizing these endpoints, users can browse restaurants, place orders, rate their experiences, and more.
Please refer to the API documentation for more details on request and response formats.

## Setting Up .env File

This guide explains how to set up an `.env` file to configure environment variables.

### Steps

1. Create a new file and name it `.env` in your project directory.

2. Open the `.env` file using any text editor.

3. Add the environment variables and their values to the file. Write each variable on a separate line in the following format:

Here are some examples:

 NODE_ENV=development
 
 PORT=7000
 
 DATABASE_LOCAL=mongodb://127.0.0.1:27017/Databasedelivery
 
 JWT_SECRET=asjdhgjed2187yhdkjawh
 
 JWT_EXPIRES_IN=90d
 
 JWT_COOKIE_EXPIRES_IN=90
 
 SERVICE_EMIL=Sendgrid
 
 EMAIL_HOST=sandbox.smtp.mailtrap.io
 
 EMAIL_PORT=222
 
 EMAIL_USERNAME=sjhajd
 
 EMAIL_PASSWORD=askbhfajs
 
 EMAIL_FROM=test@gmail.com
 
 GMAIL_USERNAME=
 
 GMAIL_PASSWORD=
 
 SENDGRID_USERNAME=
 
 SENDGRID_PASSWORD=
 

## Technologies Used
- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- Passport.js: Authentication middleware for Node.js
- JSON Web Tokens (JWT): Token-based authentication mechanism
- MongoDB: NoSQL database for data storage

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify the code according to your specific project requirements.


# وصف المشروع

هذا المشروع هو البنية الاساسية لبناء اي مشروع بستخدام العقدة واكسبريس بحيث يحتوي على المصادقة والترخيص والحماية

# من اجل تشغيل المشروع

## 1)قم بكتابة npm install في قائمة الاوامر لتنصيب المكتبات التي يعتمد عليها المشروع

## 2)قم بإضافة ملف env.

### وقم بتعبئته وفق النموزج التالي

- NODE_ENV=development
- PORT=7000
- DATABASE_LOCAL=mongodb://127.0.0.1:27017/Databasedelivery
- JWT_SECRET=asjdhgjsdfsdfed2187yhdkjawh
- JWT_EXPIRES_IN=90d
- JWT_COOKIE_EXPIRES_IN=90
- SERVICE_EMIL=Sendgrid
- EMAIL_HOST=sandbox.smtp.mailtrap.io
- EMAIL_PORT=222
- EMAIL_USERNAME=sjhajd
- EMAIL_PASSWORD=askbhfajs
- EMAIL_FROM=companyName@gmail.com
- GMAIL_USERNAME=
- GMAIL_PASSWORD=
- SENDGRID_USERNAME=
- SENDGRID_PASSWORD=

## 3)قم بتشغيل المشروع عن طريق الامر

- npm start
