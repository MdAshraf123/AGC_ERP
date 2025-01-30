import React from 'react'
import './BookIssued.css'
const BookIssued=()=>{
    return(
        <>
        {/* <!-- On tables --> */}
        <table className="table table-striped-columns">
            <thead></thead>
            <tbody>
                <tr className="">
                    <th className="">Book</th>
                    <th className="">Issue</th>
                    <th className="">Expire</th>
                    <th className=''>Fine</th>
                </tr>
                <tr className="">
                    <td className="col-name">NP Bali</td>
                    <td className="">15/01/25</td>
                    <td className="">31/01/25</td>
                    <td className="">0 Rs.</td>
                </tr>
                <tr className="">
                    <td className="col-name">Ramanujan</td>
                    <td className="">15/01/25</td>
                    <td className="">31/01/25</td>
                    <td className="">0 Rs.</td>
                </tr>
                <tr className="">
                    <td className="col-name">Ramanujan</td>
                    <td className="">15/01/25</td>
                    <td className="">31/01/25</td>
                    <td className="">10 Rs.</td>
                </tr>
            </tbody>
        </table>
        
        
        {/* <!-- On rows --> */}
        
        {/* <tr className="table-secondary">...</tr>
        <tr className="table-success">...</tr>
        <tr className="table-danger">...</tr>
        <tr className="table-warning">...</tr>
        <tr className="table-info">...</tr>
        <tr className="table-light">...</tr>
        <tr className="table-dark">...</tr> */}
        
        {/* <!-- On cells (`td` or `th`) --> */}
        {/* <tr>
          
          <td className="table-danger">...</td>
          <td className="table-warning">...</td>
          <td className="table-info">...</td>
          <td className="table-light">...</td>
          <td className="table-dark">...</td>
        </tr> */}
        </>
    )
}
export default BookIssued;