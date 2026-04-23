import google.generativeai as genai
from django.conf import settings
import re

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def clean_text(text):
    if not text:
        return text
    # remove **bold**
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    return text.strip()


def generate_titles(content):
    prompt = f"""mmk
    Generate 5 catchy blog titles for the following content.
    Return as a numbered list.

    Content:
    {content}
    """

    response = model.generate_content(prompt)
    response = clean_text(response.text)
    return response.text


def improve_content(content):
    prompt = f"""
    Improve the following blog content to be more engaging, clear, and professional:

    {content}
    """

    response = model.generate_content(prompt)
    response = clean_text(response.text)
    return response.text
