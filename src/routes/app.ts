import { Router } from 'express'
import { SessionUser } from '@freshbooks/app/dist/PassportStrategy'
import { client } from '../app'

const router = Router()

// ensure only authenticated users for this router
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/')
	}
})

router.get('/dashboard', async (req, res) => {
	const { data: me } = await client.users.me()

	// fetch first business account
	if (me && me.businessMemberships && me.businessMemberships.length) {
		const { accountId } = me.businessMemberships[0].business

		const { data: itemData } = await client.items.list(accountId)
		const itemCount: number = itemData ? itemData.items.length : 0

		const { data: invoiceData } = await client.invoices.list(accountId)
		const invoiceCount: number = invoiceData ? invoiceData.invoices.length : 0

		const { data: paymentData } = await client.payments.list(accountId)
		const paymentCount: number = paymentData ? paymentData.payments.length : 0

		res.render('dashboard', {
			me,
			items: itemCount,
			payments: paymentCount,
			invoices: invoiceCount,
		})
	} else {
		res.sendStatus(500)
	}
})

router.get('/settings', async (req, res) => {
	res.render('settings')
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

export default router
