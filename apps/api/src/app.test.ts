import tap from "tap";
import { app } from "./app";

tap.test('requests the "/" route', async (t) => {
	// number of tests expected.
	t.plan(1);
	// what happens after all the tests are done.
	t.teardown(() => app.close());

	const response = await app.inject({
		method: "GET",
		url: "/",
	});

	t.equal(response.statusCode, 200, "Backend is alive!");
	t.end();
});
