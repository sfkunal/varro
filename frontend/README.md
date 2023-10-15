# Frontend

## Project Overview

The frontend of this project plays a crucial role in providing users with an intuitive and engaging interface for condensing research articles and retrieving relevant information. It interacts with the backend to send long-form text data, process queries, and display results.

## Technology Stack

### React

[React](https://reactjs.org/) is a widely-used JavaScript library for building user interfaces. It is the foundation of our frontend and is responsible for creating a dynamic and responsive user experience. React allows for efficient rendering and component-based development.

### Axios

[Axios](https://axios-http.com/) is used for making HTTP requests from the frontend to the Flask backend. It simplifies the process of sending data and receiving responses, enabling seamless communication between the user interface and the server.

### Material-UI

[Material-UI](https://material-ui.com/) is a popular React component library that provides pre-designed user interface elements, such as buttons, forms, and navigation components. It ensures a visually appealing and consistent design across the application.

## Project Structure

The frontend component of the Health Information Aggregator project has a typical React application structure. Here is a high-level overview of the key directories and files:

- **`src/`**: This is the main source directory and contains the core application code.

  - **`components/`**: Houses React components responsible for rendering various parts of the user interface. Key components include:
    - **`App.js`**: The main application component that serves as the entry point.
    - **`InputForm.js`**: Manages the input form for submitting long-form text data.
    - **`Results.js`**: Displays the condensed query and results of research articles.
    
  - **`util/`**: Contains utility functions or helper functions that may be used across different components.

  - **`App.css`**: Styles specific to the `App` component.
  - **`index.js`**: The entry point for rendering the React application.
  - **`serviceWorker.js`**: The service worker script for enabling Progressive Web App (PWA) features.

## Connecting to the Backend

The frontend and backend communicate through HTTP requests. Here's how the frontend connects to the Flask backend:

1. **Axios Integration**: In the `InputForm.js` component, Axios is utilized to send a POST request to the backend when the user submits long-form text data. The Axios library simplifies this process with the `axios.post()` function.

2. **Endpoint Configuration**: In the Axios POST request, the URL is configured to point to the Flask backend's API endpoint. In this project, the endpoint is defined as `/` in the Flask application's `app.py`. Make sure the URL matches the actual endpoint.

3. **Data Exchange**: Data is sent in JSON format as the request body, including the 'long_form_text'. Upon receiving the response from the backend, the frontend processes the data and displays it to the user.

## Deployment

For deploying the frontend of the project, you can use popular hosting services like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or [GitHub Pages](https://pages.github.com/). These platforms are well-suited for React applications and offer streamlined deployment processes.

## Version Control

Version control for the frontend code can be managed using Git and hosted on platforms like GitHub. This enables collaborative development, code version tracking, and issue management.
