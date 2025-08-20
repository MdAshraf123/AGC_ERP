import '../cssfile/splashScreen.css';
import A_logo from '../../assets/A3.png';
const SplashScreen=()=>{
    return(
    <>
    <div className="splash-container">
        <img className="splash-logo" src={A_logo} alt="AGC" />
        <div className="bubble-loading"></div>
    </div>
    </>
    )
}
export default SplashScreen;