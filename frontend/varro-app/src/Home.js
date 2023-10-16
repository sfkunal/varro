import React, { useState, } from "react";
import {
  TextField,
  Box,
  Typography,
  Link,
  CircularProgress,
  Slider,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SentimentBars from "./SentimentBars";

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function Home() {
  const [text, setText] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      "https://flask-production-cbf0.up.railway.app/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ long_form_text: text }),
        mode: "cors",
      }
    ).catch((error) => {
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
        <Box width="95%" style={{ margin: "0 auto" }}>
          <Typography fontSize={30} fontStyle={"italic"} color={"grey"}>
            I'm Varro, an ancient Roman scholar. Ask me anything.
          </Typography>
        </Box>
      )}
      <Box width="100%" mx="auto">
        <Box sx={{ height: "60px" }} />
        <form onSubmit={handleSubmit}>
          <Box position="relative" width="70%" sx={{ margin: "0 auto" }}>
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
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: 15,
                  width: "100%",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      color="primary"
                      sx={{ color: "#B1B9FF" }}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </form>
      </Box>
      {isLoading && (
        <Box>
          <CircularProgress />
          <Typography fontStyle={"italic"} color={"grey"}>
            thinking...
          </Typography>
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
            width: isMobileDevice() ? "100%" : "80%",
            margin: "0 auto",
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
              flexDirection: isMobileDevice() ? 'column' : 'row'
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
                <Typography fontSize={isMobileDevice() ? 15 : 20}>{results["tldr"]}</Typography>
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
                      sx={{margin: "0 auto",}}
                      
                    >
                      <Typography variant="h5" align="center" fontSize={isMobileDevice() ? 16 : 22}>
                        {results[key]["title"]}
                      </Typography>
                    </Link>
                    <Box sx={{ height: "50px" }} />
                    {results[key]["tldr"] != null && (
                      <Box sx={{ textAlign: "left" }}>
                        <Typography fontWeight="fontWeightBold" fontSize={isMobileDevice() ? 12 : 16}>
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
                          fontSize={isMobileDevice() ? 12 : 16}
                        >
                          Journal:{" "}
                        </Typography>
                        <Typography display="inline" fontSize={isMobileDevice() ? 12 : 16}>
                          {results[key]["journal"]}
                        </Typography>
                      </Box>
                    )}
                    {(results[key]["citationCount"] != null ||
                      results[key]["referenceCount"] != null) && (
                      <Box sx={{ textAlign: "left" }}>
                        {results[key]["citationCount"] != null && (
                          <>
                            <Typography fontStyle="italic" display="inline" fontSize={isMobileDevice() ? 12 : 16}>
                              {results[key]["citationCount"]} Citations
                            </Typography>
                            {results[key]["referenceCount"] != null && (
                              <Typography fontStyle="italic" display="inline" fontSize={isMobileDevice() ? 12 : 16}>
                                ,{" "}
                              </Typography>
                            )}
                          </>
                        )}
                        {results[key]["referenceCount"] != null && (
                          <Typography fontStyle="italic" display="inline" fontSize={isMobileDevice() ? 12 : 16}>
                            {results[key]["referenceCount"]} References
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>
                  {isMobileDevice() === false && results[key]["sentiment_scores"] != null && (
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
                {isMobileDevice() === true && results[key]["sentiment_scores"] != null && (
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
                            fontSize={isMobileDevice() ? 12 : 16}
                          >
                            Authors:{" "}
                          </Typography>
                          <Typography display="inline" fontStyle={"italic"} fontSize={isMobileDevice() ? 12 : 16}>
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
                            fontSize={isMobileDevice() ? 12 : 16}
                          >
                            Flesch Reading Ease Test Score:{" "}
                          </Typography>
                          <Typography display="inline" fontStyle={"italic"} fontSize={isMobileDevice() ? 12 : 16}>
                            {results[key]["Flesch Reading Ease Test Score"]} /
                            100.0
                          </Typography>
                          <Box sx={{ width: isMobileDevice() ? 150 : 300, margin: '0 auto' }}>
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
                              <Typography
                                fontSize={12}
                                display="inline"
                                textAlign="left"
                                sx={{ marginTop: "-10px" }}
                              >
                                Advanced
                              </Typography>
                              <Typography
                                fontSize={12}
                                display="inline"
                                textAlign="right"
                                sx={{ marginTop: "-10px" }}
                              >
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
                            fontSize={isMobileDevice() ? 12 : 16}
                          >
                            Abstract:{" "}
                          </Typography>
                          <Typography display="inline" fontStyle={"italic"} fontSize={isMobileDevice() ? 12 : 16}>
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
