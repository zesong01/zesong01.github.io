import { useState, useEffect, useRef } from "react";

const LANG = {
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", experience: "Experience", publications: "Publications", contact: "Contact" },
    hero: {
      greeting: "Hello, I'm",
      name: "Zesong Guo",
      roles: ["AI Algorithm Engineer", "LLM Architect", "Multi-Agent Builder", "RAG System Designer", "NLP Researcher"],
      tagline: "Building intelligent systems that transform how humans access knowledge",
      subtitle: "M.S. Computer Engineering · GPA 4.0/4.0",
      cta: "Explore My Work",
    },
    about: {
      title: "About Me",
      p1: "I'm a Computer Engineering master's student passionate about pushing the boundaries of Large Language Model applications. My work spans from designing multi-agent orchestration systems at Huatai Securities to building production-grade RAG pipelines at Shanghai-Chongqing AI Research Institute.",
      p2: "With dual bachelor's degrees in Computer Science and Data Science from UW-Madison (Dean's Honor List), I bring a strong foundation in both theory and engineering. I specialize in turning complex AI research into real-world systems that deliver measurable business impact.",
      stats: [
        { value: "4.0", label: "GPA" },
        { value: "7+", label: "Agents Built" },
        { value: "92%", label: "Coverage Rate" },
        { value: "15×", label: "Efficiency Gain" },
      ],
    },
    skills: { title: "Tech Arsenal", subtitle: "The tools I use to build intelligent systems" },
    projects: {
      title: "What I've Built",
      subtitle: "Real systems solving real problems at scale",
      items: [
        {
          title: "Multi-Agent Research Report System",
          org: "Huatai Securities · Shenzhen",
          period: "2025.05 – 2025.08",
          color: "#FF6B6B",
          icon: "🏦",
          highlights: [
            "Designed 7-agent collaborative architecture inspired by DeepResearch — data crawling, stock retrieval, industry analysis, trend analysis, chart generation, report writing, and quality review",
            "Built MCP services via FastMCP with 20+ tool interfaces connecting exchanges, statistics bureaus, and data sources through shared state management and event subscription",
            "Vectorized historical reports in Milvus with hybrid keyword + vector retrieval, Few-Shot templates guiding Qwen2.5-72B-Instruct generation via Function Calling",
            "Reduced single report generation from 10 hours to 22 minutes, 92% analysis dimension coverage, 15x monthly report output increase",
          ],
          tags: ["Multi-Agent", "FastMCP", "Milvus", "Qwen2.5-72B", "DAG Pipeline", "Function Calling"],
        },
        {
          title: "Government Intelligent Q&A System",
          org: "Shanghai-Chongqing AI Research Institute · Chongqing",
          period: "2024.06 – 2024.09",
          color: "#4ECDC4",
          icon: "🏛️",
          highlights: [
            "Built multi-format document parsing pipeline with PDFPlumber for standard PDFs, PaddleOCR for scanned documents, semantic chunking preserving section hierarchy",
            "Implemented BGE-Large-zh embedding (768-dim) with Elasticsearch hybrid retrieval using HNSW index for ANN search plus multi-knowledge-base isolation",
            "Dual-path recall with KNN semantic + BM25 full-text search, RRF fusion of Top-50 results, BGE-Reranker-Large re-ranking boosted context relevance from 71% to 94%",
            "System accuracy improved from 68% to 91% across 1,200 labeled QA pairs, 85% questions answered automatically, human confirmation time reduced from 2-3min to 20sec",
          ],
          tags: ["RAG", "Elasticsearch", "BGE-Large-zh", "RRF Fusion", "PaddleOCR", "Qwen1.5-32B"],
        },
        {
          title: "E-Commerce Behavior Prediction & Real-Time Recommendation",
          org: "Personal Project",
          period: "2024.12 – 2025.03",
          color: "#FFE66D",
          icon: "🛒",
          highlights: [
            "Built real-time data pipeline with Kafka for ingesting user behavior logs with 20+ dimensional features",
            "Engineered 80+ features across user profiles, item attributes, and behavior sequences with XGBoost CTR model achieving AUC 0.86",
            "FastAPI inference service with Redis caching at 60% cache hit rate, P95 latency 50ms",
            "Docker containerized deployment with Prometheus + Grafana monitoring for latency tracking and feature drift detection",
          ],
          tags: ["Kafka", "XGBoost", "FastAPI", "Redis", "Docker", "Prometheus"],
        },
      ],
    },
    experience: {
      title: "My Journey",
      subtitle: "Where I've built, learned, and grown",
      items: [
        { period: "2025.05 – 2025.08", title: "LLM Application Development Engineer", org: "Huatai Securities · Intelligent Investment Research", type: "work", icon: "🏦" },
        { period: "2024.09 – 2026.05", title: "M.S. Computer Engineering", org: "Northeastern University · GPA 4.0/4.0", type: "education", icon: "🎓" },
        { period: "2024.06 – 2024.09", title: "Algorithm Engineer", org: "Shanghai-Chongqing AI Research Institute", type: "work", icon: "🔬" },
        { period: "2021.09 – 2024.05", title: "B.S. Computer Science & Data Science", org: "UW-Madison · Dean's Honor List", type: "education", icon: "🎓" },
      ],
    },
    publications: {
      title: "Publications",
      paper: { title: "Leveraging Bandit Algorithms for Advancing Dialogue Systems", author: "Zesong Guo", venue: "International Conference on Machine Learning and Automation (MLA), 2023" },
    },
    contact: {
      title: "Let's Build Something Together",
      subtitle: "Open to full-time opportunities and collaboration in AI/LLM engineering",
      email: "Email Me",
    },
  },
  zh: {
    nav: { about: "关于", skills: "技术栈", projects: "项目", experience: "经历", publications: "学术成果", contact: "联系" },
    hero: {
      greeting: "你好，我是",
      name: "郭泽嵩",
      roles: ["AI算法工程师", "大模型架构师", "多智能体构建者", "RAG系统设计师", "NLP研究者"],
      tagline: "构建智能系统，重新定义人类获取知识的方式",
      subtitle: "计算机工程硕士 · GPA 4.0/4.0",
      cta: "探索我的作品",
    },
    about: {
      title: "关于我",
      p1: "我是一名计算机工程硕士，热衷于推动大语言模型应用的边界。我的工作涵盖了在华泰证券设计多智能体编排系统，到在沪渝人工智能研究院构建生产级RAG管线。",
      p2: "凭借威斯康星大学麦迪逊分校计算机科学与数据科学双学士学位（院长荣誉名单），我兼具扎实的理论基础和工程实力。我专注于将复杂的AI研究转化为能带来可衡量业务价值的真实系统。",
      stats: [
        { value: "4.0", label: "GPA" },
        { value: "7+", label: "Agent 数量" },
        { value: "92%", label: "覆盖率" },
        { value: "15×", label: "效率提升" },
      ],
    },
    skills: { title: "技术武器库", subtitle: "构建智能系统的核心工具" },
    projects: {
      title: "我构建的系统",
      subtitle: "解决实际问题的真实系统",
      items: [
        {
          title: "多智能体研报自动生成系统",
          org: "华泰证券 · 深圳",
          period: "2025.05 – 2025.08",
          color: "#FF6B6B",
          icon: "🏦",
          highlights: [
            "设计7个Agent协作架构，受DeepResearch启发，划分数据爬取、股票检索、行业分析、趋势分析、图表生成、报告撰写和质量审查",
            "基于FastMCP搭建MCP服务，定义20+工具接口统一接入交易所、统计局等数据源，通过共享状态管理和事件订阅实现Agent协同",
            "将历史研报向量化存储于Milvus，采用关键词过滤+向量检索的混合策略，结合Few-Shot模板引导Qwen2.5-72B-Instruct生成",
            "单份研报生成时间从10小时缩短至22分钟，分析维度覆盖率92%，月均产出研报数量提升15倍",
          ],
          tags: ["Multi-Agent", "FastMCP", "Milvus", "Qwen2.5-72B", "DAG Pipeline", "Function Calling"],
        },
        {
          title: "政务智能问答系统",
          org: "沪渝人工智能研究院 · 重庆",
          period: "2024.06 – 2024.09",
          color: "#4ECDC4",
          icon: "🏛️",
          highlights: [
            "构建多格式文档解析管道，PDFPlumber处理标准PDF，PaddleOCR处理影印版文件，基于文档结构进行语义分块保留层级关系",
            "使用BGE-Large-zh将文档向量化为768维embedding，搭建Elasticsearch混合检索架构，HNSW索引实现ANN检索与多知识库隔离",
            "实现KNN语义检索与BM25全文检索的双路召回，RRF融合Top-50结果，BGE-Reranker-Large重排序将上下文相关性从71%提升至94%",
            "系统准确率从68%提升至91%，85%问题实现自动回答，人工确认时间从2-3分钟降至20秒",
          ],
          tags: ["RAG", "Elasticsearch", "BGE-Large-zh", "RRF Fusion", "PaddleOCR", "Qwen1.5-32B"],
        },
        {
          title: "电商用户行为预测与实时推荐系统",
          org: "个人项目",
          period: "2024.12 – 2025.03",
          color: "#FFE66D",
          icon: "🛒",
          highlights: [
            "搭建基于Kafka的实时数据管道，采集用户行为日志含20+维特征",
            "构建80+维特征工程管道，XGBoost点击率预测模型测试集AUC达0.86",
            "FastAPI在线推理服务集成Redis缓存，缓存命中率约60%，P95延迟50ms",
            "Docker容器化部署，配置Prometheus+Grafana监控服务延迟和特征漂移检测",
          ],
          tags: ["Kafka", "XGBoost", "FastAPI", "Redis", "Docker", "Prometheus"],
        },
      ],
    },
    experience: {
      title: "成长轨迹",
      subtitle: "我构建、学习和成长的地方",
      items: [
        { period: "2025.05 – 2025.08", title: "大模型应用开发工程师", org: "华泰证券 · 智能投研部", type: "work", icon: "🏦" },
        { period: "2024.09 – 2026.05", title: "计算机工程硕士", org: "东北大学 (Northeastern University) · GPA 4.0/4.0", type: "education", icon: "🎓" },
        { period: "2024.06 – 2024.09", title: "算法工程师", org: "沪渝人工智能研究院 · 智能问答系统研发组", type: "work", icon: "🔬" },
        { period: "2021.09 – 2024.05", title: "计算机科学 & 数据科学 双学士", org: "威斯康星大学麦迪逊分校 · 院长荣誉名单", type: "education", icon: "🎓" },
      ],
    },
    publications: {
      title: "学术成果",
      paper: { title: "Leveraging Bandit Algorithms for Advancing Dialogue Systems", author: "郭泽嵩", venue: "2023年机器学习与自动化国际会议 (MLA)" },
    },
    contact: {
      title: "一起构建未来",
      subtitle: "期待AI/LLM工程领域的全职机会与合作交流",
      email: "发送邮件",
    },
  },
};

const SKILLS = [
  { category: "LLM & NLP", color: "#FF6B6B", items: ["Qwen Series", "GPT-4", "Claude", "LoRA/QLoRA Fine-Tuning", "Prompt Engineering", "RAG Architecture", "Function Calling", "MCP Protocol"] },
  { category: "Retrieval & Embedding", color: "#4ECDC4", items: ["BGE-Large-zh", "BGE-M3", "BGE-Reranker-Large", "HNSW", "BM25", "RRF Fusion", "Cross-Encoder", "Sentence-Transformers"] },
  { category: "Frameworks", color: "#A78BFA", items: ["PyTorch", "LangChain", "FastAPI", "Spring Boot", "Flask", "React", "FastMCP"] },
  { category: "Infrastructure", color: "#45B7D1", items: ["Elasticsearch", "Milvus", "Faiss", "PostgreSQL", "MySQL", "Redis", "Kafka", "RabbitMQ"] },
  { category: "DevOps & Languages", color: "#FFE66D", items: ["Python", "Java", "C/C++", "JavaScript", "SQL", "Shell", "Docker", "Kubernetes"] },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/zesong01", label: "GitHub", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
  { href: "https://www.linkedin.com/in/zesong/", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://space.bilibili.com/473509661", label: "Bilibili", icon: "M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm4 5.2c-.622 0-1.004-.356-1.146-1.067-.143-.71.124-1.066.8-1.066h.867c.676 0 .943.355.8 1.066-.142.711-.525 1.067-1.147 1.067h-.174zm5.334 0c-.622 0-1.005-.356-1.147-1.067-.142-.71.125-1.066.8-1.066h.867c.676 0 .944.355.8 1.066-.142.711-.524 1.067-1.146 1.067h-.174z" },
  { href: "mailto:sze615728@gmail.com", label: "Email", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

function useParallax() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useTypingRoles(roles, speed = 80, pause = 2200) {
  const [text, setText] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const role = roles[ri];
    const t = setTimeout(() => {
      if (!del) {
        setText(role.slice(0, ci + 1));
        if (ci + 1 === role.length) setTimeout(() => setDel(true), pause);
        else setCi(c => c + 1);
      } else {
        setText(role.slice(0, ci));
        if (ci === 0) { setDel(false); setRi((ri + 1) % roles.length); }
        else setCi(c => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, ri, roles, speed, pause]);
  return text;
}

const NeuralSVG = ({ scrollY }) => (
  <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%", transform: `translateY(${scrollY * -0.04}px)` }}>
    <defs>
      <linearGradient id="ng1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B6B" /><stop offset="50%" stopColor="#4ECDC4" /><stop offset="100%" stopColor="#45B7D1" /></linearGradient>
      <linearGradient id="ng2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFE66D" /><stop offset="100%" stopColor="#FF6B6B" /></linearGradient>
      <linearGradient id="ng3" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#4ECDC4" /></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <filter id="glow2"><feGaussianBlur stdDeviation="8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    {[160,130,100].map((r,i) => (
      <circle key={i} cx="300" cy="280" r={r} fill="none" stroke={`url(#ng${i+1})`} strokeWidth={1+i*0.3} opacity={0.15+i*0.05} strokeDasharray={`${10+i*5} ${8+i*3}`}>
        <animateTransform attributeName="transform" type="rotate" from={`0 300 280`} to={`${i%2===0?360:-360} 300 280`} dur={`${20+i*8}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {[[180,180,"#FF6B6B"],[300,140,"#4ECDC4"],[420,180,"#FFE66D"]].map(([cx,cy,c],i) => (
      <circle key={`a${i}`} cx={cx} cy={cy} r="8" fill={c} filter="url(#glow)" opacity="0.9"><animate attributeName="r" values="7;10;7" dur={`${2.5+i*0.4}s`} repeatCount="indefinite" /></circle>
    ))}
    {[[210,280,"#A78BFA"],[300,260,"#45B7D1"],[390,280,"#FF6B6B"]].map(([cx,cy,c],i) => (
      <circle key={`b${i}`} cx={cx} cy={cy} r="7" fill={c} filter="url(#glow)" opacity="0.85"><animate attributeName="r" values="6;9;6" dur={`${3+i*0.3}s`} repeatCount="indefinite" /></circle>
    ))}
    {[[240,370,"#4ECDC4"],[360,370,"#FFE66D"]].map(([cx,cy,c],i) => (
      <circle key={`c${i}`} cx={cx} cy={cy} r="9" fill={c} filter="url(#glow)" opacity="0.9"><animate attributeName="r" values="8;11;8" dur={`${2.2+i*0.5}s`} repeatCount="indefinite" /></circle>
    ))}
    <circle cx="300" cy="280" r="14" fill="url(#ng1)" filter="url(#glow2)" opacity="0.95"><animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" /></circle>
    {[[180,180,210,280],[180,180,300,260],[300,140,210,280],[300,140,300,260],[300,140,390,280],[420,180,300,260],[420,180,390,280],[210,280,240,370],[210,280,360,370],[300,260,240,370],[300,260,360,370],[390,280,240,370],[390,280,360,370]].map(([x1,y1,x2,y2],i) => (
      <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#ng1)" strokeWidth="0.6" opacity="0.15"><animate attributeName="opacity" values="0.08;0.3;0.08" dur={`${3+i*0.15}s`} repeatCount="indefinite" /></line>
    ))}
    {Array.from({length:16},(_,i) => {
      const a=(i/16)*Math.PI*2, r=180+(i%3)*25;
      return <circle key={`p${i}`} cx={300+Math.cos(a)*r} cy={280+Math.sin(a)*r} r={1+(i%3)} fill={["#FF6B6B","#4ECDC4","#FFE66D","#A78BFA","#45B7D1"][i%5]} opacity="0.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2+i*0.3}s`} repeatCount="indefinite" /></circle>;
    })}
    <text x="300" y="286" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#fff" filter="url(#glow)">LLM</text>
    <text x="300" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#4ECDC4" opacity="0.7">RAG</text>
    <text x="170" y="186" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#FF6B6B" opacity="0.7">Agent</text>
    <text x="430" y="186" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#FFE66D" opacity="0.7">MCP</text>
  </svg>
);

const Navbar = ({ lang, setLang, t, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  const secs = ["about","skills","projects","experience","publications","contact"];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 clamp(16px,4vw,48px)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(10,10,18,0.88)":"transparent",backdropFilter:scrolled?"blur(24px) saturate(1.4)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.05)":"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:800,background:"linear-gradient(135deg,#FF6B6B,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",cursor:"pointer" }} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>{lang==="en"?"ZG":"郭"}</div>
      <div style={{ display:"flex",alignItems:"center",gap:"clamp(10px,1.8vw,24px)" }}>
        {secs.map(k => (
          <a key={k} href={`#${k}`} style={{ color:activeSection===k?"#4ECDC4":"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:activeSection===k?600:400,transition:"all 0.3s",position:"relative",padding:"4px 0" }}
            onMouseEnter={e=>e.target.style.color="#4ECDC4"} onMouseLeave={e=>{if(activeSection!==k)e.target.style.color="rgba(255,255,255,0.4)"}}>
            {t.nav[k]}
            {activeSection===k && <span style={{ position:"absolute",bottom:-2,left:"50%",transform:"translateX(-50%)",width:16,height:2,background:"#4ECDC4",borderRadius:2 }} />}
          </a>
        ))}
        <button onClick={()=>setLang(lang==="en"?"zh":"en")} style={{ background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,padding:"7px 18px",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"all 0.3s",display:"flex",alignItems:"center",gap:6 }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="#4ECDC4";e.currentTarget.style.background="rgba(78,205,196,0.1)"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.background="rgba(255,255,255,0.06)"}}>
          🌐 {lang==="en"?"中文":"EN"}
        </button>
      </div>
    </nav>
  );
};

const HeroSection = ({ t, scrollY }) => {
  const [vis, setVis] = useState(false);
  const typed = useTypingRoles(t.hero.roles);
  useEffect(() => { setTimeout(() => setVis(true), 300); }, []);
  const px = Math.min(scrollY * 0.3, 200);
  return (
    <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px clamp(24px,5vw,80px) 60px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
        <div style={{ position:"absolute",top:"5%",left:"8%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,107,0.08) 0%,transparent 70%)",transform:`translateY(${px*0.5}px)` }} />
        <div style={{ position:"absolute",bottom:"10%",right:"5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(78,205,196,0.06) 0%,transparent 70%)",transform:`translateY(${-px*0.3}px)` }} />
        <div style={{ position:"absolute",top:"40%",left:"50%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.05) 0%,transparent 70%)",transform:`translate(-50%,${px*0.2}px)` }} />
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:"clamp(30px,5vw,80px)",maxWidth:1300,width:"100%",flexWrap:"wrap",justifyContent:"center",position:"relative",zIndex:1 }}>
        <div style={{ flex:"1 1 500px",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(60px)",transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
          <p style={{ fontFamily:"'DM Mono',monospace",fontSize:14,color:"#4ECDC4",marginBottom:16,letterSpacing:4,textTransform:"uppercase",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>{t.hero.greeting}</p>
          <h1 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(48px,7vw,82px)",fontWeight:900,lineHeight:1.0,margin:"0 0 16px 0",background:"linear-gradient(135deg,#FFFFFF 0%,#FF6B6B 35%,#4ECDC4 65%,#FFE66D 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"300% 300%",animation:"heroGradient 8s ease infinite" }}>{t.hero.name}</h1>
          <div style={{ height:38,marginBottom:16 }}>
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"clamp(16px,2vw,22px)",color:"#FF6B6B",borderRight:"2px solid #FF6B6B",paddingRight:4,animation:"blink 1s step-end infinite" }}>{typed}</span>
          </div>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(16px,1.5vw,20px)",color:"rgba(255,255,255,0.6)",lineHeight:1.7,marginBottom:8,maxWidth:550,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>{t.hero.tagline}</p>
          <p style={{ fontFamily:"'DM Mono',monospace",fontSize:13,color:"rgba(255,255,255,0.3)",marginBottom:40,letterSpacing:1 }}>{t.hero.subtitle}</p>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.7s" }}>
            <a href="#projects" style={{ padding:"15px 36px",background:"linear-gradient(135deg,#FF6B6B,#4ECDC4)",borderRadius:32,color:"#fff",textDecoration:"none",fontWeight:700,fontFamily:"'DM Sans',sans-serif",fontSize:15,transition:"all 0.4s",boxShadow:"0 4px 24px rgba(255,107,107,0.25)" }}
              onMouseEnter={e=>{e.target.style.transform="translateY(-3px) scale(1.02)";e.target.style.boxShadow="0 8px 32px rgba(255,107,107,0.35)"}}
              onMouseLeave={e=>{e.target.style.transform="translateY(0) scale(1)";e.target.style.boxShadow="0 4px 24px rgba(255,107,107,0.25)"}}>{t.hero.cta}</a>
            <div style={{ display:"flex",gap:10 }}>
              {SOCIAL_LINKS.map((link,i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" title={link.label} style={{ width:46,height:46,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.5)",transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",textDecoration:"none",background:"rgba(255,255,255,0.02)" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#4ECDC4";e.currentTarget.style.color="#4ECDC4";e.currentTarget.style.transform="translateY(-4px) scale(1.1)";e.currentTarget.style.boxShadow="0 8px 20px rgba(78,205,196,0.2)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.color="rgba(255,255,255,0.5)";e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="none"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={link.icon}/></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex:"0 1 420px",opacity:vis?1:0,transform:vis?"translateX(0) rotate(0deg)":"translateX(60px) rotate(5deg)",transition:"all 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
          <NeuralSVG scrollY={scrollY} />
        </div>
      </div>
      <div style={{ position:"absolute",bottom:30,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,opacity:scrollY>100?0:0.4,transition:"opacity 0.5s" }}>
        <div style={{ width:24,height:38,borderRadius:12,border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",justifyContent:"center",paddingTop:8 }}>
          <div style={{ width:3,height:8,borderRadius:2,background:"#4ECDC4",animation:"scrollDot 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ t }) => {
  const [ref, vis] = useScrollReveal(0.2);
  return (
    <section id="about" ref={ref} style={{ padding:"120px clamp(24px,5vw,80px)",position:"relative" }}>
      <div style={{ maxWidth:1000,margin:"0 auto" }}>
        <div style={{ opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(50px)",transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:800,marginBottom:32,background:"linear-gradient(135deg,#4ECDC4,#45B7D1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.about.title}</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:17,color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:20,maxWidth:750 }}>{t.about.p1}</p>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:17,color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:48,maxWidth:750 }}>{t.about.p2}</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:20 }}>
          {t.about.stats.map((s,i) => (
            <div key={i} style={{ padding:28,borderRadius:20,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",textAlign:"center",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)",opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(30px) scale(0.95)",transitionDelay:`${0.3+i*0.1}s` }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.03)";e.currentTarget.style.borderColor="rgba(78,205,196,0.3)";e.currentTarget.style.boxShadow="0 12px 40px rgba(78,205,196,0.1)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.boxShadow="none"}}>
              <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:36,fontWeight:800,background:"linear-gradient(135deg,#FF6B6B,#FFE66D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{s.value}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection = ({ t }) => {
  const [ref, vis] = useScrollReveal(0.1);
  const [hov, setHov] = useState(null);
  return (
    <section id="skills" ref={ref} style={{ padding:"120px clamp(24px,5vw,80px)",position:"relative" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:60,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:800,marginBottom:12,background:"linear-gradient(135deg,#FFE66D,#FF6B6B,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.skills.title}</h2>
          <p style={{ color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:16 }}>{t.skills.subtitle}</p>
        </div>
        {SKILLS.map((g,gi) => (
          <div key={gi} style={{ marginBottom:36,opacity:vis?1:0,transform:vis?"translateX(0)":`translateX(${gi%2===0?-60:60}px)`,transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2+gi*0.12}s` }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
              <div style={{ width:4,height:20,borderRadius:2,background:g.color }} />
              <span style={{ fontFamily:"'DM Mono',monospace",fontSize:13,color:g.color,letterSpacing:1,textTransform:"uppercase" }}>{g.category}</span>
            </div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
              {g.items.map(sk => {
                const isH = hov===`${gi}-${sk}`;
                return (
                  <div key={sk} onMouseEnter={()=>setHov(`${gi}-${sk}`)} onMouseLeave={()=>setHov(null)}
                    style={{ padding:"10px 20px",borderRadius:14,background:isH?`${g.color}18`:"rgba(255,255,255,0.03)",border:`1px solid ${isH?g.color+"50":"rgba(255,255,255,0.06)"}`,color:isH?g.color:"rgba(255,255,255,0.65)",fontFamily:"'DM Mono',monospace",fontSize:13,cursor:"default",transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",transform:isH?"translateY(-3px) scale(1.05)":"translateY(0) scale(1)",boxShadow:isH?`0 8px 24px ${g.color}18`:"none" }}>
                    {sk}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ proj, index }) => {
  const [ref, vis] = useScrollReveal(0.15);
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ padding:"clamp(24px,3vw,44px)",borderRadius:24,background:hov?`linear-gradient(145deg,rgba(255,255,255,0.05),${proj.color}08)`:"rgba(255,255,255,0.02)",border:`1px solid ${hov?proj.color+"35":"rgba(255,255,255,0.05)"}`,transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)",transform:vis?(hov?"translateY(-6px)":"translateY(0)"):"translateY(60px)",opacity:vis?1:0,transitionDelay:vis?`${index*0.15}s`:"0s",boxShadow:hov?`0 24px 60px ${proj.color}12`:"none",position:"relative",overflow:"hidden",cursor:"pointer" }}
      onClick={()=>setExpanded(!expanded)}>
      <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${proj.color}12 0%,transparent 70%)`,transform:hov?"scale(2.5)":"scale(1)",transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
      <div style={{ position:"relative" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:10 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <span style={{ fontSize:32 }}>{proj.icon}</span>
            <div>
              <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:700,color:"#fff",margin:0 }}>{proj.title}</h3>
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.4)" }}>{proj.org}</span>
            </div>
          </div>
          <span style={{ fontFamily:"'DM Mono',monospace",fontSize:12,color:proj.color,padding:"6px 16px",borderRadius:20,border:`1px solid ${proj.color}30`,background:`${proj.color}08` }}>{proj.period}</span>
        </div>
        <div style={{ maxHeight:expanded?600:0,overflow:"hidden",transition:"max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s",opacity:expanded?1:0,marginBottom:expanded?18:0 }}>
          {proj.highlights.map((h,i) => (
            <div key={i} style={{ display:"flex",gap:10,marginBottom:12 }}>
              <span style={{ color:proj.color,fontSize:10,marginTop:7,flexShrink:0 }}>◆</span>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.7,margin:0 }}>{h}</p>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {proj.tags.map(tag => (
              <span key={tag} style={{ padding:"5px 14px",borderRadius:10,fontSize:11,fontFamily:"'DM Mono',monospace",color:"rgba(255,255,255,0.55)",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)" }}>{tag}</span>
            ))}
          </div>
          <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:proj.color,transition:"transform 0.3s",transform:expanded?"rotate(180deg)":"rotate(0deg)" }}>
            {expanded ? "▲" : "▼ Details"}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = ({ t }) => {
  const [ref, vis] = useScrollReveal(0.05);
  return (
    <section id="projects" ref={ref} style={{ padding:"120px clamp(24px,5vw,80px)",position:"relative" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:60,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:800,marginBottom:12,background:"linear-gradient(135deg,#4ECDC4,#45B7D1,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.projects.title}</h2>
          <p style={{ color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:16 }}>{t.projects.subtitle}</p>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:28 }}>
          {t.projects.items.map((p,i) => <ProjectCard key={i} proj={p} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = ({ t }) => {
  const [ref, vis] = useScrollReveal(0.1);
  const [hovI, setHovI] = useState(null);
  return (
    <section id="experience" ref={ref} style={{ padding:"120px clamp(24px,5vw,80px)",position:"relative" }}>
      <div style={{ maxWidth:850,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:60,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:800,marginBottom:12,background:"linear-gradient(135deg,#FF6B6B,#FFE66D,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.experience.title}</h2>
          <p style={{ color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:16 }}>{t.experience.subtitle}</p>
        </div>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute",left:28,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,#FF6B6B,#4ECDC4,#FFE66D,#A78BFA)",borderRadius:2,opacity:0.2 }} />
          <div style={{ display:"flex",flexDirection:"column",gap:28 }}>
            {t.experience.items.map((item,i) => {
              const c=item.type==="work"?"#FF6B6B":"#4ECDC4";
              const isH=hovI===i;
              return (
                <div key={i} onMouseEnter={()=>setHovI(i)} onMouseLeave={()=>setHovI(null)}
                  style={{ display:"flex",gap:24,alignItems:"flex-start",opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(-40px)",transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15+i*0.1}s` }}>
                  <div style={{ width:56,minWidth:56,height:56,borderRadius:"50%",background:isH?`${c}20`:"rgba(255,255,255,0.03)",border:`2px solid ${isH?c:"rgba(255,255,255,0.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",boxShadow:isH?`0 0 24px ${c}25`:"none",transform:isH?"scale(1.1)":"scale(1)" }}>
                    <span style={{ fontSize:22 }}>{item.icon}</span>
                  </div>
                  <div style={{ flex:1,padding:"20px 24px",borderRadius:18,background:isH?`linear-gradient(145deg,rgba(255,255,255,0.04),${c}06)`:"rgba(255,255,255,0.015)",border:`1px solid ${isH?c+"25":"rgba(255,255,255,0.04)"}`,transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",transform:isH?"translateX(6px)":"translateX(0)" }}>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:12,color:c,letterSpacing:0.5 }}>{item.period}</span>
                    <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:19,fontWeight:700,color:"#fff",margin:"6px 0 4px" }}>{item.title}</h3>
                    <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"rgba(255,255,255,0.4)",margin:0 }}>{item.org}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const PublicationsSection = ({ t }) => {
  const [ref, vis] = useScrollReveal(0.2);
  const [hov, setHov] = useState(false);
  return (
    <section id="publications" ref={ref} style={{ padding:"100px clamp(24px,5vw,80px)",position:"relative" }}>
      <div style={{ maxWidth:800,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:40,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,48px)",fontWeight:800,marginBottom:12,background:"linear-gradient(135deg,#A78BFA,#45B7D1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.publications.title}</h2>
        </div>
        <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          style={{ padding:32,borderRadius:20,background:hov?"linear-gradient(145deg,rgba(167,139,250,0.06),rgba(69,183,209,0.04))":"rgba(255,255,255,0.02)",border:`1px solid ${hov?"rgba(167,139,250,0.25)":"rgba(255,255,255,0.05)"}`,transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",transform:vis?(hov?"translateY(-4px)":"translateY(0)"):"translateY(30px)",opacity:vis?1:0,transitionDelay:"0.2s" }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:16 }}>
            <span style={{ fontSize:28,marginTop:2 }}>📄</span>
            <div>
              <h3 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:600,color:"#fff",margin:"0 0 8px",lineHeight:1.4 }}>{t.publications.paper.title}</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#A78BFA",margin:"0 0 4px" }}>{t.publications.paper.author}</p>
              <p style={{ fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,0.4)",margin:0 }}>{t.publications.paper.venue}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ t }) => {
  const [ref, vis] = useScrollReveal(0.2);
  return (
    <section id="contact" ref={ref} style={{ padding:"120px clamp(24px,5vw,80px) 60px",position:"relative" }}>
      <div style={{ maxWidth:750,margin:"0 auto",textAlign:"center",padding:"clamp(40px,5vw,70px)",borderRadius:32,position:"relative",overflow:"hidden",background:"linear-gradient(145deg,rgba(255,107,107,0.05),rgba(78,205,196,0.05),rgba(255,230,109,0.03))",border:"1px solid rgba(255,255,255,0.06)",opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(40px) scale(0.97)",transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ position:"absolute",top:-100,right:-100,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,107,0.08) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute",bottom:-80,left:-80,width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,rgba(78,205,196,0.06) 0%,transparent 70%)" }} />
        <div style={{ position:"relative" }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(32px,4vw,46px)",fontWeight:800,marginBottom:14,background:"linear-gradient(135deg,#FFE66D,#FF6B6B,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.contact.title}</h2>
          <p style={{ color:"rgba(255,255,255,0.45)",fontFamily:"'DM Sans',sans-serif",fontSize:16,marginBottom:40,lineHeight:1.6 }}>{t.contact.subtitle}</p>
          <div style={{ display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap" }}>
            <a href="mailto:sze615728@gmail.com" style={{ padding:"15px 40px",background:"linear-gradient(135deg,#FF6B6B,#FFE66D)",borderRadius:32,color:"#0A0A12",textDecoration:"none",fontWeight:700,fontFamily:"'DM Sans',sans-serif",fontSize:15,transition:"all 0.4s",boxShadow:"0 4px 24px rgba(255,107,107,0.25)" }}
              onMouseEnter={e=>{e.target.style.transform="translateY(-3px) scale(1.03)";e.target.style.boxShadow="0 8px 32px rgba(255,107,107,0.35)"}}
              onMouseLeave={e=>{e.target.style.transform="translateY(0) scale(1)";e.target.style.boxShadow="0 4px 24px rgba(255,107,107,0.25)"}}>{t.contact.email}</a>
            {SOCIAL_LINKS.filter(l=>l.label!=="Email").map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ padding:"15px 32px",borderRadius:32,border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",textDecoration:"none",fontWeight:600,fontFamily:"'DM Sans',sans-serif",fontSize:15,transition:"all 0.4s",display:"flex",alignItems:"center",gap:8 }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#4ECDC4";e.currentTarget.style.color="#4ECDC4";e.currentTarget.style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="rgba(255,255,255,0.6)";e.currentTarget.style.transform="translateY(0)"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={link.icon}/></svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p style={{ textAlign:"center",color:"rgba(255,255,255,0.15)",fontFamily:"'DM Mono',monospace",fontSize:12,marginTop:50,letterSpacing:1 }}>© 2026 Zesong Guo · Crafted with passion & precision</p>
    </section>
  );
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("about");
  const scrollY = useParallax();
  const t = LANG[lang];

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" });
    ["about","skills","projects","experience","publications","contact"].forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight:"100vh",background:"#0A0A12",color:"#fff",position:"relative",overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;scroll-padding-top:80px}
        body{background:#0A0A12;overflow-x:hidden}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#0A0A12}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#FF6B6B,#4ECDC4);border-radius:3px}
        ::selection{background:rgba(78,205,196,0.3);color:#fff}
        @keyframes heroGradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes blink{50%{border-color:transparent}}
        @keyframes scrollDot{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(10px);opacity:0.3}}
        @media(max-width:768px){nav>div:nth-child(2)>a{font-size:11px!important}}
      `}</style>
      <Navbar lang={lang} setLang={setLang} t={t} activeSection={activeSection} />
      <HeroSection t={t} scrollY={scrollY} />
      <AboutSection t={t} />
      <SkillsSection t={t} />
      <ProjectsSection t={t} />
      <ExperienceSection t={t} />
      <PublicationsSection t={t} />
      <ContactSection t={t} />
    </div>
  );
}