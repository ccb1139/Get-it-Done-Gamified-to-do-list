import LandingPageSkeleton from '../img/LandingPage.png'
import Image from 'react-bootstrap/Image'
const Home = () => {
    return (
        <>
            <div className="LandingPage">
                <div>
                    <Image src={LandingPageSkeleton} fluid />
                </div> 
            </div>
        </>
    );
  }
  
  export default Home