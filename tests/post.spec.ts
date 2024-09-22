import { test, expect } from '@playwright/test';

test('POST request', async ({ request }) => {

        //1.Send a POST Request:
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                "userId": 1,
                "title": "new title",
                "body": "new body"
            }
        });
    
        //2.Check the Status Code: 
        expect(response.status()).toBe(201);

        //3.Parse the Response:
        const data = await response.json();

        console.log(data);
        
        //4.Validate/Assert the Response Data: 
        expect(data).toHaveProperty('userId', 1);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('title', 'new title');
        expect(data).toHaveProperty('body', 'new body');
})
