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

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch(`${uri}/inventory`);
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
    }, [inventoryCount]);

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