import { useState } from "react";

export const Add = ({ handleSubmission, clientList, collectibleList }) => {
    const [collectibleId, setCollectibleId] = useState("");
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("booked");
    const type = "brought";

    const setToDefeault = () => {
        setCollectibleId('')
        setBuyingPrice(0)
        setSellingPrice(0)
        setQuantity(0)
        setClientId("")
        setStatus("booked")
    }

    const submitForm = (e) => {
        e.preventDefault();
        handleSubmission({
            collectibleId,
            buyingPrice,
            sellingPrice,
            quantity,
            clientId,
            status,
            type
        })
        setToDefeault();
    }

    return (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="collectibleId">Select collectible</label>
                <select className="form-control" id="collectible" onChange={e => setCollectibleId(e.target.value)}>
                    <option hidden>Select a collectible</option>
                    {collectibleList.map((collectible, index) =>
                        <option key={index} value={collectible._id} active={collectible._id === collectibleId ? true : undefined}>{collectible.description}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="buying_price">Buying Price</label>
                <input type="number" className="form-control" id="buying_price" placeholder="Enter your buying price" onChange={e => {
                    setBuyingPrice(e.target.value);
                    const sellingPrice = buyingPrice * 16;
                    setSellingPrice(sellingPrice);
                }}
                    value={buyingPrice} />
            </div>
            <div className="form-group">
                <label htmlFor="selling_price">Selling Price</label>
                <input type="number" className="form-control" id="selling_price" placeholder="Enter your selling price" onChange={e => setSellingPrice(e.target.value)} value={sellingPrice} />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" className="form-control" id="quantity" placeholder="Enter quantity" onChange={e => setQuantity(e.target.value)} value={quantity} />
            </div>

            <div className="form-group">
                <label htmlFor="client">Select client</label>
                <select className="form-control" id="client" onChange={e => setClientId(e.target.value)}>
                    <option hidden>Select a client</option>
                    {clientList.map((client, index) =>
                        <option key={index} value={client._id} active={client._id === clientId ? true : undefined}>{client.name}</option>)}
                </select>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <label>Status</label>
                    <div className="form-group">
                        <div className="form-check mr-2">
                            <input className="form-check-input" type="radio" id="bookedRadio" name="status" onChange={e => setStatus("booked")} checked={status === "booked" ? true : false} />
                            <label className="form-check-label pt-1" htmlFor="bookedRadio">
                                Booked
                            </label>
                        </div>
                        <div className="form-check mr-2">
                            <input className="form-check-input" type="radio" id="paidRadio" name="status" onChange={e => setStatus("paid")} checked={status === "paid" ? true : false} />
                            <label className="form-check-label pt-1" htmlFor="paidRadio">
                                Paid
                            </label>
                        </div>
                        <div className="form-check mr-2">
                            <input className="form-check-input" type="radio" id="deliveredRadio" name="status" onChange={e => setStatus("delivered")} checked={status === "delivered" ? true : false} />
                            <label className="form-check-label pt-1" htmlFor="deliveredRadio">
                                Delivered
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Buying Price</th>
                        <td>{buyingPrice}</td>
                    </tr>
                    <tr>
                        <th>Selling Price</th>
                        <td>{sellingPrice}</td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td>{quantity}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{status}</td>
                    </tr>
                    <tr>
                        <th>Collectible</th>
                        <td>{collectibleId}</td>
                    </tr>
                    <tr>
                        <th>Client</th>
                        <td>{clientId}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{type}</td>
                    </tr>
                </tbody>
            </table>


            <button type="submit" className="btn btn-primary">Add </button>

        </form>
    );
}