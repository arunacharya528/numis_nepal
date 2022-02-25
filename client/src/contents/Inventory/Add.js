import { useState } from "react";
import { toast } from "wc-toast";

export const BoughtForm = ({ handleSubmission, clientList, collectibleList }) => {
    const [collectibleId, setCollectibleId] = useState("");
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("booked");
    const type = "bought";

    const setToDefeault = () => {
        setCollectibleId('')
        setBuyingPrice(0)
        setSellingPrice(0)
        setQuantity(0)
        setClientId("")
        setStatus("booked")
    }
    const formValidation = () => {
        var messages = [];
        if (!collectibleId) {
            messages.push({ message: "Collectible is empty" });
        }
        if (!buyingPrice) {
            messages.push({ message: "Buying price is empty" });
        }
        if (!sellingPrice) {
            messages.push({ message: "Selling price is empty" });
        }
        if (!quantity) {
            messages.push({ message: "Quantity is empty" });
        }
        if (!clientId) {
            messages.push({ message: "Client is empty" })
        }
        return messages;
    }
    const submitForm = (e) => {
        e.preventDefault();

        const errorMessages = formValidation();
        errorMessages.map((message) => {
            toast.error(message.message)
        })
        if (errorMessages.length == 0) {
            handleSubmission({
                collectibleId,
                buyingPrice,
                sellingPrice,
                quantity,
                clientId,
                status,
                type
            });
            setToDefeault();
        }

    }

    return (

        <form onSubmit={submitForm}>
            <wc-toast position="top-right"></wc-toast>
            <div className="form-group">
                <label htmlFor="collectibleId">Select collectible</label>
                <select className="form-control" id="collectible" onChange={e => setCollectibleId(e.target.value)} required>
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
                    value={buyingPrice} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="selling_price">Selling Price</label>
                <input type="number" className="form-control" id="selling_price" placeholder="Enter your selling price" onChange={e => setSellingPrice(e.target.value)} value={sellingPrice} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" className="form-control" id="quantity" placeholder="Enter quantity" onChange={e => setQuantity(e.target.value)} value={quantity} required={true} />
            </div>

            <div className="form-group">
                <label htmlFor="client">Select client</label>
                <select className="form-control" id="client" onChange={e => setClientId(e.target.value)} required={true}>
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

export const SoldForm = ({ handleSubmission, clientList, boughtInventory }) => {

    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("booked");
    const type = "sold";
    const statusList = ["booked", "paid", "delivered"]
    const [collectibleList, setCollectibleList] = useState([]);

    const [collectible, setCollectible] = useState({ id: undefined, name: undefined });
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [maxBuyingPrice, setMaxBuyingPrice] = useState(0);
    const [maxSellingPrice, setMaxSellingPrice] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(0);


    const setToDefeault = () => {
        setCollectibleList([])
        setCollectible({ id: undefined, name: undefined })
        setBuyingPrice(0)
        setSellingPrice(0)
        setQuantity(0)
        setClientId("")
        setStatus("booked")
    }
    const formValidation = () => {
        var messages = [];
        if (!clientId) {
            messages.push({ message: "Client is empty" });
        }
        if (collectibleList.length == 0) {
            messages.push({ message: "At least one collectible has to be inserted" })
        }
        return messages;
    }
    const submitForm = (e) => {
        e.preventDefault();
        const errorMessages = formValidation();

        errorMessages.map((message) => {
            toast.error(message.message)
        })

        if (errorMessages.length == 0) {
            const collectible = collectibleList.map((collectible) => {
                return {
                    buyingPrice: collectible.buyingPrice,
                    sellingPrice: collectible.sellingPrice,
                    collectibleId: collectible.collectible.id,
                    quantity: collectible.quantity
                }
            })

            handleSubmission({ clientId, status, type, collectible })
            setToDefeault();
        }

    }

    const defaultCollectibleGroup = () => {
        setCollectible({})
        setBuyingPrice(0);
        setSellingPrice(0);
        setQuantity(0);

    }
    const removeChild = (childIndex) => {
        setCollectibleList(collectibleList.filter((collectible, index) => {
            return index != childIndex;
        }))
    }

    const handleCollectibleAddition = () => {
        setCollectibleList([...collectibleList, ...[{ "collectible": { "id": collectible.id, "name": collectible.name }, buyingPrice, sellingPrice, quantity }]])
        defaultCollectibleGroup();
    }
    return (
        <form onSubmit={submitForm}>
            <wc-toast></wc-toast>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Type</th>
                    </tr>
                    <tr>
                        <td>
                            <select className="form-control" id="client" onChange={e => setClientId(e.target.value)}>
                                <option hidden>Select a client</option>
                                {clientList.map((client, index) =>
                                    <option key={index} value={client._id} selected={client._id === clientId ? true : undefined}>{client.name}</option>)}
                            </select>
                        </td>
                        <td>
                            <select onChange={e => setStatus(e.target.value)}>
                                {statusList.map((status, index) => <option>{status}</option>)}
                            </select>
                        </td>
                        <td>{type}</td>
                    </tr>
                </tbody>
            </table>



            <table className="table">
                <tbody>
                    <tr>
                        <th>Index</th>
                        <th>Collectible</th>
                        <th>Buying Price</th>
                        <th>Selling Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    {
                        collectibleList.map((collectible, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{collectible.collectible.name}</td>
                                <td>{collectible.buyingPrice}</td>
                                <td>{collectible.sellingPrice}</td>
                                <td>{collectible.quantity}</td>
                                <td>
                                    <button type="button" class="close mx-2" onClick={e => removeChild(index)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>
                        <th>{collectibleList.length + 1}</th>
                        <td>
                            <select className="form-control" id="collectible" onChange={e => {
                                var optionElement = e.target.childNodes[e.target.selectedIndex]
                                const buyingPrice = optionElement.getAttribute('buyingprice');
                                setBuyingPrice(buyingPrice);
                                setMaxBuyingPrice(buyingPrice);

                                const sellingPrice = optionElement.getAttribute('sellingprice');
                                setSellingPrice(sellingPrice);
                                setMaxSellingPrice(sellingPrice);

                                const quantity = optionElement.getAttribute('quantity');
                                setQuantity(quantity);
                                setMaxQuantity(quantity);

                                setCollectible({ id: e.target.value, name: optionElement.innerText })

                            }}>
                                <option hidden selected>Select a collectible</option>
                                {boughtInventory.map((inventory, index) =>
                                    <option key={index} value={inventory.collectible[0]._id} buyingprice={inventory.buyingPrice} sellingprice={inventory.sellingPrice} quantity={inventory.quantity}>{inventory.collectible[0].description} ({inventory.collectible[0].quality}) </option>
                                )}
                            </select>
                        </td>
                        <td>
                            <input type="number" className="form-control" id="buying_price" placeholder="Enter buying price" onChange={e => setBuyingPrice(e.target.value)} value={buyingPrice} min="0" max={maxBuyingPrice} />
                        </td>
                        <td>
                            <input type="number" className="form-control" id="selling_price" placeholder="Enter selling price" onChange={e => setSellingPrice(e.target.value)} value={sellingPrice} min="0" max={maxSellingPrice} />
                        </td>
                        <td>
                            <input type="number" className="form-control" id="quantity" placeholder="Enter quantity" onChange={e => setQuantity(e.target.value)} value={quantity} min="0" max={maxQuantity} />
                        </td>
                        <td>
                            <div className="btn btn-sm btn-primary" onClick={handleCollectibleAddition}>Save</div>
                        </td>
                    </tr>
                </tbody>
            </table>


            <button type="submit" className="btn btn-primary">Add </button>

        </form >
    );
}