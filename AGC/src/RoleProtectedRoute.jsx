import { MyContext } from "./MyContext";
import { useContext } from 'react';
import { Navigate } from "react-router-dom";


const RoleProtectedRoute=({allowedRoles, children})=>{
    const { extractdata }= useContext(MyContext);
    
    console.log(extractdata().role);
    if( !extractdata().role || !allowedRoles.includes( extractdata().role )){
        return <Navigate to="/"/>;
    }

    return children;
}
export default RoleProtectedRoute;