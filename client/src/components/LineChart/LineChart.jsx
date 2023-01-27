import { useTheme, Box, Button, Typography, CircularProgress, LinearProgress } from "@mui/material";
import { Line, ResponsiveLine } from "@nivo/line"
import { useEffect } from "react";
import { tokens } from "../../theme";
import { useState } from "react";

const LineChart = ({ historicalData, onReceiveChartPeriod }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState(null);
    const [minYValue, setMinYValue] = useState(null);
    const [maxYValue, setMaxYValue] = useState(null);
    const [delta, setDelta] = useState(null);
    const [dataLength, setDataLength] = useState(null);
    const [tickersValue, setTickersValue] = useState('every 5 minutes');
    const [hour, setHour] = useState(true);
    const [day, setDay] = useState(false);
    const [week, setWeek] = useState(false);
    const [emptyChart, setEmptyChart] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);


    const handlePeriod = (e) => {
        if (e.target.innerText === '1H') {
            setHour(true);
            setDay(false);
            setWeek(false);
            onReceiveChartPeriod('minute');
        } else if (e.target.innerText === '1D') {
            setHour(false);
            setDay(true);
            setWeek(false);
            onReceiveChartPeriod('hour');
        } else if (e.target.innerText === '1W') {
            setHour(false);
            setDay(false);
            setWeek(true);
            onReceiveChartPeriod('day');
        }
    }


    useEffect(() => {
        setWidth(window.innerWidth);
        historicalData && setData(historicalData);
        setEmptyChart(false);
        if (dataLength <= 1) {
            setEmptyChart(true);
        }

        // define maximum and minimum values for y axis
        data && setDelta(Math.abs(Math.max(...historicalData.map((item) => item.y)) - Math.min(...historicalData.map((item) => item.y))));
        data && setMinYValue(Math.min(...historicalData.map((item) => item.y)) - 5 * delta);
        data && setMaxYValue(Math.max(...historicalData.map((item) => item.y)) + 5 * delta);
        // define length of data array
        data && setDataLength(historicalData.length);

        if (hour === true) {
            if (width <= 500) {
                return setTickersValue('every 20 minutes');
            } else {
                if (dataLength <= 12) {
                    setTickersValue('every 1 minutes');
                } else if (dataLength > 12 && dataLength <= 24) {
                    setTickersValue('every 2 minutes');
                } else if (dataLength > 24 && dataLength <= 36) {
                    setTickersValue('every 5 minutes');
                } else {
                    return setTickersValue('every 10 minutes');
                }
            }

        } else if (day === true) {
            if (width <= 500) {
                return setTickersValue('every 8 hours');
            } else {
                if (dataLength <= 12) {
                    setTickersValue('every 2 hour');
                } else if (dataLength > 12 && dataLength <= 24) {
                    setTickersValue('every 4 hours');
                } else if (dataLength > 24 && dataLength <= 48) {
                    setTickersValue('every 4 hours');
                } else {
                    return setTickersValue('every 8 hours');
                }
            }
        } else if (week === true) {
            if (width <= 500) {
                return setTickersValue('every 3 days');
            } else {
                if (dataLength <= 7) {
                    setTickersValue('every 1 day');
                } else if (dataLength > 12 && dataLength <= 24) {
                    setTickersValue('every 2 days');
                } else if (dataLength > 24 && dataLength <= 48) {
                    setTickersValue('every 4 days');
                } else {
                    return setTickersValue('every 2 days');
                }
            }

        }

    }, [historicalData, data, dataLength, hour, day, week, width])

    return (
        <Box position='relative' width="100%" height="100%"  >
            <Box position="absolute" top='0px' left='300' display="flex" width="100%" height="10%" alignItems="end" justifyContent="end" zIndex="1" >
                <Button sx={{ backgroundColor: hour ? colors.blueAccent[500] : colors.primary[500], color: colors.grey[100], fontSize: '10px', minWidth: '30px', padding: '0px 0px 0px 0px', '&:hover': { backgroundColor: colors.blueAccent[500] } }} onClick={handlePeriod} >1H</Button>
                <Button sx={{ backgroundColor: day ? colors.blueAccent[500] : colors.primary[500], color: colors.grey[100], fontSize: '10px', minWidth: '30px', padding: '0px 0px 0px 0px', '&:hover': { backgroundColor: colors.blueAccent[500] } }} onClick={handlePeriod} >1D</Button>
                <Button sx={{ backgroundColor: week ? colors.blueAccent[500] : colors.primary[500], color: colors.grey[100], fontSize: '10px', minWidth: '30px', padding: '0px 0px 0px 0px', mr: "20px", '&:hover': { backgroundColor: colors.blueAccent[500] } }} onClick={handlePeriod} >1W</Button>
            </Box >
            {!emptyChart && <Box width="100%" height="100%">
                {data && <ResponsiveLine
                    data={[
                        {
                            id: 'positive',
                            data: data ? data : [
                                { x: '2022-01-01 01:00:00', y: 111 },
                            ]
                        },
                    ]}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: colors.grey[600],
                                },
                            },
                            legend: {
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: colors.grey[600],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                        },
                        tooltip: {
                            container: {
                                color: colors.grey[300],
                                background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[700]} 90%)`,
                            },
                        },
                    }}
                    margin={{ top: 20, right: 20, bottom: 30, left: 45 }}
                    xScale={{ type: 'time', format: '%Y-%m-%d %H:%M:%S', useUTC: false, precision: "second" }} //, format: '%Y-%m-%d', useUTC: false, precision: 'day' 
                    xFormat="time:%Y-%m-%d %H:%M:%S"
                    yScale={{
                        type: 'linear',
                        min: minYValue,
                        max: maxYValue,
                        stacked: false,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: '%H:%M:%S',
                        tickValues: tickersValue,
                        legendOffset: -12,
                    }}
                    axisLeft={{
                        format: value => {
                            if (value >= 1000 && value < 1000000) {
                                return `$${(value / 1000).toFixed(0)}K`;
                            } else if (value >= 1000000) {
                                return `$${(value / 1000000).toFixed(0)}KK`;
                            } else {
                                return value;
                            }
                        },
                        orient: 'left',
                        tickSize: 3,
                        tickPadding: 3,
                        tickRotation: 0,
                        tickValues: 5,
                        legend: '',
                        legendOffset: 0,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    colors={['#d6ff33', 'rgb(44, 17, 96)']}
                    lineWidth={2}
                    enablePoints={false}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaBaselineValue={minYValue}
                    areaBlendMode="overlay"
                    crosshairType="cross"
                    enableSlices={false}
                    useMesh={true}
                    legends={[]}
                />}
            </Box>}
            {emptyChart && <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">

                <CircularProgress sx={{ color: colors.grey[500], ml: '2rem' }} />
                {hour && <Typography variant="h6" color="textSecondary" sx={{ ml: '2rem', mr: 'rem' }} >Chart will appear in one minute after portfolio creation</Typography>}
                {day && <Typography variant="h6" color="textSecondary" sx={{ ml: '2rem', mr: '1rem' }} >Wait one hour for updates...</Typography>}
                {week && <Typography variant="h6" color="textSecondary" sx={{ ml: '2rem', mr: '1rem' }} >Wait one day for updates...</Typography>}
                {/* {hour && <Typography variant="h6" color="textSecondary" >One hour chart will be available in 1 minute after portfolio creation... </Typography>}
                {day && <Typography variant="h6" color="textSecondary" >One day chart will be available in 1 hour after portfolio creation... </Typography>}
                {week && <Typography variant="h6" color="textSecondary" >One week chart will be available in 1 day after portfolio creation... </Typography>} */}
            </Box>}
        </Box >
    );
};

export default LineChart;