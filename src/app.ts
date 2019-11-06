import { Router, Request } from 'express'
import morgan from 'morgan'
import passport from 'passport'
import { Client, User } from '@freshbooks/api'
import { createApp } from '@freshbooks/app'

interface RequestWithAccount extends Request {
	account?: User
}

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const CALLBACK_URL = process.env.CALLBACK_URL || ''

async function verifyFn(
	accessToken: string,
	refreshToken: string,
	profile: any,
	done: (err?: Error | null, user?: object | boolean, info?: object) => void
): Promise<void> {
	const client = new Client(accessToken)
	try {
		const res = await client.users.me()
		if (res.ok) {
			done(null, res.data)
		} else {
			done(null, false, res.error)
		}
	} catch (err) {
		done(err, false)
	}
}

const app = createApp(CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, verifyFn)
app.use(morgan('combined'))

// setup auth router
const authRouter = Router()
authRouter.get(
	'/redirect',
	passport.authorize('freshbooks', {
		failureFlash: 'Unauthorized user',
	}),
	(req: RequestWithAccount, res) => {
		const { account } = req
		if (account) {
			res.send(`Welcome ${account.id}`)
		} else {
			res.status(401)
		}
	}
)

app.use('/auth/freshbooks', authRouter)

export default app
