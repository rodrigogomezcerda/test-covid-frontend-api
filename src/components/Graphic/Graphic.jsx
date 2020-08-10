import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { dateFormatIso8601Chort } from "../../helpers";

const Graphic = (props) => {
    const { data, beginRange, endRange } = props;
    const arrayData = data.map(({ Cases, Date }) => {
        const dateFormat = dateFormatIso8601Chort(Date);
        return { Cases, dateFormat };
    });

    const options = {
        chart: {
            height: (3 / 4) * 100 + "%",
            type: "line",
        },
        title: {
            text: "Gráfico",
        },
        xAxis: {
            categories: ["01/08", "02/08", "03/08", "04/08", "05/08", "06/08"],
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
                data: [980, 600, 900, 750, 350, 920],
            },
        ],
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Graphic;
