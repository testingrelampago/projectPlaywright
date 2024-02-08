require('dotenv').config();

const { test, expect } = require('@playwright/test');

//
// Obtener título de la pagina Home
//

test('Navegar a una página y verificar el título', async ({ page }) => {
    const url = process.env.URL_PRUEBA;
    await page.goto(url);
    
    const title = await page.title();
    
    expect(title).toBe('Home');
});

//
// Verificar el mensaje de bienvenida de la pagina Home
//

test('Verificar el mensaje de bienvenida', async ({ page }) => {
    const url = process.env.URL_PRUEBA;
    await page.goto(url);
  
    const welcomeMessage = await page.textContent('h1');
  
    expect(welcomeMessage).toBe('Welcome to Testing Relámpago');
  });
  
//
// Hacer clic en el botón de LinkedIn y verificar redirección en la pagina Home
//

  test('Hacer clic en el botón de LinkedIn y verificar redirección', async ({ page }) => {
    const url = process.env.URL_PRUEBA;
    await page.goto(url);
  
    await page.click('a[aria-label="Enlace social de LinkedIn"]');

    const [newPage] = await Promise.all([
        new Promise(resolve => page.once('popup', resolve)),
        page.click('a[aria-label="Enlace social de LinkedIn"]')
    ]);

    expect(newPage.url()).toContain('linkedin.com');
  });
  