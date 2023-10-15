# SmartResearch

## Problem Definition

### Introduction

In the past year, 77% of health-related information was found via general search engines like Google, Bing, or Yahoo. Only 13% of online health seekers referred to a site that specializes in health information. As the pandemic showed us, this is a dangerously low number. Misinformation is a powerfully destructive force, especially as it relates to our health.

As an example, early during the pandemic, questions were raised regarding the possible use of disinfectants administered internally to patients with COVID-19. On June 5th, the CDC reported a steep increase in calls to poison centers regarding exposure to household disinfectants. A CDC survey found that 39% of responders engaged in dangerous practices, including washing food products with bleach, applying household cleaners directly to the skin, and intentionally inhaling or ingesting disinfectants with the goal of preventing COVID-19 infection. According to industry experts, rampant misinformation across the internet helped make this a reality.

But the issue isn't purely the lack of credible information; it's also the lack of use. To this day, credible alternatives such as PubMed and Google Scholar with thousands of reputable medical publications are grossly underutilized by the general public. Reasons for why include the general lack of awareness of their existence, the inability for the average individual to assess their credibility, and the lack of experience with navigating their vast, data-heavy platforms. The general public deserves a better way to receive credible health information on the internet.

## Technical Proposal

We propose to build a website where users can paste long-form text from research papers into the website. On the backend, we then use OpenAI API to condense the long-form text into a short research-oriented, searchable query that could be pasted into a search engine like Semantic Scholars. Using the Semantic Scholars API, we will perform a search with the condensed query. With the information retrieved by the API, in addition to the OpenAI API and the given input, we will provide relevant information (described below) in a clear and engaging UI on the website.

## TLDR (Too Long; Didn't Read)

A short and concise summary of the input that maintains the emotion, bias, and viewpoints of the original input.

## Contextual Bias of the Input

- Contextual Bias (OpenAI API): Very important to clearly design and communicate how this is calculated to users.

## Contextual Information for Each Related Article

- Title (Semantic Scholars API)
- Authors (Semantic Scholars API)
- Journal (Semantic Scholars API)
- Number of citations (Semantic Scholars API)
- Number of references (Semantic Scholars API)
- Readability Difficulty Score (Flesch-Kincaid Grade Level formula)
- Sentiment Analysis (VADER: Valence Aware Dictionary and Sentiment Reasoner)

## Tech Stack

### Backend

- Python
- Flask
- OpenAI API
- Semantic Scholars API

### Frontend

- React
- Axios (HTTP requests from React to Flask server)
- Material-UI (design)

### Data Processing

- Python (Flesch-Kincaid Grade Level Formula, Valence Aware Dictionary and Sentiment Reasoner)

### Deployment

- **Docker**: To containerize your application. This makes it easier to manage dependencies and deploy your application.
- **AWS Elastic Beanstalk** or **Heroku**: These platforms support both Docker and Python, and they can automatically scale the application based on traffic.

### Version Control

- **Git & GitHub**: For version control and collaboration.