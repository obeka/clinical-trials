import { test, expect } from '@playwright/test';

test.describe('Favorites Flow', () => {
  test('Add items to favorites and verify', async ({ page }) => {
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

  test('Pause timer and verify countdown stops', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act - Click the pause button
    await page.click('button:has-text("Pause Timer")');

    await page.waitForTimeout(1500);

    // Assert
    await expect(page.locator('p:has-text("Next update in:")')).toContainText(
      'Paused'
    );

    // Act - Resume timer
    await page.click('button:has-text("Resume Timer")');

    // Assert
    await expect(
      page.locator('p:has-text("Next update in:")')
    ).not.toContainText('Paused');
  });

  test('Verify trials refresh automatically every 5 seconds', async ({
    page,
  }) => {
    // Arrange
    await page.goto('/');

    const firstTrialTitle = await page
      .locator('app-trial-card')
      .first()
      .textContent();

    // Act - Wait for the timer to complete one cycle (5 seconds plus buffer)
    await page.waitForTimeout(6000);

    // Assert - Trial content should have changed
    const newFirstTrialTitle = await page
      .locator('app-trial-card')
      .first()
      .textContent();
    expect(newFirstTrialTitle).not.toEqual(firstTrialTitle);
  });

  test('Remove items from favorites', async ({ page }) => {
    // Arrange - Add item to favorites
    await page.goto('/');
    await page.check('mat-checkbox:nth-of-type(1) input');
    await page.click('button:has-text("Add to Favorites")');
    await page.click('button[routerLink="/favorites"]');

    // Verify item was added
    const initialFavoriteCount = await page.locator('app-trial-card').count();
    expect(initialFavoriteCount).toBeGreaterThan(0);

    await page.check('mat-checkbox input');
    await page.click('button:has-text("Remove Selected Favorites")');

    // Assert - No more favorites
    await expect(page.locator('app-trial-card')).toHaveCount(0);
  });
});
