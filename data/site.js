/* ==========================================================================
   PORTFOLIO CONTENT  —  the only file you need to edit for most updates.
   Every section on the site is rendered from the objects below.
   Leave a field as "" (or delete it) and it simply won't be shown.
   Dates: add a `period` (year only) wherever you see period: "".
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- Site-wide settings ---------- */
  site: {
    name: "Jaivin",
    role: "Industrial Engineer",
    location: "Ostrava, Czech Republic",
    status: "Open to internships and junior roles in the EU",
    email: "Jaivin1811@gmail.com",                              // TODO: professional email
    linkedin: "https://www.linkedin.com/in/jaivin-muthukumar",         // TODO
    github: "https://github.com/muthukarjaivin-web",                  // TODO
    cv: "assets/cv/Jaivin-CV.pdf",                               // TODO: put your PDF at this path
    formEndpoint: "",   // Optional: Formspree URL, e.g. "https://formspree.io/f/xxxxxxx". Empty = opens the visitor's email app.
    updated: "2026"
  },

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "I'm an industrial engineer in training, based in Ostrava. I started in mechanical engineering, first with a diploma and then a B.Eng. at Anna University. Working as a quality engineer and inspector taught me what a drawing really asks of a part. An internship in purchasing and data sourcing at BSH Household Appliances taught me what a part costs and who supplies it.",
      "I'm now doing an MSc in Industrial Engineering at VŠB – Technical University of Ostrava. My thesis looks at how accurate workpiece probes are and where that accuracy can be used in manufacturing.",
      "What connects all of it is one habit: measure the process, find where it drifts, fix the cause, and check that the fix holds. I do that with Lean tools, quality methods, and data in Excel, Power BI and Tableau."
    ],
    goal: "I'm looking for internship and junior roles in quality engineering, procurement, supply chain and operations at manufacturers in the Czech Republic and across the EU. I'm open to relocating within the EU.",
    facts: [
      { k: "Based in", v: "Ostrava, Czech Republic" },
      { k: "Studying", v: "MSc Industrial Engineering, VŠB-TUO" },
      { k: "Languages", v: "English, Czech (beginner)" },
      { k: "Looking for", v: "Internships and junior roles, EU" }
    ],
    focus: [
      { t: "Industrial engineering", d: "Planning work and capacity with numbers: OEE, standard times, CPM/PERT." },
      { t: "Manufacturing", d: "From casting and machining to forming and welding, and how parts get measured." },
      { t: "Quality management", d: "Inspection, nonconformance reports, root cause, SPC and measurement systems." },
      { t: "Lean manufacturing", d: "Kaizen, 5 Why and value stream thinking, aimed at time and waste." },
      { t: "Supply chain", d: "Supplier comparison, new product sourcing, and SAP data." },
      { t: "Process optimization", d: "Pick one process, measure it, change one thing, measure again." }
    ]
  },

  /* ---------- Work experience ---------- */
  experience: [
    {
      role: "Purchasing / Data Sourcing Intern",
      org: "BSH Household Appliances",
      place: "Chennai, India",
      period: "",
      summary: "Supported purchasing with supplier data, offer comparisons and cost analysis for refrigerator and laundry products.",
      figures: [
        { v: "7", l: "suppliers tracked for a new product development project" }
      ],
      responsibilities: [
        "Compared supplier offers for refrigerator and laundry products.",
        "Tracked seven suppliers through a new product development (NPD) sourcing project.",
        "Used SAP MM to pull and analyse purchasing data.",
        "Cleaned and analysed data in Excel with XLOOKUP, pivot tables and Power Query."
      ],
      contributions: [
        "Worked with the cost value stream engineering team to analyse machining, loading and unloading time for injection-moulded products, and did the same for carton boxes.",
        "Turned raw supplier data into side-by-side comparisons that purchasing could use."
      ],
      exposure: ["SAP MM", "Excel", "Power Query", "Supplier management", "Cost analysis", "NPD sourcing"]
    },
    {
      role: "Quality Engineer / Inspector",
      org: "Aquasub Engineering",
      place: "India",
      period: "",
      summary: "About a year inspecting machined parts, castings and child parts of pumps and motors, including onsite inspections at suppliers.",
      figures: [
        { v: "13 min", l: "saved per lot through a Kaizen improvement" },
        { v: "15 lots", l: "inspected at peak" },
        { v: "−20% / −30%", l: "defects and nonconformances, team result" }
      ],
      responsibilities: [
        "Inspected machined parts, castings and child parts of pumps and motors against drawings.",
        "Measured with vernier calipers, micrometers, height gauges and thread gauges.",
        "Recorded results on paper and in Excel, and issued rejection and nonconformance reports.",
        "Handled up to 15 lots during peak periods.",
        "Applied GD&T and first article inspection (FAI)."
      ],
      contributions: [
        "Used a fishbone diagram to trace size variation in pump components.",
        "Used 5 Why during supplier onsite inspections to reach the cause, then discussed fixes with the supplier.",
        "Worked with my manager on supplier audits for new supplier release.",
        "Kaizen improvement that saved 13 minutes per lot.",
        "Part of the team whose work reduced defects by 20% and nonconformances by 30%."
      ],
      exposure: ["GD&T", "FAI", "NCR", "Fishbone", "5 Why", "Supplier audits", "Kaizen", "Excel"]
    }
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: "MSc, Industrial Engineering",
      org: "VŠB – Technical University of Ostrava",
      place: "Ostrava, Czech Republic",
      period: "",
      note: "Thesis: Analysis of Workpiece Probe Accuracy and Their Potential Applications in Manufacturing.",
      highlights: [
        "Multi-criteria decision making (Basis method, COPRAS)",
        "CPM/PERT project planning",
        "Metrology: measurement uncertainty, control charts, Pareto and Ishikawa",
        "Progressive forming technologies and progressive welding methods",
        "Economics and enterprise operation management"
      ]
    },
    {
      degree: "B.Eng., Mechanical Engineering",
      org: "Anna University",
      place: "India",
      period: "",
      note: "",
      highlights: []
    },
    {
      degree: "Diploma, Mechanical Engineering",
      org: "",
      place: "India",
      period: "",
      note: "Diploma thesis on parts printed in PETG by FDM.",
      highlights: []
    }
  ],
  researchInterests: [
    "Dimensional metrology and probing",
    "Measurement uncertainty and gauge studies",
    "Process capability and SPC",
    "Lean and standard-time methods",
    "Supplier quality"
  ],

  /* ---------- Projects ----------
     To add a project: copy one object, paste it at the top of the list,
     change the id, and fill in the fields. Empty fields are hidden.
     diagram:  one of probe | oee | pareto | network | rail | mcdm | control | forming | capacity
     image:    optional path like "assets/img/my-project.png" (replaces the diagram)
     featured: true makes the card wide
     links:    [{ label: "GitHub", href: "https://…" }]                          */
  projects: [
    {
      id: "workpiece-probe-accuracy",
      featured: true,
      type: "Research",
      status: "In progress",
      title: "Analysis of Workpiece Probe Accuracy and Their Potential Applications in Manufacturing",
      short: "Master's thesis",
      summary: "How accurately do workpiece probes measure, and which manufacturing tasks can that accuracy support?",
      diagram: "probe",
      problem: "A workpiece probe lets a machine find and measure a part without taking it out of the setup. Every result depends on the probe's accuracy, and that changes with probe type, stylus, approach speed, direction and temperature. Manufacturers need to know when a probe is good enough to trust for setup, in-process control or final inspection.",
      objectives: [
        "Compare common workpiece probe types and the error sources that limit each one.",
        "Evaluate probe accuracy and repeatability under defined test conditions.",
        "Relate measured accuracy to tolerance requirements, so a probe can be matched to a task.",
        "Identify practical applications in manufacturing: setup, in-process measurement and inspection."
      ],
      tools: ["Metrology", "Measurement uncertainty", "Statistical analysis", "GD&T"],
      method: "Literature review of probing technology, followed by structured accuracy tests and statistical analysis of the results.",
      implementation: "Test set-up and procedure will be summarised here once the thesis is finalised.",
      results: ["Results and key findings will be published here when the thesis is complete."],
      links: []
    },
    {
      id: "oee-dashboard",
      type: "Analytics",
      status: "",
      title: "OEE and downtime dashboard",
      short: "Excel workbook and Tableau Public",
      summary: "Overall equipment effectiveness for two machines across three shifts, with a downtime Pareto.",
      diagram: "oee",
      problem: "Machines lose output to downtime, slow running and scrap. A single utilisation figure hides which of the three is responsible, so improvement effort goes to the wrong place.",
      objectives: [
        "Calculate OEE per machine and per shift.",
        "Rank downtime causes with a Pareto chart.",
        "Make shift-to-shift and machine-to-machine comparison quick to read."
      ],
      tools: ["Excel", "Tableau Public", "OEE", "Pareto analysis", "Kaggle dataset"],
      method: "OEE = Availability × Performance × Quality, calculated per machine (M1, M2) and shift (A, B, C).",
      implementation: "Built an Excel workbook with source data, OEE calculation and downtime Pareto sheets using live formulas and conditional formatting, then rebuilt it as an interactive Tableau Public dashboard.",
      results: ["M1 on Shift B ran at 79% OEE, the finding the dashboard write-up is built around."],
      links: [
        { label: "Tableau Public dashboard", href: "" },
        { label: "GitHub", href: "" }
      ]
    },
    {
      id: "smv-capacity-planning",
      type: "Analytics",
      status: "In progress",
      title: "Capacity and manpower planning from standard minute values",
      short: "Excel and Power BI",
      summary: "Using garment production data to test whether each style was staffed above or below what its standard time requires.",
      diagram: "capacity",
      problem: "Garment lines are often staffed by experience rather than by calculation, which leads to some styles carrying too many operators and others too few.",
      objectives: [
        "Calculate the workers each style needs from its standard minute value (SMV).",
        "Compare that number with the workers actually used.",
        "Flag over-staffed and under-staffed styles."
      ],
      tools: ["Excel", "Power BI", "DAX basics", "Kaggle dataset"],
      method: "Workers needed = (SMV × pieces) ÷ (shift minutes × expected efficiency), tested against actual workers per style.",
      implementation: "Prepared the Kaggle garment worker productivity dataset in Excel and is building the Power BI report pages for production performance and staffing gaps.",
      results: ["Findings will be added when the analysis is finished."],
      links: []
    },
    {
      id: "cpm-pert-trip",
      type: "Planning",
      status: "",
      title: "Trip planning with CPM and PERT",
      short: "Semester project, VŠB-TUO",
      summary: "A 23-activity project network with a 29-day critical path.",
      diagram: "network",
      problem: "A trip has many dependent steps: bookings, transport, permits, preparation. Late work on the wrong step delays everything, but it isn't obvious which steps those are.",
      objectives: [
        "Break the trip into activities with durations and precedence.",
        "Find the critical path and the slack on every other activity.",
        "Present the plan clearly."
      ],
      tools: ["CPM", "PERT", "Network diagram", "PowerPoint"],
      method: "Critical path method with PERT-style time estimates.",
      implementation: "Modelled 23 activities with their dependencies, calculated earliest and latest times, and wrote up the result with a presentation.",
      results: ["The critical path runs through 29 days. Activities off that path carry slack that can be used to rebalance work."],
      links: []
    },
    {
      id: "aluminothermic-welding-60e1",
      type: "Manufacturing",
      status: "",
      title: "Aluminothermic welding of a 60E1 rail joint",
      short: "Progressive Welding Methods, VŠB-TUO",
      summary: "Technology report with a 3D model of the joint and a welding procedure specification.",
      diagram: "rail",
      problem: "Joining railway rails on site calls for a process that works without a workshop. Aluminothermic welding does that, and the joint has to be designed, prepared and executed to a specification.",
      objectives: [
        "Describe the principle, regulations and equipment of aluminothermic welding.",
        "Design the weldment and model it in 3D.",
        "Write a WPS covering filler, edge preparation and bead sequence."
      ],
      tools: ["Autodesk Fusion", "WPS", "60E1 rail", "R260 steel"],
      method: "Technology study followed by weldment design and a procedure specification.",
      implementation: "Modelled the 60E1 rail joint in Autodesk Fusion. The profile is 172 mm high with a 72 mm head, 16.5 mm web and 150 mm foot, at 60.21 kg/m in grade R260 (260–300 HBW).",
      results: [],
      links: []
    },
    {
      id: "mcdm-air-conditioner",
      type: "Planning",
      status: "",
      title: "Air conditioner selection with multi-criteria decision making",
      short: "Coursework, VŠB-TUO",
      summary: "Ranking air conditioners on several criteria at once using two MCDM methods.",
      diagram: "mcdm",
      problem: "The cheapest option is rarely the best, and the best performer is rarely the cheapest. Choosing between alternatives needs a method that weighs several criteria together.",
      objectives: [
        "Define criteria and weights for the choice.",
        "Rank the alternatives with two methods.",
        "Compare what the methods agree and disagree on."
      ],
      tools: ["Basis method", "COPRAS", "Excel"],
      method: "Basis method and COPRAS applied to the same decision matrix.",
      implementation: "Built the decision matrix, normalised the criteria, applied both methods and compared the rankings.",
      results: [],
      links: []
    },
    {
      id: "minitab-library",
      type: "Quality",
      status: "Growing",
      title: "Minitab quality methods library",
      short: "Self-study, worked examples",
      summary: "A set of worked examples covering the standard quality and statistics toolkit.",
      diagram: "control",
      problem: "Quality methods are easy to read about and easy to apply wrongly. Worked examples make the choices visible: which chart, which test, which assumption.",
      objectives: [
        "Practise each method on a dataset until the output reads naturally.",
        "Keep every example reproducible."
      ],
      tools: ["Minitab", "SPC", "MSA", "DOE"],
      method: "One worked example per method.",
      implementation: "Covers I-MR, Xbar-R and Xbar-S charts, attribute charts (P, NP, C, U), process capability, Gage R&R (crossed and nested), Pareto, fishbone, fractional factorial DOE, regression and correlation.",
      results: [],
      links: [
        { label: "GitHub", href: "" }
      ]
    },
    {
      id: "deep-drawing-dc04",
      type: "Manufacturing",
      status: "",
      title: "Deep drawing of cylindrical cups in DC04 steel",
      short: "Progressive Forming Technologies",
      summary: "Blank sizing, drawing stages, blankholder force and tool dimensions for a cylindrical cup.",
      diagram: "forming",
      problem: "A deep-drawn cup has to be formed without wrinkles or tears, so the blank, the number of drawing stages and the blankholder force all have to be chosen together.",
      objectives: [
        "Size the blank for the finished cup.",
        "Plan the drawing operations.",
        "Calculate blankholder force and tool dimensions."
      ],
      tools: ["DC04 steel", "Forming limit diagrams", "ISO 12004-2"],
      method: "Analytical design supported by forming limit theory.",
      implementation: "Worked through the calculations stage by stage, alongside coursework on forming limit curves, circle grid analysis and digital image correlation.",
      results: [],
      links: []
    }
  ],

  /* ---------- Skills ----------
     stage: "applied" (used at work or in a project), "studied" (course or self-study), "learning" (in progress) */
  skills: [
    { cat: "Industrial engineering", blurb: "Measuring and planning how work flows.", items: [
      { n: "OEE and downtime analysis", s: "applied" },
      { n: "CPM / PERT", s: "applied" },
      { n: "Multi-criteria decision making", s: "applied" },
      { n: "Value stream mapping", s: "studied" },
      { n: "MRP, EOQ, S&OP", s: "studied" },
      { n: "Standard time (SMV)", s: "learning" },
      { n: "Discrete-event simulation (AnyLogic)", s: "learning" }
    ]},
    { cat: "Quality management", blurb: "Finding out what is wrong and why.", items: [
      { n: "Inspection and FAI", s: "applied" },
      { n: "GD&T", s: "applied" },
      { n: "Nonconformance reporting", s: "applied" },
      { n: "Fishbone and 5 Why", s: "applied" },
      { n: "SPC and process capability", s: "applied" },
      { n: "Gauge R&R / MSA", s: "studied" },
      { n: "FMEA", s: "studied" },
      { n: "ISO 9001:2015", s: "studied" }
    ]},
    { cat: "Lean manufacturing", blurb: "Taking time and waste out of the process.", items: [
      { n: "Kaizen", s: "applied" },
      { n: "DMAIC", s: "studied" },
      { n: "Takt time", s: "studied" },
      { n: "Lean Six Sigma Green Belt", s: "learning" }
    ]},
    { cat: "Supply chain and procurement", blurb: "Knowing what parts cost and who makes them.", items: [
      { n: "Supplier comparison", s: "applied" },
      { n: "Cost analysis", s: "applied" },
      { n: "NPD sourcing", s: "applied" },
      { n: "Supplier audit support", s: "applied" },
      { n: "SAP MM (data analysis)", s: "applied" },
      { n: "SAP Ariba", s: "studied" },
      { n: "SAP S/4HANA procure-to-pay", s: "learning" }
    ]},
    { cat: "CAD and engineering software", blurb: "Designing and managing product data.", items: [
      { n: "Siemens NX", s: "applied" },
      { n: "Autodesk Fusion", s: "applied" },
      { n: "Teamcenter (PDM)", s: "studied" }
    ]},
    { cat: "Data analytics and visualization", blurb: "Turning records into decisions.", items: [
      { n: "Excel (XLOOKUP, pivots, Power Query)", s: "applied" },
      { n: "Power BI (DAX basics)", s: "applied" },
      { n: "Tableau Public", s: "applied" },
      { n: "Minitab", s: "applied" },
      { n: "Q-DAS", s: "learning" }
    ]},
    { cat: "Programming and digital tools", blurb: "Automating the repeatable parts.", items: [
      { n: "Git and GitHub", s: "applied" },
      { n: "VBA and macros", s: "learning" }
    ]}
  ],

  /* ---------- Certifications and learning ---------- */
  certifications: [
    { n: "Lean Six Sigma White Belt", by: "", s: "Completed" },
    { n: "SAP Business Process course", by: "", s: "Completed" },
    { n: "Lean Six Sigma Yellow Belt", by: "", s: "Next" },
    { n: "SAP S/4HANA procure-to-pay (S4500 path)", by: "", s: "In progress" },
    { n: "ISO 14001 internal auditor course", by: "Advisera", s: "Planned" },
    { n: "Lean Six Sigma Green Belt", by: "", s: "Planned" }
  ],
  belts: [
    { n: "White", s: "done" },
    { n: "Yellow", s: "next" },
    { n: "Green", s: "later" }
  ],
  learning: [
    "SAP S/4HANA: vendor master, procure-to-pay, general ledger",
    "Minitab and Q-DAS for automotive-style quality analysis",
    "Power BI: DAX and report design",
    "AnyLogic simulation (Personal Learning Edition)",
    "VBA for Excel automation",
    "ISO 9001:2015 and ISO 14001 auditing"
  ],

  /* ---------- Journey: shown as a drawing revision table ---------- */
  journey: [
    { rev: "A", t: "Diploma in Mechanical Engineering", added: "Machine and manufacturing fundamentals. Diploma thesis on FDM-printed PETG." },
    { rev: "B", t: "B.Eng. in Mechanical Engineering, Anna University", added: "Engineering depth in design, materials and manufacturing." },
    { rev: "C", t: "Purchasing / data sourcing internship, BSH", added: "Supplier comparison, cost analysis, SAP MM data, seven suppliers tracked for NPD." },
    { rev: "D", t: "Quality engineer / inspector, Aquasub Engineering", added: "Inspection, GD&T, FAI, supplier audits, a Kaizen saving 13 minutes per lot, and a team result of −20% defects and −30% nonconformances." },
    { rev: "E", t: "Moved to Ostrava for the MSc at VŠB-TUO", added: "Industrial engineering methods, metrology, forming, welding, operations management." },
    { rev: "F", t: "Portfolio projects", added: "OEE dashboard (M1 Shift B at 79%), a 29-day critical path, a growing Minitab library." },
    { rev: "G", t: "Lean Six Sigma White Belt and SAP business process course", added: "Common vocabulary with plant, quality and purchasing teams." },
    { rev: "H", t: "Master's thesis on workpiece probe accuracy", added: "Measurement accuracy as a decision tool for manufacturing. Current revision." }
  ]
};
