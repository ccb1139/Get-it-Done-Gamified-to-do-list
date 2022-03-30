import 'bootstrap/dist/css/bootstrap.css'
import Achievement from './Achievement'
import badgeTmp from '../img/badgePlaceHolder.png'
import donutPH from '../img/DonutPlaceHolder.png'
import UnlockProgress from './UnlockProgress'
import Wheelspin from './Wheelspin'


const Achievements = () => {

    return (
        <div className='overview col-10'>
            <Achievement badge={badgeTmp} donut={donutPH} title="Place Holder 1"
                description="This is an example of an achievement"/>
            <Achievement badge={badgeTmp} donut={donutPH} title="Place Holder 2"
            description="This is an example of an achievement"/>
            <UnlockProgress complete={3} total={5}></UnlockProgress>
        </div>
    );
  }
  
  export default Achievements