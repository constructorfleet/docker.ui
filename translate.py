import os
import re
import requests

TRANSLATE_URL = "http://localhost:5001/translate"
SOURCE_LANG = "zh"
TARGET_LANG = "en"
FILE_EXTENSIONS = ('.html', '.js')

chinese_regex = re.compile(r'[\u4e00-\u9fff]{2,}')

def translate_text(text):
    try:
        response = requests.post(
            TRANSLATE_URL,
            data={
                'q': text,
                'source': SOURCE_LANG,
                'target': TARGET_LANG,
                'format': 'text'
            }
        )
        response.raise_for_status()
        translation = response.json().get('translatedText', text)
        return translation.replace("'", "\\'")
    except Exception as e:
        print(f"[!] Translation failed for '{text}': {e}")
        return text

def scan_and_translate(path):
    translations = {}
    for root, _, files in os.walk(path):
        for file in files:
            if file.endswith(FILE_EXTENSIONS):
                full_path = os.path.join(root, file)
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                matches = set(chinese_regex.findall(content))
                if not matches:
                    continue

                print(f"[+] Found {len(matches)} phrases in {file}")
                for match in matches:
                    if match not in translations:
                        translation = translate_text(match)
                        translations[match] = translation
                        print(f"    {match} => {translation}")

                for zh, en in translations.items():
                    content = content.replace(zh, en)

                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)

                print(f"[~] Updated {file}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python translate_repo.py /path/to/repo")
        sys.exit(1)

    repo_path = sys.argv[1]
    scan_and_translate(repo_path)
