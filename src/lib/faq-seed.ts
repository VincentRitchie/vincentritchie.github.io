/**
 * Initial FAQ seed entries for the chatbot.
 * Content aligned with the Multimodal Prompt Engineer / AI Video Producer /
 * Video Annotation Specialist identity per the latest Q4 CV.
 * No invented clients, testimonials, certifications, or achievements.
 *
 * Each entry: { question, answer, keywords, category, order }
 */
export const FAQ_SEED = [
  {
    question: "Who is Vincent Chimaobi Obasiochie?",
    answer:
      "VINCENT CHIMAOBI OBASIOCHIE is a Multimodal Prompt Engineer, AI Video Producer and Video Annotation Specialist based in Abuja, Nigeria. I work with generative AI across text, image and video production, and I annotate and evaluate visual content for AI training. My work combines structured prompting, careful visual review, character consistency and quality control across long-form productions.",
    keywords: "who,about,vincent,chimaobi,obasiochie,background,introduction",
    category: "about",
    order: 1,
  },
  {
    question: "What services do you offer?",
    answer:
      "I offer video annotation for AI training data (intent captions, atomic subtasks, outcome ratings, execution-error documentation), computer vision image annotation and instance segmentation in CVAT (bounding boxes, polygons, segmentation masks, brush-based masking), AI video production from story development through final assembly, and multimodal prompt engineering with reusable production templates. Each area is supported by the same discipline: plan before starting, review carefully, document accurately, and correct inconsistencies before moving forward.",
    keywords: "services,offer,help,work,do,expertise,skills",
    category: "services",
    order: 2,
  },
  {
    question: "What is your current role?",
    answer:
      "I currently work as an LLM Trainer – Video Annotation Specialist at Turing (remote). I annotate short robot-arm task videos for AI training data, producing four structured deliverables per clip: an intent caption, an atomic subtask list, a final summary and an outcome rating. I review each clip in full before writing, record objects, counts, colours, starting positions, gripper type and final state, separate the robot's intended goal from its actual execution, and grade outcomes as Success, Partial or Fail.",
    keywords: "current,role,job,turing,llm,trainer,present,working",
    category: "about",
    order: 3,
  },
  {
    question: "What is multimodal prompt engineering?",
    answer:
      "Multimodal prompt engineering is the structured practice of guiding generative AI across text, image and video in one production process. I work with ChatGPT, Gemini and Claude using reusable production templates and activation directives, carrying a production from story development and scriptwriting through scene planning, image and video generation, voice production, sequencing and final assembly. Every generative stage gets structured prompts that define the objective, anchor the references and set constraints.",
    keywords: "multimodal,prompt,engineering,text,image,video,generation,chatgpt,gemini,claude",
    category: "multimodal-prompting",
    order: 4,
  },
  {
    question: "What is your CVAT annotation practice?",
    answer:
      "I applied CVAT Academy's annotation curriculum through structured, project-based exercises involving multi-object image datasets, crowded urban intersections, roadside markets, pedestrians, vehicles and complex object interactions. I configure CVAT annotation tasks and custom JSON label schemas, execute multi-instance annotation using bounding boxes, polygons and segmentation masks, apply brush-based masking, polygon-to-mask selection and additive/subtractive region editing, and complete video-tracking exercises using persistent object tracks, manually adjusted keyframes and interpolation. This is independent practice, not employment.",
    keywords: "cvat,computer,vision,image,annotation,segmentation,masks,polygons,bounding,boxes,tracking,practice",
    category: "cv-annotation",
    order: 5,
  },
  {
    question: "How do you maintain character consistency across generated scenes?",
    answer:
      "I maintain character recognisability through facial characteristics, clothing, settings and visual cues. I establish the character identity before any scene generation begins, plan films scene by scene using reusable production templates, keep useful references so each output can be checked against the intended look, review each output for drift, and correct inconsistencies through prompt and reference revision. Across my channels this discipline has held character, location, background and storyline continuity across more than 20 complete Nollywood-style AI films.",
    keywords: "character,consistency,identity,facial,recognisability,continuity,scene",
    category: "production-approach",
    order: 6,
  },
  {
    question: "What does your AI video production process look like?",
    answer:
      "My production approach runs from investigative research through final assembly: research, story development, scriptwriting, scene planning, structured prompting, visual reference preparation, AI generation, character and scene continuity review, voice production, sound design, sequencing, quality review and final assembly in CapCut. This reduces unnecessary retries, maintains stronger continuity, and lets me use different generative tools according to the needs of each production stage.",
    keywords: "ai,video,production,film,nollywood,story,script,voice,sequencing,capcut,process",
    category: "production-approach",
    order: 7,
  },
  {
    question: "What tools do you use?",
    answer:
      "My core tools are ChatGPT, Gemini and Claude for the text stages (story development, scriptwriting, scene planning and activation directives), plus CVAT for image annotation and video tracking, and CapCut for final video assembly. I select the right tool for each production stage rather than relying on a single tool for everything.",
    keywords: "tools,use,software,chatgpt,gemini,claude,cvat,capcut,stack",
    category: "multimodal-prompting",
    order: 8,
  },
  {
    question: "What projects have you worked on?",
    answer:
      "Confirmed work includes AI Nollywood-style faceless film channels with 29,000+ subscribers and 13.5 million+ combined views (more than 20 complete films), AI true-crime reconstruction production for documented cases under NDA, long-form AI 3D documentary video production, robot-arm video annotation at Turing, and CVAT image annotation and video tracking practice. Earlier experience includes search quality evaluation at OneForma, digital content quality work at TELUS Digital, and content review at Remotasks.",
    keywords: "projects,work,portfolio,case study,examples,film,youtube,documentary,true crime,annotation",
    category: "projects",
    order: 9,
  },
  {
    question: "How can I contact you?",
    answer:
      "You can reach me by email at vincentchimaobi042@gmail.com (or sekretv.contact@gmail.com), by phone at 09068254110, or through the contact form on this website. I am based in Abuja, Nigeria, and I am available for remote multimodal prompt engineering, AI video production, video annotation and content quality opportunities. You can also connect with me on LinkedIn at vincent-chimaobi042.",
    keywords: "contact,email,phone,reach,connect,message,linkedin",
    category: "contact",
    order: 10,
  },
  {
    question: "Can I view your CV?",
    answer:
      "Yes, my updated professional CV can be read directly on this website. Use the View My CV button in the hero or Contact section to open it in the site's document viewer. It is provided for reading online rather than as a direct download.",
    keywords: "cv,resume,view,pdf,document,read,online",
    category: "contact",
    order: 11,
  },
  {
    question: "Do you write articles or research notes?",
    answer:
      "The Articles section is being prepared as a knowledge hub for multimodal prompt engineering, AI video production, video annotation, character consistency and content quality. New posts will be added gradually as the portfolio grows.",
    keywords: "articles,blog,research,posts,writing,notes",
    category: "articles",
    order: 12,
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I am available for remote multimodal prompt engineering, AI video production, video annotation and content quality opportunities. My experience includes remote work with Turing, OneForma, TELUS Digital, Remotasks and independent AI content production. I am based in Abuja, Nigeria.",
    keywords: "remote,work,online,location,abuja,nigeria",
    category: "contact",
    order: 13,
  },
  {
    question: "I want to hire you or discuss a project: what should I include?",
    answer:
      "For video annotation or AI training data work, please include the annotation type (video, image or both), expected volume, guidelines availability, tools involved, timeline, and whether quality review is part of the engagement. For AI video production or multimodal prompt engineering, please include the type of production, target audience, intended length, character or story requirements, references if available, and timeline. For content writing, research or quality review, please include the type of content, expected depth, research requirements, accuracy expectations, volume and timeline.",
    keywords: "hire,project,job,work,inquiry,rfp,proposal,discuss",
    category: "contact",
    order: 14,
  },
];
