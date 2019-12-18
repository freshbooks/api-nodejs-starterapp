import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Page from './_page'

const Settings: React.FC = () => (
	<Page>
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Container>
				<a className="navbar-brand" href="#">
					Freshbooks Starterapp
				</a>
				<div className="d-flex justify-content-end">
					<Button variant="secondary" href="dashboard">
						Back to Dashboard
					</Button>
				</div>
			</Container>
		</nav>
		<Container className="pt-4">
			<Row className="mb-2" noGutters>
				<h3>Settings</h3>
			</Row>
			<Row>
				<Col>
					<Button variant="danger" href="logout">
						Unlink account
					</Button>
				</Col>
			</Row>
		</Container>
		<nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-primary">
			<Container>
				<a className="navbar-brand" href="#">
					Freshbooks Starter
				</a>
			</Container>
		</nav>
	</Page>
)

export default Settings
