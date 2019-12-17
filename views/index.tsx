import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Page from './_page'

const Index: React.FC = () => {
	return (
		<Page title="Freshbooks Starter App">
			<Jumbotron>
				<Container>
					<h1>Hello, world!</h1>
					<p>Congratulations on setting up your FreshBooks NodeJS app!</p>
					<p>
						<Button
							variant="primary"
							href="https://github.com/freshbooks/api-nodejs-starterapp"
						>
							View on Github
						</Button>
					</p>
				</Container>
			</Jumbotron>
			<Container>
				<h2>Configuration</h2>
				<Row>
					<Col>
						<strong>Client ID:</strong>
					</Col>
					<Col xs={10}>{process.env.CLIENT_ID}</Col>
				</Row>
				<Row>
					<Col>
						<strong>Redirect URL:</strong>
					</Col>
					<Col xs={10}>{process.env.CALLBACK_URL}</Col>
				</Row>
				<Row>
					<Col>
						<strong>Authorization URL:</strong>
					</Col>
					<Col xs={10}>{process.env.AUTHORIZATION_URL}</Col>
				</Row>
			</Container>
		</Page>
	)
}

export default Index
