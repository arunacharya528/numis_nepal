import { useEffect } from "react";
import { useState } from "react";

export const Edit = ({ onClose, data, onUpdate }) => {
    const [description, setDescription] = useState('');
    const [quality, setQuality] = useState('');
    const [id, setId] = useState("");

    useEffect(() => {
        setDescription(data.description);
        setQuality(data.quality);
        setId(data._id)
    }, [data])
    const submitForm = (e) => {
        e.preventDefault();
        onUpdate({
            id: id,
            collectible: {
                description,
                quality
            }
        });
    }

    const definedQuality = ["aUNC", "XF+", "XF", "Fine", "Used", "Poor"];

    return (
        <div className="card sticky-top">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h3>Edit collectible</h3>
                    <button type="button" class="close" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={submitForm}>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" placeholder="Enter description" onChange={e => setDescription(e.target.value)}
                            value={description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quality">Quality</label>
                        <select className="form-control" id="quality" onChange={e => setQuality(e.target.value)} value={quality}>
                            <option hidden>Select Quality</option>
                            {definedQuality.map((value, index) =>
                                <option key={index} value={value}>{value}</option>
                            )}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
}