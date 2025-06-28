from google import genai
import os

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def get_material_type(material):
    prompt = f"What type of material are {material} usually made of? Provide the answer in one short sentence."
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    return response.text.strip()

def get_material_recyclability(material):
    prompt = f"Explain the recyclability of {material} items in simple language in under 7 lines. Mention if it needs to be clean or dry."
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    return response.text.strip()

def get_material_fun_fact(material):
    prompt = f"Give a single interesting 'Did you know?' style fun fact about {material} in one sentence."
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    return response.text.strip()