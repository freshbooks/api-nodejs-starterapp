import connectMongo from 'connect-mongo'
import { Router } from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import { createApp } from '@freshbooks/app'
import { SessionUser } from '@freshbooks/app/dist/PassportStrategy'
import { User as UserModel } from './models'

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const CALLBACK_URL = process.env.CALLBACK_URL || ''
const SESSION_SECRET = process.env.SESSION_SECRET || ''
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost'

const serializeUser = (
	{ id, token, refreshToken }: SessionUser,
	done: (err: any, id?: string) => void
) => {
	// create or update session user
	UserModel.findOneAndUpdate(
		{ id },
		{
			id,
			token,
			refreshToken,
		},
		{
			upsert: true,
		},
		err => {
			done(err, id)
		}
	)
}

const deserializeUser = (
	id: string,
	done: (err: any, user?: SessionUser) => void
) => {
	UserModel.findOne({ id }, (err, user) => {
		if (user !== undefined && user !== null) {
			done(null, {
				id: user.id,
				token: user.token,
				refreshToken: user.refreshToken,
			})
		} else {
			done(err)
		}
	})
}

// setup session
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const MongoStore = connectMongo(session)

const app = createApp(CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, {
	sessionOptions: {
		resave: false,
		saveUninitialized: true,
		secret: SESSION_SECRET,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	},
	serializeUser,
	deserializeUser,
})

app.use(morgan('combined')) // set up logging

// setup auth router
const authRouter = Router()
authRouter.get(
	'/redirect',
	passport.authenticate('freshbooks', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
	})
)

app.use('/auth/freshbooks', authRouter)

app.use('/dashboard', (req, res) => {
	const user = req.user as SessionUser
	if (user) {
		res.send(`Hello ${user.id}`)
	} else {
		res.sendStatus(401)
	}
})

export default app
