import React, { useState } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import "./Table.scss";
export const Table = ({ columns, data, filter }) => {
    // Table component logic and UI come here

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter,


        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },
        useFilters,
        useSortBy,
        usePagination
    );

    // Create a state
    const [filterInput, setFilterInput] = useState("");

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter(filter.data, value);
        setFilterInput(value);
    };


    return (
        <>
            <input
                id="search"
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={filter.placeholder}
            />
            <table {...getTableProps()} className="table table-hover">

                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? "sort-desc"
                                                : "sort-asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            {rows.length === 0 ? <p className="p-3 text-center">No data available</p> : ''
            }
            <div className="pagination">
                <div>
                    <span>
                        Page:{' '}
                        <input
                            type="number"
                            min="1"
                            max={pageOptions.length}
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>
                    {' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                    | {rows.length} items
                </span>
                <div id="control">
                    <button className="control" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>

                    </button>
                    <button className="control" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>

                    </button>
                    <button className="control" onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </button>
                    <button className="control" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                    </button>
                </div>

            </div>



        </>

    );
}