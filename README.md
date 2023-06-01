# My Awesome Blog API Documentation

## API Base URL

The API is accessible at `https://api.example.com` (replace with your API's base URL).

### Authentication

The following routes require authentication using JWT (JSON Web Token) in the request headers:

- `POST /articles/` (Create a new article)
- `PUT /articles/:articleId` (Update an article)
- `DELETE /articles/:articleId` (Delete an article)

For these routes, include the JWT token in the request headers as follows:
Authorization: Bearer <token>

### Create a New Article

- Endpoint: `POST /articles/`
- Description: Create a new article.
- Request Body:
  - `title` (string): The title of the article.
  - `content` (string): The content of the article.
  - `published` (boolean): The published status of the article.
- Response:
  - 200 OK: Success message: "Article "{title}" successfully created!"
  - 400 Bad Request: Error message: "The title of the article is already used."

### Update an Article

- Endpoint: `PUT /articles/:articleId`
- Description: Update an existing article.
- Request Parameters:
  - `articleId` (string): The ID of the article to update.
- Request Body:
  - `title` (string): The updated title of the article.
  - `content` (string): The updated content of the article.
  - `published` (boolean): The updated published status of the article.
- Response:
  - 200 OK: Success message: "Article {title} updated with success."

### Delete an Article

- Endpoint: `DELETE /articles/:articleId`
- Description: Delete an article.
- Request Parameters:
  - `articleId` (string): The ID of the article to delete.
- Response:
  - 200 OK: Success message: "Article deleted."

### Get All Articles

- Endpoint: `GET /articles/`
- Description: Get all articles with filtering, sorting, and pagination options.
- Request Query Parameters:
  - `page` (optional, integer): The page number for pagination.
  - `pageSize` (optional, integer): The number of articles per page.
  - `sort` (optional, string): The sort order ("asc" or "desc") for articles.
  - `before` (optional, date): Filter articles created before a specific date.
  - `after` (optional, date): Filter articles created after a specific date.
- Response:
  - 200 OK: List of articles.

### Get an Article by ID

- Endpoint: `GET /articles/:articleId`
- Description: Get an article by its ID.
- Request Parameters:
  - `articleId` (string): The ID of the article.
- Response:
  - 200 OK: Article details.
  - 404 Not Found: Error message: "Resource not found."

Note: Replace `:articleId` in the endpoints with the actual ID of the article.

Please note that the frontend needs to handle authentication, error handling, and rendering/displaying the data received from the API according to your application's requirements and design.

# BlogAPI - Comment Feature

This is the documentation for the comment feature of the BlogAPI. The comment feature allows users to post, update, and delete comments on articles.

## Comment Controller

### `postComment`

Creates a new comment for an article.

- Method: POST
- Route: `/:articleId/comments`
- Middleware: `validateCommentBody`, `confirmValidation`

**Request Body:**

````json
{
  "author": "John Doe",
  "content": "This is a comment",
  "parentCommentId": "optional-parent-comment-id"
}
Response:

    Status: 200 (OK)
    Body: JSON object containing the created comment

updateComment

Updates an existing comment.

    Method: PUT
    Route: /:articleId/comments/:commentId
    Middleware: validateCommentBody, confirmValidation

Request Body:
{
  "authorId": "comment-author-id",
  "content": "Updated comment content"
}
Certainly! Here's the documentation formatted as a Markdown text:

markdown

# BlogAPI - Comment Feature

This is the documentation for the comment feature of the BlogAPI. The comment feature allows users to post, update, and delete comments on articles.

## Comment Controller

### `postComment`

Creates a new comment for an article.

- Method: POST
- Route: `/:articleId/comments`
- Middleware: `validateCommentBody`, `confirmValidation`

**Request Body:**

```json
{
  "author": "John Doe",
  "content": "This is a comment",
  "parentCommentId": "optional-parent-comment-id"
}
````
Response:

    Status: 200 (OK)
    Body: JSON object containing the created comment

updateComment

Updates an existing comment.

    Method: PUT
    Route: /:articleId/comments/:commentId
    Middleware: validateCommentBody, confirmValidation

Request Body:


{
  "authorId": "comment-author-id",
  "content": "Updated comment content"
}

Response:

    Status: 200 (OK)
    Body: JSON object with a success message

deleteComment

Deletes an existing comment.

    Method: DELETE
    Route: /:articleId/comments/:commentId
    Middleware: validateCommentToDelete, confirmValidation

Request Body:
{
  "authorId": "comment-author-id"
}

Response:

    Status: 200 (OK)
    Body: Success message

Comment Routes

The following routes are available for managing comments:

    POST /:articleId/comments: Create a new comment for an article
    PUT /:articleId/comments/:commentId: Update an existing comment
    DELETE /:articleId/comments/:commentId: Delete an existing comment

Validation Middleware
validateCommentBody

Validates the request body of the comment-related routes.

    author: The name of the comment author (string, 2-20 characters)
    commentId (route parameter): The ID of the comment (string)
    content: The content of the comment (string, 3-2000 characters)
    parentComment (optional): The ID of the parent comment if it is a reply (string)

validateCommentToDelete

Validates the request body and route parameters for deleting a comment.

    authorId: The ID of the comment author (string, required)
    commentId: The ID of the comment to be deleted (string, required)

Usage

To use the comment feature in your application, follow these steps:

    Import the comment controller methods (postComment, updateComment, deleteComment) into your Express application.
    Set up the comment routes in your Express application using the provided routes and corresponding controller methods.
    Add the necessary validation middleware (validateCommentBody, validateCommentToDelete) to ensure the request data is valid.
    Implement the confirmValidation middleware to handle validation errors.
    Start your Express server and test the comment feature endpoints using an API testing tool or client.

