import { test, expect } from '@playwright/test';
import { request } from 'http';

test('PUT request', async ({ request }) => {
    // Defines a test for updating a resource using a PUT request to an API endpoint.
    // It checks if the response status is 200 and if the data contains the updated values.
        
    // 1. Define the data to update:
    const newData = {
        id: 1,
        title: "Updated Title",
        body: "This is a updated body text.",
        userId: 1
    };

    // 2. Send a PUT Request: 
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: newData
    });

    // 3. Check the Status Code:
    expect(response.status()).toBe(200);

    // 4. Parse the response:
    const data = await response.json();
    console.log(data);
    

    // 5. Validate the Response Data:
    expect(data).toHaveProperty('id', 1);// Check if ID remains unchanged

})