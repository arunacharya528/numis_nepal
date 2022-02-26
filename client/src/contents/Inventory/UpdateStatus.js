import { useState } from "react";

export const UpdateStatus = ({ handleChange }) => {
    const [status, setStatus] = useState("")


    const handleStatusCange = () => {
        console.log(status)
    }

    return (
        <form className="d-flex flex-row justify-content-center align-items-center" >


            <div className="form-check mx-2">
                <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="status" id="" onClick={e => { setStatus("booked"); handleStatusCange(); }} checked={status === "booked" ? true : false} />
                    <span className="badge badge-danger">Booked</span>
                </label>
            </div>
            <div className="form-check mx-2">
                <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="status" id="" onClick={e => { setStatus("paid"); handleStatusCange() }} checked={status === "paid" ? true : false} />
                    <span className="badge badge-primary">Paid</span>
                </label>
            </div>
            <div className="form-check mx-2">
                <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="status" id="" onClick={e => { setStatus("delivered"); handleStatusCange(); }}
                        checked={status === "delivered" ? true : false}
                    />
                    <span className="badge badge-success">Delivered</span>
                </label>
            </div>

            <button type="submit" className="btn btn-primary btn-sm mt-3">OK</button>
        </form>
    );
}