import StickyNote from "./StickyNote"
import SNTmp from "../img/StickyNote.png"
import MsyBox from "../img/mysBoxPH.png"
import React from "react"


function PickOne() {
    var picked = false;

    const onClick = (boxId) => {
        if(picked) {
            return;
        }

        const box_id = boxId.target.id
        var boxPick, boxNPick1, boxNPick2;

        switch (box_id) {
            case "clickMsBox1":
                boxPick = document.getElementById("clickMsBox1");
                boxNPick1 = document.getElementById("clickMsBox2");
                boxNPick2 = document.getElementById("clickMsBox3");
                break;
            case "clickMsBox2":
                boxPick = document.getElementById("clickMsBox2");
                boxNPick1 = document.getElementById("clickMsBox1");
                boxNPick2 = document.getElementById("clickMsBox3");
                break;
            case "clickMsBox3":
                boxPick = document.getElementById("clickMsBox3");
                boxNPick1 = document.getElementById("clickMsBox1");
                boxNPick2 = document.getElementById("clickMsBox2");
                break;
        }

        boxPick.classList.add("boxClicked");
        boxNPick1.classList.add("boxNotClicked");
        boxNPick2.classList.add("boxNotClicked");
        

        boxPick.addEventListener("animationend", function (e) {
            var nc = Math.floor(Math.random()*16777215).toString(16);
            console.log(nc)
            boxPick.src = SNTmp
            boxPick.style.filter = 'opacity(0.5) drop-shadow(0 0 0 #' + nc + ')'
            boxPick.classList.remove("boxClicked")
            boxPick.classList.add("CosPicked");

            nc = Math.floor(Math.random()*16777215).toString(16);
            boxNPick1.src = SNTmp
            boxNPick1.style.filter = 'opacity(0.5) drop-shadow(0 0 0 #' + nc + ')'
            boxNPick1.classList.remove("boxNotClicked");
            boxNPick1.classList.add("CosNotPicked");

            nc = Math.floor(Math.random()*16777215).toString(16);
            boxNPick2.src = SNTmp
            boxNPick2.style.filter = 'opacity(0.5) drop-shadow(0 0 0 #' + nc + ')'
            boxNPick2.classList.remove("boxNotClicked")
            boxNPick2.classList.add("CosNotPicked");

        })

        picked = true;
    }

    return (
        <div className="col-md-10 border">
            <div className="col-md-12 border ACH-p1-Head">
                <h3>Pick one to unlock a cosmetic!</h3>
            </div>
            <div id="pickUnlock" className="cosHolder col-md-12">
                <img src={MsyBox} id="clickMsBox1" onClick={onClick}></img>
                <img src={MsyBox} id="clickMsBox2" onClick={onClick}></img>
                <img src={MsyBox} id="clickMsBox3" onClick={onClick}></img>

                
            </div>
        </div>

    )
}

export default PickOne