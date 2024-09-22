import { test, expect } from '@playwright/test';

test('DELETE request', async ({ request }) => {
    // Defines a test for making a DELETE request to an API endpoint.
    // It checks if the response status is 200 and ensures that the API behaves as expected for a delete operation.
        
    // 1. Send a DELETE Request: 
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

    // 2. Check the Status Code:
    expect(response.status()).toBe(200);

    // Optional: 3. Verify the Response Body (if applicable)
    // Some APIs return a confirmation message or the deleted data in the response body. Here, we assume no content is returned.
    const responseBody = await response.text(); // Use .text() since no JSON is expected.
    expect(responseBody).toBe('');

    // Optional: 4. Further Verification
    // If you want to make sure the resource is actually deleted, you could follow up with a GET request to confirm
    // the resource no longer exists. However, since JSONPlaceholder fakes the DELETE, this step would not reflect real changes.
})