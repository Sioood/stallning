import { test, expect } from '@playwright/test'

test('app renders without errors', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/.+/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})
