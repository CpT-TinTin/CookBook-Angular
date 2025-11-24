# Kitchen Recipes Application Walkthrough
1.  **Angular Application**: The main application with full functionality.
2.  **React Application**: A minimal representation demonstrating component interaction.

## Angular Application
Located in `kitchen-recipes/angular-app`.

### Features Implemented
-   **Authentication**:
    -   **Login**: Premium split-screen design.
    -   **Register**: New user registration with validation.
    -   **Mock Credentials**: `user@test.com` / `password`.
-   **Navigation**: Glassmorphism Navbar (visible only when logged in).
-   **Recipe List**: Modern grid view of recipes with hover effects.
-   **Context Menu**: "Edit" and "Delete" options available on each recipe card (click the `⋮` button).
-   **Recipe Details**: Magazine-style full view with ingredients and steps.
-   **App Menu**: "Favorite" and "Print" options in the details view.
-   **Add/Edit Recipe**: Enhanced modal dialog with:
    -   Dynamic Ingredients list (Add/Remove items).
    -   Dynamic Steps list (Add/Remove items).
    -   Image URL input with live preview.

### How to Run
```bash
cd kitchen-recipes/angular-app
npm start
```
Navigate to `http://localhost:4200`.

## React Application
Located in `kitchen-recipes/react-app`.

### Features Implemented
-   **Recipe Card**: A reusable component displaying an image and title.
-   **Interaction**: Clicking a card triggers an alert with the recipe title.

### How to Run
```bash
cd kitchen-recipes/react-app
npm run dev
```
Navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Verification Results
-   **Angular Build**: Success (`ng build`).
-   **React Build**: Success (`vite build`).
