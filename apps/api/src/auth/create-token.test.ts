import tap from 'tap'
import { z } from 'zod'
import { createToken, parseToken } from './create-token'

tap.test('creates a token and parses it back', (t) => {
	const myData = {
		a: 1,
		test: 'hello',
	} as const
	const validator = z.object({
		a: z.number(),
		test: z.string(),
	})

	const secret = 'my-secret'
	const token = createToken<typeof myData>(myData, secret)

	const result = parseToken({
		secret,
		token,
		validator,
	})

	t.same(result, myData, 'Token parsed back correctly')
	t.end()
})

tap.test('it throws if the validator fails', (t) => {
	const myData = {
		a: 1,
		test: 'hello',
	} as const
	const validator = z.object({
		a: z.string(),
		test: z.string(),
	})

	const secret = 'my-secret'
	const token = createToken<typeof myData>(myData, secret)

	t.throws(() => {
		parseToken({
			secret,
			token,
			validator,
		})
	}, 'Validator fails as expected')
	t.end()
})
