"use client";

import { useState, useEffect, useRef } from "react";

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#publications", label: "Publications" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            className="text-xl font-bold text-foreground transition-colors hover:text-muted-foreground"
          >
            {/* EDIT: Your name/logo */}
            CG
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-subtle"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle animation-delay-400"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm md:text-base font-medium text-muted-foreground mb-4 animate-fade-in-up">
              {/* EDIT: Your greeting */}
              Hello, I&apos;m
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up animation-delay-200">
              {/* EDIT: Your name */}
              Charles Goh C.K
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-400">
              {/* EDIT: Your title/subtitle */}
              Software Engineer
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-600">
              {/* EDIT: Your tagline */}
              Solving problems in systems and software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-800">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Get in Touch
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-right animation-delay-400">
            <div className="relative w-72 h-56 md:w-96 md:h-72 lg:w-[480px] lg:h-80">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 animate-float" />
              <div className="absolute inset-3 rounded-xl overflow-hidden border-2 border-border shadow-2xl">
                {/* EDIT: Replace with your image */}
                {/* Laptop with code and coffee - royalty free from Unsplash */}
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
                  alt="Laptop with code"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // EDIT: Your skills
  const skills = [
    { name: "Backend Engineering", level: 80 },
    { name: "Databases/Cloud/Infra", level: 70 },
    { name: "Artificial Intelligence", level: 60 },
    { name: "Frontend Engineering", level: 50 }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <div
            className={`${
              isVisible ? "animate-fade-in-left animation-delay-200" : "opacity-0"
            }`}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              {/* EDIT: About heading */}
              Building the Future, One Line at a Time
            </h3>
            <div className="space-y-4 text-muted-foreground">
              {/* EDIT: Your about description */}
              <p>
                I'm a software engineer with over 5 years of experience building enterprise applications, 
                and personal projects. My journey is motivated by the desire to make an impact in the world 
                with technology. 
              </p>
              <p>
                In my journey so far, I've had the opportunity to work on a wide range of project, which includes: 
                Full-Stack Web Applications centering around infrastructure automations; 
                Generative-AI Chatbots with Retrieval Augmented Generation capabilities; 
                Human Triggered and Autonomous AI Agents
              </p>
            </div>
          </div>

          {/* Skills */}
          <div
            className={`${
              isVisible ? "animate-fade-in-right animation-delay-400" : "opacity-0"
            }`}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Skills & Technologies
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100 + 600}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Experience Section with Timeline
function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // EDIT: Your experience
  const experiences = [
    {
      title: "Software Engineering",
      company: "Visa",
      period: "2020 - Present",
      description:
        "Driving development of monolithic services and microservices in the domain of infrastructure automation and Gen-AI",
      technologies: ["Java", "Springboot", "Python", "Gen-AI", "SQL"],
    },
    {
      title: "System Administrator Intern",
      company: "Visa",
      period: "2019",
      description:
        "Development of monolithic services and microservices in the domain of infrastructure automation and Gen-AI",
      technologies: ["Java", "Springboot", "Python", "SQL"],
    },
    {
      title: "System Developer Intern",
      company: "Infineon Technologies",
      period: "2018",
      description:
        "Development of a bar-code scanning inventory management system",
      technologies: ["PHP", "HTML", "CSS"],
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-12 last:mb-0 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200 + 200}ms` }}
            >
              <div
                className={`flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background shadow-md z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-foreground bg-accent px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // EDIT: Your education
  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Georgia Institute of Technology",
      period: "2022 - 2024",
      description:
        "Specialized in Interactive Intelligence.",
      achievements: ["Interactive Intelligence Specialization"],
    },
    {
      degree: "Bachelor of Computing (Distinction Honours)",
      school: "National University of Singapore",
      period: "2016 - 2020",
      description:
        "Major in Computer Science with Distinction Honours and a management minor",
      achievements: [
        "Distinction Honours",
        "Management Minor",
        "Database Systems Specialization"
      ],
    },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`group rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200 + 200}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>

              <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full mb-4">
                {edu.period}
              </span>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {edu.degree}
              </h3>
              <p className="text-primary font-medium mb-4">{edu.school}</p>
              <p className="text-muted-foreground text-sm mb-6">
                {edu.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {edu.achievements.map((achievement) => (
                  <span
                    key={achievement}
                    className="text-xs font-medium text-foreground bg-accent px-3 py-1 rounded-full"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Publications Section
function PublicationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // EDIT: Your publications
  const publications = [
    // {
    //   title: "Your Publication Title Here",
    //   authors: "Charles Goh C.K., Co-Author Name",
    //   venue: "Conference/Journal Name",
    //   year: "2024",
    //   description:
    //     "Brief description of the publication and its key contributions to the field.",
    //   links: {
    //     paper: "#", // EDIT: Link to paper
    //     code: "#", // EDIT: Link to code (optional)
    //   },
    // },
    {
      title: "Safe-Send",
      authors: "Goh Chang Kang, Charles; Loh Guo Yang; Sachin Mathew; Jyoti Sahu; Galvin Leow; Jing Rong Chan",
      venue: "Technical Disclosure Commons: Defensive Publications Series",
      year: "2023",
      description:
        "The present disclosure relates to a method of performing a Safe-Send transaction that may allow a sender to recall money transferred to a receiver even after the transaction is completed.",
      links: {
        paper: "https://www.tdcommons.org/dpubs_series/6319/",
        code: ""
      },
    },
  ];

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Publications
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <div
              key={index}
              className={`group rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150 + 200}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Year badge */}
                  <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full mb-3">
                    {pub.year}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3>
                  
                  {/* Authors */}
                  <p className="text-sm text-muted-foreground mb-2">
                    {pub.authors}
                  </p>
                  
                  {/* Venue */}
                  <p className="text-sm font-medium text-primary mb-4">
                    {pub.venue}
                  </p>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {pub.description}
                  </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                  {pub.links.paper && (
                    <a
                      href={pub.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/80 px-4 py-2 rounded-full transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Paper
                    </a>
                  )}
                  {pub.links.code && (
                    <a
                      href={pub.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border hover:bg-accent px-4 py-2 rounded-full transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {/* EDIT: Your contact message */}
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Let&apos;s connect!
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${
            isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
          }`}
        >
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/charlesgohck" // EDIT: Your LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#0077b5]"
          >
            <svg
              className="w-6 h-6 text-[#0077b5]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="font-medium text-foreground group-hover:text-[#0077b5] transition-colors">
              LinkedIn
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/charlesgohck" // EDIT: Your GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-foreground"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium text-foreground transition-colors">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {/* EDIT: Your name */}
            © {new Date().getFullYear()} charlesgohck.com. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <PublicationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
