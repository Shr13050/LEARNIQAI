const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 //model to make a call
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial on following detail with field, as course name, description, along with chapter name, about, duration: category: programming, topic: python, level: basic, duration: 1 hours, number of chapters: 5, in Json format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"course_name\": \"Python Basics: A Beginner's Journey\",\n    \"description\": \"This course provides a fundamental introduction to Python programming, covering essential concepts and syntax for beginners. You'll learn how to write simple programs, work with data, and understand basic control flow.\",\n    \"category\": \"programming\",\n     \"topic\": \"python\",\n     \"level\": \"basic\",\n    \"duration\": \"1 hour\",\n    \"number_of_chapters\": 5,\n    \"chapters\": [\n      {\n        \"chapter_name\": \"Introduction to Python\",\n        \"about\": \"Welcome to the world of Python! This chapter will introduce you to what Python is, why it's popular, and how to set up your development environment.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"chapter_name\": \"Variables and Data Types\",\n        \"about\": \"Learn about different data types in Python, such as integers, floats, strings, and booleans. You'll also discover how to declare and use variables to store data.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"chapter_name\": \"Basic Input and Output\",\n        \"about\": \"Understand how to take input from the user and display output on the screen using Python's built-in functions like 'print()' and 'input()'.\",\n        \"duration\": \"10 minutes\"\n      },\n        {\n        \"chapter_name\": \"Operators and Expressions\",\n          \"about\": \"Explore arithmetic, comparison, and logical operators in Python. Learn how to form expressions and evaluate them to perform calculations and make decisions.\",\n          \"duration\": \"10 minutes\"\n      },\n        {\n        \"chapter_name\": \"Control Flow: Conditionals and Loops\",\n        \"about\": \"Dive into conditional statements (if, elif, else) and looping structures (for, while) to control the flow of your Python programs.\",\n        \"duration\": \"20 minutes\"\n      }\n    ]\n  }\n}\n```\n"},
          ],
        },
      ],
    });


   export const GenerateChapterContent_AI = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Explain the concept in detail on the topic: python, Chapter :Working with External Libraries ,in json format with list of array, with field as title, explanation on given chapter in detail, code example(Code field in <precode> format) if applicable"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"chapter\": {\n    \"title\": \"Working with External Libraries in Python\",\n    \"sections\": [\n      {\n        \"title\": \"Introduction to External Libraries\",\n        \"explanation\": \"Python's power extends far beyond its built-in functionalities through the use of external libraries, also known as packages or modules. These are collections of reusable code written by other developers (or even yourself) that provide specific functionalities, saving you from reinventing the wheel. They cover a vast range of tasks from web development to scientific computing, making Python a versatile language. The Python Package Index (PyPI) is the primary repository where these libraries are stored and can be easily accessed using package managers like pip.\",\n        \"code_example\": null\n      },\n      {\n        \"title\": \"The Role of pip (Package Installer for Python)\",\n        \"explanation\": \"pip is the default package installer for Python. It allows you to easily install, upgrade, and manage external libraries. It fetches packages from PyPI and handles dependency management, ensuring you have all the necessary components for your project. You can use pip through your command line or terminal.\",\n        \"code_example\": null\n      },\n      {\n        \"title\": \"Installing External Libraries with pip\",\n        \"explanation\": \"The basic syntax for installing a package using pip is `pip install <package_name>`. For example, to install the 'requests' library (used for making HTTP requests), you would run `pip install requests` in your terminal. Pip will download the package and install it in your Python environment. It also handles dependency management, installing other packages required by the library you are installing. You can also specify version using ==, for example: `pip install requests==2.26.0` or install a specific version or specify min version with >=. Use command pip uninstall <package_name> to uninstall any installed package.\",\n       \"code_example\": \"<precode>\\n# Example of installing the 'requests' library\\n# (This is a terminal command, not Python code)\\n# pip install requests\\n\\n#Example of specific version:\\n# pip install requests==2.26.0\\n\\n#Example of uninstall\\n# pip uninstall requests\\n</precode>\"\n      },\n      {\n        \"title\": \"Importing and Using External Libraries\",\n        \"explanation\": \"Once a library is installed, you need to import it into your Python script before you can use its functions, classes, or modules. The `import` statement is used for this purpose. You can import the entire library or specific parts of it. You can also use aliases to make your code more readable. For example, `import requests` will import the whole requests library and `import requests as req` will import request library as req object.\",\n        \"code_example\": \"<precode>\\n# Importing the entire library\\nimport requests\\n\\n# Example using requests to get some data\\nresponse = requests.get('https://api.example.com/data')\\nif response.status_code == 200:\\n    data = response.json()\\n    print(data)\\nelse:\\n    print(f\\\"Error: {response.status_code}\\\")\\n\\n#Import with alias\\nimport requests as req\\n\\nresponse = req.get('https://api.example.com/data')\\n\\n\\n# Importing specific part of library\\nfrom datetime import date\\n\\ntoday = date.today()\\nprint(today)\\n</precode>\"\n      },\n       {\n        \"title\": \"Commonly Used External Libraries\",\n        \"explanation\": \"Python has a vast ecosystem of external libraries. Some commonly used ones include:\\n\\n*   **requests**: For making HTTP requests (web scraping, API interaction)\\n*   **Beautiful Soup 4**: For parsing HTML and XML documents (web scraping)\\n*   **NumPy**: For numerical computing and array operations\\n*   **pandas**: For data manipulation and analysis (data science)\\n*   **Matplotlib**: For creating static, animated, and interactive visualizations\\n*   **Flask/Django**: For web development\\n*   **Scikit-learn**: For machine learning\\n\\nExploring these and other libraries based on your specific needs is a key part of effective Python programming.\",\n        \"code_example\": null\n      },\n        {\n        \"title\": \"Virtual Environments\",\n        \"explanation\": \"As you work on multiple Python projects, you might encounter situations where different projects require different versions of the same libraries, or have conflicting dependencies. To solve this, Python offers virtual environments. Virtual environments allow you to create isolated environments for each project, ensuring each project has its own set of libraries and dependencies. Tools like `venv` (built-in) or `virtualenv` are used to create and manage these environments. Using them makes sure projects are separated and don't have conflicting versions of a given dependency. \\n\\nTo create a virtual environment use this command `python -m venv <env_name>`, and activate it using `source <env_name>/bin/activate` on Unix based OS or `<env_name>\\\\Scripts\\\\activate` on Windows. Deactivate using `deactivate`.\",\n        \"code_example\": \"<precode>\\n# Example of creating a virtual environment\\n# (This is a terminal command, not Python code)\\n# python -m venv my_env\\n\\n# Activating the virtual environment (Unix-based systems)\\n# source my_env/bin/activate\\n\\n# Activating the virtual environment (Windows)\\n# my_env\\\\Scripts\\\\activate\\n\\n# Deactivating virtual environment\\n# deactivate\\n</precode>\"\n      },\n      {\n        \"title\": \"Understanding Dependency Management\",\n        \"explanation\": \"Dependency management is crucial when working with multiple libraries. When you install a library, it might depend on other libraries. Pip helps manage these dependencies. It is best practice to create a `requirements.txt` file which will contain all the packages your application depends on and it's versions. To create this file, after installing packages for your project, use `pip freeze > requirements.txt`. When deploying to a different environment, you can install these requirements with `pip install -r requirements.txt` .\",\n         \"code_example\": \"<precode>\\n# Example of creating requirements.txt\\n# (This is a terminal command, not Python code)\\n# pip freeze > requirements.txt\\n\\n# Example of installing requirements from file\\n# pip install -r requirements.txt\\n</precode>\"\n      }\n\n    ]\n  }\n}\n```\n"},
            ],
          },
        ],
      });
  
   
  
  
  