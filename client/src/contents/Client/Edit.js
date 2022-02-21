import { useState } from "react";
import { Add, Form } from "./Add";

export const Edit = ({ onClose,data }) => {
    const [name, setName] = useState(data.name);
    const [contact, setContact] = useState(data.contact);
    const [description, setDescription] = useState(data.description);

    const setToDefeault = () => {
        setName("");
        setDescription("");
        setContact("");
    }

    const submitForm = (e) => {
        e.preventDefault();
        // handleSubmission({
        //     name,
        //     description,
        //     contact
        // });
        setToDefeault();
    }


    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h3>Edit client</h3>
                    <button type="button" class="close" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                {/* <Edit data={data} /> */}
                <form onSubmit={submitForm}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name of client" onChange={e => setName(e.target.value)}
                            value={name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <input type="text" className="form-control" id="contact" placeholder="Enter contact details" onChange={e => setContact(e.target.value)}
                            value={contact} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Description</label>
                        <textarea className="form-control" rows={5} onChange={e => setDescription(e.target.value)} value={description}></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
}