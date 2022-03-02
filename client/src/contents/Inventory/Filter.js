import { useEffect } from "react";
import { useState } from "react";

export const FilterBar = ({ collectibles, clients, handleUrlQuery }) => {
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [collectible, setCollectible] = useState('')
    const [client, setClient] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');


    const handleStatusChange = (e) => {
        if (status === e.target.value) {
            setStatus('');
        } else {
            setStatus(e.target.value);
        }
    }
    const handleTypeChange = (e) => {
        if (type === e.target.value) {
            setType('')
        } else {
            setType(e.target.value)
        }
    }
    const resetFilter = (e) => {
        setCollectible('')
        setClient('')
        setFrom('')
        setTo('')
        setStatus('')
        setType('')
    }

    useEffect(() => {
        var urlQuery = [];

        if (status !== '') {
            urlQuery = [...urlQuery, ...[`status=${status}`]]
        }
        if (type !== '') {
            urlQuery = [...urlQuery, ...[`type=${type}`]]
        }
        if (collectible !== '') {
            urlQuery = [...urlQuery, ...[`collectible_id=${collectible}`]]
        }
        if (client !== '') {
            urlQuery = [...urlQuery, ...[`client_id=${client}`]]
        }
        if (from !== '') {
            urlQuery = [...urlQuery, ...[`from=${from}`]]
        }
        if (to !== '') {
            urlQuery = [...urlQuery, ...[`to=${to}`]]
        }

        const uriQuery = urlQuery.join("&");
        console.log(uriQuery);
        handleUrlQuery(uriQuery);
    }, [status, type, collectible, client, from, to])


    return (
        <div className="row d-flex align-items-end">
            <div className="col-12">{ }</div>
            <div className="col">
                <div className="mt-3">
                    <button value="default" className={"btn btn-sm btn-secondary m-2 "} onClick={resetFilter}>Reset Filter</button>
                    <div className="btn-group m-2">
                        <button onClick={handleStatusChange} value="booked" className={"btn btn-sm btn-outline-secondary " + (status == "booked" ? 'active' : '')}>Booked</button>
                        <button onClick={handleStatusChange} value="paid" className={"btn btn-sm btn-outline-secondary " + (status == "paid" ? 'active' : '')}>Paid</button>
                        <button onClick={handleStatusChange} value="delivered" className={"btn btn-sm btn-outline-secondary " + (status == "delivered" ? 'active' : '')}>Delivered</button>
                    </div>
                    <div className="btn-group m-2">
                        <button onClick={handleTypeChange} value="bought" className={"btn btn-sm btn-outline-warning " + (type == "bought" ? 'active' : '')}>Bought</button>
                        <button onClick={handleTypeChange} value="sold" className={"btn btn-sm btn-outline-success " + (type == "sold" ? 'active' : '')}>Sold</button>
                    </div>
                </div>
            </div>
            <div className="col">
                <div class="form-group">
                    <label>Collectible</label>
                    <select class="form-control" onChange={e => setCollectible(e.target.value)} value={collectible}>
                        <option value="">None</option>
                        {collectibles.map((element, index) =>
                            <option key={index} value={element._id} >{element.description}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="col">
                <div class="form-group">
                    <label for="">Client</label>
                    <select class="form-control" onChange={e => setClient(e.target.value)} value={client}>
                        <option value="">None</option>
                        {clients.map((element, index) =>
                            <option key={index} value={element._id} >{element.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="col">
                <div class="form-group">
                    <label for="from">From</label>
                    <input type="date" class="form-control" id="from" onChange={e => setFrom(e.target.value)} value={from} />
                </div>
            </div>
            <div className="col">
                <div class="form-group">
                    <label for="to" className="text-right">To</label>
                    <input type="date" class="form-control" id="to" onChange={e => setTo(e.target.value)} value={to} />
                </div>
            </div>
        </div>
    );
}