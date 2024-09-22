import { test, expect } from '@playwright/test';

test('GET request', async ({ request }) => {
        
        //Defines a test for making a GET request to an API endpoint. 
        //It checks if the response status is 200 and if the data contains the expected id and other data.
        
    //1.Send a GET Request: 
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    //2.Check the Status Code:
    expect(response.status()).toBe(200);

    //3.Parse the Response:
    const data = await response.json();

    //4.Validate the Response Data: 
    expect(data).toHaveProperty('id', 1);
    const expectedTitle = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit";
    expect(data.title).toBe(expectedTitle);
    expect(data.title).toContain('sunt aut facere');
    expect(data.body).toContain('quia et');
});
    

