import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add } from "./Add";
import { getCollectibles, postCollectible, saveCollectible } from "./handler";
import { toast } from "wc-toast";

export const Collectible = () => {
    const uri = "http://localhost:3000/api";
    const [collectibles, setCollectibles] = useState([]);

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

    const handlePageChange=(index)=>{
        setPageIndex(index);
    }
    return (
        <>
            <wc-toast/>
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

                        <div className="card">
                            <div className="card-body">
                                <Table columns={columns} data={collectibles} filter={{ data: "description", placeholder: "Search by collectible description" }} handlepageChange={handlePageChange} pagePosition={pageIndex} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}