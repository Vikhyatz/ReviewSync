from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import tempfile

temp_profile = tempfile.TemporaryDirectory()
brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

chrome_options = Options()
# add incognito to never run out of free limit
chrome_options.binary_location = brave_path
chrome_options.add_argument(f"--user-data-dir={temp_profile.name}")
chrome_options.add_argument("--incognito")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--no-first-run")

text = '''Procrastination—the act of delaying or postponing tasks—is a universal experience, one that nearly everyone can relate to. Whether it’s putting off writing a paper, avoiding cleaning the house, or delaying a trip to the gym, procrastination can be a source of frustration and self-criticism. But why do we procrastinate, even when we know it’s not in our best interest? The answer lies in a complex web of psychological factors, including fear of failure, perfectionism, task aversion, and the brain's tendency to favor immediate rewards.

At its core, procrastination is not a problem of time management but of emotion regulation. People procrastinate to avoid negative emotions associated with a task—stress, anxiety, boredom, or self-doubt. For example, a student might delay studying because the task reminds them of their fear of not performing well. The brain, in seeking to reduce this discomfort, chooses a more pleasant alternative in the short term, such as watching a movie or scrolling through social media.

This behavior is also tied to how our brains are wired. The limbic system, which governs our emotional responses, often overpowers the prefrontal cortex, which is responsible for planning and self-control. When the limbic system wins, we choose immediate gratification over long-term benefits. This neurological tug-of-war explains why even intelligent and organized individuals fall prey to procrastination.

Perfectionism can also play a significant role. People who set unrealistically high standards for themselves may avoid starting a task because they fear they won’t meet those standards. This fear creates a paralyzing effect, leading to a cycle of inaction and guilt. Ironically, procrastination can then damage self-esteem further, reinforcing the very anxiety that caused it in the first place.

Overcoming procrastination requires more than sheer willpower; it often involves reshaping habits and perceptions. Strategies such as breaking tasks into smaller, manageable parts, setting deadlines, and practicing self-compassion can be effective. Techniques like the Pomodoro Technique, which involves working in short, focused intervals with breaks in between, can also help retrain the brain to stay engaged.

Ultimately, procrastination is not a character flaw but a challenge that stems from the way our minds handle emotions and rewards. By understanding the psychological underpinnings of procrastination, we can better equip ourselves to confront it—not with harsh self-judgment, but with empathy, strategy, and persistence.'''

words = text.split()

chunk_size = 70

for i in range(0, len(words), chunk_size):
    chunk = words[i:i + chunk_size]
    chunkText = " ".join(chunk)

    print(f"\n--- Chunk {i//chunk_size + 1} ---\n")
    print(chunkText)
    print("\n--- HUMANIZED VERSION OF CHUNK {i//chunk_size + 1} ---\n")

    # start the driver and perform the humanization
    # load the driver with custom options to launch the window in incognito
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://humanizer.org")


    wait = WebDriverWait(driver, 10)
    input_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div[contenteditable="true"].ProseMirror')))
    button = driver.find_element(By.XPATH, '//button[.//span[text()="Humanize"]]')


    input_element.click()
    input_element.send_keys(chunkText)

    input_element.send_keys(Keys.RETURN)
    button.click()

    editor_output = wait.until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'div[contenteditable="false"][suppresscontenteditablewarning="true"].tiptap.ProseMirror'))
    )


    # print("Request text:", text)
    paragraph_text = editor_output.text
    print(paragraph_text)


    time.sleep(5)

    driver.quit()
    













# driver = webdriver.Chrome()

# driver.get("https://humanizer.org")

# editor = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div[contenteditable="true"].ProseMirror')))

# time.sleep(10)

# input_element = driver.find_element(By.CSS_SELECTOR, 'input[placeholder="sudo"]')
# for _ in range(100):
#     input_element.clear()
#     input_element.send_keys("sourcecode")
#     input_element.send_keys(Keys.RETURN)
#     time.sleep(2)
#     driver.get("https://beastcodz.github.io")
#     time.sleep(2)
#     input_element = driver.find_element(By.CSS_SELECTOR, 'input[placeholder="sudo"]')
# input_element.send_keys("sourcecode")
