import '../cssfile/spinner.css';
const Spinner=()=>{
    return(
         <div className="my-spinner">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
}
export default Spinner;