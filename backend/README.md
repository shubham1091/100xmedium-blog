# Serverless Backend API Documentation

## Overview
This documentation outlines the available endpoints, their functionalities, request formats, and expected responses.

## Base URL

The base URL for accessing the API endpoints is:

```
https://your-api-domain.com/api/v1/
```

## Authentication

Authentication is required for certain endpoints using JSON Web Tokens (JWT). Users need to obtain a JWT token by signing up or signing in using the provided endpoints.

## Endpoints

### 1. User Management

#### 1.1 User Signup

- **Endpoint:** `POST /signup`
- **Description:** Creates a new user account.
- **Example Request:**
  ```http
  POST /api/v1/signup
  Content-Type: application/json
  
  {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
  }
  ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
        "token": "JWT token"
    }
    ```
- **Response (Error):**
  - **Status:** `403 Forbidden`
  - **Body:**
    ```json
    {
        "error": "Error message"
    }
    ```

- **Response (Error - Invalid Input):**
  - **Status:** `400 Bad Request`
  - **Body:**
    ```json
    {
        "error": "Invalid input"
    }
    ```
#### 1.2 User Signin

- **Endpoint:** `POST /signin`
- **Description:** Authenticates a user and returns a JWT token.
- **Example Request:**
  ```http
  POST /api/v1/signin
  Content-Type: application/json
  
  {
      "email": "john@example.com",
      "password": "password123"
  }
  ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
        "token": "JWT token"
    }
    ```
- **Response (Error):**
  - **Status:** `403 Forbidden`
  - **Body:**
    ```json
    {
        "error": "Error message"
    }
    ```

- **Response (Error - Invalid Input):**
  - **Status:** `400 Bad Request`
  - **Body:**
    ```json
    {
        "error": "Invalid input"
    }
    ```
### 2. Blog Operations

#### 2.1 Create Blog Post

- **Endpoint:** `POST /blog`
- **Description:** Creates a new blog post.
- **Example Request:**
  ```http
  POST /api/v1/blog
  Content-Type: application/json
  Authorization: Bearer [JWT token]
  
  {
      "title": "New Blog Post",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
  ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
        "id": "123456"
    }
    ```
- **Response (Error):**
  - **Status:** `403 Forbidden`
  - **Body:**
    ```json
    {
        "error": "Error message"
    }
    ```
- **Response (Error - Invalid Input):**
  - **Status:** `400 Bad Request`
  - **Body:**
    ```json
    {
        "error": "Invalid input"
    }
    ```

#### 2.2 Update Blog Post

- **Endpoint:** `PUT /blog`
- **Description:** Updates an existing blog post.
- **Example Request:**
  ```http
  PUT /api/v1/blog
  Content-Type: application/json
  Authorization: Bearer [JWT token]
  
  {
      "id": "123456",
      "title": "Updated Blog Post",
      "content": "New content for the blog post."
  }
  ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
        "id": "123456"
    }
    ```
- **Response (Error):**
  - **Status:** `403 Forbidden`
  - **Body:**
    ```json
    {
        "error": "Error message"
    }
    ```

- **Response (Error - Invalid Input):**
  - **Status:** `400 Bad Request`
  - **Body:**
    ```json
    {
        "error": "Invalid input"
    }
    ```
#### 2.3 Get Blog Post by ID

- **Endpoint:** `GET /blog`
- **Description:** Retrieves a blog post by its ID.
- **Example Request:**
  ```http
  GET /api/v1/blog?id=123456
  Authorization: Bearer [JWT token]
  ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:** Blog post object
- **Response (Error):**
  - **Status:** `404 Not Found`
  - **Body:**
    ```json
    {
        "error": "Blog post with ID 123456 not found."
    }
    ```

#### 2.4 Get All Blog Posts

- **Endpoint:** `GET /blog/bulk`
- **Description:** Retrieves all blog posts.
- **Example Request:**
  ```http
  GET /api/v1/blog/bulk
  Authorization: Bearer [JWT token]
  ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:** Array of blog post objects
- **Response (Error):**
  - **Status:** `404 Not Found`
  - **Body:**
    ```json
    {
        "error": "No blog posts found."
    }
    ```

## Requirements

To use this API, you need:

- Access credentials for the API endpoint URL.
- Environment variables:
  - `DATABASE_URL`: URL of the database where user and blog data will be stored.
  - `JWT_SECRET`: Secret key for signing JWT tokens.

## Dependencies

- Hono framework (`hono`)
- Prisma Client (`@prisma/client/edge`)
- Prisma extension for accelerated performance (`@prisma/extension-accelerate`)

