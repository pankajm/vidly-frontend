import React, { Component } from "react";

class TableHeader extends Component {
  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead className="thead-light">
        <tr>
          {columns.map((c) => (
            <th
              className="cursor-hand"
              key={c.path || c.key}
              onClick={() => this.raiseSort(c.path)}
            >
              {c.label} {c.path && this.renderSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
