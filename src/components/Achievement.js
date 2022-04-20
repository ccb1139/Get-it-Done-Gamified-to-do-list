import Image from 'react-bootstrap/Image'
import { Row, Col } from "react-bootstrap"
import Badge from './Badge'
import ReactTooltip from 'react-tooltip';
import '../css/Achievements.css'

const Achievement = ({ donut, badge, title, description, level, factor, max, step_req }) => {


    function levelscale(CurLevel, factor, max) {
        var levelscales = []
        var prvLevel = 0;
        var tmp = 0;
        //console.log(title)
        for (let i = 1; i < max + 1; i++) {
            tmp = Math.round((prvLevel + CurLevel) * factor);
            prvLevel = CurLevel;
            CurLevel = tmp;
            //console.log(("i: " + i + "\tcurLevel: " + CurLevel))
            levelscales.push(CurLevel)
        }
        return (levelscales)
    }

    const lvlsStr = levelscale(step_req, factor, max);

    return (
        //   Whole Card
        <div className='achv row border border-dark rounded mb-10'>
            {/* LeftSide */}
            <div className='achv-info col-lg-4 d-flex align-items-center justify-content-center border' id='achv-progress'>
                <div className='row d-flex align-items-center'>
                    <div className="col-md col-lg acvh-iholder d-flex justify-content-center">
                        {donut}
                    </div>
                    <div className="col-md col-lg acvh-iholder">
                        <Badge id="achv-badge" badge_id={badge} badge_level={level}></Badge>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className='achv-info col-lg-8' id='achv-achv-description'>
                <h1>
                    {title}
                    <div id='ach_info_popup' data-tip data-for={title}>
                        <p >i</p>
                    </div>
                    <ReactTooltip id={title} place="right" type="dark" effect="solid" >
                        <p>Level Reqs.</p>
                        {lvlsStr.map((element) => (
                            <p>{element}</p>
                        ))}
                    </ReactTooltip>
                </h1>
                <h3>{description}</h3>

            </div>

        </div>
    )
}

export default Achievement