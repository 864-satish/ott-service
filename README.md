# 🏷️ My List Feature for OTT Platform

**Description:**
Introducing the "My List" feature on STAGE OTT, enabling users to save their favorite movies and TV shows to a personalized list.


### Features: 

1. **Add to My List** - Add a movie or TV show to the user's list. 
2. **Remove from My List** - Remove an item from the user's list using the item's unique ID.
3. **List My Items** - Retrieve all items in the user's list.

## Technologies Used

- NestJS
- Node.js [version: 18 or above]
- TypeScript
- PostgreSQL

## Installation Guide

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Steps

1. Clone the repository
    ```bash
    git clone https://github.com/864-satish/ott-service.git
    cd ott-service
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Configure MongoDB | TO BE CHANGED

   Ensure MongoDB is running. Create a `.env` file in the root directory and add the following:
    ```env
    NODE_ENV=local
    PORT=3002
    STATIC_AUTH_TOKEN=<auth_token>
    MONGO_DB_HOST=mongo-db-connection-string
    MONGO_DB_NAME=databse_name
    ```
- Note: Please change these sample auth-token

4. Running the app
    ```bash
    npm run start

    # watch mode
    npm run start:dev

    # production mode
    npm run start:prod
    ```
5. Test
    ```bash
    # unit tests
    npm run test
    ```

## REST API Endpoints 

## About My List | ott-service

```bash
curl --location 'https://ott-service-e3d396793179.herokuapp.com' \
--header 'Authorization: <static_auth_token>'
```

### List My items
```bash
curl --location 'https://ott-service-e3d396793179.herokuapp.com/my-list/e5bf94e2-11be-4004-98fd-28c2f8284f11' \
--header 'Authorization: <static_auth_token>'
```

- sample response
```JSON
{
    "_id": "6657be2c96f1db9f2d1b318f",
    "userId": "e5bf94e2-11be-4004-98fd-28c2f8284f11",
    "items": [
        {
            "contentId": "16e69ebf-6ff7-427b-8007-f9a49d3be070",
            "type": "MOVIE",
            "addedOn": "2024-05-30T02:02:00.729Z",
            "_id": "6657be3696f1db9f2d1b3199",
            "title": "Batman Begins"
        },
        {
            "contentId": "05936240-c953-4e09-a481-e10949ad8ca8",
            "type": "MOVIE",
            "addedOn": "2024-05-30T00:05:02.141Z",
            "_id": "6657c2ab156785a7f35290cf",
            "title": "Inception"
        },
        {
            "contentId": "2673e618-5434-4043-98e8-f834e9316591",
            "type": "MOVIE",
            "addedOn": "2024-05-30T02:01:56.058Z",
            "_id": "6657cf5b40ec4b5533598fcd",
            "title": "Tenet"
        }
    ],
    "__v": 4
}
```

### Add to My List

```bash
curl --location 'https://ott-service-e3d396793179.herokuapp.com/my-list/' \
--header 'Authorization: <static_auth_token>' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "e5bf94e2-11be-4004-98fd-28c2f8284f11",
    "contentId": "16e69ebf-6ff7-427b-8007-f9a49d3be070",
    "type": "TV_SHOW"
}'
```
- Respone
```JSON
{
    "message": "Item added to list"
}
```

### Remove from My List

```bash
curl --location --request DELETE 'https://ott-service-e3d396793179.herokuapp.com/my-list/' \
--header 'Authorization: <static_auth_token>' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "e5bf94e2-11be-4004-98fd-28c2f8284f11",
    "contentId": "2673e618-5434-4043-98e8-f834e9316591"
}'
```
```JSON
{
    "message": "Item removed from list"
}
```

### To be added
- APIs to login/logout for Users 
- JWT or oAuth authentication for all endpoints
