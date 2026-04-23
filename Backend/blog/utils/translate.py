import requests

# Ordered list of public LibreTranslate mirrors.
# If the primary fails, the next one is tried automatically.
LIBRE_TRANSLATE_MIRRORS = [
    "https://translate.fedilab.app/translate",
    "https://libretranslate.pussthecat.org/translate",
]


def translate_text(text, target_lang="en"):
    """
    Translate `text` to `target_lang` using public LibreTranslate mirrors.
    Falls back to the original text if all mirrors fail.

    Root causes of empty results (now fixed):
      1. Old URL `libretranslate.de` is dead — it returns 301, which causes
         requests to convert the POST to a GET, silently dropping the body.
      2. `data=` sends form-encoded payload; LibreTranslate requires JSON.
         Fixed by using `json=` so the correct Content-Type is set.
    """
    payload = {"q": text, "source": "auto", "target": target_lang, "format": "text"}

    for mirror_url in LIBRE_TRANSLATE_MIRRORS:
        try:
            # ✅ Use json= (not data=) so Content-Type is application/json
            response = requests.post(mirror_url, json=payload, timeout=8)

            if response.status_code != 200:
                print(
                    f"[translate] {mirror_url} returned {response.status_code}: {response.text}"
                )
                continue  # try next mirror

            try:
                result = response.json()
            except Exception:
                print(f"[translate] Invalid JSON from {mirror_url}: {response.text}")
                continue

            translated = result.get("translatedText")
            if translated:
                return translated

            print(f"[translate] Empty translatedText from {mirror_url}: {result}")

        except requests.exceptions.Timeout:
            print(f"[translate] Timeout reaching {mirror_url}")
        except Exception as e:
            print(f"[translate] Error with {mirror_url}: {e}")

    # All mirrors failed — return original text unchanged
    print("[translate] All mirrors failed. Returning original text.")
    return text
