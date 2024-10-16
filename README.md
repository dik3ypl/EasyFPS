# Simple FPS Game

This project is a first-person shooter (FPS) game built using **Three.js** for rendering 3D graphics in the browser and **Kotlin** for the backend services.

## Features

- **3D Graphics**: Uses Three.js to render a fully interactive 3D environment.
- **Kotlin Backend**: Handles game logic, user sessions, and possible multiplayer functionality.
- **Responsive Controls**: Supports movement, shooting, and interacting with the game world.
- **Level Loading**: Backend integration for dynamically loading levels.

## Technologies Used

### Frontend
- **Three.js**: A popular JavaScript library for 3D rendering in the browser.
- **JavaScript/TypeScript**: Handles client-side logic, player controls, and interaction.

### Backend
- **Kotlin**: Manages backend logic, server interactions, and possibly real-time multiplayer functionality.
- **Ktor**: Kotlin framework for building asynchronous servers.
  
## Project Structure

- **src/main/kotlin**: Contains the Kotlin backend files.
  - `functions.kt`: Defines utility functions used throughout the project.
  - `server.kt`: Handles server-side logic, potentially including game state management.
  - `testlvl.kt`: Manages test level creation and initialization.
  
- **src/main/resources**: Stores any static assets or configuration files used by the backend.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js**: To run the frontend (Three.js).
- **npm**: Node package manager for handling frontend dependencies.
- **Kotlin**: Required to build and run the backend services.
- **Maven**: For managing backend project dependencies.

## Installation

### 1. Clone the repository:

```bash
git clone <repository-url>
cd simple-fps-game
```

### 2. Install frontend dependencies:

Navigate to the frontend directory (if separated) or install the required Node.js packages:

```bash
npm install
```

### 3. Backend setup:

Use Maven to install the required backend dependencies:

```bash
mvn install
```

### 4. Run the backend:

Compile and start the Kotlin server:

```bash
mvn compile exec:java -Dexec.mainClass="main.kotlin.server"
```

### 5. Run the frontend:

Start the development server to load the game in the browser:

```bash
npm run start
```

Open your browser and navigate to `http://localhost:8080` to start playing.

## Gameplay

- **Movement**: Use WASD or arrow keys to move around the game environment.
- **Shooting**: Use the left mouse button to shoot at targets.
- **Level Progression**: The game may include multiple levels, dynamically loaded from the server.

## Customization

You can extend this project by:

- Adding more levels (modify `testlvl.kt` to define new levels).
- Integrating multiplayer support (using WebSockets).
- Enhancing graphics or adding new 3D models and textures.
