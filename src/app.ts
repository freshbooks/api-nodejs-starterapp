import path from 'path'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import views from 'express-react-views'
import mongoose from 'mongoose'
import { createApp, SessionUser } from '@freshbooks/app'
import { VerifyCallback } from 'passport-oauth2'
import { Client } from '@freshbooks/api'
import { AuthRouter, AppRouter } from './routes'
import { User as UserModel } from './models'

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const REDIRECT_URI = process.env.REDIRECT_URI || ''
const SESSION_SECRET = process.env.SESSION_SECRET || 'sekret'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017'
const API_URL = process.env.FRESHBOOKS_API_URL || 'https://api.freshbooks.com'

const fbAPIClientOptions = {
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	apiUrl: API_URL,
	userAgent: 'FreshBooks Node/StarterApp',
}

export let client: Client

const serializeUser = (
	{ id }: SessionUser,
	done: (err: any, id?: string) => void
): void => {
	// create or update session user
	UserModel.findOneAndUpdate(
		{ id },
		{
			id,
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
): void => {
	UserModel.findOne({ id }, (err: any, user: any) => {
		if (user !== undefined && user !== null) {
			done(null, {
				id: user.id,
			})
		} else {
			done(err)
		}
	})
}

const freshbooksVerifyFn = async (
	token: string,
	refreshToken: string,
	profile: object,
	done: VerifyCallback
): Promise<void> => {
	try {
		const options = {
			...fbAPIClientOptions,
			accessToken: token,
			refreshToken: refreshToken,
		}
		client = new Client(CLIENT_ID, options)
		const { data } = await client.users.me()
		// const userId = 1
		const identityId = data?.id

		if (data) {
			return done(null, {
				id: identityId,
				businessMemberships: data.businessMemberships,
				token,
				refreshToken,
			})
		}
		return done(null, undefined, {
			message: 'Unable to verify FreshBooks user',
		})
	} catch (error) {
		return done(error)
	}
}

// setup session
mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(r => console.log('Connected to mongoDB'))
	.catch(ex => {
		console.error(`Failed to connect to mongo`, ex)
	})

const MongoStore = connectMongo(session)

const app = createApp(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, {
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
	verify: freshbooksVerifyFn,
})

// set up view engine
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'js')
app.engine('js', views.createEngine())

// set up routing
app.use('/auth/freshbooks', AuthRouter)
app.use('/app', AppRouter)
app.get('/', (req, res) => {
	res.render('index', { callbackUrl: REDIRECT_URI })
})

export default app
