import { Breadcrumb } from "../../components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table/Table";
import { Add } from "./Add";

export const Collectible = () => {
    const uri = "http://localhost:3000/api";

    const [collectibleCount, setCollectibleCount] = useState(0);
    const [collectibles, setCollectibles] = useState([]);

    useEffect(() => {
        const fetchCollectibles = async () => {
            try {
                const response = await fetch(`${uri}/collectible`);
                const json = await response.json();
                setCollectibles(json);
                setCollectibleCount(collectibles.length);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchCollectibles();
    }, [collectibleCount]);

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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("description", data.description);
        urlencoded.append("quality", data.quality);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${uri}/collectible`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setCollectibleCount(collectibleCount + 1);
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
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
                                <Table columns={columns} data={collectibles} filter={{ data: "description", placeholder: "Search by collectible description" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}