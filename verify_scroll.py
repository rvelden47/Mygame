from playwright.sync_api import sync_playwright
import time
import os

def main():
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.set_viewport_size({"width": 1280, "height": 720})

        print("Navigating to http://localhost:5173/Mygame/ ...")
        page.goto('http://localhost:5173/Mygame/')

        page.evaluate("localStorage.clear()")
        page.reload()

        # We start in scene1. By default, it takes 30s to show choices.
        # But we added a .dev-skip-btn !
        try:
            print("Waiting for dev skip...")
            page.wait_for_selector('.dev-skip-btn', timeout=5000)
            page.click('.dev-skip-btn')
            print("Clicked dev skip")
        except:
            print("No dev skip found, waiting for choice...")

        page.wait_for_selector('.choice-btn')
        page.click('.choice-btn') # Click first choice (Go to scene 2)
        print("Clicked choice")
        time.sleep(3) # Wait for scene 2 to load

        print("Screenshotting Scene 2 travel section...")
        page.screenshot(path='/home/jules/verification/screenshots/travel_scene.png')

        browser.close()

if __name__ == '__main__':
    main()
