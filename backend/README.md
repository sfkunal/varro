# Backend

This README provides an overview of the backend components of the SmartResearch Project, which includes two main Python files, `app.py` and `engine.py`. The backend serves as the core of the project, responsible for processing input, condensing research articles, and interfacing with external APIs.

## Testing

```curl -X POST -H "Content-Type: application/json" -d '{"long_form_text":"Machine Learning in Healthcare"}' http://localhost:5000```

## `app.py`

`app.py` is the main Flask application that handles incoming HTTP requests. It sets up an API endpoint to receive long-form text data and, in collaboration with `engine.py`, transforms it into concise and searchable queries. Here is a summary of its functionality:

- **Create Flask App**: Initializes the Flask application, enabling CORS support to facilitate cross-origin requests.

- **API Endpoint**: Defines a single POST endpoint ('/') that expects JSON data containing 'long_form_text'. Upon receiving this data, the endpoint utilizes the 'engine' module to perform the following steps:
  1. Condense the long-form text into a query using OpenAI's GPT-3.5 Turbo model.
  2. Search for related research articles using the Semantic Scholars API.
  3. Process the retrieved data, including readability scoring and sentiment analysis.
  4. Return relevant information to the user.

- **Running the App**: Checks if the script is executed directly and runs the Flask app in debug mode.

## `engine.py`

`engine.py` serves as the core logic engine for the backend. It incorporates various libraries and APIs to condense, search, and process research data. Here's a summary of its functions:

- **Condense to Query**: This function condenses the long-form text into a concise query. It leverages OpenAI's GPT-3.5 Turbo model to transform the input text into a short, meaningful query for searching similar research articles.

- **Search Semantic**: It uses the Semantic Scholars API to perform a search based on the condensed query. The API call retrieves relevant research articles that match the query.

- **Process Semantic Results**: This function processes the data returned from Semantic Scholars. It extracts essential information from each paper, including title, authors, journal, citation count, reference count, and abstract. Additionally, it performs readability scoring and sentiment analysis on the abstracts of the papers.

- **Print Data**: A utility function to print the processed data (paper information, readability scores, sentiment scores) to the console. 

## Environmental Variables

The `engine.py` file requires the 'OPENAI_API_KEY' environmental variable, which should be set to your OpenAI API key.

## Tech Stack

The backend is primarily developed in Python and utilizes the following technologies:

- **Flask**: A micro web framework for handling HTTP requests and responses.
- **OpenAI API**: Used to condense long-form text into concise queries.
- **Semantic Scholars API**: Employs this API to search for relevant research articles.
- **Textstat**: A Python library used to calculate readability scores.
- **NLTK (Natural Language Toolkit)**: Used for sentiment analysis with the VADER sentiment intensity analyzer.

## Deployment

For deployment, the project can be containerized using Docker, making it easier to manage dependencies and deployment. Hosting platforms like AWS Elastic Beanstalk or Heroku are recommended for scalable deployment, as they support both Docker and Python applications.

## Version Control

The project's source code can be managed and collaboratively developed using Git and hosted on GitHub for version control and collaboration.