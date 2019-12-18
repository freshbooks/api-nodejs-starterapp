import React, { FC } from 'react'
import User from '@freshbooks/api/dist/models/User'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Page from './_page'

interface Props {
	me: User
	items: number
	invoices: number
	payments: number
}

const Dashboard: React.FC<Props> = ({
	me,
	items,
	invoices,
	payments,
}: Props) => {
	return (
		<Page title="Dashboard">
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Container>
						<a className="navbar-brand" href="#">
							FreshBooks Starter
						</a>
						<div className="d-flex justify-content-end">
							<a className="btn btn-secondary btn-large" href="settings">
								Settings
							</a>
						</div>
					</Container>
				</nav>
				<Container className="pt-4">
					<Row className="mb-2" noGutters>
						<h3>Hello, {`${me.firstName} ${me.lastName}`}</h3>
					</Row>
					<Row>
						<Col>
							<Card>
								<Card.Header>Items</Card.Header>
								<Card.Body>
									<Card.Title>
										<h1>{items}</h1>
									</Card.Title>
									<Card.Subtitle>
										<h6 className="mb-2 text-muted">items</h6>
									</Card.Subtitle>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card>
								<Card.Header>Invoices</Card.Header>
								<Card.Body>
									<Card.Title>
										<h1>{invoices}</h1>
									</Card.Title>
									<Card.Subtitle>
										<h6 className="mb-2 text-muted">invoices</h6>
									</Card.Subtitle>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card>
								<Card.Header>Payments</Card.Header>
								<Card.Body>
									<Card.Title>
										<h1>{payments}</h1>
									</Card.Title>
									<Card.Subtitle>
										<h6 className="mb-2 text-muted">payments</h6>
									</Card.Subtitle>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
				<nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-primary">
					<Container>
						<a className="navbar-brand" href="#">
							FreshBooks Starter
						</a>
					</Container>
				</nav>
			</div>
		</Page>
	)
}

export default Dashboard
