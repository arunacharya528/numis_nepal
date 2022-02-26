import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add, BoughtForm, SoldForm } from "./Add";
import { toast } from "wc-toast"
import { Modal } from "../../components/Modal";
import { UpdateStatus } from "./UpdateStatus";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { fetchInventory, getBoughtInventory, getInventory, putToInventory } from "./handler";
import { getClients } from "../Client/handler";
import { getCollectibles } from "../Collectible/handler";


export const Inventory = () => {
    const uri = "http://localhost:3000/api";

    const [inventoryCount, setInventoryCount] = useState(0);
    const [inventory, setInventory] = useState([]);
    const [clients, setClients] = useState([]);
    const [collectibles, setCollectibles] = useState([]);
    const [query, setQuery] = useState({ status: undefined, type: undefined });
    const [boughtInventory, setBoughtInventory] = useState([]);
    const [refreshInventory, setRefreshInventory] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState({});

    const MySwal = withReactContent(Swal);

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
        toast.promise(
            getInventory(getURL())
                .then(result => {
                    setInventory(result.data)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err);
                })
            , {
                loading: 'Loading...',
                success: "Inventory loaded successfully"
            }
        )

        getBoughtInventory()
            .then(result => {
                setBoughtInventory(result.data)
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            })

        setRefreshInventory(false)
    }, [query, refreshInventory]);

    useEffect(() => {
        getClients()
            .then(result => {
                setClients(result.data)
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            })


        getCollectibles()
            .then(result => {
                setCollectibles(result.data)
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            })
    }, [])

    const Status = ({ value, id }) => {

        const setStatus = (status, id) => {
            Swal.fire({
                title: 'Are you sure you want to change status?',
                text: "You can revert this anytime",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    putToInventory({ status }, id)
                        .then((response) => {
                            setRefreshInventory(true);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
        }

        return (
            <div className="btn btn-group d-flex">
                <div className={"btn btn-outline-secondary btn-sm " + (value == "booked" ? "active" : "")} onClick={e => setStatus("booked", id)}>Booked</div>
                <div className={"btn btn-outline-secondary btn-sm " + (value == "paid" ? "active" : "")} onClick={e => setStatus("paid", id)}>Paid</div>
                <div className={"btn btn-outline-secondary btn-sm " + (value == "delivered" ? "active" : "")} onClick={e => setStatus("delivered", id)}>Delivered</div>
            </div>
        );
    }

    const Type = ({ value }) => {
        const bootstrapColor = (value) => {
            switch (value) {
                case "bought":
                    return "warning";
                case "sold":
                    return "success";
                default:
                    return "secondary";
            }
        }

        return <span className={"badge badge-" + bootstrapColor(value)}>{value}</span>
    }
    const getFormattedDate = (date) => {
        const now = Date.parse(new Date());
        const dateTimestamp = Date.parse(new Date(date));

        const timeDifference = now - dateTimestamp

        if (timeDifference > (5 * 24 * 60 * 60 * 1000)) {
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            var date = new Date(date);
            return (date.toLocaleDateString("en-US", options));
        }
        else if (timeDifference > (24 * 60 * 60 * 1000)) {
            return Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + "d"
        }
        else if (timeDifference > (60 * 60 * 1000)) {
            return Math.floor(timeDifference / (60 * 60 * 1000)) + "h"
        }
        else if (timeDifference > (60 * 1000)) {
            return Math.floor(timeDifference / (60 * 1000)) + "m"
        } else if (timeDifference < (60 * 1000)) {
            return "Just now"
        }
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
                        Cell: props => <Status value={props.row.original.status} id={props.row.original._id} index={props.row.index} />
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
                        Header: "Created",
                        accessor: "date",
                        Cell: ({ cell: { value } }) => <>{getFormattedDate(value)}</>

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

    const insertIntoInventory = (inventory) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("buyingPrice", inventory.buyingPrice);
        urlencoded.append("sellingPrice", inventory.sellingPrice);
        urlencoded.append("quantity", inventory.quantity);
        urlencoded.append("status", inventory.status);
        urlencoded.append("collectibleId", inventory.collectibleId);
        urlencoded.append("clientId", inventory.clientId);
        urlencoded.append("type", inventory.type);

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
                toast.success("Inserted 1 row into inventory")
            })
            .catch(err => {
                console.log('error', err)
                toast.error(err);
            });
    }

    const handleSoldStatus = (data) => {

        data.collectible.map((row) => {
            const inventory = {
                clientId: data.clientId,
                status: data.status,
                type: data.type,
                buyingPrice: row.buyingPrice,
                sellingPrice: row.sellingPrice,
                collectibleId: row.collectibleId,
                quantity: row.quantity,
            };
            insertIntoInventory(inventory);
        })
    }

    const handleBoughtStatus = (data) => {
        insertIntoInventory(data);
    }

    const handleSearchQuery = (e) => {
        var value = e.target.value;

        if (value === 'booked' || value === 'paid' || value === 'delivered') {
            value = query.status === value ? undefined : value
            setQuery({ status: value, type: query.type })
        } else if (value === 'bought' || value === 'sold') {
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

    let container;

    return (
        <>
            <wc-toast className="top-right"></wc-toast>
            <Breadcrumb title={"Inventory"} />
            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="accordion" id="">
                            <div className="card">
                                <div className="card-header p-0" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-primary btn-block text-left" data-toggle="collapse" data-target="#boughtFormCollapse">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            {" "}
                                            Add bought item
                                        </button>
                                    </h2>
                                </div>

                                <div id="boughtFormCollapse" className="collapse">
                                    <div className="card-body">
                                        <BoughtForm handleSubmission={handleBoughtStatus} clientList={clients} collectibleList={collectibles} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion" id="">
                            <div className="card">
                                <div className="card-header p-0" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-primary btn-block text-left" data-toggle="collapse" data-target="#soldFormCollapse">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            {" "}
                                            Add sold item
                                        </button>
                                    </h2>
                                </div>

                                <div id="soldFormCollapse" className="collapse">
                                    <div className="card-body">
                                        <SoldForm clientList={clients} boughtInventory={boughtInventory} handleSubmission={handleSoldStatus} />

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
                                        <button onClick={handleSearchQuery} value="booked" className={"btn btn-sm btn-outline-secondary " + (query.status === "booked" ? "active" : "")}>Booked</button>
                                        <button onClick={handleSearchQuery} value="paid" className={"btn btn-sm btn-outline-secondary " + (query.status === "paid" ? "active" : "")}>Paid</button>
                                        <button onClick={handleSearchQuery} value="delivered" className={"btn btn-sm btn-outline-secondary " + (query.status === "delivered" ? "active" : "")}>Delivered</button>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <button onClick={handleSearchQuery} value="bought" className={"btn btn-sm btn-outline-warning " + (query.type === "bought" ? "active" : "")}>Bought</button>
                                        <button onClick={handleSearchQuery} value="sold" className={"btn btn-sm btn-outline-success " + (query.type === "sold" ? "active" : "")}>Sold</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body table-responsive">
                                <Table columns={columns} data={inventory} filter={{ data: "collectible[0].description", placeholder: "Search by collection description" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}