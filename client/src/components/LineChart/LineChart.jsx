import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line"
import { mockLineData } from "../../data/MockData";
import { tokens } from "../../theme";

const LineChart = () => {
    // 2:51:39
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ResponsiveLine
            data={[
                {
                    id: 'positive',
                    data: [
                        { x: '2022-01-01', y: 111 },
                        { x: '2022-01-02', y: 100 },
                        { x: '2022-01-03', y: 31 },
                        { x: '2022-01-04', y: 51 },
                        { x: '2022-01-05', y: 71 },
                        { x: '2022-01-06', y: 221 },
                        { x: '2022-01-07', y: 321 },
                        { x: '2022-01-08', y: 101 },
                        { x: '2022-01-09', y: 151 },
                        { x: '2022-01-10', y: 63 },
                        { x: '2022-01-11', y: 311 },
                        { x: '2022-01-12', y: 213 },
                        { x: '2022-01-13', y: 255 },
                        { x: '2022-01-14', y: 111 },
                        { x: '2022-01-15', y: 151 },
                        { x: '2022-01-16', y: 171 },
                        { x: '2022-01-17', y: 21 },
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
                        color: colors.grey[600],
                    },
                },
            }}
            margin={{ top: 20, right: 40, bottom: 30, left: 50 }}
            xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }} //, format: '%Y-%m-%d', useUTC: false, precision: 'day' 
            xFormat="time:%Y-%m-%d"
            yScale={{
                type: 'linear',
                min: 0,
                max: "auto",
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: '%b %d',
                tickValues: 'every 2 days',
                legendOffset: -12,
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 3,
                tickPadding: 3,
                tickRotation: 0,
                legend: '',
                legendOffset: 0,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            colors={['rgb(97, 205, 187)', 'rgb(244, 117, 96)']}
            lineWidth={2}
            enablePoints={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBlendMode="overlay"
            crosshairType="cross"
            enableSlices={false}
            useMesh={true}
            legends={[]}
        />
    );
};

export default LineChart;