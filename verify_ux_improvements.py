import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            # Navigate to the app
            await page.goto("http://localhost:8000")

            # 1. Verify bounce animation on "Add to Cart" button
            print("Verifying 'Add to Cart' bounce animation...")

            # Wait for product cards to be visible
            await page.wait_for_selector(".product-card", timeout=15000)

            add_to_cart_button = page.locator(".add-to-cart-btn").first

            # Click the button
            await add_to_cart_button.click()

            # Check for the animation class immediately after click
            await expect(add_to_cart_button).to_have_class(
                "add-to-cart-btn bounce-animation", timeout=500
            )
            print("Bounce animation class applied successfully.")

            # The class is removed after 500ms, so we can check for its absence afterwards
            await page.wait_for_timeout(600)
            await expect(add_to_cart_button).to_have_class("add-to-cart-btn")
            print("Bounce animation class removed as expected.")

            # 2. Verify confetti on order confirmation
            print("\nVerifying confetti on order confirmation...")

            # Login to proceed with checkout
            await page.locator('button:has-text("Login")').click()
            await page.fill('input[name="email"]', "test3@gmail.com")
            await page.fill('input[name="password"]', "12345678")
            await page.click('button:has-text("Login")')
            await page.wait_for_load_state('networkidle')

            # Proceed to shipping
            await page.locator('button:has-text("Ir a Envio")').click()

            # Fill address and proceed to summary
            await page.fill('input[name="street"]', "Test Street")
            await page.fill('input[name="streetNumber"]', "123")
            await page.fill('input[name="city"]', "Test City")
            await page.locator('button:has-text("Ver Resumen")').click()

            # Confirm order
            await page.locator('button:has-text("Confirmar Pedido")').click()
            await page.wait_for_load_state('networkidle')

            # Check for confetti canvas
            confetti_canvas = page.locator("canvas")
            await expect(confetti_canvas).to_be_visible(timeout=5000)
            print("Confetti canvas is visible.")

            # Take a screenshot
            screenshot_path = "/home/swebot/jules-scratch/verification/ux_improvements.png"
            await page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred: {e}")
            # Take a screenshot on failure
            screenshot_path = "/home/swebot/jules-scratch/verification/ux_improvements_error.png"
            await page.screenshot(path=screenshot_path)
            print(f"Error screenshot saved to {screenshot_path}")
            raise

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
