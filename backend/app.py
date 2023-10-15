import flask
from flask import Flask, request
import engine
from flask_cors import CORS, cross_origin

def create_app():
		app = Flask(__name__)
		cors = CORS(app, origins=["*"])

		@app.route('/', methods=['POST', 'OPTIONS'])
		@cross_origin(origin='*',headers=['Content-Type','Authorization'])
		def api():
				d = request.get_json()
				long_form_text = d['long_form_text']
				print("RECEIVED   ", long_form_text)
				query = engine.condense_to_query(long_form_text)
				print('query:', query)
				data = engine.search_semantic(query)
				if data:
						papers = engine.process_semantic_results(data)
						if papers is not None:
							sentiment_scores = engine.get_sentiment(long_form_text)
							response = {str(i): papers[i] for i in range(len(papers))}
							response['sentiment'] = sentiment_scores
							response['tldr'] = engine.condense_to_tldr(long_form_text)
							response = flask.jsonify(response)
							return response, 200
						else:
							return {"error": "No papers found for the given query"}, 404
				else:
						return {"error": "No data returned from Semantic Scholars API"}, 500


		return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
