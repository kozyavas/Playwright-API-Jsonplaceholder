import { test, expect } from '@playwright/test';


// Sahte bir mutfak (mock) yaratıyorsunuz ve müşteri (uygulama) bir istek yapınca bu isteği gerçek mutfağa (API'ye) göndermeden yakalıyorsunuz. Sonra bu isteği sahte mutfakta (mock) işleyip, belirlediğiniz yanıtı geri dönüyorsunuz. Müşteri (uygulama) ise sanki gerçek mutfaktan (API'den) cevap almış gibi davranıyor.

test('Mock API response and assertion', async ({ page, request }) => {
    
    // 1. Intercept the Request before each test: route ile API istegini yakaliyoruz (goto kullanmiyoruz)
    await page.route('**/posts/1', async route => {

        // 2. Define the Mock Response
        const mockResponse = {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        };    

        // 3. Fulfill the Mock Response: Sahte yaniti ver
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockResponse) // Sahte yanıtı JSON formatında döndür
        });
    });    
    
    // 4. Assertions to check that the mocked response was applied:
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Parse the JSON response
    const responseBody = await response.json();

    // Assert the response directly
    expect(response.status()).toBe(200);
    expect(responseBody.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
    expect(responseBody.body).toContain('quia et suscipit');
})






