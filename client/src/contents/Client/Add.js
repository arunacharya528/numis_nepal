import { useEffect, useState } from "react";

export const Add = ({ handleSubmission, data }) => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");


    const setToDefeault = () => {
        setName("");
        setDescription("");
        setContact("");
    }

    const submitForm = (e) => {
        e.preventDefault();
        handleSubmission({
            name,
            description,
            contact
        });
        setToDefeault();
    }

    return (
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
                <textarea className="form-control" rows={5} onChange={e => setDescription(e.target.value)}></textarea>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <th>Contact</th>
                        <td>{contact}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{description}</td>
                    </tr>

                </tbody>
            </table>


            <button type="submit" className="btn btn-primary">Add </button>

        </form>
    );
}