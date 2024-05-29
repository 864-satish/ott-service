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
    ADMIN_AUTH_TOKEN=<auth_token>
    USER_AUTH_TOKEN=Bearer O2NZS9XWA1Q3MTLGP7E8K5Y4DR6FBU
    MONGO_URI=mongo-db-url
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
curl --location 'https://ott-service-e3d396793179.herokuapp.com/'
```

### Add to My List

```bash
curl --location --request POST 'https://ott-service-e3d396793179.herokuapp.com/my-list/'
```

### Remove from My List

```bash
curl --location --request DELETE 'https://ott-service-e3d396793179.herokuapp.com/my-list/1001'
```

### List My items
```bash
curl --location 'https://ott-service-e3d396793179.herokuapp.com/my-list/<userId>'
```

### To be added
- APIs to login/logout for Users 
- JWT or oAuth authentication for all endpoints
