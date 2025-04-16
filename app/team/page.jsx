import React from 'react';
import { 
  Github, 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe, 
  MessageCircle 
} from 'lucide-react';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-blue-300 opacity-10 blur-3xl rounded-full"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 text-center">
            The Team
          </h1>
          <p className="mt-4 text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Meet the passionate mind behind this interactive learning platform LEARNIQAI
          </p>
        </div>
      </section>
      
      {/* Team Member Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left column for photo */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-violet-600 p-6 flex flex-col justify-center items-center">
              <div className="mb-6 relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src="/dp.jpg" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/Shr13050" target="_blank" rel="noopener noreferrer" 
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all">
                  <Github className="text-white" size={20} />
                </a>
                <a href="mailto:shryl13050@gmail.com" 
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all">
                  <Mail className="text-white" size={20} />
                </a>
                <a href="https://www.linkedin.com/in/shreya-anand-2a86b0263/" target="_blank" rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all">
                  <Linkedin className="text-white" size={20} />
                </a>
                
              </div>
            </div>
            
            {/* Right column for content */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
               Shreya Anand
              </h2>
              <p className="text-gray-500 mb-4">Founder & Developer</p>
              
              <hr className="my-6 border-gray-200" />
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed text-justify">
                  Hi, I’m Shreya Anand, pursuing B.Tech Computer Science at NSUT with a CGPA of 9.08 and a strong academic foundation . I’ve interned at Siemens Energy as a Generative AI Intern and gained hands-on experience with cutting-edge LLM and vision models. My key projects include LearniQAI and SmartStockAI, combining AI, cloud, and full-stack development to build impactful solutions. I've secured top positions in prestigious hackathons by JPMorgan, Google, and Amdocs. From organizing Tech Week at NSUT to being IEEE EXECOMM and a Subhasha SPOC, I balance tech passion with leadership and teamwork.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">My Vision</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed text-justify" >
                    I envision LEARNIQAI as a groundbreaking force in shaping the future of education—one that goes beyond textbooks and exams to nurture intelligence, curiosity, and purpose. In a world rapidly transformed by AI, LEARNIQAI will stand as a personalized mentor, adapting to every learner’s pace, style, and aspirations. My vision is to build a platform that democratizes high-quality education, bridges skill gaps at scale, and empowers students to become not just job-ready, but future-ready. As LEARNIQAI evolves, I see it growing into a global ecosystem—where AI enhances human potential, and learning becomes a lifelong, fulfilling journey.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Get in Touch</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="shryl13050@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-blue-700">
                      <Mail size={18} />
                      <span>Email Me</span>
                    </a>
                    <a href="https://sleek-career-canvas.lovable.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors text-purple-700">
                      <Globe size={18} />
                      <span>My Portfolio</span>
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;