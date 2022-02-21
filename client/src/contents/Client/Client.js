import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add, Form } from "./Add";
import { Edit } from "./Edit";

export const Client = () => {
    const uri = "http://localhost:3000/api";

    const [clientCount, setClientCount] = useState(0);
    const [clients, setClients] = useState([]);
    const [toggleEdit, setToggleEdit] = useState({ state: false, id: undefined });
    const [client, setClient] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${uri}/client`);
                const json = await response.json();
                setClients(json);
                setClientCount(clients.length);
            } catch (error) {
                console.log("error", error);
            }
        }

        const fetchClient = async (clientId) => {
            try {
                const response = await fetch(`${uri}/client/${clientId}`);
                const json = await response.json();
                setClient(json);
            } catch (error) {
                console.log("error", error);
            }
        }

        if (toggleEdit.state == true) {
            fetchClient(toggleEdit.id);
        }
        fetchClients();
    }, [clientCount, toggleEdit]);



    const columns = useMemo(
        () => [
            {
                Header: " ",
                columns: [
                    {
                        Header: "Name",
                        accessor: "name"
                    },
                    {
                        Header: "Contact",
                        accessor: "contact"
                    },
                    {
                        Header: "Description",
                        accessor: "description"
                    },
                    {
                        Header: "Action",
                        accessor: "_id",
                        Cell: ({ cell: { value } }) => <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-secondary"><i className="fa fa-eye" aria-hidden="true"></i></button>
                            <button type="button" className="btn btn-sm btn-primary" onClick={e => showEditForm(value)}><i className="fas fa-edit    "></i></button>
                            <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    }
                ]
            }
        ],
        []
    );

    const showEditForm = (value) => {
        setToggleEdit({ state: true, id: value });
    }

    const handleInsertion = (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", data.name);
        urlencoded.append("description", data.description);
        urlencoded.append("contact", data.contact);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${uri}/client`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setClientCount(clientCount + 1);
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <Breadcrumb title={"Client"} />
            <section className="content">
                <div className="row">
                    <div className="col">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header p-0" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-primary btn-block text-left" data-toggle="collapse" data-target="#addFormCollapse">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            {" "}
                                            Add new client
                                        </button>
                                    </h2>
                                </div>

                                <div id="addFormCollapse" className="collapse">
                                    <div className="card-body">
                                        <Add handleSubmission={handleInsertion} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <Table columns={columns} data={clients} filter={{ data: "name", placeholder: "Search by client name" }} />
                                    </div>
                                </div>
                            </div>
                            {
                                toggleEdit.state ?
                                    <div className="col-4">
                                        <Edit onClose={e => { setToggleEdit({ state: false, id: undefined }) }} data={client} />
                                    </div> : ""
                            }
                        </div>

                    </div>
                </div>
            </section>
        </>
    );

}