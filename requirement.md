# 🏷️ My List Feature for OTT Platform

**Description:**
Enhance your OTT platform by introducing the "My List" feature, enabling users to save their favorite movies and TV shows to a personalized list. This includes backend services for managing the user's list, such as adding, removing, and listing saved items.

## 🎯 Objective

Implement the APIs for the “My List” feature on the backend so that any client (web or mobile apps) can easily consume these APIs. Ensure the solution is scalable, performant, and includes integration tests.

## 📋 Functional Requirements

### Implement the following features:

1. **Add to My List** - Add a movie or TV show to the user's list. Each item is identified by a unique ID, and the list should not contain duplicates.
2. **Remove from My List** - Remove an item from the user's list using the item's unique ID.
3. **List My Items** - Retrieve all items in the user's list. The response should be paginated to efficiently handle potentially large lists.

## 📜 Context

Assuming you are building this feature for an existing system, here is how a User, Movie, and TVShow are represented:

```typescript
type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface User {
    id: string;
    username: string;
    preferences: {
        favoriteGenres: Genre[];
        dislikedGenres: Genre[];
    };
    watchHistory: Array<{
        contentId: string;
        watchedOn: Date;
        rating?: number;
    }>;
}

interface Movie {
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
}

interface TVShow {
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    episodes: Array<{
        episodeNumber: number;
        seasonNumber: number;
        releaseDate: Date;
        director: string;
        actors: string[];
    }>;
}
```
## 📈 Non-Functional Requirements

- Performance of “List My Items” - “List My Items” will be used every time a user opens the app or navigates to the “Home Screen” of the app. Hence, it needs to be extremely performant (under 10 milliseconds).
- Integration Tests - Write integration tests covering each API endpoint, including success and error cases.

## 🛠️ Technical Requirements

- Backend: Use TypeScript. Feel free to use any web framework (like Express.js or Nest.js).
- Database: Use MongoDB preferably (that’s what we use at STAGE). If you are not comfortable with MongoDB, feel free to use any open-source relational database.
- Testing Framework: Feel free to use any testing framework of your choice.

## 🚀 Deployment

- Deploy:  your service at any hosting service of your choice.
- CI/CD Pipelines: Use any service of your choice.
## 📜 Submission Guidelines

- Assumptions: Assume basic user authentication is in place; you can use a mock user ID for testing.
- Database Schemas: Create relevant database schemas for users, movies, TV shows, and lists.
- Data Scripts: Provide scripts to create initial data like users, movies, TV shows, lists, etc.
- Git Repository: Provide a Git repository containing your code, including all source files, test files, and configuration files.

## Include a README.md with:

- Setup Instructions: Detailed steps for setting up and running your application and tests.
- Design Explanation: A brief explanation of your design choices, particularly how you optimized for  performance and scalability.
- Assumptions: Any assumptions made during implementation.

## 📊 Evaluation Criteria

- Functionality: The code meets all the functional requirements.
- Code Quality: Code is clean, modular, and follows best practices for TypeScript development.
- Design: The API, database schema, and caching strategy are well-designed for scalability and performance.
- Testing: Integration tests are comprehensive and demonstrate an understanding of testing strategies and coverage.
- Overall: Approach this assignment with high quality as if you are building it for production deployment