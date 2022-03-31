import 'bootstrap/dist/css/bootstrap.css'
import Achievement from './Achievement'
import badgeTmp from '../img/badgePlaceHolder.png'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'



const Achievements = () => {

    return (
        <div className='overview col-10'>
            <Achievement badge={badgeTmp} donut={<Donut total={2} complete={5} size={150}></Donut>} title="Place Holder 1"
                description="This is an example of an achievement"/>
            <Achievement badge={badgeTmp} donut={<Donut total={4} complete={5} size={150}></Donut>} title="Place Holder 2"
            description="This is an example of an achievement"/>
            <UnlockProgress complete={3} total={5}></UnlockProgress>
        </div>
    );
  }
  
  export default Achievements