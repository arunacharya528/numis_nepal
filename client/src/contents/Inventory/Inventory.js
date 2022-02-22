import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add } from "./Add";


export const Inventory = () => {
    const uri = "http://localhost:3000/api";

    const [inventoryCount, setInventoryCount] = useState(0);
    const [inventory, setInventory] = useState([]);
    const [clients, setClients] = useState([]);
    const [collectibles, setCollectibles] = useState([]);
    const [query, setQuery] = useState({ status: undefined, type: undefined });


    const getURL = () => {
        var urlQuery = "?"
        if (query.status) {
            urlQuery += `status=${query.status}`
        }
        if (query.type) {
            urlQuery += `&type=${query.type}`
        }
        const url = `${uri}/inventory/${urlQuery}`;
        return url;
    }
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // const url = getURL();
                // console.log(url)
                const response = await fetch(getURL());
                const json = await response.json();
                setInventory(json);
                setInventoryCount(json.length);
            } catch (error) {
                console.log("error", error);
            }
        }

        const fetchClients = async () => {
            try {
                const response = await fetch(`${uri}/client`);
                const json = await response.json();

                setClients(json);
            } catch (error) {
                console.log("error", error);
            }
        }

        const fetchCollectibles = async () => {
            try {
                const response = await fetch(`${uri}/collectible`);
                const json = await response.json();
                setCollectibles(json);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchInventory();
        fetchClients();
        fetchCollectibles();
    }, [inventoryCount, query]);

    const Status = ({ value }) => {
        const bootstrapColor = (value) => {
            switch (value) {
                case "booked":
                    return "danger";
                case "paid":
                    return "primary";
                case "delivered":
                    return "success";
                default:
                    return "secondary";
            }
        }

        return <span className={"badge badge-" + bootstrapColor(value)}>{value}</span>
    }

    const Type = ({ value }) => {
        const bootstrapColor = (value) => {
            switch (value) {
                case "brought":
                    return "warning";
                case "sold":
                    return "success";
                default:
                    return "secondary";
            }
        }

        return <span className={"badge badge-" + bootstrapColor(value)}>{value}</span>
    }
    const columns = useMemo(
        () => [
            {
                Header: " ",
                columns: [
                    {
                        Header: "Collectible",
                        accessor: "collectible[0].description"
                    },
                    {
                        Header: "Buying Price",
                        accessor: "buyingPrice"
                    },
                    {
                        Header: "Selling Price",
                        accessor: "sellingPrice"
                    },
                    {
                        Header: "Quantity",
                        accessor: "quantity"
                    },
                    {
                        Header: "Status",
                        accessor: "status",
                        Cell: ({ cell: { value } }) => <Status value={value} />
                    },
                    {
                        Header: "Client",
                        accessor: "client[0].name"
                    },
                    {
                        Header: "Type",
                        accessor: "type",
                        Cell: ({ cell: { value } }) => <Type value={value} />

                    },
                    {
                        Header: "Action",
                        Cell: <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-secondary"><i className="fa fa-eye" aria-hidden="true"></i></button>
                            <button type="button" className="btn btn-sm btn-primary"><i className="fas fa-edit    "></i></button>
                            <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    }
                ]
            }
        ],
        []
    );

    const handleInsertion = (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("buyingPrice", data.buyingPrice);
        urlencoded.append("sellingPrice", data.sellingPrice);
        urlencoded.append("quantity", data.quantity);
        urlencoded.append("status", data.status);
        urlencoded.append("collectibleId", data.collectibleId);
        urlencoded.append("clientId", data.clientId);
        urlencoded.append("type", data.type);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${uri}/inventory`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setInventoryCount(inventoryCount + 1);
            })
            .catch(error => console.log('error', error));
    }

    const handleSearchQuery = (e) => {
        var value = e.target.value;

        if (value === 'booked' || value === 'paid' || value === 'delivered') {
            value = query.status === value ? undefined : value
            setQuery({ status: value, type: query.type })
        } else if (value === 'brought' || value === 'sold') {
            value = query.type === value ? undefined : value
            setQuery({ status: query.status, type: value })
        } else if (value = "default") {
            setQuery({ status: undefined, type: undefined })
        }
    }

    const listingTitle = () => {
        return <>
            {query.status || query.type ? <>Items where</> : ""}
            {query.status ? <> status is <b>{query.status}</b></> : ""}
            {query.status && query.type ? " and " : ''}
            {query.type ? <> type is <b>{query.type}</b></> : ""}
            {!query.status && !query.type ? <b>All Items</b> : ""}
        </>
    }
    return (
        <>
            <Breadcrumb title={"Inventory"} />
            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header p-0" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-primary btn-block text-left" data-toggle="collapse" data-target="#addFormCollapse">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            {" "}
                                            Add brought item
                                        </button>
                                    </h2>
                                </div>

                                <div id="addFormCollapse" className="collapse">
                                    <div className="card-body">
                                        <Add handleSubmission={handleInsertion} clientList={clients} collectibleList={collectibles} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h3 class="card-title">{listingTitle()}</h3>
                                <div className="mt-3">
                                    <button onClick={handleSearchQuery} value="default" className={"btn btn-sm btn-secondary mr-2 " + (!query.status && !query.type ? "active" : "")}>Default</button>
                                    <div className="btn-group mr-2">
                                        <button onClick={handleSearchQuery} value="booked" className={"btn btn-sm btn-danger " + (query.status === "booked" ? "active" : "")}>Booked</button>
                                        <button onClick={handleSearchQuery} value="paid" className={"btn btn-sm btn-primary " + (query.status === "paid" ? "active" : "")}>Paid</button>
                                        <button onClick={handleSearchQuery} value="delivered" className={"btn btn-sm btn-success " + (query.status === "delivered" ? "active" : "")}>Delivered</button>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <button onClick={handleSearchQuery} value="brought" className={"btn btn-sm btn-warning " + (query.type === "brought" ? "active" : "")}>Brought</button>
                                        <button onClick={handleSearchQuery} value="sold" className={"btn btn-sm btn-success " + (query.type === "sold" ? "active" : "")}>Sold</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Table columns={columns} data={inventory} filter={{ data: "collectible[0].description", placeholder: "Search by collection description" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}