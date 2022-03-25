import 'bootstrap/dist/css/bootstrap.css'
import Achievement from './Achievement'
import badgeTmp from '../img/badgePlaceHolder.png'
import donutPH from '../img/DonutPlaceHolder.png'
import Wheelspin from './Wheelspin'


const Achievements = () => {

    return (
        <div className='overview col-10'>
            <Achievement badge={badgeTmp} donut={donutPH} title="Place Holder 1"
                description="This is an example of an achievement"/>
            <Achievement badge={badgeTmp} donut={donutPH} title="Place Holder 2"
            description="This is an example of an achievement"/>
        </div>
    );
  }
  
  export default Achievements