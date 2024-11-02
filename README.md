## Frontend

I used pnpm, mantineUI, tanstack query, vite for bundling and axios for data fetching

### Key Features

- **Sign-Up Page**: Collects user data (name, email, password) and sends it to the backend. Upon successful registration, the app stores the JWT token and redirects to the home page.
- **Sign-In Page**: Allows registered users to log in, stores the JWT token, and redirects to the home page.
- **Home Page**: Displays a welcome message and requires the user to be authenticated.
- **Form Validation**: Validates the email format, password strength, and other fields before submission.
- **404 Page**: if any of other routes is given 404 page will be displayed.



- **Mantine UI**: I used mantine UI for it's type-safe features and providing many CSS in JS for their componets
- **TanStack Router**: I used it for having type-safe routing
- **TanStack Query (React Query)**: I used it for async calls and it's smart features for managing server state

