import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add, Form } from "./Add";
import { Edit } from "./Edit";
import { getClients, postClient, putClient } from "./handler";
import { toast } from "wc-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';


export const Client = () => {
    const uri = "http://localhost:3000/api";
    const [clients, setClients] = useState([]);
    const [toggleEdit, setToggleEdit] = useState({ state: false, id: undefined });
    const [editingClient, setEditingClient] = useState([]);
    const [refreshClients, setRefreshClients] = useState(false)

    const [pageIndex, setPageIndex] = useState(0);
    const MySwal = withReactContent(Swal);

    useEffect(() => {

        toast.promise(
            getClients()
                .then(result => {
                    setClients(result.data)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err);
                })
            , {
                loading: 'Loading...',
                success: "Clients loaded successfully"
            }
        )
        setRefreshClients(false);
    }, [refreshClients]);



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
                        Cell: props => <div className="btn-group">
                            <Link to={`/inventory/?client_id=${props.row.original._id}`} className="btn btn-sm btn-secondary"><i className="fa fa-eye" aria-hidden="true"></i></Link>
                            <button type="button" className="btn btn-sm btn-primary" onClick={(e) => { setEditingClient(props.row.original) }}><i className="fas fa-edit"></i></button>
                            <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    }
                ]
            }
        ],
        []
    );



    const handleInsertion = (data) => {
        toast.promise(
            postClient(data)
                .then(result => {
                    setRefreshClients(true)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err);
                })
            , {
                loading: 'Loading...',
                success: "Client saved successfully"
            }
        )
    }

    const handlePageChange = (index) => {
        setPageIndex(index);
    }

    const handleUpdate = (data) => {

        Swal.fire({
            title: 'Are you sure you want to update client?',
            text: "You can make changes anytime you want",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update'
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    putClient(data.client, data.id)
                        .then(result => {
                            setRefreshClients(true)
                        })
                        .catch((err) => {
                            console.log(err);
                            toast.error(err);
                        })
                    , {
                        loading: 'Updating...',
                        success: "Client updated successfully"
                    }
                )
            }
        })
    }
    return (
        <>
            <wc-toast />
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
                                        <Table columns={columns} data={clients} filter={{ data: "name", placeholder: "Search by client name" }} handlepageChange={handlePageChange} pagePosition={pageIndex} />

                                    </div>
                                </div>
                            </div>
                            {
                                editingClient.length !== 0 ?
                                    <div className="col-4">
                                        <Edit onClose={e => { setEditingClient([]) }} data={editingClient} onUpdate={handleUpdate} />
                                    </div> : ""
                            }
                        </div>

                    </div>
                </div>
            </section>
        </>
    );

}