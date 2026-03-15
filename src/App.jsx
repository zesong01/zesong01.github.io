import { useState, useEffect, useRef } from "react";

/* ═══════════════════ SOCIAL LINKS ═══════════════════ */
const LINKS = [
  { href: "mailto:sze615728@gmail.com", label: "Email", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
  { href: "https://www.linkedin.com/in/zesong/", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://github.com/Zesong888-coder", label: "GitHub", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
  { href: "https://space.bilibili.com/473509661", label: "Bilibili", icon: "M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm4 5.2c-.622 0-1.004-.356-1.146-1.067-.143-.71.124-1.066.8-1.066h.867c.676 0 .943.355.8 1.066-.142.711-.525 1.067-1.147 1.067h-.174zm5.334 0c-.622 0-1.005-.356-1.147-1.067-.142-.71.125-1.066.8-1.066h.867c.676 0 .944.355.8 1.066-.142.711-.524 1.067-1.146 1.067h-.174z" },
];

/* ═══════════════════ SKILLS DATA ═══════════════════ */
const SKILLS = [
  { cat: "Languages", items: ["Python", "Java", "C/C++", "JavaScript", "SQL", "Shell"] },
  { cat: "Frameworks", items: ["PyTorch", "LangChain/LangGraph", "FastAPI", "Spring Boot", "Flask", "React", "Docker", "Kubernetes"] },
  { cat: "LLM Tech", items: ["LoRA/QLoRA Fine-Tuning", "Prompt Engineering", "RAG Architecture", "Function Calling", "MCP Protocol"] },
  { cat: "Retrieval", items: ["Milvus", "Faiss", "BGE-Large-zh", "BGE-M3", "BGE-Reranker", "HNSW", "BM25", "RRF Fusion", "Cross-Encoder"] },
  { cat: "Infra", items: ["Elasticsearch", "PostgreSQL", "MySQL", "Redis", "Kafka", "RabbitMQ"] },
  { cat: "LLMs", items: ["Qwen Series", "GPT-4/5", "Claude", "Gemini", "DeepSeek"] },
];

/* ═══════════════════ BILINGUAL CONTENT ═══════════════════ */
const T = {
  en: {
    sidebar: { name: "Zesong Guo", title: "LLM / NLP Algorithm Engineer", loc: "China · USA", aff: "Northeastern University", phone: "🇨🇳 178 4382 1169", phone2: "🇺🇸 +1 (206) 227-5159" },
    nav: ["About Me", "Skills", "Projects", "Experience", "Publications"],
    navIds: ["about", "skills", "projects", "experience", "publications"],
    about: {
      h: "About Me",
      p1: `My name is Zesong Guo (郭泽嵩 in Chinese). I am a master's student in Computer Engineering at Northeastern University (Seattle), graduating in 2026, with dual B.S. degrees in Computer Science and Data Science from UW-Madison (Dean's Honor List 2021, 2022). GPA: 4.0/4.0.`,
      p2: `I specialize in LLM-based application development, multi-agent system orchestration, and RAG architecture design. At Huatai Securities, I built a 7-agent research report generation system that reduced report creation time from 10 hours to 22 minutes with 92% analysis coverage. At the Shanghai-Chongqing AI Research Institute, I developed a production-grade government Q&A system using RAG that raised accuracy from 68% to 91%.`,
      highlight: `I am actively seeking LLM / NLP Algorithm Engineer positions (春招 2025-2026). Feel free to reach out!`,
    },
    projects: [
      {
        badge: "Huatai Securities · 2025",
        title: "Multi-Agent Intelligent Research Report Generation System",
        meta: "Tech: LangChain/LangGraph, FastMCP, Qwen2.5-72B, Milvus, BGE-Reranker, FastAPI, DAG Scheduling",
        desc: "Traditional manual quarterly report writing took 8-10 hours, requiring analysts to manually integrate data from exchanges, statistics bureaus, and historical reports.",
        bullets: [
          "Designed 7-agent collaborative architecture inspired by DeepResearch — data crawling, stock retrieval, industry analysis, trend analysis, chart generation, report writing, and quality review agents, coordinated through shared state management and event subscription",
          "Combined LangChain + FastMCP architecture: LangGraph for agent control flow and state management, FastMCP for standardized registration of 20+ external financial tool interfaces with dynamic tool discovery",
          "Task Planner decomposes work into DAG pipeline: data collection → knowledge retrieval → content generation → chart rendering → quality review, with parallel scheduling, failure retry, and timeout degradation",
          "Built Milvus-based distributed vector knowledge base for historical reports with Hybrid Search (BM25 keyword + vector semantic retrieval); integrated BGE-Reranker for re-ranking, improving Top-K retrieval accuracy by 30%; Few-Shot templates guide Qwen2.5-72B-Instruct generation",
          "Designed Self-Correction review agent with \"generate → reflect → revise\" loop; built LLM-as-a-Judge automated scoring system (factual accuracy, logical consistency, compliance), raising expert review pass rate from 65% → 94%",
          "Built FastAPI backend with 18 RESTful endpoints. Report generation time: 10 hours → 22 minutes, 92% analysis dimension coverage, 15× monthly output increase",
        ],
      },
      {
        badge: "AI Research Institute · 2024",
        title: "Government Intelligent Q&A System",
        meta: "Tech: BGE-Large-zh, Elasticsearch, BM25+KNN Hybrid Retrieval, RRF, BGE-Reranker, Qwen1.5-32B, FastAPI, Redis",
        desc: "Government had 10,000+ policy documents; legacy keyword matching + manual customer service achieved only 68% accuracy, with 2-3 minutes of human intervention per question.",
        bullets: [
          "Built multi-format document parsing pipeline: PDFPlumber for standard PDFs, PaddleOCR for scanned documents, semantic chunking based on document structure (H1/H2 headings) preserving section hierarchy",
          "Vectorized documents into 768-dim embeddings with BGE-Large-zh; built Elasticsearch hybrid retrieval with HNSW index for ANN search and multi-knowledge-base isolation",
          "Introduced Query Rewrite module for intent completion and keyword expansion of short queries; combined with HyDE (Hypothetical Document Embeddings) to bridge semantic gap between colloquial questions and formal policy text",
          "Dual-path recall with KNN semantic + BM25 full-text search, RRF fusion of Top-50 results (recall: 65% → 83%); BGE-Reranker-Large re-ranking boosted Top-5 context relevance from 71% → 94%",
          "Built RAGAS automated evaluation framework on 1,200 gold QA pairs covering Faithfulness and Answer Relevancy; Error Analysis Pipeline auto-collects user feedback for targeted retrieval and prompt tuning. Accuracy: 68% → 91%, 85% auto-answered, human confirmation: 2-3min → 20sec",
        ],
      },
      {
        badge: "Personal Project · 2024-2025",
        title: "E-Commerce Behavior Prediction & Real-Time Recommendation System",
        meta: "Tech: Kafka, XGBoost, FastAPI, Redis, Docker, Prometheus+Grafana, PostgreSQL",
        desc: "Traditional e-commerce recommendations use T+1 batch processing with poor data timeliness. Built an end-to-end real-time prediction system from data ingestion to online serving.",
        bullets: [
          "Built Kafka-based real-time data pipeline ingesting user behavior logs (user ID, item ID, behavior type, timestamp, device info — 20+ dimensional features), with real-time parsing, cleaning, and persistence to PostgreSQL",
          "Dual-layer feature engineering: offline layer extracts user profiles (historical preferences, activity tiers) and item statistics (CTR, exposure-conversion ratio); real-time layer aggregates 30-min sliding window behavior sequences — 80+ total features",
          "XGBoost CTR prediction model with Optuna hyperparameter search, 5-fold cross-validation tuning tree depth, learning rate, and regularization — test set AUC: 0.86",
          "FastAPI inference service with multi-tier Redis caching: user features (TTL 5min), hot item predictions (TTL 1min), high-frequency query responses — 60% cache hit rate, P95 latency 50ms",
          "Docker Compose orchestration of full pipeline (Kafka + API + Redis + monitoring); Prometheus metrics collection for inference latency and QPS; Grafana dashboard with feature drift detection and auto-alerting",
        ],
      },
    ],
    experience: {
      h: "🎓 Education & 💼 Experience",
      items: [
        { y: "2025.04 – 2025.08", t: "LLM Application Development Engineer (Intern)", o: "Huatai Securities · Intelligent Investment Research Dept., Shenzhen", type: "work" },
        { y: "2024.09 – 2026.05", t: "M.S. Computer Engineering", o: "Northeastern University (Seattle) · GPA: 4.0/4.0", type: "edu" },
        { y: "2024.05 – 2024.09", t: "Algorithm Engineer (Intern)", o: "Shanghai-Chongqing AI Research Institute · Q&A System R&D, Chongqing", type: "work" },
        { y: "2021.09 – 2024.05", t: "B.S. Computer Science & Data Science (Dual Degree)", o: "University of Wisconsin-Madison · Dean's Honor List (2021, 2022)", type: "edu" },
      ],
    },
    pub: {
      h: "📄 Publications",
      title: "Leveraging Bandit Algorithms for Advancing Dialogue Systems",
      author: "Zesong Guo",
      venue: "International Conference on Machine Learning and Automation (MLA), 2023",
    },
  },
  zh: {
    sidebar: { name: "郭泽嵩", title: "大模型 / NLP 算法工程师", loc: "中国 · 美国", aff: "东北大学 (Northeastern University)", phone: "🇨🇳 178 4382 1169", phone2: "🇺🇸 +1 (206) 227-5159" },
    nav: ["关于我", "技术栈", "项目经历", "教育与工作", "学术成果"],
    navIds: ["about", "skills", "projects", "experience", "publications"],
    about: {
      h: "关于我",
      p1: `我叫郭泽嵩（Zesong Guo），美国东北大学计算机工程硕士在读（西雅图校区，2026年毕业），本科毕业于威斯康星大学麦迪逊分校，获计算机科学与数据科学双学士学位（院长荣誉名单 2021, 2022）。硕士 GPA: 4.0/4.0。`,
      p2: `我专注于大模型应用开发、多智能体系统编排和 RAG 架构设计。在华泰证券，我构建了 7 个 Agent 协作的研报自动生成系统，将研报生成时间从 10 小时缩短至 22 分钟，覆盖率达 92%。在沪渝人工智能研究院，我开发了基于 RAG 的政务智能问答系统，将准确率从 68% 提升至 91%。`,
      highlight: `我正在积极寻找大模型/NLP算法工程师岗位（2025-2026春招），欢迎联系！`,
    },
    projects: [
      {
        badge: "华泰证券 · 2025",
        title: "Multi-Agent 智能研报生成系统",
        meta: "技术栈：LangChain/LangGraph, FastMCP, Qwen2.5-72B, Milvus, BGE-Reranker, FastAPI, DAG 任务调度",
        desc: "投研部传统人工撰写季度报告需 8-10 小时，需手动整合交易所公告、统计局数据、历史研报等多源信息。",
        bullets: [
          "设计 Multi-Agent 协作架构，受 DeepResearch 启发，划分数据爬取、股票检索、行业分析、趋势分析、图表生成、报告撰写、质量审查 7 个 Agent，通过共享状态管理与事件订阅机制实现协同",
          "采用 LangChain + FastMCP 组合架构：利用 LangGraph 构建 Agent 核心控制流与状态管理，基于 FastMCP 框架统一封装 20+ 外部金融工具接口，实现工具标准化接入与动态发现",
          "Task Planner 基于 DAG 将任务分解为数据采集 → 知识检索 → 内容生成 → 图表渲染 → 质量审查流水线，支持并行调度、失败重试与超时降级",
          "基于 Milvus 构建分布式向量知识库存储历史研报，采用 Hybrid Search（BM25 关键词 + 向量语义检索），集成 BGE-Reranker 重排序，Top-K 检索准确率提升 30%；结合 Few-Shot 模板引导 Qwen2.5-72B-Instruct 生成",
          "设计 Self-Correction 审查 Agent，通过 \"生成 → 反思 → 修正\" 闭环降低数据幻觉；引入 LLM-as-a-Judge 自动化评分体系，专家人工审核通过率从 65% 提升至 94%",
          "基于 FastAPI 构建后端服务，产出 18 个 RESTful 接口。单份研报生成时间从 10 小时缩短至 22 分钟，分析维度覆盖率 92%，月均产出研报数量提升 15 倍",
        ],
      },
      {
        badge: "沪渝人工智能研究院 · 2024",
        title: "政务智能问答系统",
        meta: "技术栈：BGE-Large-zh, Elasticsearch, BM25+KNN 混合检索, RRF, BGE-Reranker, Qwen1.5-32B, FastAPI, Redis",
        desc: "政府 10,000+ 份政策文件，原有关键词匹配 + 人工客服准确率仅 68%，每个问题平均需人工介入 2-3 分钟。",
        bullets: [
          "构建多格式文档解析管道，使用 PDFPlumber 处理标准 PDF，集成 PaddleOCR 处理影印版文件，基于文档结构（一级/二级标题）进行语义分块，保留章节层级关系",
          "使用 BGE-Large-zh 将文档向量化为 768 维 embedding，搭建 Elasticsearch 混合检索架构，HNSW 索引实现 ANN 检索，ES 索引实现多知识库隔离",
          "引入 Query Rewrite 模块对用户短查询进行意图补全与关键词扩展，结合 HyDE 生成假设性文档进行检索，有效提升语义匹配精度",
          "实现 KNN 语义检索与 BM25 全文检索双路召回，RRF 融合 Top-50 结果，召回率从 65% 提升至 83%；集成 BGE-Reranker-Large 重排序，Top-5 上下文相关性从 71% 提升至 94%",
          "建立基于 1,200 条黄金 QA 对的 RAGAS 自动化评估框架；Error Analysis Pipeline 自动收集 Badcase，实现检索策略与 Prompt 的针对性调优。准确率从 68% 提升至 91%，85% 问题自动回答，人工确认时间从 2-3 分钟降至 20 秒",
        ],
      },
      {
        badge: "个人项目 · 2024-2025",
        title: "电商用户行为预测与实时推荐系统",
        meta: "技术栈：Kafka, XGBoost, FastAPI, Redis, Docker, Prometheus+Grafana, PostgreSQL",
        desc: "传统电商推荐采用 T+1 批处理方案，数据时效性差。基于公开电商数据集，构建端到端实时预测系统。",
        bullets: [
          "搭建基于 Kafka 的实时数据管道，采集用户行为日志（20+ 维特征），消费者端实时解析、清洗并持久化至 PostgreSQL",
          "构建离线 + 实时双层特征工程管道：离线层提取用户画像与商品统计特征；实时层基于滑动窗口聚合近 30 分钟行为序列，合计 80+ 维特征",
          "使用 XGBoost 构建 CTR 预测模型，通过 Optuna 超参搜索，5 折交叉验证调优，测试集 AUC 达 0.86",
          "基于 FastAPI 开发在线推理服务，设计多级 Redis 缓存策略，缓存命中率约 60%，P95 延迟 50ms",
          "Docker Compose 容器化编排全链路服务，配置 Prometheus 采集推理延迟、QPS 等指标，Grafana 可视化监控，支持特征漂移检测与自动告警",
        ],
      },
    ],
    experience: {
      h: "🎓 教育背景 & 💼 实习经历",
      items: [
        { y: "2025.04 – 2025.08", t: "大模型应用开发工程师（实习）", o: "华泰证券 · 智能投研部，深圳", type: "work" },
        { y: "2024.09 – 2026.05", t: "计算机工程硕士", o: "东北大学 Northeastern University（西雅图）· GPA: 4.0/4.0", type: "edu" },
        { y: "2024.05 – 2024.09", t: "算法工程师（实习）", o: "沪渝人工智能研究院 · 智能问答系统研发组，重庆", type: "work" },
        { y: "2021.09 – 2024.05", t: "计算机科学 & 数据科学 双学士", o: "威斯康星大学麦迪逊分校 · 院长荣誉名单 (2021, 2022)", type: "edu" },
      ],
    },
    pub: {
      h: "📄 学术成果",
      title: "Leveraging Bandit Algorithms for Advancing Dialogue Systems",
      author: "郭泽嵩",
      venue: "2023 年机器学习与自动化国际会议 (MLA)",
    },
  },
};

/* ═══════════════════ SCROLL HOOK ═══════════════════ */
function useReveal(th = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: th });
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

/* ═══════════════════ SIDEBAR ═══════════════════ */
function Sidebar({ t, lang, setLang }) {
  return (
    <aside style={S.sidebar}>
      <div style={S.profileWrap}>
        <img src={process.env.PUBLIC_URL + "/profile.jpeg"} alt="Profile" style={S.profileImg} />
      </div>
      <h1 style={S.sidebarName}>{t.sidebar.name}</h1>
      <p style={S.sidebarTitle}>{t.sidebar.title}</p>
      <div style={S.sidebarMeta}>
        <span>📍 {t.sidebar.loc}</span>
        <span>🏫 {t.sidebar.aff}</span>
        <span>📞 {t.sidebar.phone}</span>
        <span>📞 {t.sidebar.phone2}</span>
      </div>
      <div style={S.socialRow}>
        {LINKS.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" title={l.label} style={S.socialIcon}
            onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.08)"; e.currentTarget.style.color = "#2563EB"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={l.icon} /></svg>
          </a>
        ))}
      </div>
      <div style={S.navLinks}>
        {t.nav.map((label, i) => (
          <a key={i} href={`#${t.navIds[i]}`} style={S.navLink}
            onMouseEnter={e => e.target.style.color = "#2563EB"}
            onMouseLeave={e => e.target.style.color = "#475569"}>{label}</a>
        ))}
      </div>
      <button onClick={() => setLang(lang === "en" ? "zh" : "en")} style={S.langBtn}
        onMouseEnter={e => { e.target.style.background = "#2563EB"; e.target.style.color = "#fff"; }}
        onMouseLeave={e => { e.target.style.background = "rgba(37,99,235,0.06)"; e.target.style.color = "#2563EB"; }}>
        🌐 {lang === "en" ? "切换中文" : "Switch to English"}
      </button>
    </aside>
  );
}

/* ═══════════════════ ABOUT ═══════════════════ */
function About({ t }) {
  const [ref, v] = useReveal();
  return (
    <section id="about" ref={ref} style={{ ...S.section, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
      <h2 style={S.h2}>{t.about.h}</h2>
      <p style={S.p}>{t.about.p1}</p>
      <p style={S.p}>{t.about.p2}</p>
      <div style={S.highlightBox}>
        <strong>🔥 {t.about.highlight}</strong>
      </div>
    </section>
  );
}

/* ═══════════════════ SKILLS ═══════════════════ */
function SkillsSection() {
  const [ref, v] = useReveal();
  return (
    <section id="skills" ref={ref} style={{ ...S.section, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease 0.1s" }}>
      <h2 style={S.h2}>🛠️ Skills</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SKILLS.map((g, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
            <span style={S.skillCat}>{g.cat}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {g.items.map(s => <span key={s} style={S.skillTag}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ PROJECTS ═══════════════════ */
function ProjectCard({ p, delay }) {
  const [ref, v] = useReveal();
  const [open, setOpen] = useState(false);
  return (
    <div ref={ref} style={{ ...S.projCard, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s ease ${delay}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        <h3 style={S.projTitle}>{p.title}</h3>
        <span style={S.badge}>{p.badge}</span>
      </div>
      <p style={{ ...S.p, fontSize: 13, color: "#2563EB", fontFamily: "'JetBrains Mono', monospace", margin: "0 0 8px" }}>{p.meta}</p>
      <p style={{ ...S.p, color: "#64748B", fontStyle: "italic", margin: "0 0 10px" }}>{p.desc}</p>
      <button onClick={() => setOpen(!open)} style={S.detailBtn}>
        {open ? "▲ Collapse" : "▼ Show Details"}
      </button>
      <div style={{ maxHeight: open ? 2000 : 0, overflow: "hidden", transition: "max-height 0.5s ease", marginTop: open ? 12 : 0 }}>
        <ul style={S.bulletList}>
          {p.bullets.map((b, i) => <li key={i} style={S.bulletItem}>{b}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Projects({ t }) {
  return (
    <section id="projects" style={S.section}>
      <h2 style={S.h2}>📝 {t.nav[2]}</h2>
      {t.projects.map((p, i) => <ProjectCard key={i} p={p} delay={i * 0.12} />)}
    </section>
  );
}

/* ═══════════════════ EXPERIENCE ═══════════════════ */
function Experience({ t }) {
  const [ref, v] = useReveal();
  return (
    <section id="experience" ref={ref} style={{ ...S.section, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
      <h2 style={S.h2}>{t.experience.h}</h2>
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 7, top: 4, bottom: 4, width: 2, background: "linear-gradient(to bottom, #2563EB, #7C3AED, #2563EB)", borderRadius: 2, opacity: 0.25 }} />
        {t.experience.items.map((item, i) => (
          <div key={i} style={{ marginBottom: 24, position: "relative" }}>
            <div style={{ position: "absolute", left: -24, top: 5, width: 14, height: 14, borderRadius: "50%", background: item.type === "work" ? "#2563EB" : "#7C3AED", border: "3px solid #fff", boxShadow: "0 0 0 2px " + (item.type === "work" ? "#2563EB40" : "#7C3AED40") }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: item.type === "work" ? "#2563EB" : "#7C3AED" }}>{item.y}</span>
            <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16, fontWeight: 700, color: "#1E293B", margin: "4px 0 2px" }}>
              {item.type === "work" ? "💼" : "🎓"} {item.t}
            </h4>
            <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>{item.o}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ PUBLICATIONS ═══════════════════ */
function Publications({ t }) {
  const [ref, v] = useReveal();
  return (
    <section id="publications" ref={ref} style={{ ...S.section, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
      <h2 style={S.h2}>{t.pub.h}</h2>
      <div style={S.pubCard}>
        <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16, fontWeight: 600, color: "#1E293B", margin: "0 0 6px", lineHeight: 1.5 }}>{t.pub.title}</h4>
        <p style={{ fontSize: 14, color: "#2563EB", margin: "0 0 4px", fontWeight: 500 }}>{t.pub.author}</p>
        <p style={{ fontSize: 13, color: "#64748B", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{t.pub.venue}</p>
      </div>
    </section>
  );
}

/* ═══════════════════ MAIN APP ═══════════════════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Nunito+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; scroll-padding-top:24px; }
        body { background:#F8FAFC; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#F1F5F9; }
        ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:3px; }
        ::selection { background:rgba(37,99,235,0.15); }
        @media(max-width:900px) {
          #layout { flex-direction:column !important; }
          #sidebar { position:relative !important; width:100% !important; max-height:none !important; }
        }
      `}</style>
      <div id="layout" style={S.layout}>
        <div id="sidebar"><Sidebar t={t} lang={lang} setLang={setLang} /></div>
        <main style={S.main}>
          <About t={t} />
          <SkillsSection />
          <Projects t={t} />
          <Experience t={t} />
          <Publications t={t} />
          <p style={{ textAlign: "center", color: "#94A3B8", fontSize: 12, padding: "32px 0 16px", fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 Zesong Guo · Built with React
          </p>
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════ STYLES ═══════════════════ */
const S = {
  root: { minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Nunito Sans', -apple-system, sans-serif" },
  layout: { display: "flex", maxWidth: 1200, margin: "0 auto", gap: 0, minHeight: "100vh" },
  sidebar: {
    width: 280, flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto",
    padding: "36px 24px", display: "flex", flexDirection: "column", alignItems: "center",
    background: "#FFFFFF", borderRight: "1px solid #E2E8F0",
  },
  profileWrap: {
    width: 180, height: 180, borderRadius: "50%", overflow: "hidden",
    border: "4px solid #E2E8F0", marginBottom: 20,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  profileImg: { width: "100%", height: "100%", objectFit: "cover" },
  sidebarName: { fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 24, fontWeight: 800, color: "#1E293B", textAlign: "center", margin: "0 0 6px" },
  sidebarTitle: { fontSize: 14, color: "#2563EB", fontWeight: 600, textAlign: "center", margin: "0 0 16px" },
  sidebarMeta: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#64748B", marginBottom: 20, textAlign: "center" },
  socialRow: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" },
  socialIcon: {
    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(37,99,235,0.08)", color: "#2563EB", textDecoration: "none", transition: "all 0.3s",
  },
  navLinks: { display: "flex", flexDirection: "column", width: "100%", gap: 2, marginBottom: 20 },
  navLink: {
    display: "block", padding: "10px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
    color: "#475569", textDecoration: "none", transition: "all 0.2s",
  },
  langBtn: {
    width: "100%", padding: "10px 0", borderRadius: 8, border: "1px solid rgba(37,99,235,0.2)",
    background: "rgba(37,99,235,0.06)", color: "#2563EB", cursor: "pointer", fontSize: 13,
    fontWeight: 600, transition: "all 0.3s",
  },
  main: { flex: 1, padding: "36px 48px", maxWidth: 860, minWidth: 0 },
  section: { marginBottom: 48, paddingBottom: 32, borderBottom: "1px solid #E2E8F0" },
  h2: { fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 26, fontWeight: 800, color: "#1E293B", marginBottom: 20, letterSpacing: "-0.3px" },
  p: { fontSize: 15, color: "#374151", lineHeight: 1.8, margin: "0 0 14px", fontFamily: "'Nunito Sans', sans-serif" },
  highlightBox: {
    padding: "16px 20px", borderRadius: 10, background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(124,58,237,0.04))",
    border: "1px solid rgba(37,99,235,0.15)", color: "#1E293B", fontSize: 15, lineHeight: 1.6, marginTop: 8,
  },
  skillCat: {
    display: "inline-block", minWidth: 90, padding: "4px 12px", borderRadius: 6,
    background: "#2563EB", color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "center",
    fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, marginTop: 2,
  },
  skillTag: {
    padding: "4px 12px", borderRadius: 6, background: "#F1F5F9", color: "#334155",
    fontSize: 13, fontFamily: "'JetBrains Mono', monospace", border: "1px solid #E2E8F0",
    whiteSpace: "nowrap",
  },
  projCard: {
    padding: 24, borderRadius: 14, background: "#FFFFFF", marginBottom: 20,
    border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  projTitle: { fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 19, fontWeight: 700, color: "#1E293B", margin: 0, lineHeight: 1.4 },
  badge: {
    padding: "4px 14px", borderRadius: 20, background: "rgba(37,99,235,0.08)", color: "#2563EB",
    fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", flexShrink: 0,
  },
  detailBtn: {
    padding: "6px 16px", borderRadius: 6, border: "1px solid #E2E8F0", background: "#F8FAFC",
    color: "#475569", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s",
  },
  bulletList: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 },
  bulletItem: { fontSize: 14, color: "#374151", lineHeight: 1.75, fontFamily: "'Nunito Sans', sans-serif" },
  pubCard: {
    padding: 24, borderRadius: 14, background: "#FFFFFF",
    border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
};