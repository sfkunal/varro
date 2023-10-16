import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';

const xLabels = ['—', 'O', '+'];

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

const chartSetting = {
  xAxis: [
    {
      scaleType: 'band',
      data: xLabels,
    },
  ],
  width: 225,
  height: 225,
};



export default function SentimentBars({pos, neu, neg, first}) {
	const d = [neg, neu, pos]
  return first ? (
		<Box
			sx={{
				p: 1,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography variant="h6">Input Sentiment Analysis</Typography>
			<BarChart
				series={[
					{data: d, id: 'dataId', color: '#B1B9FF'}
				]}
				{...chartSetting}
			/>
			{Math.abs(pos - neg) > 0.2 ? (
              <Typography fontStyle={"italic"}>
                The language sentiment of your input correlates to a potential for
                bias on this given topic.
              </Typography>
            ) : (
              <Typography variant="h7" fontStyle={"italic"}>
                The language sentiment of your input is quite neutral.
              </Typography>
            )}
		</Box>
  ):(
		<Box
			sx={{
				p: 1,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography variant="h6" fontSize={isMobileDevice() ? 16 : 20}>Sentiment Analysis</Typography>
			<BarChart
				series={[
					{data: d, id: 'dataId', color: '#B1B9FF'}
				]}
				{...chartSetting}
			/>
			{Math.abs(pos - neg) > 0.2 ? (
              <Typography variant="h7" fontStyle={"italic"} fontSize={isMobileDevice() ? 12 : 15}>
                Given the language sentiment of this article, there is a potential for bias
                on this given topic.
              </Typography>
            ) : (
              <Typography variant="h7" fontStyle={"italic"} fontSize={isMobileDevice() ? 12 : 15}>
                Given the language sentiment of this article, there is a low chance for
                bias on this given topic.
              </Typography>
            )}
		</Box>
	);
}
