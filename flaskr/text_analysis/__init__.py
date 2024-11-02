from groq import Groq


def get_plot_summary_analysis(text):
    #TODO: remove api key from code
    client = Groq(api_key="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")
    chat = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Summarize the following plot: {text[:30000]}",
            }
        ],
        model="llama3-8b-8192"
        # Groq has 30000 token limit
    )
    return chat.choices[0].message.content
