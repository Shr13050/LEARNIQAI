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
