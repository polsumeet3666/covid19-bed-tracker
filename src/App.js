import React from "react";
import { Container, Navbar, Tabs, Tab, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import CustomTable from "./CustomTable";
import UsefulLinks from "./UsefulLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			api: true,
			data: {
				CCC: [],
				DCH: [],
				DCHC: [],
			},
			links: [],
		};
		//this.fetchData();
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch("https://bed-scrapper-api.herokuapp.com/scrap")
			.then((res) => res.json())
			.then((res) => {
				//console.log(res);
				//console.log(res.status);
				if (res.status === 200) {
					this.setState({
						data: {
							CCC: res.data.CCC,
							DCH: res.data.DCH,
							DCHC: res.data.DCHC,
						},
						links: res.links,
					});
				} else {
					console.log("api status 400");
					this.setState({ api: false });
				}

				//console.log("------------------------------");
				//console.log(this.state.data.CCC);
			})
			.catch((err) => {
				console.log(err);
				this.setState({ api: false });
			});
	}

	render() {
		let error = "";
		if (this.state.api === false) {
			error = (
				<Alert variant="danger" className="error">
					Backend Down. Please try after some time.
				</Alert>
			);
		}
		return (
			<>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="#home">
						<FontAwesomeIcon icon={faBed} /> Covid-19 Bed Tracker
						(Navi Mumbai)
					</Navbar.Brand>
				</Navbar>
				<Container className="content">
					<Row>
						<Col>
							<Alert variant="danger">
								<FontAwesomeIcon
									icon={faExclamationCircle}
								></FontAwesomeIcon>{" "}
								Source For Below Information :
								<a href="http://nmmccovid19.in">
									http://nmmccovid19.in
								</a>{" "}
								from News Article :
								<a href="https://government.economictimes.indiatimes.com/news/digital-india/navi-mumbai-municipal-corporation-launches-dashboard-for-covid-19-bed-availability/76232027">
									Economic Times Article
								</a>
							</Alert>
						</Col>
					</Row>

					<Row>
						<Col>
							<Tabs
								defaultActiveKey="ccc"
								id="uncontrolled-tab-example"
								className="tabs"
							>
								<Tab eventKey="ccc" title="Covid Care Center ">
									<CustomTable info={this.state.data.CCC} />
								</Tab>
								<Tab
									eventKey="dchc"
									title="Dedicated Covid Health Centers "
								>
									<CustomTable
										info={this.state.data["DCHC"]}
									/>
								</Tab>
								<Tab
									eventKey="dch"
									title="Dedicated Covid Hospitals"
								>
									<CustomTable
										info={this.state.data["DCH"]}
									/>
								</Tab>
								<Tab
									eventKey="article"
									title="Useful Articles/Links"
								>
									<UsefulLinks links={this.state.links} />
								</Tab>
							</Tabs>
						</Col>
					</Row>

					<Row>
						<Col> {"   "}</Col>
					</Row>
					<Row>
						<Col> {"   "}</Col>
					</Row>
				</Container>
				{error}
				<footer className="footer">
					<div>Developed by polsumeet3666@gmail.com</div>
				</footer>
			</>
		);
	}
}
export default App;
