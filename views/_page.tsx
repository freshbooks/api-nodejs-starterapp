import React from 'react'

const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	return (
		<html>
			<head>
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
					integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
					crossOrigin="anonymous"
				/>
			</head>
			<body>{children}</body>
		</html>
	)
}

export default Page
