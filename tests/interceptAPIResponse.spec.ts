import { test, expect } from '@playwright/test';
import { title } from 'process';

test('Intercept and mock a GET request using fetch', async ({ page }) => {
    // Intercept requests to the specified URL pattern
    await page.route('**/posts/1', async (route, request) => {
        // Using fetch to modify the intercepted request
        const originalResponse = await route.fetch(); // Fetches the original request response

        // You can access the status, headers, and body of the original response
        const originalStatus = originalResponse.status();
        const originalHeaders = originalResponse.headers();
        const originalBody = await originalResponse.json();

        console.log('Original Status:', originalStatus);
        console.log('Original Headers:', originalHeaders);
        console.log('Original Body:', originalBody);

        // Mocking the response with modified data
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                ...originalBody, // Spread operator to include original body properties
                title: 'Modified Title with fetch',
            })
        })
    })

    // Making the actual request which will be intercepted
    const response = await page.request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Parsing the mocked response
    const data = await response.json();

    // Assertion to verify the intercepted response has been modified
    expect(data).toEqual({
        userId: 1,
        id: 1,
        title: 'Modified Title with fetch',
        body: 'This is a mocked response body',
    });
});