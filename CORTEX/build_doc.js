const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, Header, Footer, TableOfContents, PageBreak, VerticalAlign } = require("docx");

const ORANGE="C45A1A", BLACK="1C1917", CREAM="F5F2EE", GREY="6B6560", LINE="D8D2C8";
const CW = 9360; // content width US Letter 1" margins

const H1 = (t)=> new Paragraph({ heading: HeadingLevel.HEADING_1, children:[new TextRun(t)] });
const H2 = (t)=> new Paragraph({ heading: HeadingLevel.HEADING_2, children:[new TextRun(t)] });
const H3 = (t)=> new Paragraph({ heading: HeadingLevel.HEADING_3, children:[new TextRun(t)] });
const P = (t,opts={})=> new Paragraph({ spacing:{after:140, line:276}, children: Array.isArray(t)? t : [new TextRun({text:t})], ...opts });
const runs = (arr)=> new Paragraph({ spacing:{after:140, line:276}, children: arr });
const B = (t)=> new TextRun({text:t, bold:true});
const T = (t)=> new TextRun({text:t});
const bullet = (t)=> new Paragraph({ numbering:{reference:"b", level:0}, spacing:{after:80, line:272},
  children: Array.isArray(t)? t : [new TextRun(t)] });
const num = (t)=> new Paragraph({ numbering:{reference:"n", level:0}, spacing:{after:80, line:272},
  children: Array.isArray(t)? t : [new TextRun(t)] });
const space = (h=120)=> new Paragraph({ spacing:{after:h}, children:[new TextRun("")] });

function cell(text, {w, head=false, fill=null, bold=false, align=AlignmentType.LEFT, size=18, color=null}={}){
  const border={style:BorderStyle.SINGLE, size:1, color:LINE};
  const lines = Array.isArray(text)? text : [text];
  return new TableCell({
    width:{size:w, type:WidthType.DXA},
    borders:{top:border,bottom:border,left:border,right:border},
    shading: fill? {fill, type:ShadingType.CLEAR} : undefined,
    margins:{top:60,bottom:60,left:110,right:110},
    verticalAlign: VerticalAlign.CENTER,
    children: lines.map(l=> new Paragraph({ alignment:align, spacing:{after:0,line:248},
      children:[new TextRun({text:l, bold:head||bold, size, color: color|| (head?"FFFFFF":BLACK)})]}))
  });
}
function table(widths, rows){
  return new Table({ width:{size:widths.reduce((a,b)=>a+b,0), type:WidthType.DXA}, columnWidths:widths,
    rows: rows.map((r,ri)=> new TableRow({ tableHeader: ri===0, children:
      r.map((c,ci)=> cell(c.t,{w:widths[ci], head: ri===0, fill: ri===0?ORANGE:(c.fill||(ri%2===0?CREAM:null)),
        bold:c.bold, align:c.align||AlignmentType.LEFT, size:c.size||18, color:c.color})) })) });
}
const r2=(label,a,b,c,d)=>[{t:label,bold:true,fill:"EDEAE4"},{t:a},{t:b},{t:c},{t:d}];

const doc = new Document({
  creator:"winsym.ai / Edge Graphics",
  title:"CORTEX — Business Plan & Go-to-Market Strategy",
  styles:{
    default:{ document:{ run:{ font:"Arial", size:21, color:BLACK } } },
    paragraphStyles:[
      { id:"Title", name:"Title", basedOn:"Normal", next:"Normal",
        run:{size:64, bold:true, font:"Arial", color:BLACK},
        paragraph:{spacing:{before:0, after:80}} },
      { id:"Heading1", name:"Heading 1", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{size:32, bold:true, font:"Arial", color:ORANGE},
        paragraph:{spacing:{before:320, after:160}, outlineLevel:0,
          border:{bottom:{style:BorderStyle.SINGLE, size:6, color:ORANGE, space:6}}} },
      { id:"Heading2", name:"Heading 2", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{size:25, bold:true, font:"Arial", color:BLACK},
        paragraph:{spacing:{before:220, after:120}, outlineLevel:1} },
      { id:"Heading3", name:"Heading 3", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{size:22, bold:true, font:"Arial", color:ORANGE},
        paragraph:{spacing:{before:160, after:80}, outlineLevel:2} },
    ]
  },
  numbering:{ config:[
    { reference:"b", levels:[{level:0, format:LevelFormat.BULLET, text:"•", alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:460, hanging:260}}}}]},
    { reference:"n", levels:[{level:0, format:LevelFormat.DECIMAL, text:"%1.", alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:460, hanging:260}}}}]},
  ]},
  sections:[{
    properties:{ page:{ size:{width:12240, height:15840}, margin:{top:1440,right:1440,bottom:1440,left:1440} } },
    footers:{ default:new Footer({ children:[ new Paragraph({ alignment:AlignmentType.CENTER,
      children:[ new TextRun({text:"CORTEX — Confidential Business Plan  ·  ", size:16, color:GREY}),
        new TextRun({text:"Page ", size:16, color:GREY}),
        new TextRun({children:[PageNumber.CURRENT], size:16, color:GREY}) ]})]}) },
    children: build()
  }]
});

function build(){
  const c=[];
  // ---- Cover ----
  c.push(new Paragraph({spacing:{before:1600, after:0}, children:[new TextRun({text:"CORTEX", bold:true, size:96, color:ORANGE, font:"Arial"})]}));
  c.push(new Paragraph({spacing:{after:80}, children:[new TextRun({text:"The Business Intelligence Operating System", size:30, color:BLACK})]}));
  c.push(new Paragraph({spacing:{after:480}, border:{bottom:{style:BorderStyle.SINGLE,size:12,color:ORANGE,space:8}}, children:[new TextRun({text:"Business Plan & Go-to-Market Strategy", size:24, color:GREY})]}));
  c.push(P([B("Category: "), T("BIOS — Business Intelligence Operating System (a new category)")]));
  c.push(P([B("Builder: "), T("Karim Azzaoui · Edge Graphics / winsym.ai · Kuala Lumpur, Malaysia")]));
  c.push(P([B("Markets: "), T("Malaysia / Southeast Asia (anchor) · Europe / DACH · Global Premium Enterprise")]));
  c.push(P([B("Version: "), T("1.0 · June 2026 · Confidential")]));
  c.push(space(240));
  c.push(P([new TextRun({text:"“We don’t sell a chatbot. We install the brain a company runs on.”", italics:true, size:24, color:ORANGE})]));
  c.push(new Paragraph({children:[new PageBreak()]}));

  // ---- TOC ----
  c.push(new Paragraph({heading:HeadingLevel.HEADING_1, children:[new TextRun("Contents")]}));
  c.push(new TableOfContents("Contents", {hyperlink:true, headingStyleRange:"1-2"}));
  c.push(new Paragraph({children:[new PageBreak()]}));

  // ================= 1. EXECUTIVE SUMMARY =================
  c.push(H1("1. Executive Summary"));
  c.push(P([B("CORTEX is a governed digital brain that any organization installs to stop losing knowledge, guessing at decisions, and re-doing work.")," ",
    T("It is built on a proven system — productized from the MIPP PIOS, a governed “leadership brain” built for a national political organization where a single fabricated fact caused real damage. The hardest, most defensible parts of that system — governance, grounded retrieval, memory, the knowledge graph, the maturity model and the verification layer — are already industry-neutral. Only the vocabulary is domain-specific. That is exactly what makes a scalable software company.")]));
  c.push(P([B("The category is the wedge. "), T("Generic AI tools answer questions. CORTEX remembers, reasons, decides, executes and improves — and never fabricates, because every claim carries a source, a confidence band and, for high-stakes output, a named human approver. We are not “ChatGPT for your company.” We are the operating system the company runs on. We name and own the category: BIOS — the Business Intelligence Operating System.")]));
  c.push(P([B("The business model is build-once-sell-many. "), T("One universal platform (three pillars, eight layers, a five-level maturity ladder), configured per industry by reusable templates, delivered by a repeatable methodology (the CORTEX Method) that walks each client up the maturity ladder. New verticals are new templates — not new engineering.")]));
  c.push(H3("The headline numbers (base case)"));
  c.push(table([2600,2253,2253,2254],[
    [{t:"Metric"},{t:"Year 1"},{t:"Year 2"},{t:"Year 3"}],
    r2("Total revenue (USD)","$214K","$921K","$2.59M"),
    r2("Recurring revenue (ARR)","$148K","$670K","$1.95M"),
    r2("Gross margin","72%","73%","74%"),
    r2("EBITDA","($25K)","$154K","$765K"),
    r2("Active clients","16","76","243"),
    r2("Exit-rate MRR","$12.4K","$55.9K","$162.8K"),
  ]));
  c.push(space(60));
  c.push(P([B("The ask. "), T("Bootstrap the services-led pilot phase from winsym.ai cash flow and a small (USD 150–300K) angel/grant round to fund the first engineers and the platform build, converting to a priced seed once 2–3 reference clients and a hardened vertical template are in place.")]));

  // ================= 2. MARKET ANALYSIS =================
  c.push(H1("2. Market Analysis"));
  c.push(P([T("CORTEX sits at the intersection of five fast-growing, currently-fragmented markets. The strategic insight is that buyers are forced to assemble a brain from four or five tools that don’t share a knowledge graph, governance model or memory — and none of them is grounded enough to trust for consequential work. CORTEX collapses the stack.")]));

  c.push(H2("2.1 AI consulting providers"));
  c.push(P([T("The Big Four (Accenture, Deloitte, McKinsey QuantumBlack, BCG X) and a long tail of boutiques sell AI strategy and bespoke builds. They are expensive, slow, and leave nothing reusable: every engagement re-learns the client from scratch and the “deliverable” is a deck or a one-off model, not a compounding asset. "),
    B("Gap: "), T("no productized, governed system the client keeps and grows. CORTEX delivers the consulting outcome (captured knowledge, better decisions) as installed, owned software.")]));

  c.push(H2("2.2 AI Operating Systems"));
  c.push(P([T("Palantir Foundry + AIP is the closest philosophical analogue — an ontology-plus-AI “operational layer” — but it is priced and scoped for governments and the Fortune 500 (custom, six-to-seven-figure, land-and-expand contracts) and requires heavy implementation. "),
    B("Gap: "), T("there is no Palantir for the SME and mid-market. CORTEX brings the ontology + governance + grounded-AI architecture down to organizations of 1–2,500 people at a price they can pay.")]));

  c.push(H2("2.3 Knowledge management systems"));
  c.push(P([T("Glean, Guru and the AI-search category make organizational knowledge findable. The knowledge-management software market is roughly USD 16–26 billion in 2026 and growing 14–18% annually; the AI-in-KM segment is growing ~25%+ CAGR. "),
    B("Gap: "), T("these tools retrieve and answer — they do not run processes, score decisions, or act. They are Maturity Level 2. CORTEX uses Level-2 knowledge as the floor, not the ceiling.")]));

  c.push(H2("2.4 AI agents"));
  c.push(P([T("Salesforce Agentforce, Microsoft Copilot agents and a wave of agent frameworks promise autonomous action. By 2026 ~80% of enterprises are deploying generative AI in some form. But agents acting on ungoverned, unverified knowledge amplify mistakes at scale. "),
    B("Gap: "), T("nobody is selling the governed substrate underneath the agents. CORTEX’s iron rule — never automate (Level 5) on top of unverified knowledge (Level 1) — is the exact discipline the agent hype is missing.")]));

  c.push(H2("2.5 Internal GPT / “company ChatGPT” solutions"));
  c.push(P([T("ChatGPT Enterprise, Claude for Teams/Enterprise and internal RAG builds give staff a private assistant. They are powerful but generic: no business-specific knowledge graph, weak/optional governance, no permanent memory, no decision scoring, and a persistent hallucination risk. "),
    B("Gap: "), T("the trust layer. For clinics, law firms and enterprises — the buyers with the most to spend — a tool that can fabricate is unusable. CORTEX is built no-fabrication-first.")]));

  c.push(H2("2.6 Opportunities & market gaps (the synthesis)"));
  c.push(bullet([B("The mid-market “Palantir gap.” "), T("Governed, ontology-driven AI exists only at the top. 99% of organizations are priced out. This is the single biggest opening.")]));
  c.push(bullet([B("The trust gap. "), T("Regulated and serious buyers cannot use tools that hallucinate. Grounded, sourced, human-approved output is a wedge generic AI cannot copy without rebuilding their core.")]));
  c.push(bullet([B("The integration gap. "), T("Buyers are stitching together search + chat + CRM + automation. One governed brain that spans all eight functions is structurally simpler and stickier.")]));
  c.push(bullet([B("The Southeast Asia timing gap. "), T("The SEA AI market is expanding from ~USD 12B (2026) toward ~USD 80B (2031); Malaysia has ~68% professional AI adoption and a national “AI Nation 2030” push, yet a documented governance and enterprise-data-readiness gap. High intent, low maturity, weak governance = the perfect entry market for a governed brain.")]));
  c.push(bullet([B("The compounding-asset gap. "), T("Every competitor sells a tool; CORTEX sells an asset that gets more valuable and more locked-in the longer it runs.")]));

  // ================= 3. COMPETITOR ANALYSIS =================
  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("3. Competitor Analysis"));
  c.push(P([T("No incumbent occupies CORTEX’s position: a governed, grounded, full-stack business brain priced for organizations below the enterprise mega-cap tier. Each competitor owns one slice; none owns the whole brain with trust built in. Pricing below reflects publicly reported 2026 figures (most are sales-quoted, not list).")]));
  c.push(table([1500,1850,1850,1850,1810],[
    [{t:"Player"},{t:"What it is"},{t:"Indicative 2026 price"},{t:"Strength"},{t:"Gap vs. CORTEX"}],
    [{t:"Palantir Foundry/AIP",bold:true,fill:"EDEAE4"},{t:"Ontology + AI operational layer"},{t:"Custom; 6–7 figures, land-and-expand"},{t:"Deepest governed data platform"},{t:"Unreachable for SME/mid-market; heavy"}],
    [{t:"Glean",bold:true,fill:"EDEAE4"},{t:"Enterprise AI search/assistant"},{t:"~$50/user + $15 AI; ~100-seat min; ~$60K+ ACV"},{t:"Best-in-class retrieval"},{t:"Answers only; no execution, decisions, memory graph"}],
    [{t:"Guru",bold:true,fill:"EDEAE4"},{t:"AI knowledge management/wiki"},{t:"~$25/seat; 10-seat min"},{t:"Easy, affordable KM"},{t:"Wiki, not a reasoning/operating brain"}],
    [{t:"Notion AI",bold:true,fill:"EDEAE4"},{t:"Workspace + AI"},{t:"Business ~$20/member; AI bundled"},{t:"Loved, cheap, flexible"},{t:"No governance, grounding or RBAC depth"}],
    [{t:"Microsoft 365 Copilot",bold:true,fill:"EDEAE4"},{t:"AI across Office"},{t:"$30/user enterprise add-on (on top of base)"},{t:"Distribution; in the workflow"},{t:"Generic; no business knowledge graph or memory"}],
    [{t:"ChatGPT Enterprise",bold:true,fill:"EDEAE4"},{t:"Private GPT for staff"},{t:"~$50–60/user; 150-seat min; ~$108K/yr floor"},{t:"Strongest general model"},{t:"No governed graph, memory or no-fabrication guarantee"}],
    [{t:"Claude for Teams / Enterprise",bold:true,fill:"EDEAE4"},{t:"Private Claude for staff"},{t:"~$30/user (Team); Enterprise custom"},{t:"Safety-leaning, long context"},{t:"Still an assistant, not an operating system"}],
    [{t:"Salesforce Agentforce",bold:true,fill:"EDEAE4"},{t:"Agents on CRM data"},{t:"$2/conversation · $500/100K credits · ~$125/user"},{t:"CRM-native action"},{t:"Locked to Salesforce; agents on ungoverned base"}],
  ]));
  c.push(space(80));
  c.push(H2("3.1 Other relevant players"));
  c.push(P([T("Microsoft Copilot Studio and AWS/Google enterprise-AI stacks (build-your-own), vertical point solutions (Harvey for law, Hippocratic/abridge for health), and regional SI / consulting shops. All either require you to build the governance yourself or solve one vertical. CORTEX productizes the governance and spans verticals via templates.")]));
  c.push(H2("3.2 Why CORTEX wins (the moat)"));
  c.push(num([B("Governance + trust layer. "), T("Confidence bands, source citation, human-approval tiers, no fabrication — exactly what regulated buyers require, and a wedge generic AI can’t copy without rebuilding its core.")]));
  c.push(num([B("Knowledge graph + memory. "), T("Each client’s brain gets more valuable and more locked-in over time; switching means abandoning accumulated organizational memory.")]));
  c.push(num([B("Template library. "), T("A growing, proprietary catalog of industry configurations makes every new vertical faster and cheaper than a competitor starting cold.")]));
  c.push(num([B("The methodology. "), T("The CORTEX Method turns implementation into a productized, teachable, repeatable service — and the diagnostic is the sales pitch.")]));

  // ================= 4. OFFER STRUCTURE =================
  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("4. Offer Structure — The 4-Tier Ladder"));
  c.push(P([T("One platform, sold at five maturity levels across four company sizes. Customers buy their way up the levels and switch on more layers — they are never re-platformed as they grow. The maturity gap itself is the value case in every sales conversation.")]));
  c.push(table([1700,1900,1900,1930,1930],[
    [{t:""},{t:"STARTER"},{t:"GROWTH"},{t:"PROFESSIONAL"},{t:"ENTERPRISE"}],
    r2("Target","Solo / micro (1–10)","SME (10–250)","Mid-market (250–2,500)","Enterprise (2,500–10,000+)"),
    r2("Maturity","Level 1 → 2","Level 2 → 3","Level 3 → 4","Level 4 → 5"),
    r2("Outcome","Find & trust answers","Brain runs the work","Brain helps decide","Business runs on it"),
    r2("Layers active","2–3","4–5","6–7","All 8 lobes"),
    r2("Documents","Up to 500","Up to 5,000","Up to 50,000","Unlimited"),
    r2("Data sources","3 (uploaded)","8 (docs + first APIs)","15+ live integrations","Unlimited + custom"),
    r2("AI functions","Grounded Q&A + sourcing","+ Content + ops drafting","+ Decision scoring + agents","+ Custom scoring, multi-brain"),
    r2("Automations","Read-only briefs","Basic schedules","Workflows + integrations","Full cadence + custom triggers"),
    r2("Dashboard","Search + ask box","+ Graph view, briefs","+ Scorecards, reports","+ Role-aware enterprise views"),
    r2("RBAC","Owner / flat","A few roles","Department clearances","Fine-grained, SSO, audit"),
    r2("Deployment","Shared multi-tenant","Multi-tenant","MT or isolated","Single-tenant / VPC / on-prem"),
    r2("Support","Self-serve + docs","Light onboarding","Guided implementation","Dedicated success + SLA"),
  ]));
  c.push(space(60));
  c.push(P([B("Three intertwined offers underneath the ladder: "), T("(1) the Platform (recurring SaaS), (2) the Implementation (high-margin, high-trust service that makes the software stick), and (3) the Industry Templates (reusable IP that makes each sale fast and bespoke-feeling). Add-ons monetize the variable layer: extra templates, additional brand-brains for agencies, premium integrations, compliance packs.")]));

  // ================= 5. PRICING STRATEGY =================
  c.push(H1("5. Pricing Strategy — Three Regional Price Books"));
  c.push(P([T("We price on value and maturity, not seats alone. Three commercial levers set the price: the maturity level reached, company size/usage, and deployment isolation. Southeast Asia is the anchor market; Europe and Premium Enterprise are variants tuned to higher willingness-to-pay and stricter isolation needs.")]));

  c.push(H2("5.1 Malaysia / Southeast Asia (MYR) — anchor"));
  c.push(table([2400,1740,1740,1740,1740],[
    [{t:""},{t:"STARTER"},{t:"GROWTH"},{t:"PROFESSIONAL"},{t:"ENTERPRISE"}],
    r2("Setup (one-time)","RM 6,000","RM 18,000","RM 45,000","RM 120,000+"),
    r2("Monthly platform","RM 1,200","RM 3,500","RM 8,000","RM 18,000+"),
    r2("Year-1 total","RM 20,400","RM 60,000","RM 141,000","RM 336,000+"),
  ]));
  c.push(space(60));
  c.push(H2("5.2 Europe / DACH (EUR)"));
  c.push(table([2400,1740,1740,1740,1740],[
    [{t:""},{t:"STARTER"},{t:"GROWTH"},{t:"PROFESSIONAL"},{t:"ENTERPRISE"}],
    r2("Setup (one-time)","€ 2,500","€ 8,000","€ 22,000","€ 65,000+"),
    r2("Monthly platform","€ 450","€ 1,400","€ 3,500","€ 8,500+"),
    r2("Year-1 total","€ 7,900","€ 24,800","€ 64,000","€ 167,000+"),
  ]));
  c.push(space(60));
  c.push(H2("5.3 Global Premium Enterprise (USD) — single-tenant / VPC"));
  c.push(table([2400,1740,1740,1740,1740],[
    [{t:""},{t:"STARTER"},{t:"GROWTH"},{t:"PROFESSIONAL"},{t:"ENTERPRISE"}],
    r2("Setup (one-time)","$ 3,000","$ 12,000","$ 35,000","$ 90,000+"),
    r2("Monthly platform","$ 600","$ 2,000","$ 6,000","$ 15,000+"),
    r2("Year-1 total","$ 10,200","$ 36,000","$ 107,000","$ 270,000+"),
  ]));
  c.push(space(60));
  c.push(P([B("Why this is defensible against incumbents: "), T("our Growth tier (~RM 60K / ~USD 13K Year-1) lands below the ~USD 60K–108K floors of Glean and ChatGPT Enterprise while delivering far more than search or chat. Our Enterprise tier still undercuts a Palantir engagement by an order of magnitude. We compete on value-per-dollar at the mid-market, not on per-seat price wars.")]));

  // ================= 6. MARGIN ANALYSIS =================
  c.push(H1("6. Margin Analysis"));
  c.push(P([T("CORTEX has the classic services-to-product margin profile: implementation funds the early business at solid (40–48%) margins while subscription compounds at SaaS-grade (63–90%) margins. As templates mature and self-serve onboarding replaces hands-on capture, implementation hours fall and the subscription mix rises — pulling blended margin toward 80%+.")]));
  c.push(H2("6.1 Per-tier margins (SEA prices, USD)"));
  c.push(table([2760,1650,1650,1650,1650],[
    [{t:""},{t:"STARTER"},{t:"GROWTH"},{t:"PROFESSIONAL"},{t:"ENTERPRISE"}],
    r2("Subscription gross margin","90%","88%","79%","63%"),
    r2("Implementation gross margin","47%","45%","43%","47%"),
    r2("Year-1 blended margin","78%","75%","68%","58%"),
  ]));
  c.push(space(60));
  c.push(H2("6.2 Cost structure"));
  c.push(bullet([B("Subscription COGS: "), T("LLM tokens + hosting (Postgres/pgvector, object store, optional OpenSearch/graph DB). Scales from ~$25/mo (Starter, shared multi-tenant) to ~$1,400/mo (Enterprise, single-tenant, heavy compute and governance).")]));
  c.push(bullet([B("Implementation COGS: "), T("consultant/engineer time running the CORTEX Method (16 hrs Starter → 320 hrs Enterprise at a blended ~$42/hr internal cost in years 1–2). This is the cost line templates attack directly.")]));
  c.push(bullet([B("OPEX: "), T("team, sales & marketing, G&A. Modeled at $180K (Y1) → $520K (Y2) → $1.15M (Y3), crossing into positive EBITDA in Year 2.")]));
  c.push(H2("6.3 Scalability"));
  c.push(P([T("The core architecture is invariant from 1 to 10,000 employees — only how much is switched on, how isolated the deployment is, and how granular the governance is flex with size. A stateless API layer scales horizontally; Postgres+pgvector carries the long tail and only needs OpenSearch/graph-DB/sharding at the top end; the LLM layer is provider-pluggable and cost-tiered. Commercially, the same platform sells across five maturity stages, four company sizes and many templates — growth is configuration, not migration, and governance becomes more premium (not more costly to us) as clients grow.")]));
  c.push(H2("6.4 Personnel requirement"));
  c.push(table([3600,1920,1920,1920],[
    [{t:"Function"},{t:"Year 1"},{t:"Year 2"},{t:"Year 3"}],
    r2("AI / full-stack engineering","1","3","6"),
    r2("Implementation consulting","1","3","7"),
    r2("Sales / partnerships","0","2","5"),
    r2("Customer success","0","1","4"),
    r2("Marketing / content","1","1","3"),
    r2("Founder + ops/admin","1","2","3"),
    [{t:"Total headcount",bold:true,fill:"EDEAE4"},{t:"4",bold:true},{t:"12",bold:true},{t:"28",bold:true}],
  ]));

  // ================= 7. WEBSITE STRUCTURE =================
  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("7. Website Structure & Copy"));
  c.push(P([T("A six-section site built to convert serious buyers: lead with the category and the trust promise, prove it with the maturity diagnostic, and route everyone to a booked demo. Recommended structure: "),
    B("Home · Solutions · Industries · Pricing · Case Studies · Book Demo.")]));

  c.push(H2("Home"));
  c.push(P([B("Hero headline: "), new TextRun({text:"“Your company already has a brain. It’s just scattered across people, files and apps.”", italics:true})]));
  c.push(P([B("Sub-headline: "), T("CORTEX is the governed AI operating system that captures what your business knows, runs how it works, and helps it decide — without ever making things up.")]));
  c.push(P([B("Primary CTA: "), T("Book a demo."),B("   Secondary CTA: "), T("Take the 2-minute Maturity Assessment.")]));
  c.push(P([B("Value props (three tiles): "), T("(1) Never lose knowledge again — one trusted source of truth. (2) Decisions on evidence, not opinion — every answer sourced and confidence-rated. (3) Built for trust — no fabrication, full access control, human approval for high-stakes output.")]));

  c.push(H2("Solutions"));
  c.push(P([T("Organized by the eight brain layers framed as outcomes: Knowledge (“end ask-the-veteran”), Operations (“meetings become assigned work”), Marketing & Content (“on-brand at scale”), Sales (“every rep performs like your best rep”), Customer (“one memory of every relationship”), Decision (“score high-stakes choices”), Intelligence & Risk (“live radar + crisis playbook”), Automation (“the business runs itself on a cadence”). Each with the maturity level it unlocks.")]));
  c.push(P([B("Value proposition: "), new TextRun({text:"“One brain, eight functions, zero hallucinations.”", italics:true})]));

  c.push(H2("Industries"));
  c.push(P([T("A page per hardened template — Law Firms, Medical Practices, Hotels & Hospitality, Real Estate, Marketing Agencies, Restaurants — each showing the layers that lead, the compliance red-lines we respect (attorney-client privilege, HIPAA/PDPA, food-safety), and a vertical-specific demo. The trust layer is the hero on the regulated pages.")]));
  c.push(P([B("Value proposition: "), new TextRun({text:"“We don’t adapt your business to software. We configure the brain to your industry.”", italics:true})]));

  c.push(H2("Pricing"));
  c.push(P([T("The 4-tier ladder shown as a maturity journey (Starter → Enterprise), region-aware (MYR/EUR/USD), with the maturity diagnostic embedded: “Where is your business today?” Anchored on value vs. the cost of lost knowledge and bad decisions, not per-seat comparison. CTA on every tier: Book a demo / Talk to us.")]));

  c.push(H2("Case Studies"));
  c.push(P([T("Proof over promises. Each study follows: the maturity gap before → what we captured and switched on → measurable result (onboarding time cut, questions deflected, decision quality, hours saved). Lead with the PIOS lineage as the credibility anchor (“built for a domain where one fabricated fact causes real damage”), then add commercial references as they land.")]));

  c.push(H2("Book Demo"));
  c.push(P([T("A single, frictionless booking flow. The demo itself is the differentiator: a live, grounded, fully-sourced answer from a sample brain — credible to exactly the buyers (clinics, firms, enterprises) who normally distrust AI. We sell the governance, not the magic.")]));

  // ================= 8. SALES STRATEGY =================
  c.push(H1("8. Sales Strategy"));
  c.push(H2("8.1 Target customers & industries"));
  c.push(bullet([B("Beachhead verticals (regulated = trust-layer sells itself): "), T("law firms, medical/dental practices, then hotels, real estate, marketing agencies and multi-location hospitality.")]));
  c.push(bullet([B("Buyer: "), T("owner/managing partner/GM of a 10–250-person SME, and department heads in 250–2,500-person mid-market firms — non-technical, ROI-driven, feeling the pain of lost knowledge and inconsistent service.")]));
  c.push(bullet([B("Geography: "), T("Kuala Lumpur / Malaysia first (warm network, winsym.ai presence, Google + Meta Partner credibility), then SEA, then DACH via the German-language advantage.")]));
  c.push(H2("8.2 Acquisition process"));
  c.push(P([B("The diagnostic is the pitch. "), T("Every conversation opens by placing the prospect on the maturity ladder: “You’re operating at Level 1 but trying to make Level 4 decisions.” The gap is the value case. Funnel: content/SEO + warm outreach + speaking → free Maturity Assessment → discovery call → grounded live demo on a sample brain → paid pilot (one or two layers) → land at Level 2.")]));
  c.push(H2("8.3 Demo process"));
  c.push(P([T("Pre-load a small sample brain for the prospect’s vertical. Show a grounded, sourced answer; then deliberately ask something not in the knowledge base to show it says “I don’t know” and routes the gap rather than fabricating. That moment — the refusal to make things up — is what closes regulated buyers.")]));
  c.push(H2("8.4 Upselling / land-and-expand"));
  c.push(P([T("Land small on the one or two layers that hurt most (usually Knowledge + Operations), prove ROI fast at Level 2, then sell the climb: more layers, higher maturity, more departments, deeper integrations, additional templates/brand-brains. Net revenue retention is modeled at 115% — the brain’s growing lock-in does the selling. Win 2–3 reference clients in one vertical, harden the template, then repeat into the next.")]));

  // ================= 9. PRODUCT ROADMAP =================
  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("9. Product Roadmap"));
  c.push(table([1700,2400,3360,1900],[
    [{t:"Phase"},{t:"Theme"},{t:"What we build / do"},{t:"Outcome"}],
    [{t:"Phase 1",bold:true,fill:"EDEAE4"},{t:"Done-for-you Brain Setup"},{t:"Services-led pilots for 2–3 clients in one vertical using the file-based/PoC approach + the CORTEX Method. Learn the template."},{t:"Revenue + references; first hardened template"}],
    [{t:"Phase 2",bold:true,fill:"EDEAE4"},{t:"Brain as a Service"},{t:"Productize the platform: graph + RBAC + grounded RAG + trust layer first, then dashboard and user layers (Part 8 architecture)."},{t:"Recurring SaaS revenue; repeatable onboarding"}],
    [{t:"Phase 3",bold:true,fill:"EDEAE4"},{t:"Managed AI Operating System"},{t:"Switch on the Automation/Cadence layer and live integrations for clients who’ve earned the maturity. Read-only automations first."},{t:"Level-5 clients; higher ACV; deep lock-in"}],
    [{t:"Phase 4",bold:true,fill:"EDEAE4"},{t:"Own SaaS Platform"},{t:"Lower the floor (solo/SME self-serve) and raise the ceiling (enterprise single-tenant), with an expanding industry-template marketplace."},{t:"Scalable self-serve + enterprise; template network effects"}],
  ]));
  c.push(space(80));
  c.push(P([B("Sequencing logic: "), T("services-led first to learn the verticals and fund the build (and because a brain must be trusted before it’s bought), then convert to platform-led recurring revenue as templates mature. Never automate (Phase 3) before the knowledge it acts on is verified — the iron rule of the maturity model is also the rule of the roadmap.")]));

  // ================= 10. FUNDING STRATEGY =================
  c.push(H1("10. Funding Strategy"));
  c.push(H2("10.1 Bootstrapping (now)"));
  c.push(P([T("Fund Phase 1 from winsym.ai consulting cash flow. Services revenue from the first done-for-you brains directly finances the platform build — the classic capital-efficient services-to-product path. Keep the team lean (4 people in Year 1) and let implementation margin cover burn.")]));
  c.push(H2("10.2 Grants & support programmes"));
  c.push(P([T("Malaysia’s “AI Nation 2030” agenda and MSME AI-readiness initiatives (MDEC, Cradle, MyDIGITAL, plus Microsoft/partner programmes), and German/EU digitalization grants for the DACH expansion. Non-dilutive capital plus government credibility — valuable for selling to public-sector and regulated buyers.")]));
  c.push(H2("10.3 Angel investors"));
  c.push(P([T("A small USD 150–300K angel round once 2–3 reference clients and one hardened template exist — targeting SEA operator-angels and ex-founders who can open enterprise doors. Use of funds: first 2 engineers + a sales hire + the platform MVP (Phase 2).")]));
  c.push(H2("10.4 Venture capital"));
  c.push(P([T("A priced seed (~USD 1.5–3M) once the platform shows recurring revenue, net revenue retention >110%, and a repeatable template motion. The pitch is category creation (BIOS) + a defensible governance moat + a services-to-SaaS margin story + the SEA-to-global expansion path. Regional funds (e.g. SEA enterprise-SaaS investors) for the seed; global funds at Series A.")]));
  c.push(H2("10.5 Strategic partners"));
  c.push(P([T("Cloud and model providers (Anthropic, Microsoft, AWS, Google — co-sell and credits), systems integrators and vertical associations (bar councils, medical/hospitality bodies) for distribution, and Google/Meta Partner status as trust signals. Strategic capital later can come from a cloud/enterprise-software player seeking a governed-AI layer for the mid-market.")]));

  // ================= 11. CONCLUSION =================
  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("11. Conclusion — The Company You Can Sell"));
  c.push(P([B("CORTEX builds the Business Intelligence Operating System: a governed digital brain that any organization installs to stop losing knowledge, guessing at decisions, and re-doing work.")," ",
    T("We sell one platform — configured per industry by reusable templates, delivered via a methodology that walks each client up a five-level maturity ladder — from a productivity tool for a solo founder to the operating system of a 10,000-person enterprise.")]));
  c.push(P([B("The positioning, in one line: "), new TextRun({text:"the rigor of McKinsey, the data-platform discipline of Palantir, and the everyday usability of Notion — fused into one trustworthy product, priced for the 99% of organizations the incumbents ignore.", italics:true})]));
  c.push(H2("Revenue potential"));
  c.push(P([T("The base case reaches ~USD 2.6M revenue and ~USD 1.95M ARR by Year 3 at ~74% gross margin and ~29% EBITDA margin, with 243 active clients and an exit-rate MRR of ~$163K. That is a credible, capital-efficient path to a $10M+ ARR business — and because the platform never re-platforms a customer as they grow, and governance becomes more premium with scale, the model’s defensibility and expansion revenue increase over time. The ceiling is set by how many verticals we templatize and how far up the maturity ladder we take each client.")]));
  c.push(P([B("The next move: "), T("close the first 2–3 done-for-you brains in a single beachhead vertical, harden that template, and use the references to raise the angel round that funds the platform. The framework is done. The company is a sequencing problem now — and the sequence is clear.")]));
  c.push(space(120));
  c.push(P([new TextRun({text:"CORTEX — Winning systems, backed by a brain.", italics:true, color:ORANGE, size:22, bold:true})]));
  c.push(P([new TextRun({text:"Figures are illustrative model anchors built on the attached financial model; validate against live prospects before committing. Competitor pricing reflects publicly reported 2026 figures and is mostly sales-quoted, not list.", size:15, color:GREY})]));
  return c;
}

Packer.toBuffer(doc).then(buf=>{ fs.writeFileSync(process.argv[2], buf); console.log("doc written"); });
