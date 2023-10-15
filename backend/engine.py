import openai
import re
import os
import requests
import textstat
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
# nltk.download('vader_lexicon')

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.
openai.api_key = os.getenv('OPENAI_API_KEY')


def condense_to_tldr(long_form_text):
	preprompt = 'Condense this text into 2-3 sentences. Please just output the summary, do not objectively talk about the text. just a TLDR'
	response = openai.Completion.create(
		engine="gpt-3.5-turbo-instruct",
		prompt=preprompt+long_form_text,
		temperature=0.5,
		max_tokens=80
	)

	generated_text = response.choices[0].text.strip()
	return generated_text

def condense_to_query(long_form_text):
	preprompt = 'Imagine you are an intelligent AI, tasked with the mission of condensing complex research articles into succinct, searchable queries. Your goal is to capture the essence of the article, focusing on the key themes and concepts, and translate them into a query that can be used to find similar research on Google Scholar or Semantic Scholar. Now, take this long-form excerpt and transform it into a condensed, powerful query. Aim for 5-6 words in length'

	response = openai.Completion.create(
		engine="gpt-3.5-turbo-instruct",
		prompt=preprompt+long_form_text,
		temperature=0.5,
		max_tokens=60
	)

	generated_text = response.choices[0].text.strip()
	query = re.sub(r'\W+', ' ', generated_text)
	return query


def search_semantic(query):
	base_url = "https://api.semanticscholar.org/graph/v1"
	params = {
		"query": query,  # The keyword to search for
		"offset": 0,  # The number of results to skip
		"limit": 10,  # The number of results to return
		# The fields to return for each paper
		"fields": "title,authors,citationCount,referenceCount,journal,year,abstract,url,tldr"
	}

	response = requests.get(base_url + "/paper/search", params=params)
	if response.status_code != 200:
		return None
	return response.json()

def get_sentiment(query):
	sia = SentimentIntensityAnalyzer()
	sentiment_scores = sia.polarity_scores(str(query))
	return sentiment_scores


def process_semantic_results(data):
	papers = []
	if 'data' in data:
		for paper in data['data']:
			paper_dict = {
				'title': paper['title'] if paper['title'] else None,
				'Authors': ', '.join(author['name'] for author in paper['authors']) if paper['authors'] else None,
				'journal': paper['journal']['name'] if (paper['journal'] and 'name' in paper['journal']) else None,
				'citationCount': paper['citationCount'] if paper['citationCount'] else None,
				'referenceCount': paper['referenceCount'] if paper['referenceCount'] else None,
				'Abstract': paper['abstract'] if 'abstract' in paper else None,
				'url': paper['url'] if paper['url'] else None,
				'tldr': paper['tldr']['text'] if (paper['tldr'] and paper['tldr']['text']) else None
			}
			if paper_dict['Abstract'] is not None:
				if 'Abstract' in paper_dict and isinstance(paper_dict['Abstract'], str):
					readability_score = textstat.flesch_kincaid_grade(paper_dict['Abstract'])
					sia = SentimentIntensityAnalyzer()
					sentiment_scores = sia.polarity_scores(paper_dict['Abstract'])
				else:
					readability_score = None
					sentiment_scores = None
				
				paper_dict['Flesch Reading Ease Test Score'] = readability_score
				paper_dict['sentiment_scores'] = sentiment_scores

			papers.append(paper_dict)
		return papers
	return None


def print_data(papers):
	for paper in papers:
		print("Title:", paper['title'] if 'title' in paper else "N/A")
		print("Authors:", paper['authors'] if 'authors' in paper else "N/A")
		print("Journal:", paper['journal'] if 'journal' in paper else "N/A")
		print("Num. Citations:", paper['citationCount'] if 'citationCount' in paper else "N/A")
		print("Num. References:", paper['referenceCount'] if 'referenceCount' in paper else "N/A")
		print("Readability Difficulty Score:", f"{paper['readability_score']}/18.0" if 'readability_score' in paper else "N/A")
		print("Sentiment Scores:", paper['sentiment_scores'] if 'sentiment_scores' in paper else "N/A")

		print('\n\n')

