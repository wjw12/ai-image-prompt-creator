# AI Prompt Generator

Welcome to the AI Prompt Generator project! This tool helps users create dynamic prompts for AI image generation. All these prompts are applicable to Stable Diffusion models hosted on [Heurist Imagine](https://imagine.heurist.ai).

## Configuration Explanation

The project uses a JSON configuration file to define prompt templates and categories. Here's a breakdown of the structure:

### Templates

Each template in the `templates` array has the following structure:

```json
{
  "id": "unique_identifier",
  "name": "Display Name",
  "template": "Fixed keyword 1, fixed keyword 2, [category1,default=default_value], [category2,default=default_value], some other fixed keyword",
  "recommendedModel": "ModelName"
}
```

- id: A unique identifier for the template
- name: The display name of the template
- template: The prompt structure, with placeholders for dynamic categories
- recommendedModel: The suggested AI model for this template

### Categories

The `categories` object contains lists of keywords for each category:
```json
"categories": {
  "category1": ["keyword1", "keyword2", "keyword3"],
  "category2": ["keyword1", "keyword2", "keyword3"]
}
```

## Contribution Guide
We welcome contributions to expand our collection of prompt templates and keywords! Here's how you can contribute:

1. Fork this repository
2. Make your changes to the configuration file
3. Submit a pull request with your changes

### Adding a New Template
To add a new template:

1. Open the configuration file
2. Add a new object to the templates array
3. Ensure your template has a unique id
4. Use existing categories or create new ones as needed
5. Specify a recommended model

Example:

```json
{
  "id": "steampunk_invention",
  "name": "Steampunk Invention",
  "template": "steampunk-style [object,default=flying machine], with [character,default=inventor] operating it, [environment,default=Victorian-era workshop], [lighting,default=warm gaslight], [style,default=detailed illustration]",
  "recommendedModel": "SteampunkDreamerXL"
}
```

### Adding New Keywords
To add new keywords to existing categories:

1. Open the configuration file
2. Find the relevant category in the categories object
3. Add your new keywords to the array

Feel free to suggest new categories if needed!

### Try It Out!
You can try out these prompts and generate images for free at [https://imagine.heurist.ai](https://imagine.heurist.ai), our AI image generator platform.

### Feedback and Support

If you have any questions, suggestions, or issues, please open an issue in this repository. We appreciate your feedback and contributions!

Happy prompting!