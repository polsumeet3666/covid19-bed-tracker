import React from "react";

class UsefulLinks extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		let links = this.props.links;

		let elem = [];
		links.forEach((item, i) => {
			elem.push(
				<li key={i}>
					<a href={item.link}>{item.title}</a>
				</li>
			);
		});
		return <ul className="usefullinks">{elem}</ul>;
	}
}

export default UsefulLinks;
