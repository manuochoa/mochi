import { useState } from "react";

export default function useChart() {
    const [chart, setChart] = useState([
        { title: "Presale", value: 48, color: "#4E97B9", id: 1, active: false },
        { title: "Private Sale", value: 13.2, color: "#3CA839", id: 3, active: false },
        { title: "Team", value: 5, color: "#F2A848", id: 0, active: false },
        { title: "Liquidity", value: 33.8, color: "#CB352E", id: 2, active: false },
    ]);

    function handleChartArray(segmentIndex) {
        setChart(state => state.map((item, index) => ({ ...item, active: index === segmentIndex })));
    }

    return {
        chart, handleChartArray
    }
}
