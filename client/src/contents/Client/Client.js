import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add, Form } from "./Add";
import { Edit } from "./Edit";
import { getClients, postClient } from "./handler";
import { toast } from "wc-toast";

export const Client = () => {
    const uri = "http://localhost:3000/api";
    const [clients, setClients] = useState([]);
    const [toggleEdit, setToggleEdit] = useState({ state: false, id: undefined });
    const [client, setClient] = useState([]);
    const [refreshClients,setRefreshClients] = useState(false)

    const [pageIndex, setPageIndex] = useState(0);

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
                        Cell: ({ cell: { value } }) => <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-secondary"><i className="fa fa-eye" aria-hidden="true"></i></button>
                            <button type="button" className="btn btn-sm btn-primary" ><i className="fas fa-edit"></i></button>
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

    const handlePageChange=(index)=>{
        setPageIndex(index);
    }
    return (
        <>
            <wc-toast/>
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