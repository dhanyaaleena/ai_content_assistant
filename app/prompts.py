def get_email_prompt(email_type, tone, length, keywords=None):
    return f"""
        Generate a {email_type} email in a {tone} tone, 
        approximately {length} characters long.
        {f"Use these keywords for context: {', '.join(keywords)}." if keywords else ""}
        Do not include explanations, headings, or suggestions—only provide the email.
    """

def get_social_media_prompt(platform, style, tone, length, mentions=None, keywords=None):
    return f"""
    Generate a  caption for {platform} in a {style} style and {tone} tone, 
    approximately {length} characters long.
    Include relevant and trending hashtags based on the content context.
    {f'Mention these accounts: {", ".join(mentions)}.' if any(mention.strip() for mention in mentions) else ''}
    {f"Use these keywords for context: {', '.join(keywords)}." if keywords else ""}
    Do not include explanations, headings, or suggestions—only provide the caption.
    """

def get_blog_post_prompt(topic, style, tone, length, keywords=None):
    return f"""
        Generate a blog post about {topic} in a {style} style and {tone} tone,
        approximately {length} characters long.
        {f"Include the following keywords for SEO: {', '.join(keywords)}." if keywords else ""}
        Do not include explanations, headings, or suggestions—only provide the post.
    """

def get_youtube_description_prompt(keywords=None, links=None, timestamps=None):
    return f"""
        Generate a YouTube video description optimized for search.
        {f"Include the following keywords: {', '.join(keywords)}." if keywords else ""}
        {f"Include these links: {', '.join(links)}." if links else ""}
        {f"Add timestamps for key sections of the video." if timestamps else ""}
        Do not include explanations, headings, or suggestions—only provide the description. 
    """
