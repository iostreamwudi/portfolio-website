import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const layerAssets = {
  character: "/hero/character.png",
  desk: "/hero/desk.png",
};

const springConfig = {
  stiffness: 70,
  damping: 22,
};

function BackgroundLayer({ style, reducedMotion }) {
  return (
    <div className="portrait-layer portrait-layer-background" aria-hidden="true">
      <motion.div
        className="portrait-layer-parallax portrait-background-visual"
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span className="portrait-background-blob portrait-background-blob-one" />
        <span className="portrait-background-blob portrait-background-blob-two" />
      </motion.div>
    </div>
  );
}

function OrbitDecoration({ style, reducedMotion }) {
  return (
    <div className="portrait-layer portrait-layer-orbit" aria-hidden="true">
      <motion.div className="portrait-layer-parallax" style={style}>
        <motion.span
          className="portrait-orbit portrait-orbit-one"
          animate={reducedMotion ? undefined : { rotate: [0, 4, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.span
          className="portrait-orbit portrait-orbit-two"
          animate={reducedMotion ? undefined : { rotate: [0, -3, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <span className="portrait-orbit-node portrait-orbit-node-one" />
        <span className="portrait-orbit-node portrait-orbit-node-two" />
        <span className="portrait-orbit-node portrait-orbit-node-three" />
        <span className="portrait-glow-orb portrait-glow-orb-one" />
      </motion.div>
    </div>
  );
}

function CharacterLayer({ style, reducedMotion }) {
  return (
    <div className="portrait-layer portrait-layer-character">
      <motion.div className="portrait-layer-parallax" style={style}>
        <motion.div
          className="portrait-layer-idle"
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <motion.img
            className="portrait-layer-image"
            src={layerAssets.character}
            alt="AI 产品经理漫画画像"
            width="1448"
            height="1086"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
            style={{ willChange: reducedMotion ? "auto" : "transform, opacity" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function GhostProductWindow({ style, reducedMotion }) {
  return (
    <motion.div
      className="portrait-ghost-window"
      style={style}
      initial={{ opacity: 0, y: 18, scale: 0.96, rotate: -6 }}
      animate={{ opacity: 0.48, y: 0, scale: 1, rotate: -6 }}
      transition={{ duration: 0.92, delay: 0.1, ease: "easeOut" }}
      aria-label="产品工作流预览"
    >
      <div className="ghost-window-topbar" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div className="ghost-window-sidebar" aria-hidden="true">
        <span className="is-active" /><span /><span /><span />
      </div>
      <div className="ghost-window-content" aria-hidden="true">
        <span className="ghost-window-heading" />
        <span className="ghost-window-copy" />
        <div className="ghost-window-chart">
          <i /><i /><i /><i /><i />
        </div>
      </div>
    </motion.div>
  );
}

const capabilityCards = [
  {
    key: "rag",
    title: "RAG",
    subtitle: "中信建投证券",
    target: 'article[aria-label*="中信建投证券"]',
    className: "portrait-capability-card-rag",
  },
  {
    key: "workflow",
    title: "Workflow",
    subtitle: "中国银联",
    target: 'article[aria-label*="中国银联"]',
    className: "portrait-capability-card-workflow",
  },
  {
    key: "evaluation",
    title: "Evaluation",
    subtitle: "验证产品效果",
    target: ".capability-section .capability-card:nth-of-type(3)",
    className: "portrait-capability-card-evaluation",
  },
  {
    key: "prompt",
    title: "Prompt Design",
    subtitle: "能力落到体验",
    target: ".capability-section .capability-card:nth-of-type(2)",
    className: "portrait-capability-card-prompt",
  },
];

function CapabilityCard({ card, onSelect }) {
  return (
    <motion.button
      type="button"
      className={`portrait-capability-card ${card.className}`}
      onClick={() => onSelect(card.target)}
      whileTap={{ scale: 0.98 }}
      aria-label={`查看${card.title}相关实践：${card.subtitle}`}
    >
      <span className="portrait-capability-icon" aria-hidden="true" />
      <span className="portrait-capability-card-copy">
        <strong>{card.title}</strong>
        <small>{card.subtitle}</small>
      </span>
      <span className="portrait-capability-arrow" aria-hidden="true">↗</span>
    </motion.button>
  );
}

function CapabilityStack({ style, reducedMotion }) {
  return (
    <div className="portrait-layer portrait-layer-cards">
      <motion.div className="portrait-layer-parallax" style={style}>
        <motion.div
          className="portrait-capability-stack"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.92, delay: 0.26, ease: "easeOut" }}
        >
          <motion.div
            className="portrait-capability-stack-idle"
            animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {capabilityCards.map((card) => (
              <CapabilityCard
                card={card}
                key={card.key}
                onSelect={(target) => scrollToCapability(target)}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DeskLayer({ style, reducedMotion }) {
  return (
    <div className="portrait-layer portrait-layer-desk" aria-hidden="true">
      <motion.div className="portrait-layer-parallax" style={style}>
        <motion.img
          className="portrait-layer-image"
          src={layerAssets.desk}
          alt=""
          width="1448"
          height="1086"
          loading="eager"
          decoding="async"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 0.34, ease: "easeOut" }}
          style={{ willChange: reducedMotion ? "auto" : "transform, opacity" }}
        />
      </motion.div>
    </div>
  );
}

const capabilityTargets = {
  rag: '.experience-slide[aria-label*="中信建投证券"]',
  workflow: '.experience-slide[aria-label*="中国银联"]',
  evaluation: ".capability-section .capability-card:nth-of-type(3)",
  prompt: ".capability-section .capability-card:nth-of-type(2)",
};

function scrollToCapability(capabilityOrSelector) {
  const selector = capabilityTargets[capabilityOrSelector] || capabilityOrSelector;
  const target = selector ? document.querySelector(selector) : null;
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function CapabilityPanel() {
  const capabilities = [
    { key: "rag", label: "RAG" },
    { key: "workflow", label: "Agent Workflow" },
    { key: "evaluation", label: "Evaluation" },
    { key: "prompt", label: "Prompt Design" },
  ];

  return (
    <motion.aside
      className="portrait-capability-panel"
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      aria-label="AI 产品能力栈"
    >
      <p>AI PRODUCT STACK</p>
      <div className="portrait-capability-list">
        {capabilities.map((capability) => (
          capability.key ? (
            <button
              type="button"
              className="portrait-capability-item"
              key={capability.label}
              onClick={() => scrollToCapability(capability.key)}
            >
              <span aria-hidden="true">✓</span>
              {capability.label}
            </button>
          ) : (
            <div className="portrait-capability-item" key={capability.label}>
              <span aria-hidden="true">✓</span>
              {capability.label}
            </div>
          )
        ))}
      </div>
    </motion.aside>
  );
}

function HeroQuote({ style, reducedMotion }) {
  return (
    <motion.aside
      className="portrait-quote"
      style={style}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.46, ease: "easeOut" }}
      aria-label="产品理念"
    >
      <span className="portrait-quote-mark" aria-hidden="true">“</span>
      <p>连接技术与真实世界<br />做有价值的 AI 产品。</p>
      <span className="portrait-quote-line" aria-hidden="true" />
    </motion.aside>
  );
}

function HeroStatus({ style }) {
  return (
    <motion.div
      className="portrait-status"
      style={style}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.56, ease: "easeOut" }}
      aria-label="当前探索方向"
    >
      <span className="portrait-status-dot" aria-hidden="true" />
      <span>
        <small>Currently exploring</small>
        <strong>Agent × Real World</strong>
      </span>
    </motion.div>
  );
}

function HeroNotes({ style }) {
  return (
    <motion.div className="portrait-notes" style={style} aria-hidden="true">
      <span className="portrait-note portrait-note-top">
        好的产品<br />让复杂的技术变简单。
      </span>
      <span className="portrait-note portrait-note-right">
        More<br />Human<br />More Useful
        <i>⌁</i>
      </span>
    </motion.div>
  );
}

function RightProductNote({ style }) {
  return (
    <motion.aside
      className="portrait-product-note"
      style={style}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 0.58, x: 0 }}
      transition={{ duration: 0.9, delay: 0.34, ease: "easeOut" }}
      aria-label="AI 产品方向标注"
    >
      <span>AI</span>
      <span>Product</span>
      <span>Better</span>
      <span>Tomorrow</span>
      <i aria-hidden="true">—</i>
    </motion.aside>
  );
}

function InteractionController({ children }) {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const boundsRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const motionScale = reducedMotion ? 0 : 1;

  const backgroundStyle = {
    x: useTransform(springX, (value) => value * 5 * motionScale),
    y: useTransform(springY, (value) => value * 5 * motionScale),
  };
  const orbitStyle = {
    x: useTransform(springX, (value) => value * 8 * motionScale),
    y: useTransform(springY, (value) => value * 8 * motionScale),
  };
  const characterStyle = {
    x: useTransform(springX, (value) => value * 25 * motionScale),
    y: useTransform(springY, (value) => value * 15 * motionScale),
  };
  const cardsStyle = {
    x: useTransform(springX, (value) => value * 18 * motionScale),
    y: useTransform(springY, (value) => value * 12 * motionScale),
  };
  const deskStyle = {
    x: useTransform(springX, (value) => value * 35 * motionScale),
    y: useTransform(springY, (value) => value * 20 * motionScale),
  };
  const highlightStyle = {
    x: useTransform(springX, (value) => value * 10 * motionScale),
    y: useTransform(springY, (value) => value * 10 * motionScale),
  };
  const quoteStyle = {
    x: useTransform(springX, (value) => value * 14 * motionScale),
    y: useTransform(springY, (value) => value * 10 * motionScale),
  };
  const statusStyle = {
    x: useTransform(springX, (value) => value * 9 * motionScale),
    y: useTransform(springY, (value) => value * 7 * motionScale),
  };
  const ghostStyle = {
    x: useTransform(springX, (value) => value * 10 * motionScale),
    y: useTransform(springY, (value) => value * 9 * motionScale),
  };
  const notesStyle = {
    x: useTransform(springX, (value) => value * 8 * motionScale),
    y: useTransform(springY, (value) => value * 6 * motionScale),
  };
  const productNoteStyle = {
    x: useTransform(springX, (value) => value * 7 * motionScale),
    y: useTransform(springY, (value) => value * 6 * motionScale),
  };
  const rotateX = useTransform(springY, (value) => value * -3 * motionScale);
  const rotateY = useTransform(springX, (value) => value * 4 * motionScale);

  const handlePointerEnter = (event) => {
    if (reducedMotion || window.innerWidth <= 900 || event.pointerType !== "mouse") return;

    boundsRef.current = event.currentTarget.getBoundingClientRect();
    setIsHovered(true);
  };

  const handleMouseMove = (event) => {
    if (reducedMotion || window.innerWidth <= 900 || event.pointerType !== "mouse") return;

    const bounds = boundsRef.current;
    if (!bounds?.width || !bounds?.height) return;
    const nextX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const nextY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, nextX)));
    mouseY.set(Math.max(-1, Math.min(1, nextY)));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    boundsRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="interactive-portrait-shell">
      <motion.div
        className={`interactive-portrait${isHovered ? " is-hovered" : ""}`}
        aria-label="AI 产品经理画像"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handleMouseMove}
        onPointerLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        whileHover={reducedMotion ? undefined : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 70, damping: 22 }}
      >
        {children({
          backgroundStyle,
          orbitStyle,
          characterStyle,
          cardsStyle,
          deskStyle,
          quoteStyle,
          statusStyle,
          ghostStyle,
          notesStyle,
          productNoteStyle,
          reducedMotion,
        })}
        <AnimatePresence>
          {isHovered && !reducedMotion ? <CapabilityPanel /> : null}
        </AnimatePresence>
        <HeroNotes style={notesStyle} />
        <HeroQuote style={quoteStyle} reducedMotion={reducedMotion} />
        <HeroStatus style={statusStyle} />
        <motion.div
          className="portrait-highlight"
          style={highlightStyle}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

function InteractivePortrait() {
  return (
    <InteractionController>
      {({ backgroundStyle, orbitStyle, characterStyle, cardsStyle, deskStyle, quoteStyle, statusStyle, ghostStyle, notesStyle, productNoteStyle, reducedMotion }) => (
        <div className="portrait-layer-stage">
          <BackgroundLayer style={backgroundStyle} reducedMotion={reducedMotion} />
          <OrbitDecoration style={orbitStyle} reducedMotion={reducedMotion} />
          <GhostProductWindow style={ghostStyle} reducedMotion={reducedMotion} />
          <CharacterLayer style={characterStyle} reducedMotion={reducedMotion} />
          <CapabilityStack style={cardsStyle} reducedMotion={reducedMotion} />
          <DeskLayer style={deskStyle} reducedMotion={reducedMotion} />
          <RightProductNote style={productNoteStyle} />
        </div>
      )}
    </InteractionController>
  );
}

function ensureHeroReferenceLayout(hero) {
  const heroCopy = hero.querySelector(".hero-copy");
  const paragraph = heroCopy?.querySelector("p");
  if (paragraph) {
    paragraph.innerHTML =
      "从业务问题出发，完成产品定义、Agent 方案、<br />交互设计与评测迭代。让优秀的 AI 能力真正落地，<br />解决真实问题，创造可衡量的价值。";
  }

  const actions = hero.querySelector(".hero-actions");
  if (actions) actions.classList.add("hero-actions-reference");

  if (heroCopy && !hero.querySelector(".hero-metrics")) {
    const metrics = document.createElement("div");
    metrics.className = "hero-metrics";
    metrics.innerHTML = `
      <div class="hero-metric"><strong>3</strong><span>段<br />产品实习</span></div>
      <div class="hero-metric"><strong>2</strong><span>个<br />大模型项目</span></div>
      <div class="hero-metric"><strong>90%</strong><span>核心指标提升</span></div>
      <div class="hero-metric"><strong>4,082</strong><span>人工标注字段</span></div>
    `;
    heroCopy.appendChild(metrics);
  }

  const header = document.querySelector(".site-header");
  if (header && !header.querySelector(".header-contact")) {
    const contact = document.createElement("a");
    contact.className = "header-contact";
    contact.href = "mailto:18271237706@163.com";
    contact.textContent = "联系我";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    contact.appendChild(arrow);
    header.appendChild(contact);
  }
}

function enhanceReferenceSections() {
  const aboutSection = [...document.querySelectorAll("main > section")].find((section) =>
    section.textContent.includes("ABOUT / HOW I WORK")
  );
  if (aboutSection) {
    aboutSection.classList.add("about-reference-section");

    const aboutTitle = aboutSection.querySelector("h2");
    if (aboutTitle && !aboutTitle.dataset.referenceCopy) {
      aboutTitle.innerHTML = "关于我<br /><span>把 AI 做成产品。</span>";
      aboutTitle.dataset.referenceCopy = "true";
    }

    const aboutColumns = aboutSection.querySelector(".grid > div:last-child");
    if (aboutColumns && !aboutColumns.querySelector(".about-reference-art")) {
      const art = document.createElement("img");
      art.className = "about-reference-art";
      art.src = "/hero/about-reference-art.png?v=20260911-about21";
      art.alt = "";
      art.loading = "lazy";
      art.decoding = "async";
      art.fetchPriority = "low";
      art.setAttribute("aria-hidden", "true");
      aboutColumns.appendChild(art);
    }

    const aboutLeft = aboutSection.querySelector(".grid > div:first-child");
    if (aboutLeft && !aboutLeft.querySelector(".about-metrics")) {
      const metrics = document.createElement("div");
      metrics.className = "about-metrics";
      metrics.innerHTML = `
        <div><strong>3</strong><span>段<br />AI 产品实习</span></div>
        <div><strong>2</strong><span>个<br />大模型项目</span></div>
        <div><strong>4,082</strong><span>字段级<br />评测实践</span></div>
        <div><strong>90%</strong><span>指标<br />提升</span></div>
      `;
      aboutLeft.appendChild(metrics);
    }
  }

  const careerTitle = document.querySelector(".career-carousel .career-heading h2");
  if (careerTitle && !careerTitle.dataset.referenceCopy) {
    careerTitle.innerHTML = "实习经历，<br /><span>在真实的业务中解决问题。</span>";
    careerTitle.dataset.referenceCopy = "true";
  }

  const careerDescription = document.querySelector(".career-carousel .career-heading > p:last-child");
  if (careerDescription && !careerDescription.dataset.referenceCopy) {
    careerDescription.textContent = "在中信建投、中国银联与森浦的真实业务里，把复杂问题拆成可执行的产品方案。";
    careerDescription.dataset.referenceCopy = "true";
  }

  const signalSection = document.querySelector(".signal-section");
  const signalHeading = signalSection?.querySelector(".signal-heading");
  if (signalSection && signalHeading) {
    signalSection.classList.add("signal-reference-section");
    const signalTitle = signalHeading.querySelector("h2");
    if (signalTitle && !signalTitle.dataset.referenceCopy) {
      signalTitle.innerHTML = "我实践过的<br /><span>产品场景</span>";
      signalTitle.dataset.referenceCopy = "true";
    }

    const signalDescription = signalHeading.querySelector("p:last-child");
    if (signalDescription && !signalDescription.dataset.referenceCopy) {
      signalDescription.textContent = "卡片会在业务场景、项目和方法之间自动切换，串联起我在 AI 产品领域的实践地图。";
      signalDescription.dataset.referenceCopy = "true";
    }

    if (!signalHeading.querySelector(".signal-metrics")) {
      const metrics = document.createElement("div");
      metrics.className = "signal-metrics";
      metrics.innerHTML = `
        <div><strong>6+</strong><span>核心场景</span></div>
        <div><strong>N×</strong><span>方法论沉淀</span></div>
        <div><strong>从0到1</strong><span>完整落地经验</span></div>
      `;
      signalHeading.appendChild(metrics);
    }

    if (!signalHeading.querySelector(".signal-map-link")) {
      const mapLink = document.createElement("a");
      mapLink.className = "signal-map-link";
      mapLink.href = "#work";
      mapLink.innerHTML = '<span class="signal-map-dot" aria-hidden="true"></span>探索我的产品实践地图 <span aria-hidden="true">→</span>';
      signalHeading.appendChild(mapLink);
    }

    const signalGrid = signalSection.querySelector(".signal-grid");
    if (signalGrid && !signalGrid.querySelector(".signal-reference-art")) {
      const art = document.createElement("img");
      art.className = "signal-reference-art";
      art.src = "/hero/project-micro-ui.png?v=20260911-project18";
      art.alt = "";
      art.loading = "lazy";
      art.decoding = "async";
      art.fetchPriority = "low";
      art.setAttribute("aria-hidden", "true");
      signalGrid.prepend(art);
    }
  }

  const capabilitySection = document.querySelector(".capability-section");
  const capabilityHeading = capabilitySection?.querySelector(".capability-heading");
  if (capabilitySection && capabilityHeading) {
    capabilitySection.classList.add("capability-reference-section");

    const capabilityTitle = capabilityHeading.querySelector("h2");
    if (capabilityTitle && !capabilityTitle.dataset.referenceCopy) {
      capabilityTitle.innerHTML = "把产品判断、技术理解与效果验证<br /><span>放进同一个闭环</span>";
      capabilityTitle.dataset.referenceCopy = "true";
    }

    if (!capabilityHeading.querySelector(".capability-reference-description")) {
      const description = document.createElement("p");
      description.className = "capability-reference-description";
      description.textContent = "从问题洞察到产品定义，从技术落地到效果验证，让 AI 产品在真实场景中持续进化，创造可衡量的价值。";
      capabilityHeading.appendChild(description);
    }

    const capabilityGrid = capabilitySection.querySelector(".capability-grid");
    if (capabilityGrid && !capabilitySection.querySelector(".capability-reference-art")) {
      const art = document.createElement("img");
      art.className = "capability-reference-art";
      art.src = "/hero/capability-reference-art.png?v=20260911-capabilities20";
      art.alt = "";
      art.loading = "lazy";
      art.decoding = "async";
      art.fetchPriority = "low";
      art.setAttribute("aria-hidden", "true");
      capabilityGrid.parentNode.insertBefore(art, capabilityGrid);
    }

    if (!capabilitySection.querySelector(".capability-timeline")) {
      const timeline = document.createElement("div");
      timeline.className = "capability-timeline";
      timeline.innerHTML = `
        <div class="capability-timeline-step is-active"><span>01</span><div><strong>洞察真实需求</strong><small>From Problems</small></div></div>
        <i aria-hidden="true"></i>
        <div class="capability-timeline-step"><span>02</span><div><strong>构建可用方案</strong><small>From Capabilities</small></div></div>
        <i aria-hidden="true"></i>
        <div class="capability-timeline-step"><span>03</span><div><strong>验证与持续迭代</strong><small>From Evaluation</small></div></div>
        <div class="capability-endpoint"><span aria-hidden="true">◆</span><strong>更好的 AI 产品</strong><small>服务真实的人</small></div>
      `;
      capabilitySection.appendChild(timeline);
    }
  }

  const contactCta = document.querySelector(".contact-cta");
  const contactSection = contactCta?.closest("section");
  if (contactSection) {
    contactSection.classList.add("contact-reference-section");
    const contactTitle = contactCta.querySelector("h2");
    if (contactTitle && !contactTitle.dataset.referenceCopy) {
      contactTitle.textContent = "一起把 AI 做成真正可用的产品";
      contactTitle.dataset.referenceCopy = "true";
    }
  }

  const tiltTargets = document.querySelectorAll(
    "[data-card-tilt], .signal-cell, .experience-slide, .capability-card"
  );

  tiltTargets.forEach((target) => {
    if (target.dataset.referenceInteraction === "true") return;
    target.dataset.referenceInteraction = "true";

    const reset = () => {
      target.style.removeProperty("--pointer-x");
      target.style.removeProperty("--pointer-y");
      target.classList.remove("is-pointer-active");
    };

    target.addEventListener("pointerenter", () => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      target.classList.add("is-pointer-active");
    });

    target.addEventListener("pointermove", (event) => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      const bounds = target.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      target.style.setProperty("--pointer-x", `${Math.max(0, Math.min(100, x))}%`);
      target.style.setProperty("--pointer-y", `${Math.max(0, Math.min(100, y))}%`);
    });

    target.addEventListener("pointerleave", reset);
    target.addEventListener("blur", reset, true);
  });
}

function mountInteractivePortrait() {
  const hero = document.querySelector(".portfolio-hero");
  if (!hero) return;

  ensureHeroReferenceLayout(hero);

  const deferEnhancements = window.requestIdleCallback
    ? (callback) => window.requestIdleCallback(callback, { timeout: 1200 })
    : (callback) => window.setTimeout(callback, 450);
  deferEnhancements(enhanceReferenceSections);

  let mount = document.getElementById("hero-portrait-root");
  if (!mount || !hero.contains(mount)) {
    mount = document.createElement("div");
    mount.id = "hero-portrait-root";
    mount.setAttribute("aria-label", "个人画像展示区域");
    hero.appendChild(mount);
  }

  if (mount.dataset.mounted === "true") return;
  mount.dataset.mounted = "true";
  createRoot(mount).render(<InteractivePortrait />);
}

const bootInteractivePortrait = () => {
  window.setTimeout(mountInteractivePortrait, 240);
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", bootInteractivePortrait, { once: true });
} else {
  bootInteractivePortrait();
}
