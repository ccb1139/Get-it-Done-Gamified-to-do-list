import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";

// Complete = number of tasks complete
// Total = number of tasks total
// Size = the donut is in a square div so the size of one side of the div
function Donut({complete, total, size}) {
  return (
      <div style={{padding: "15px", maxHeight: size, maxWidth: size}}>
          <CircularProgressbar 
            value={(total/complete) * 100}
            text={total + " / " + complete}
            strokeWidth={20}
            styles={buildStyles({
                pathColor:"#F8B64C",
                textColor:"black"
            })}
            >
            </CircularProgressbar>
      </div>
    
  )
}

export default Donut