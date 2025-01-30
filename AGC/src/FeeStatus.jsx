import React from 'react'
import './feeStatus.css'
export default function(){
    return(
           <div className="fee-grid-cont" >
            <div className="items">
                <p><b>Total Fee</b></p>
                <p className="fee-amounts">80000.0 Rs.</p>
            </div>
            <div className="items">
            <p><b>Paid Amount</b></p>
            <p className="fee-amounts">50000.0 Rs.</p>
            </div>
            <div className="items">
            <p><b>Dues</b></p>
            <p className="fee-amounts">30000.0 Rs.</p>
            </div>
            <div className="items">
            <p><b>Late Fine</b></p>
            <p className="fee-amounts">0.0 Rs.</p>
            </div>
           </div>
    )
}