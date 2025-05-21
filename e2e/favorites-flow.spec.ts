import { test, expect } from '@playwright/test';

test.describe('Favorites Flow', () => {
  test('3a - Add items to favorites and verify', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act
    await page.check('mat-checkbox:nth-of-type(1) input');
    await page.click('button:has-text("Add to Favorites")');
    await page.click('button[routerLink="/favorites"]');

    // Assert
    const favoriteItems = await page.locator('app-trial-card');
    await expect(favoriteItems).toHaveCount(1);
  });
});
