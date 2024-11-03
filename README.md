## Frontend

I used pnpm, mantineUI, tanstack query, vite for bundling and axios for data fetching

### Key Features

- **Sign-Up Page**: Collects user data (name, email, password) and sends it to the backend. Upon successful registration, the app stores the JWT token and redirects to the home page.
- **Sign-In Page**: Allows registered users to log in, stores the JWT token, and redirects to the home page.
- **Home Page**: Displays a welcome message and requires the user to be authenticated.
- **Form Validation**: Validates the email format, password strength, and other fields before submission.
- **404 Page**: if any of other routes is given 404 page will be displayed.

## Reasons for some choices

- **Mantine UI**: I used mantine UI for it's type-safe features and providing many CSS in JS for their componets
- **TanStack Router**: I used it for having type-safe routing
- **TanStack Query (React Query)**: I used it for async calls and it's smart features for managing server state

## Backend

It provides API endpoints for user authentication and secure JWT-based token generation for user sessions. The backend supports user registration, login, and password hashing for security.
the nestjs app consists of 2 main modules Auth and Logging.

## Technologies Used

- **Mongoose**: ORM for MongoDB to define schemas and interact with the database (I already worked with it before so that is why I used it)
- **JWT (JSON Web Tokens)**: for user authentication and secure session management
- **Bcrypt**: for  hashing library to secure user passwords

## Key Features

- **User Registration** (`POST /auth/signup`): Accepts user details, hashes the password, and stores the user in MongoDB.
- **User Login** (`POST /auth/signin`): Verifies user credentials and returns a JWT token upon successful authentication.


## what can be done for future:

- **Role Based Access Control** this is for providing more fine grained on who can assume the role and do what on the resouces of the backend.
- **HTTPS** for secure communication over the network
- **CORS** fine grain the domains allowed to access the backend
- **short lived JWT** maybe it is better also to have short lived access tokens that are refreshed with refresh token and have the token stored in HTTP only cookie to prevent any JS attack

## Screenshots

![image](https://github.com/user-attachments/assets/25bcbea9-4ae0-4796-ac40-400454deabc4)
![image](https://github.com/user-attachments/assets/66636a9d-b090-4dfe-9ed7-d55688124e08)
![image](https://github.com/user-attachments/assets/875995be-f11e-4a90-9722-84e97b050743)



