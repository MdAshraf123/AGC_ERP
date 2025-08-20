import React, { forwardRef, useContext, useEffect, useState } from "react";
import close from "./assets/close.png";
import userimg from "./assets/user.png";
import { MyContext } from "./MyContext.jsx";

import { NavLink, Link, useNavigate } from "react-router-dom";
import "./SideBar.css";

const SideBar = (props) => {
  const {
    islogin,
    setIslogin,
    user,
    isAccessTokenValid,
    refresh,
    logout,
    extractdata,
    userData,
  } = useContext(MyContext);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (islogin) {
      setUsername(userData.name);
    }
  }, []);
  ////ref={ref} style={{ display: "none" }}
// user().then((data) => {
//         setUsername(() => {
//           return data.name;
//         });
//       });

  return (
    <>
      <div className="side-bar">
        <div className="close">
          <button className="ctrl-close" onClick={() => props.setIsOpen(false)}>
            <img src={close} alt="closeBtn" />
          </button>
          <img className="profile-img" src={userimg} alt="user" />
          <p className="user-name">
            <b>{username}</b>
          </p>
        </div>
        <div className="btns-container">
          {islogin ? (
            <>
              <div className="user">
                <div>
                  <h6>User</h6>
                </div>
                <ul>
                  <li>
                    <NavLink to="/profile" className="pannel-buttons">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/resetpassword" className='pannel-buttons' onClick={() => { props.setIsOpen(false)}} >
                      Reset password
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="academics">
                <div>
                  <h6>Academics</h6>
                </div>
                <ul>
                  {extractdata().role === "faculty" ? (
                    <>
                      <li>
                        <Link
                          to="/edashboard"
                          className="pannel-buttons"
                          onClick={() => props.setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="pannel-buttons">
                          Take leave
                        </Link>
                      </li>
                      <li>
                        <Link to="calender" className="pannel-buttons" onClick={() => props.setIsOpen(false)}>                          
                            Academic Calender                        
                        </Link>
                      </li>                     
                    </>
                  ) : (
                    <>
                      {extractdata().role === "student" ? (
                        <>
                          <li>
                            <Link to="" className="pannel-buttons">
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <a href="">
                              <button className="pannel-buttons">
                                Assignments
                              </button>
                            </a>
                          </li>
                          <li>
                            <Link to="calender" className="pannel-buttons" onClick={() => props.setIsOpen(false)}> Academic Calender </Link>
                          </li>
                          <li>
                            <a href="">
                              <button className="pannel-buttons">
                                Suplies
                              </button>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <button className="pannel-buttons">Result</button>
                            </a>
                          </li>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </ul>
              </div>

              <div className="academics">
                <div>
                  <h6>Other</h6>
                </div>
                <ul>
                  <li>
                    <button
                      className="pannel-buttons"
                      onClick={() => {
                        logout(navigate);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li>
                  <button
                    className={"pannel-buttons"}
                    onClick={() => {
                      props.setIsOpen(false);
                      props.setIsLoginOpen(true);
                    }}
                  >
                    Login
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SideBar;
