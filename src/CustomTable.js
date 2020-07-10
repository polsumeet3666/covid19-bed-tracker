import React from "react";
import { Table, Badge } from "react-bootstrap";
class CustomTable extends React.Component {
	render() {
		let elem = [];
		this.props.info.forEach((item, i) => {
			let cell = null;
			if (item["status"] === "Functional") {
				cell = (
					<td>
						<Badge pill variant="success">
							{item["status"]}
						</Badge>
					</td>
				);
			} else {
				cell = (
					<td>
						<Badge pill variant="secondary">
							{item["status"]}
						</Badge>
					</td>
				);
			}

			elem.push(
				<tr key={i}>
					<td>{i + 1}</td>
					<td>{item["name"]}</td>
					{cell}
					<td>{item["noBeds"]}</td>
					<td>{item["noOccBeds"]}</td>

					<td>{item["noBeds"] - item["noOccBeds"]}</td>
				</tr>
			);
		});

		return (
			<>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Status</th>
							<th>No.of Beds</th>
							<th>No.of Occupied Beds</th>
							<th>No.of Free Beds</th>
						</tr>
					</thead>
					<tbody>{elem}</tbody>
				</Table>
			</>
		);
	}
}
export default CustomTable;
