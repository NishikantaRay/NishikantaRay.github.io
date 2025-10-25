/**
 * Resume Configuration (JavaScript Version)
 * This is a fallback for when TOML loading is not available
 * You can use this instead of TOML if needed
 */

window.RESUME_CONFIG_JS = {
    personal: {
        name: "Nishikanta Ray",
        title: "Software Engineer",
        phone: "+91-6372833923",
        email: "nishikantaray1@gmail.com",
        website: "https://nishikanta.in",
        github: "https://github.com/NishikantaRay",
        linkedin: "https://linkedin.com/in/nishikanta-ray-7786a0196",
        location: "Bhubaneswar, Odisha"
    },

    summary: {
        text: "A passionate Full Stack Developer, explorer, and freelancer with 2+ years of experience in designing, developing, and delivering innovative web solutions. Currently working at @letsflo and actively contributing to the open-source community."
    },

    experience: [
        {
            position: "Software Engineer, Lets Flo (India)",
            company: "Lets Flo (India)",
            company_url: "",
            location: "Bengaluru, Karnataka",
            start_date: "Jul 2023",
            end_date: "present",
            is_current: true,
            achievements: [
                "Developed and enhanced a proprietary JavaScript-based framework, improving performance (upload and download performance desktop APIs) and scalability, which improved API response times by 40%.",
                "Integrated multiple third-party Node.js APIs into the product, enhancing functionality and reducing data processing time.",
                "Built and optimized web applications using JavaScript, Node.js, Angular, React, Tailwind CSS, and MongoDB."
            ]
        },
        {
            position: "Software Developer Trainee, Teceads Solutions",
            company: "Teceads Solutions",
            company_url: "",
            location: "Bhubaneswar, Odisha",
            start_date: "Jul 2022",
            end_date: "Jan 2023",
            is_current: false,
            achievements: [
                "Designed and implemented admin panels, backend APIs, and frontend interfaces from scratch, ensuring seamless functionality and improving system efficiency.",
                "Created a hyperlocal e-commerce platform and a carbon emission estimation tool using React.js, Node.js, Express, PostgreSQL, Prisma ORM, and MongoDB."
            ]
        }
    ],

    education: [
        {
            degree: "B.Tech in Electronics and Communication",
            institution: "Silicon University",
            institution_url: "",
            location: "Bhubaneswar, Odisha",
            graduation_year: "2023",
            gpa: "8.65/10"
        },
        {
            degree: "XII (CHSE)",
            institution: "Vidyarthee Residential College",
            institution_url: "",
            location: "Dhenkanal, Odisha",
            graduation_year: "2019",
            notes: "Passed with 79.67%"
        },
        {
            degree: "X (BSE, Odisha)",
            institution: "Brajanath Badajena High School",
            institution_url: "",
            location: "Dhenkanal, Odisha",
            graduation_year: "2017",
            notes: "Passed with 77.5%"
        }
    ],

    projects: [
        {
            name: "FlexiFrame-A Comprehensive CSS Library (2024)",
            description: "Programmed a CSS library with 25+ components and advanced layouts using Sass, designed for scalability and maintainability.",
            technologies: ["Sass", "CSS", "BEM"],
            start_date: "2024",
            end_date: "2024",
            highlights: [
                "Programmed a CSS library with 25+ components and advanced layouts using Sass, designed for scalability and maintainability."
            ]
        },
        {
            name: "STUDYTUB, Users: 4.5k+ (as of 08-02-2025)",
            description: "Designed StudyTub, a platform empowering B.Tech students with study materials.",
            technologies: ["Cloudflare Workers", "ReactJS", "NodeJS", "MongoDB"],
            start_date: "2024",
            end_date: "2025",
            highlights: [
                "Designed StudyTub, a platform empowering B.Tech students with study materials.",
                "Built using Cloudflare Workers, ReactJS, NodeJS, and MongoDB to ensure scalability and performance."
            ]
        },
        {
            name: "Bootstrap 5 Vscode Extension, Total installs: 19k+ (as of 11-02-2025)",
            description: "Architected the Bootstrap 5 and FontAwesome (4-6) snippets extension for VS Code.",
            technologies: ["VS Code", "JavaScript", "Bootstrap", "FontAwesome"],
            start_date: "2023",
            end_date: "2025",
            highlights: [
                "Architected the Bootstrap 5 and FontAwesome (4-6) snippets extension for VS Code.",
                "Provides templates, utility snippets, and powerful features, enhancing web development with JavaScript."
            ]
        }
    ],

    skills: {
        programming: {
            category: "Programming Languages",
            technologies: ["JavaScript", "TypeScript"]
        },
        databases: {
            category: "Databases",
            technologies: ["MongoDB", "MySQL", "Postgres SQL"]
        },
        cloud: {
            category: "Cloud & DevOps",
            technologies: ["AWS", "GitHub Actions", "Docker"]
        },
        web: {
            category: "Web Development",
            technologies: ["MERN", "MEAN"]
        },
        tools: {
            category: "Tools and Platforms",
            technologies: ["VS Code", "Postman", "Git", "GitHub", "Heroku", "Cloudflare", "Jira"]
        }
    },

    achievements: [
        {
            title: "Google Web Dev Insights Community",
            issuer: "Member, Postman API Fest 2022 Mentor, and Smart India Hackathon 2022 Finalist",
            date: "",
            type: "community"
        },
        {
            title: "Winner of Hack the Mountain 2.0 (Affinidi Track, 2021)",
            issuer: "",
            date: "",
            type: "award",
            description: "for building a decentralized identity project"
        }
    ],

    settings: {
        show_gpa: true,
        show_location: true,
        show_phone: false,
        date_format: "MMM YYYY",
        max_achievements_per_section: 10,
        enable_share_button: true
    }
};