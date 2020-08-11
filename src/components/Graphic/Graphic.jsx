import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { dateFormatIso8601Chort } from "../../helpers";

const Graphic = (props) => {
    const { data, beginRange, endRange } = props;
    const arrayDate = data.map(({ Date }) => dateFormatIso8601Chort(Date));
    const arrayCases = data.map(({ Cases }) => Cases);
    const options = {
        chart: {
            height: (3 / 4) * 100 + "%",
            type: "line",
        },
        title: {
            text: "Gráfico",
        },
        xAxis: {
            categories: arrayDate,
        },
        yAxis: {
            title: {
                text: "Total Case",
            },
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },
        series: [
            {
                name: "",
                data: arrayCases,
            },
        ],
    };
    console.log(options, "ATR");
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Graphic;
