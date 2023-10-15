import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Link,
  CircularProgress,
  Slider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SentimentBars from "./SentimentBars";

function Home() {
  const [text, setText] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("https://flask-production-cbf0.up.railway.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_form_text: text }),
      mode: "cors",
    }).catch((error) => {
      console.error("Network error:", error);
    });

    if (response && response.ok) {
      const data = await response.json();
      console.log(data);
      setResults(data);
    } else {
      console.error("Server error:", response && response.status);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {results == null && (
        <Typography fontSize={30} fontStyle={'italic'} color={'grey'}>I'm Varro, an ancient Roman scholar. Ask me anything.</Typography>
      )}
      <Box width="800px" mx="auto">
        <Box sx={{ height: "70px" }} />
        <form onSubmit={handleSubmit}>
          <Stack position="relative">
            <Box>
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                placeholder="Learn about a topic with a short prompt or evaluate a long-form text excerpt"
                InputProps={{
                  style: {
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 15
                  },
                }}
              />
            </Box>
            <IconButton
              type="submit"
              color="primary"
              sx={{ position: "absolute", bottom: 8, right: 8, color: '#B1B9FF' }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
      </Box>
      {isLoading && (
        <Box>
          <CircularProgress />
          <Typography fontStyle={'italic'} color={'grey'}>thinking...</Typography>
        </Box>
      )}
      {results && !isLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "#f5f5f5",
              borderRadius: "15px",
              width: "80%",
              mt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontSize={25} variant="h6">
                <strong>Synopsis</strong>
              </Typography>
              <Box sx={{ height: "20px" }} />
              <Box sx={{ p: 1, textAlign: "left" }}>
                <Typography fontSize={20}>{results["tldr"]}</Typography>
              </Box>
            </Box>
            <SentimentBars
              pos={results["sentiment"]["pos"]}
              neu={results["sentiment"]["neu"]}
              neg={results["sentiment"]["neg"]}
              first={true}
            />
          </Box>

          {Object.keys(results)
            .filter((key) => key !== "tldr" && key !== "sentiment")
            .map((key) => (
              <Accordion
                sx={{
                  p: 2,
                  bgcolor: "#f5f5f5",
                  borderRadius: "15px",
                  width: "80%",
                  mt: 2,
                }}
                key={key}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box display="flex" flexDirection="column">
                    <Link
                      href={results[key]["url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="h5" align="center">
                        {results[key]["title"]}
                      </Typography>
                    </Link>
                    <Box sx={{ height: "50px" }} />
                    {results[key]["tldr"] != null && (
                      <Box sx={{ textAlign: "left" }}>
                        <Typography fontWeight="fontWeightBold">
                          {results[key]["tldr"]}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ height: "30px" }} />
                    {results[key]["journal"] != null && (
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          fontWeight="fontWeightBold"
                          display="inline"
                        >
                          Journal:{" "}
                        </Typography>
                        <Typography display="inline">
                          {results[key]["journal"]}
                        </Typography>
                      </Box>
                    )}
                    {(results[key]["citationCount"] != null ||
                      results[key]["referenceCount"] != null) && (
                      <Box sx={{ textAlign: "left" }}>
                        {results[key]["citationCount"] != null && (
                          <>
                            <Typography fontStyle="italic" display="inline">
                              {results[key]["citationCount"]} Citations
                            </Typography>
                            {results[key]["referenceCount"] != null && (
                              <Typography fontStyle="italic" display="inline">
                                ,{" "}
                              </Typography>
                            )}
                          </>
                        )}
                        {results[key]["referenceCount"] != null && (
                          <Typography fontStyle="italic" display="inline">
                            {results[key]["referenceCount"]} References
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>
                  {results[key]["sentiment_scores"] != null && (
                    <Box display="flex" justifyContent="center">
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <SentimentBars
                          pos={results[key]["sentiment_scores"]["pos"]}
                          neu={results[key]["sentiment_scores"]["neu"]}
                          neg={results[key]["sentiment_scores"]["neg"]}
                        />
                      </Box>
                    </Box>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  {results[key]["Authors"] != null && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="left"
                    >
                      {results[key]["Authors"] != null && (
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            fontWeight="fontWeightBold"
                            display="inline"
                            fontStyle={"italic"}
                          >
                            Authors:{" "}
                          </Typography>
                          <Typography display="inline" fontStyle={"italic"}>
                            {results[key]["Authors"]}
                          </Typography>
                        </Box>
                      )}
                      {results[key]["Flesch Reading Ease Test Score"] !=
                        null && (
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            fontWeight="fontWeightBold"
                            display="inline"
                            fontStyle={"italic"}
                          >
                            Flesch Reading Ease Test Score:{" "}
                          </Typography>
                          <Typography display="inline" fontStyle={"italic"}>
                            {results[key]["Flesch Reading Ease Test Score"]} /
                            100.0
                          </Typography>
                          <Box sx={{ width: 300 }}>
                            <Slider
                              defaultValue={[
                                results[key]["Flesch Reading Ease Test Score"],
                              ]}
                              step={0.1}
                              marks
                              min={0}
                              max={50}
                              valueLabelDisplay="auto"
                              disabled={true}
                              sx={{
                                "&.Mui-disabled": {
                                  color: "#B1B9FF",
                                },
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography fontSize={12} display="inline" textAlign="left" sx={{ marginTop: '-10px' }}>
                                Advanced
                              </Typography>
                              <Typography fontSize={12} display="inline" textAlign="right" sx={{ marginTop: '-10px' }}>
                                Easy
                              </Typography>
                            </div>
                          </Box>
                        </Box>
                      )}
                      <Box sx={{ height: "20px" }} />
                      {results[key]["Abstract"] != null && (
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            fontWeight="fontWeightBold"
                            display="inline"
                            fontStyle={"italic"}
                          >
                            Abstract:{" "}
                          </Typography>
                          <Typography display="inline" fontStyle={"italic"}>
                            {results[key]["Abstract"]}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          <Box sx={{ height: "50px" }} />
        </Box>
      )}
    </div>
  );
}

export default Home;
