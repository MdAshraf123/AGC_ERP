import React from 'react';
import './home.css';
import m2 from './assets/m2.jpeg';
import m3 from './assets/m3.jpeg';
import m4 from './assets/m4.jpeg';
import f1 from './assets/f1.jpeg';
import f2 from './assets/f2.jpeg';
import f3 from './assets/f3.jpeg';
import agc from './assets/agc.jpg';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext';


const Home=()=>{
    const navigate=useNavigate();
    const [is_open, setIsOpen]=useState(false);
    const { extractdata }=useContext(MyContext);
    useEffect(()=>{
        if(localStorage.getItem('access')){
            if(extractdata().role==='faculty'){
                navigate('/edashboard',{replace: true});
            }
            else if(extractdata().role==='student'){
                navigate('/dashboard',{replace: true});
            }
        }
        
    },[])
    function handleContact(e){
        setIsOpen(!is_open);
    }
    return(
        <div className="p-10 bg-white  container">
            <div className={`contacts ${ is_open? "show": "none"}`}>
                <div className='contact-links' >
                <a href=""><span className="fa fa-whatsapp"></span></a> {/*https://wa.me/8872009950 */}
                <a href=""><span className="fa fa-phone"></span></a> {/*tel:+918872009951*/}
                <a href=""><span className="fa fa-facebook"></span></a> {/* https://www.facebook.com/AGC.AMRITSAR.PUNJAB/*/}
                <a href=""><span className="fa fa-twitter"></span></a> {/* https://twitter.com/AGCAmritsar*/}
                <a href=""><span className="fa fa-instagram"></span></a>{/*https://www.instagram.com/agcamritsar/ */}
                <a href=""><span className="fa fa-linkedin"></span></a> {/*https://www.addtoany.com/add_to/linkedin?linkurl=https%3A%2F%2Fwww.agcamritsar.in%2Fblogsdetail.aspx%3Fi%3D61&amp;linkname=Amritsar%20Group%20Of%20Colleges&amp;linknote= */}
                </div>
                <label className="openClose" htmlFor="btn-open-close" onClick={(e)=>handleContact(e)}></label>
                <input type="checkbox" id="btn-open-close" hidden/>
            </div>
            <div className="aboutAgc">
                <h3>Amritsar Group Of Colleges</h3>
                <p>
                    Amritsar Group of Colleges with its world-magnificence environment and superior learning system extends a warm welcome to the scholars from all around the globe who seek quality education in India to achieve a lucid profession.
                </p>
                <img className='agcimg' src={agc}></img>
                <p>
                The institution is ranked among the best engineering colleges in North India. It is approved by the National Board of Accreditation (NBA)(2009-12 & 2016-18) and the National Assessment & Accreditation Council (NAAC) with Grade ‘A’. Additionally, the institute has earned diverse ranks no longer simplest in Punjab but in North India, forging it one of the best colleges in Punjab. AGC is affiliated with Inder Kumar Gujral Punjab Technical University (IKG PTU), Kapurthala (for engineering and Management courses) whereas the Pharmacy courses are affiliated to IKGPTU and PSBTE & IT. And, for the lately added courses under law i.e. BA LLB and LLB, the institute is affiliated with Guru Nanak Dev University (GNDU), Amritsar.
                </p>
            </div>
            <div className='Image-Container'> 
               <h4>10+ Scholorships</h4>
               <p>Students are not grabing opporchunities</p>
            </div>
            <h5>Our top alumines</h5>
            <div className='top-alumini'>
                
                <img src={m2} alt="" style={{"--bg":"red"}} />
                <img src={f3} alt="" style={{"--bg":"blue"}} />
                <img src={m4} alt="" style={{"--bg":"cyan"}} />
                <img src={f1} alt="" style={{"--bg":"yellow"}} />
                <img src={f2} alt="" style={{"--bg":"pink"}} />
                <img src={m3} alt="" style={{"--bg":"darkRed"}} />
            </div>
        </div>
    )
}
export default Home;