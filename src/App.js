// import React, { useEffect, useState } from "react";
// import * as d3 from "d3";

// const months = [
//   { name: "September", key: "-Sep-" },
//   { name: "October", key: "-Oct-" },
//   { name: "November", key: "-Nov-" }
// ];
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// function getDayOfWeek(dateStr) {
//   // dateStr: "2015-Sep-3"
//   const [year, mon, day] = dateStr.split("-");
//   const date = new Date(`${year}-${mon}-${day}`);
//   return (date.getDay() + 6) % 7; // Mon=0, Fri=4
// }
// function getWeekOfMonth(dateStr) {
//   const [year, mon, day] = dateStr.split("-");
//   const date = new Date(`${year}-${mon}-${day}`);
//   const first = new Date(date.getFullYear(), date.getMonth(), 1);
//   return Math.floor((date.getDate() + first.getDay() - 2) / 7);
// }

// const monthlyAverages = [
//   { label: "September 2015", value: 68, color: "#fdae61" },
//   { label: "October 2015", value: 77, color: "#b2bfc9" },
//   { label: "November 2015", value: 87, color: "#4575b4" }
// ];

// export default function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(process.env.PUBLIC_URL + "/room-utilization.json")
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   // Color scale: 50% (orange) to 100% (blue)
//   const colorScale = d3.scaleLinear()
//     .domain([0.5, 1])
//     .range(["#fdae61", "#4575b4"]);

//   return (
//     <div style={{ fontFamily: "sans-serif", padding: 24 }}>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div>
//           <h1>Hospital Operating Room Utilization by Day</h1>
//           <div style={{ fontSize: 20, color: "#555" }}>
//             How efficiently and accurately are we scheduling and utilizing our OR resources?
//           </div>
//           <h2 style={{ marginTop: 32 }}>Case Minutes Scheduled Accurately</h2>
//         </div>
//         <div style={{ textAlign: "right" }}>
//           <img
//             src={process.env.PUBLIC_URL + "/healthdataviz-logo.png"}
//             alt="HealthDataViz"
//             style={{ height: 100, width: 100, objectFit: "contain" }}
//           />
//         </div>
//       </div>
//       <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
//         {months.map(month => {
//           const monthData = data.filter(d => d.Date.includes(month.key));
//           // Build grid: week x day
//           const grid = Array(6).fill().map(() => Array(5).fill(null));
//           monthData.forEach(d => {
//             const week = getWeekOfMonth(d.Date);
//             const day = getDayOfWeek(d.Date);
//             if (week >= 0 && week < 6 && day >= 0 && day < 5) {
//               grid[week][day] = d;
//             }
//           });
//           return (
//             <div key={month.name}>
//               <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>{month.name}</div>
//               <table style={{ borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     {days.map(day => (
//                       <th key={day} style={{ padding: 4, fontWeight: "bold" }}>{day}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {grid.map((week, i) => (
//                     <tr key={i}>
//                       {week.map((d, j) => (
//                         <td key={j} style={{
//                           width: 80, height: 60, textAlign: "center", verticalAlign: "middle",
//                           background: d ? colorScale(d.accurate_case / d.total_case) : "#eee",
//                           color: d && (d.accurate_case / d.total_case) < 0.65 ? "#333" : "#fff",
//                           border: "1px solid #ccc",
//                           position: "relative"
//                         }}>
//                           {d ? (
//                             <div style={{ width: "100%", height: "100%", position: "relative" }}>
//                               {/* Day of month in top-left */}
//                               <span style={{
//                                 position: "absolute",
//                                 top: 4,
//                                 left: 6,
//                                 fontSize: 12,
//                                 fontWeight: "bold",
//                                 opacity: 0.7
//                               }}>
//                                 {parseInt(d.Date.split("-")[2], 10)}
//                               </span>
//                               <div style={{ fontSize: 20, fontWeight: "bold" }}>
//                                 {Math.round(100 * d.accurate_case / d.total_case)}%
//                               </div>
//                               <div style={{ fontSize: 14 }}>
//                                 ({d.accurate_case}/{d.total_case})
//                               </div>
//                             </div>
//                           ) : ""}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           );
//         })}
//       </div>
//       {/* Color legend */}
//       <div style={{ marginTop: 32, display: "flex", alignItems: "center" }}>
//         <div style={{
//           width: 200, height: 20,
//           background: "linear-gradient(to right, #fdae61, #4575b4)"
//         }} />
//         <div style={{ marginLeft: 8 }}>50%</div>
//         <div style={{ flex: 1 }} />
//       </div>
//       {/* Monthly averages */}
//       <div style={{ marginTop: 16, display: "flex", gap: 32 }}>
//         {monthlyAverages.map(avg => (
//           <div key={avg.label} style={{
//             background: avg.color,
//             color: "#fff",
//             padding: "8px 16px",
//             borderRadius: 4,
//             minWidth: 120,
//             textAlign: "center"
//           }}>
//             {avg.label}<br /><b>{avg.value}%</b>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// this is code for a room utilization dashboard with a dropdown to select data for different months and years.

import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const options = [
  { label: "2015-Sep", year: 2015, month: "Sep" },
  { label: "2015-Oct", year: 2015, month: "Oct" },
  { label: "2015-Nov", year: 2015, month: "Nov" },
  { label: "2021-Jan", year: 2021, month: "Jan" },
  { label: "2021-Feb", year: 2021, month: "Feb" },
  { label: "2021-Mar", year: 2021, month: "Mar" }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function getDayOfWeek(dateStr) {
  const [year, mon, day] = dateStr.split("-");
  const date = new Date(`${year}-${mon}-${day}`);
  return (date.getDay() + 6) % 7; // Mon=0, Fri=4
}
function getWeekOfMonth(dateStr) {
  const [year, mon, day] = dateStr.split("-");
  const date = new Date(`${year}-${mon}-${day}`);
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.floor((date.getDate() + first.getDay() - 2) / 7);
}

export default function App() {
  const [selected, setSelected] = useState(options[0]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selected.year === 2015) {
      d3.json(process.env.PUBLIC_URL + "/room-utilization.json").then(raw => {
        const monthKey = `-${selected.month}-`;
        setData(raw.filter(d => d.Date.includes(monthKey)));
      });
    } else {
      d3.json(process.env.PUBLIC_URL + "/room-utilization-2021.json").then(raw => {
        const monthKey = `-${selected.month}-`;
        const filtered = raw.filter(d => d.Date.includes(monthKey));
        // If there are multiple entries per date, sum them (your data is already summed)
        const grouped = {};
        filtered.forEach(d => {
          if (!grouped[d.Date]) grouped[d.Date] = { Date: d.Date, accurate_case: 0, total_case: 0 };
          grouped[d.Date].accurate_case += d.accurate_case;
          grouped[d.Date].total_case += d.total_case;
        });
        setData(Object.values(grouped));
      });
    }
  }, [selected]);

  const colorScale = d3.scaleLinear()
    .domain([0.5, 1])
    .range(["#fdae61", "#4575b4"]);

  // Build grid: week x day
  const grid = Array(6).fill().map(() => Array(5).fill(null));
  data.forEach(d => {
    const week = getWeekOfMonth(d.Date);
    const day = getDayOfWeek(d.Date);
    if (week >= 0 && week < 6 && day >= 0 && day < 5) {
      grid[week][day] = d;
    }
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Hospital Operating Room Utilization by Day</h1>
          <div style={{ fontSize: 20, color: "#555" }}>
            How efficiently and accurately are we scheduling and utilizing our OR resources?
          </div>
          <h2 style={{ marginTop: 32 }}>Case Minutes Scheduled Accurately</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <img
            src={process.env.PUBLIC_URL + "/healthdataviz-logo.png"}
            alt="HealthDataViz"
            style={{ height: 100, width: 100, objectFit: "contain" }}
          />
        </div>
      </div>
      {/* Dropdown selector */}
      <div style={{ margin: "24px 0" }}>
        <label>
          <b>Select Data: </b>
          <select
            value={selected.label}
            onChange={e => setSelected(options.find(o => o.label === e.target.value))}
            style={{ fontSize: 16, marginLeft: 8 }}
          >
            {options.map(opt => (
              <option key={opt.label} value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </label>
      </div>
      {/* Calendar grid */}
      <div>
        <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>{selected.label}</div>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {days.map(day => (
                <th key={day} style={{ padding: 4, fontWeight: "bold" }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((week, i) => (
              <tr key={i}>
                {week.map((d, j) => (
                  <td key={j} style={{
                    width: 80, height: 60, textAlign: "center", verticalAlign: "middle",
                    background: d ? colorScale(d.accurate_case / d.total_case) : "#eee",
                    color: d && (d.accurate_case / d.total_case) < 0.65 ? "#333" : "#fff",
                    border: "1px solid #ccc",
                    position: "relative"
                  }}>
                    {d ? (
                      <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <span style={{
                          position: "absolute",
                          top: 4,
                          left: 6,
                          fontSize: 12,
                          fontWeight: "bold",
                          opacity: 0.7
                        }}>
                          {parseInt(d.Date.split("-")[2], 10)}
                        </span>
                        <div style={{ fontSize: 20, fontWeight: "bold" }}>
                          {Math.round(100 * d.accurate_case / d.total_case)}%
                        </div>
                        <div style={{ fontSize: 14 }}>
                          ({d.accurate_case}/{d.total_case})
                        </div>
                      </div>
                    ) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Color legend */}
      <div style={{ marginTop: 32, display: "flex", alignItems: "center" }}>
        <div style={{
          width: 200, height: 20,
          background: "linear-gradient(to right, #fdae61, #4575b4)"
        }} />
        <div style={{ marginLeft: 8 }}>50%</div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}