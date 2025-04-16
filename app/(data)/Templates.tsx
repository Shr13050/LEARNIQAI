export default [
  {
    name: "Blog",
    desc: "An AI tool that writes a comprehensive blog.",
    category: "Blog",
    icon: "/blog.png",
    aiprompt:
      "Write a comprehensive blog based on the title and outline. The blog should include an engaging introduction, detailed main content with subheadings, real-world examples or use cases, and a conclusion with a call to action. Use a professional and conversational tone, ensuring readability and SEO optimization with relevant keywords.",
    slug: "generate-blog",
    form: [
      {
        label: "Enter your Blog title",
        field: "input",
        name: "title",
        required: true,
      },
      {
        label: "Enter blog outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Essay",
    desc: "An AI tool that helps you write academic essays.",
    category: "Writing",
    icon: "/essay.png",
    aiprompt:
      "Write an academic essay on the given topic. The essay should have a clear thesis statement, structured arguments, supporting evidence, and a well-rounded conclusion.",
    slug: "generate-essay",
    form: [
      {
        label: "Enter essay topic",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Research Paper",
    desc: "An AI tool that helps you write research papers.",
    category: "Writing",
    icon: "/respaper.png",
    aiprompt:
      "Generate a detailed research paper based on the provided research question. Include a literature review, methodology, results, discussion, and conclusion sections.",
    slug: "generate-research-paper",
    form: [
      {
        label: "Enter research topic",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "LinkedIn Post Generator",
    desc: "An AI tool that creates a LinkedIn posts.",
    category: "Productivity",
    icon: "/linkin.png",
    aiprompt:
      "Create a high quality LinkedIn post content based on the content provided by the user .",
    slug: "generate-LinkedIn-Post",
    form: [
      {
        label: "Enter LinkedIn Post Brief description and content ",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "PowerPoint Context Generator",
    desc: "An AI tool that creates a powerPoint Context for slides",
    category: "Productivity",
    icon: "/ppt.png",
    aiprompt:
      "Create high quality 10 powerpoint slides content based on the content provided by the user .",
    slug: "generate-ppt-context",
    form: [
      {
        label: "Enter topic to create PowerPoint ,provide Brief description and content ",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },

  {
    name: "Cover Letter Generator",
    desc: "An AI tool that creates a Cover Letter.",
    category: "Productivity",
    icon: "/cl.jpg",
    aiprompt:
      "Create a high quality professional Cover Letter based on the content provided by the user .",
    slug: "generate-coverletter-draft",
    form: [
      {
        label: "Enter a brief description of your background along with your contact details, job title, work experience, and key skills to generate your personalized cover letter. ",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Code Debugger",
    desc: "An AI tool that debugs your code and help you with all optimizations , errors and best methods",
    category: "Productivity",
    icon: "/cd.jpg",
    aiprompt:
      "Find bugs, suggest optimizations, and share best practices.give clean, efficient, and error-free code instantly.",
    slug: "debug-code-instantly",
    form: [
      {
        label: "Enter your code for debugging and suggestion ",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Math Problem Solver",
    desc: "An AI tool to solve math problems and provide step-by-step solutions.",
    category: "Learning",
    icon: "/math.png",
    aiprompt:
      "Solve the given math problem and provide a step-by-step solution with explanations.",
    slug: "solve-math-problem",
    form: [
      {
        label: "Enter math problem",
        field: "input",
        name: "math_problem",
        required: true,
      },
    ],
  },
  
];
