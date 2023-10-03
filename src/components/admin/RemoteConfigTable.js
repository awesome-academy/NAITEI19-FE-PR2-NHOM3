import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

const RemoteConfigTable = ({ columns, data, expandRow, noDataIndication, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <PaginationProvider
      pagination={
        paginationFactory({
          custom: true,
          page,
          sizePerPage,
          sizePerPageList: [{
            text: '5', value: 5
          }, {
            text: '10', value: 10
          }],
          sizePerPageRenderer: ({
            options,
            currSizePerPage,
            onSizePerPageChange
          }) => (
            <div className="btn-group" role="group">
              {
                options.map((option) => {
                  const isSelect = currSizePerPage === `${option.page}`;
                  return (
                    <button
                      key={option.text}
                      type="button"
                      onClick={() => onSizePerPageChange(option.page)}
                      className={`btn ${isSelect ? 'btn-secondary' : 'btn-warning'}`}
                    >
                      {option.text}
                    </button>
                  );
                })
              }
            </div>
          ),
          totalSize
        })
      }
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <div>
            <BootstrapTable
              remote
              keyField="id"
              data={data}
              columns={columns}
              expandRow={expandRow}
              noDataIndication={noDataIndication}
              onTableChange={onTableChange}
              {...paginationTableProps}
            />
            <div className="d-flex justify-content-between">
              <SizePerPageDropdownStandalone
                {...paginationProps}
              />
              <PaginationListStandalone
                {...paginationProps}
              />
            </div>
          </div>
        )
      }
    </PaginationProvider>
  </div>
);

export default RemoteConfigTable;
