import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add } from "./Add";
import { getCollectibles, postCollectible, putCollectible, saveCollectible } from "./handler";
import { toast } from "wc-toast";
import { Link } from "react-router-dom";
import { Edit } from "./Edit";
import Swal from "sweetalert2";

export const Collectible = () => {
    const uri = "http://localhost:3000/api";
    const [collectibles, setCollectibles] = useState([]);

    const [editingCollectible, setEditingCollectible] = useState([]);
    const [refreshCollectibles, setRefreshCollectibles] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        toast.promise(
            getCollectibles()
                .then(result => {
                    setCollectibles(result.data)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err);
                })
            , {
                loading: 'Loading...',
                success: "Collectibles loaded successfully"
            }
        )
        setRefreshCollectibles(false);
    }, [refreshCollectibles]);

    const columns = useMemo(
        () => [
            {
                Header: " ",
                columns: [
                    {
                        Header: "Description",
                        accessor: "description"
                    },
                    {
                        Header: "Quality",
                        accessor: "quality"
                    },
                    {
                        Header: "Action",
                        Cell: props => <div className="btn-group">
                            <Link to={`/inventory/?collectible_id=${props.row.original._id}`} className="btn btn-sm btn-secondary"><i className="fa fa-eye" aria-hidden="true"></i></Link>
                            <button type="button" className="btn btn-sm btn-primary" onClick={e => setEditingCollectible(props.row.original)}><i className="fas fa-edit"></i></button>
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
            postCollectible(data)
                .then(result => {
                    setRefreshCollectibles(true);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err);
                })
            , {
                loading: 'Saving...',
                success: "Collectible saved successfully"
            }
        )
    }

    const handlePageChange = (index) => {
        setPageIndex(index);
    }

    const handleUpdate = (data) => {
        Swal.fire({
            title: 'Are you sure you want to update collectible?',
            text: "You can make changes anytime you want",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(data)
                toast.promise(
                    putCollectible(data.collectible, data.id)
                        .then(result => {
                            setRefreshCollectibles(true)
                        })
                        .catch((err) => {
                            console.log(err);
                            toast.error(err);
                        })
                    , {
                        loading: 'Updating...',
                        success: "Collectible updated successfully"
                    }
                )
            }
        })
    }
    return (
        <>
            <wc-toast />
            <Breadcrumb title={"Collectible"} />
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
                                            Add new Collectible
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
                                        <Table columns={columns} data={collectibles} filter={{ data: "description", placeholder: "Search by collectible description" }} handlepageChange={handlePageChange} pagePosition={pageIndex} />
                                    </div>
                                </div>

                            </div>
                            {
                                editingCollectible.length !== 0 ?
                                    <div className="col-4">
                                        <Edit onClose={e => { setEditingCollectible([]) }} data={editingCollectible} onUpdate={handleUpdate} />
                                    </div> : ""
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}