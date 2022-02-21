import { useState } from "react";

export const Add = ({ handleSubmission }) => {
    const [description, setDescription] = useState("");
    const [quality, setQuality] = useState("");

    const setToDefeault = () => {
        setDescription("");
        setQuality("");
    }

    const submitForm = (e) => {
        e.preventDefault();
        handleSubmission({ description, quality });
        setToDefeault();
    }
    const definedQuality = ["aUNC", "XF+", "XF", "Fine", "Used", "Poor"];
    return (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Enter description" onChange={e => setDescription(e.target.value)}
                    value={description} />
            </div>
            <div className="form-group">
                <label htmlFor="quality">Quality</label>
                <select className="form-control" id="quality" onChange={e => setQuality(e.target.value)}>
                    <option hidden>Select Quality</option>
                    {definedQuality.map((value,index) =>
                        <option key={index} value={value} active={quality === value ? true : undefined}>{value}</option>
                    )}
                </select>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>Description</th>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <th>Quality</th>
                        <td>{quality}</td>
                    </tr>

                </tbody>
            </table>


            <button type="submit" className="btn btn-primary">Add </button>

        </form>
    );
}