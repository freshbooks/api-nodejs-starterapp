import React from 'react'

interface Props {
	title?: string
}

const Page: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	title,
}) => {
	return (
		<html>
			<head>
				<title>{title}</title>
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
