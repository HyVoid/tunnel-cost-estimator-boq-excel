[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Tunnel Drill-and-Blast Cost Estimation Software, Excel Template & BOQ Calculator Engine


## Underground Hard Rock Excavation, NATM Tunnelling & Mining Development Cost Model (Microsoft Excel `.xlsx` + Free Web App)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web%20Browser%20%7C%20Microsoft%20Excel-217346.svg)](#quick-start-tutorial-how-to-build-your-tunnel-cost-model)
[![Tool Type](https://img.shields.io/badge/Category-Underground%20Construction%20Estimating%20Software-2251FF.svg)](#what-it-helps-you-track-tunnel-estimating-pain-points--boq-solutions)
[![Excel](https://img.shields.io/badge/Compatibility-Excel%20365%20%7C%20Dynamic%20Arrays-success)](#technical-architecture--excel-formula-reference)
[![No VBA](https://img.shields.io/badge/Macros-100%25%20No--VBA%20Native%20Formulas-lightgrey)](#technical-architecture--excel-formula-reference)

**This Tunnel Drill-and-Blast Cost Estimation Software and Bill of Quantities (BOQ) Calculator Engine is an all-in-one underground construction estimating Excel template and free web application. Engineered for civil infrastructure contractors, hard rock mining estimators, and quantity surveyors (QS), this tunneling cost model automatically calculates neat and overbreak excavation volumes, advance blast cycles, jumbo drilling metres, commercial explosives (ANFO / Emulsion) and detonator consumption, NATM ground support materials (shotcrete, rock bolts, steel ribs/arches), heavy equipment operating hours, and underground crew labour costs from a single set of geotechnical and geometric inputs— outputting unit-rate tender metrics (`$/m` and `$/m³`) without rebuilding spreadsheets from scratch.**

**No signup. No macro installation. Instant browser-based BOQ calculation + downloadable Microsoft Excel `.xlsx` workbook.**

Run rapid tunnel feasibility checks and quantity takeoffs (QTO) directly in our free web calculator, or upgrade to the fully unlocked enterprise Microsoft Excel `.xlsx` estimating template for repeatable tender bidding, supplier rate database management, and offline ERP integration—backed by a 30-day, no-questions-asked money-back guarantee.

> 🌐 **Interactive Online BOQ & Excavation Calculator (Free)**
> [Launch the Free Web-Based Tunnel Drill-and-Blast Cost & BOQ Calculator in Your Browser](https://hyvoid.github.io/tunnel-cost-estimator-boq-excel/) → *Best for instant feasibility testing and quick quantity takeoffs*
> 
> 📥 **Full Enterprise Estimating Workbook (`.xlsx` Download)**
> [Download the Reusable Microsoft Excel Tunnel Cost Estimating & BOQ Template](https://www.theseusworkshop.com/l/aquodj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=tunnel-cost-estimator-boq) → *Best for multi-project tender bidding, custom rate libraries, and offline engineering audits*
>
> *Engineering Disclaimer: This software functions strictly as a commercial cost estimation and Bill of Quantities (BOQ) computational engine. It does not replace site-specific geotechnical investigations or certified design authorizations by licensed Tunnel Engineers, Blasting Engineers, or Geotechnical Specialists in determining blast patterns, powder factors, perimeter presplit spacing, rock mass classifications (Q-system, RMR, GSI), or structural ground support classes.*

---

## What It Helps You Track: Tunnel Estimating Pain Points & BOQ Solutions

Instead of disconnected calculation sheets, this underground estimating system maps your commercial bidding risks and engineering bottlenecks directly to automated spreadsheet solutions:

| Underground Estimating Pain Points (Bidding Risks) | What This Tunnel Cost Model Tracks | Automated BOQ & Cost Engine Solutions |
| :--- | :--- | :--- |
| **Guessing Advance Rates & Blast Cycle Counts** | **Tunnel Length, Pull Length (Advance per Round) & Total Blast Cycles** | Automatically calculates exact drill-and-blast cycle counts (`Length ÷ Pull Length`) that drive all downstream time and resource costs. |
| **Unaccounted Geological Overbreak & Mucking Volume** | **Design Cross-Section Area, Perimeter & Overbreak Allowance (`%`)** | Converts neat tunnel geometry and overbreak percentages into exact loose/bank cubic metres (`m³`) for excavation and mucking haulage. |
| **Unpredictable Drilling & Explosives Consumption** | **Jumbo Drill Metres, Powder Factor (`kg/m³`), ANFO/Emulsion & Detonators** | Computes total blasthole drilling metres, drill rod/bit wear allowances, bulk explosive tonnage, and non-electric/electronic detonator counts. |
| **Disconnected NATM Ground Support Takeoffs** | **Shotcrete Volume (`m³`), Rock Bolts (`pcs`) & Steel Arches/Ribs (`t`)** | Translates tunnel perimeter, shotcrete lining thickness, bolt grid spacing, and steel rib weights into a ready-to-price Material BOQ. |
| **Incomplete Underground Plant & Crew Allocation** | **Jumbo, Loader/LHD, Shotcrete Sprayer Hours & Shift Labour Hours** | Generates heavy equipment operating hours and underground crew man-hours directly from the total number of excavation cycles. |
| **Blended Overheads & Opaque Tender Margins** | **Direct Cost, Site Overhead, Risk Contingency, Profit Margin & Unit Rates (`$/m`, `$/m³`)** | Separates direct construction costs from commercial markups and outputs normalized cost-per-linear-metre (`$/m`) and cost-per-cubic-metre (`$/m³`) benchmarks. |

---

## Step-by-Step Tunnel Cost Estimating Tutorial: Quick Start Workflow

Follow this 4-step underground construction estimating workflow to generate a complete Material Bill of Quantities (BOQ) and unit-rate cost breakdown for your next tunnel or mining tender:

### Step 1: Configure Tunnel Geometry, Overbreak & Drill-and-Blast Assumptions
**[Action: Open the Free Web-Based Tunnel Cost Estimator](https://hyvoid.github.io/tunnel-cost-estimator-boq-excel/)** and enter your baseline geometric parameters in `01_Project_Inputs` and `02_Engineering_Assumptions`. Define total tunnel length, excavation cross-section area (`m²`), perimeter (`m`), overbreak percentage, pull length per round, blastholes per round, hole depth, powder factor (`kg/m³`), and ground support spacing.

### Step 2: Populate Material Unit Prices, Equipment Rates & Underground Crew Costs
Load your commercial pricing into the centralized `03_Price_Database` and `04_Resource_Rates` tables. Input current supplier quotes for explosives, detonators, drill steel, wet-mix shotcrete, rock bolts, and steel arches, alongside hourly ownership/rental rates for drilling jumbos, mucking loaders, ventilation fans, and underground labour crews.

### Step 3: Execute the Automated Drill-and-Blast Calculation Engine
Let `05_Drill_Blast_Engine` process your inputs. The model dynamically links tunnel geometry to construction cycles, instantly calculating total excavation volume, total drilling metres, consumable loss rates, ground support quantities, and total machine/labour hours without manual formula dragging.

### Step 4: Audit the Material BOQ, Unit Costs (`$/m`, `$/m³`) & Download the Excel Template
Review `06_Material_BOQ` and `07_Cost_Summary_Analysis` to inspect separated direct costs, site overheads, contingency reserves, target profit margins, and benchmark unit economics (`$/m` and `$/m³`).

💡 **Standardize Your Future Tender Bids:** Once you validate your project numbers in the browser preview, **[Download the Full Reusable Excel Tunnel Estimating Template (`.xlsx`)](https://www.theseusworkshop.com/l/aquodj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=tunnel-cost-estimator-boq)** to permanently save your proprietary supplier price databases, customize crew structures, and reuse the unlocked workbook across unlimited future civil tunneling and mining bids.

---

## The Business Logic & Methodology: Solving Commercial Blind Spots in Underground Bidding

Whether you are a labor subcontractor bidding on your first full-scope tunnel contract, a project owner reviewing contractor quotes, or a junior estimator, the biggest financial losses in underground construction rarely come from bad arithmetic. They come from **commercial blind spots**—failing to understand how physical rock geometry triggers a chain reaction of hidden time, equipment, and material costs.

Traditional spreadsheets treat a tunnel like a flat highway: they estimate Materials in one tab, Labour in another, and Equipment in a third. In reality, **underground tunneling is a repetitive factory cycle**:
> **Drill Blastholes → Load Explosives → Blast & Ventilate → Muck Out Rock → Install Ground Support**

This software was built around a **Cycle-Driven Business Logic** that protects you from three fatal bidding traps:

### 1. The "Length Illusion" Blind Spot (Why Pull Length Dictates Your True Cost)
* **The Commercial Problem:** Beginners look at a 1,000-metre tunnel and assume the cost is simply proportional to length. They miss the most important production driver: **Pull Length** (how many metres the tunnel advances in a single blast). If poor rock conditions force your crew to shorten each blast advance from `2.5 metres` to `2.0 metres`, the tunnel is still 1,000 metres long—but your required number of blast cycles jumps from **400 rounds to 500 rounds (+25% more cycles)**.
* **How Our Business Logic Solves It:** Every extra blast cycle means setting up the drilling jumbo again, wiring another full round of detonators, waiting for smoke ventilation, and mobilizing the mucking crew an extra 100 times. This model locks **Blast Cycles (`Tunnel Length ÷ Pull Length`)** as the master heartbeat of the spreadsheet. When you adjust pull length by even 0.5 metres, the engine automatically recalculates the exact surge in detonators, drill bit wear, machine hours, and crew wages—exposing cost overruns before you sign a fixed-price contract.

### 2. The "Overbreak Double-Penalty" Blind Spot (Paying Twice for Unplanned Rock)
* **The Commercial Problem:** When blasting hard rock, the excavation never breaks cleanly along the blueprint line; it always shatters slightly wider. This extra shattered rock is called **Overbreak**. Inexperienced bidders ignore overbreak or treat it as a minor nuisance. In reality, overbreak hits your wallet twice: first, you spend extra explosives, loader fuel, and dump-truck hours hauling that extra rock out; second, you often have to pump expensive concrete or shotcrete back into that empty void to stabilize the tunnel arch.
* **How Our Business Logic Solves It:** Instead of hiding overbreak inside rough guesses, the model makes **Overbreak Rate (`%`)** an explicit commercial slider. You can instantly see how a jump from 6% to 12% overbreak inflates both your excavation volume (`m³`) and your downstream explosive and haulage costs.

### 3. The "Lump-Sum Markup Trap" (Separating Engineering Facts from Commercial Negotiation)
* **The Commercial Problem:** When a client asks you to lower your bid price by 5%, estimators who mix unit prices, waste factors, overheads, and profit margins inside the same Excel cells panic. They don't know if cutting 5% means giving up half their profit or bidding below actual material cost.
* **How Our Business Logicves It:** The workbook strictly separates **Physical Engineering Quantities** (how many kilograms of explosives and rock bolts the rock demands), **Procurement Unit Rates** (what suppliers charge you per unit), and **Commercial Layers** (site overhead, risk contingency, and net profit margin). During tender negotiations, you can adjust supplier quotes or trim your profit margin in seconds while knowing your exact break-even direct cost floor.

---

## Traditional Estimating Spreadsheets vs. Automated Drill-and-Blast BOQ Engine

| Underground Estimating Operation | Fragile Ad-Hoc Excel Spreadsheets | Integrated Drill-and-Blast BOQ Engine |
| :--- | :--- | :--- |
| **Full-Scope Cycle Costing (Drill, Blast, Muck, Support)** | Estimates labour headcount while leaving heavy equipment hours and consumable wear implicit. | Connects drilling jumbos, explosives, ventilation, mucking, and NATM support to the exact blast-cycle count. |
| **Quantity Takeoff (QTO) from Tunnel Geometry** | Estimators manually multiply cross-sections and re-type numbers into separate BOQ sheets, causing copy-paste errors. | Centralized geometry inputs (`Area`, `Perimeter`, `Length`, `Overbreak %`) automatically populate the entire Material BOQ. |
| **Supplier Quote Updates & Rate Management** | Unit prices (`=C12*15.50`) are hard-coded inside hundreds of formulas, making supplier price updates a nightmare. | Dedicated `Price_Database` and `Resource_Rates` tabs dynamically feed the model via modern Excel `XLOOKUP` functions. |
| **Commercial Markup & Contingency Auditing** | Site overheads, geological risk contingencies, and profit margins are buried inside inflated material unit rates. | Strictly isolates Direct Cost (Material + Labour + Plant) from Operating Overhead, Contingency (`%`), and Target Margin (`%`). |
| **Benchmarking Unit Economics (`$/m` & `$/m³`)** | Outputs only a lump-sum tender price with no visibility into whether excavation efficiency matches industry norms. | Automatically computes total **Cost per Linear Metre (`$/m`)** and **Cost per Cubic Metre (`$/m³`)** for instant benchmarking. |

---

## Real-World Scenarios: Who Uses This Tunnel Cost Estimator & BOQ Template?

This platform bridges the gap between geotechnical engineering design parameters and commercial tender pricing across civil construction and mining roles:

* **Civil Tunnelling Contractors & Chief Estimators:** Transitioning from labour-only subcontracting to full turnkey underground contracting; using this *tunnel cost estimation software* to price materials, heavy plant depreciation, and site overheads accurately during competitive tender bids.
* **Quantity Surveyors (QS) & Infrastructure Commercial Managers:** Using this *automated tunnel Bill of Quantities (BOQ) Excel template* to generate audit-ready material schedules, verify subcontractor payment claims, and run sensitivity checks on steel and concrete price fluctuations.
* **Underground Hard Rock Mining Engineers & Mine Planners:** Deploying this *underground mining drift and ramp development cost model* to evaluate capital expenditure (CapEx) per metre of lateral advance, comparing different pull lengths and powder factors.
* **Geotechnical & Tunnel Design Consultants:** Utilizing this *NATM preliminary cost calculator* during feasibility studies (FEL-1 / FEL-2) to compare cost trade-offs between different tunnel alignments, cross-section profiles, and rock support classes (shotcrete vs. rock bolts vs. steel ribs).
* **Project Owners, EPCM Directors & Tender Evaluation Boards:** Leveraging this *independent shadow-bid estimating tool* to benchmark contractor tender submissions using standardized `$/m` and `$/m³` unit-cost metrics and spot unbalanced bidding.
* **Explosives Technical Service Engineers & Drilling Consumable Suppliers:** Applying this *drill-and-blast resource consumption calculator* to demonstrate how optimized blast patterns, emulsion explosives, or longer pull lengths reduce overall total excavation cost per cubic metre for clients.

---

## Supported Underground Excavation & Tunnelling Project Scenarios

To capture diverse geological and engineering configurations, this parametric cost model supports a wide range of drill-and-blast underground construction applications:

1. **Highway, Railway & Metro Transit Tunnels (NATM):** Estimate single-tube or twin-tube transport tunnels requiring systematic rock bolting, fiber-reinforced shotcrete lining, and lattice girders / steel arches.
2. **Hydroelectric Caverns, Headfacer Tunnels & Penstocks:** Model high-overbreak hard rock water conveyance tunnels and diversion adits with customized perimeter and section-area geometry.
3. **Underground Hard Rock Mine Development (Drifts, Declines & Crosscuts):** Calculate lateral development cost per metre (`$/m`) for mining access ramps, haulage drifts, and ventilation shafts using jumbo drill rigs and LHD mucking fleets.
4. **Municipal Utility Micro-Tunnels, Water & Sewer Conduits:** Price smaller-diameter rock excavation projects where tight cross-sections restrict pull lengths and increase cycle-driven labour intensity.

---

## Technical Architecture & Excel Formula Reference

<details>
<summary><strong>Click to expand: 7-Sheet Workbook Architecture, Step-by-Step Numerical Case Study, Native Excel Formulas & Validation Rules (for technical reviewers & financial modelers)</strong></summary>

### Three-Layer Workbook Architecture

The Excel workbook is structured into three strict architectural layers (**Input & Database Layer → Calculation Engine Layer → Commercial Output Layer**):

```text
INPUT & ASSUMPTION LAYER
│
├── 01_Project_Inputs
│   └── Global tunnel geometry, overbreak %, currency & commercial markups
│
├── 02_Engineering_Assumptions
│   └── Drill-and-blast pattern, pull length, powder factor & NATM support parameters
│
├── 03_Price_Database
│   └── Centralized material unit rates (explosives, bolts, shotcrete, steel)
│
└── 04_Resource_Rates
    └── Heavy equipment hourly rates, underground labour rates & crew configurations
            │
            ▼
CALCULATION ENGINE LAYER
│
└── 05_Drill_Blast_Engine
    ├── Total blast cycles (Rounds)
    ├── Neat & overbreak excavation volume (m³)
    ├── Total blasthole drilling metres (m) & rod wear
    ├── Explosives (kg) & detonator quantities (pcs)
    ├── Shotcrete volume (m³), rock bolts (pcs) & steel arch tonnage (t)
    ├── Equipment operating hours
    └── Underground crew labour hours
            │
            ├──────────────────────┐
            ▼                      ▼
COMMERCIAL OUTPUT LAYER
│
├── 06_Material_BOQ
│   ├── Itemized material quantities
│   └── Extended material cost via XLOOKUP
│
└── 07_Cost_Summary_Analysis
    ├── Material, Labour & Equipment direct cost breakdown
    ├── Site operating cost, Contingency & Overhead layers
    ├── Target commercial profit margin
    └── Unit-cost benchmarks: Cost per Metre ($/m) & Cost per Cubic Metre ($/m³)
```

The intended data flow is strictly unidirectional (**Input → Calculation → Output**). Updating a supplier quote in `03_Price_Database` never requires rewriting formulas in `05_Drill_Blast_Engine`, and modifying tunnel length in `01_Project_Inputs` dynamically cascades through the BOQ and executive summary.

| Worksheet Name | Primary Functional Role | Data Behavior |
| :--- | :--- | :--- |
| **`01_Project_Inputs`** | Tunnel geometry, overbreak allowance, currency, commercial rates | Manual user input |
| **`02_Engineering_Assumptions`** | Drill-and-blast round parameters & ground support design inputs | Manual user input |
| **`03_Price_Database`** | Procurement unit prices and measurement units for all consumables | Maintained rate database |
| **`04_Resource_Rates`** | Underground plant hourly rates, crew roles, and labour wage rates | Maintained rate database |
| **`05_Drill_Blast_Engine`** | Core engineering quantity and cycle resource calculation engine | 100% Formula-driven |
| **`06_Material_BOQ`** | Structured Bill of Quantities with automated unit-rate matching | 100% Formula-driven |
| **`07_Cost_Summary_Analysis`** | Executive tender summary, commercial layers, and `$/m` & `$/m³` KPIs | 100% Formula-driven |

---

### Three Technical Estimating Traps That Catch Experienced Tunnel Bidders

#### Trap 1 — Estimating Linear Tunnel Length Instead of the Construction Cycle
A 1,000 m tunnel with a `2.0 m` pull length requires **500 cycles**, whereas a `4.0 m` pull length requires **250 cycles**. The model enforces `Blast Cycles = Tunnel Length / Pull Length` as the primary production driver for drilling, detonators, mucking hours, and shift labour.

#### Trap 2 — Conflating Physical Engineering Quantities with Commercial Prices
Embedding prices inside quantity formulas makes procurement auditing impossible. This workbook enforces a strict separation:
`Engineering Quantity` → `Material / Resource Unit Rate (via XLOOKUP)` → `Extended Cost`.

#### Trap 3 — Blending Commercial Allowances Inside Direct Costs
Mixing site overhead, geological risk contingency, and profit margin into material rates hides the true break-even baseline. The model applies commercial parameters (`Overhead_Rate`, `Contingency_Rate`, `Profit_Margin_Rate`) as transparent, inspectable layers on top of `Direct Cost Subtotal`.

---

### Quantitative Case Study: 1,000m Hard Rock Tunnel Underwriting Scenario

The following illustrative scenario demonstrates how the engine translates geometric and blasting inputs into exact BOQ quantities:

| Engineering / Geometric Input | Assumed Value |
| :--- | ---: |
| **Tunnel Length (`Tunnel_Length`)** | `1,000 m` |
| **Excavation Cross-Section Area (`Section_Area`)** | `50 m²` |
| **Geological Overbreak Allowance (`Overbreak_Rate`)** | `8%` |
| **Pull Length / Advance per Round (`Pull_Length`)** | `2.5 m` |
| **Blastholes per Round (`Holes_Per_Round`)** | `110 holes` |
| **Drilled Hole Depth (`Hole_Depth`)** | `2.8 m` |
| **Powder / Explosive Factor (`Explosive_Factor`)** | `1.8 kg/m³` |
| **Detonators per Round (`Detonator_Per_Round`)** | `110 pcs` |
| **Shotcrete Lining Thickness (`Shotcrete_Thickness`)** | `0.10 m` |
| **Rock-Bolt Spacing & Length** | `1.5 m spacing / 3.0 m length` |
| **Steel Arch / Rib Spacing (`Steel_Arch_Spacing`)** | `1.5 m` |

1. **Blast Cycle Basis:**
   `Blast Cycles = 1,000 m ÷ 2.5 m = 400 cycles (rounds)`
2. **Total Excavation Volume (Including Overbreak):**
   `Excavation Volume = 50 m² × 1,000 m × (1 + 0.08) = 54,000 m³`
3. **Total Jumbo Drilling Requirement:**
   `Drilling Metres = 400 cycles × 110 holes × 2.8 m = 123,200 drilled metres`
4. **Total Commercial Explosives Required:**
   `Explosive Quantity = 54,000 m³ × 1.8 kg/m³ = 97,200 kg`
5. **Total Detonators Required:**
   `Detonators = 400 cycles × 110 pcs = 44,000 pcs`

*Sensitivity Insight:* If rock mass quality degrades and forces `Pull_Length` down from `2.5 m` to `2.0 m`, `Blast Cycles` immediately jump from `400` to `500`, automatically increasing drilling metres, detonators, equipment hours, and crew labour across the entire tender summary.

---

### Modular Formula Reference (100% Native Excel, Zero VBA)

<details>
<summary><strong>1. Project Geometry, Cycles & Unit Cost Indicators</strong></summary>

```excel
// Blast Cycle Count
=Tunnel_Length/Pull_Length

// Total Excavation Volume (incorporating overbreak allowance)
=Section_Area*Tunnel_Length*(1+Overbreak_Rate)

// Normalized Unit Cost Benchmarks
Cost per Linear Metre ($/m)  = Total_Project_Cost / Tunnel_Length
Cost per Cubic Metre ($/m³)  = Total_Project_Cost / Excavation_Volume
```

</details>

<details>
<summary><strong>2. Drilling, Explosives & Detonator Calculations</strong></summary>

```excel
// Total Drilling Metres (with optional Drill_Rod_Loss_Rate parameter)
=Blast_Cycles*Holes_Per_Round*Hole_Depth

// Explosive Quantity (explicitly defined as kg/m³ or kg/cycle)
=Excavation_Volume*Explosive_Factor

// Detonator Quantity
=Blast_Cycles*Detonator_Per_Round
```

</details>

<details>
<summary><strong>3. Ground Support Quantity Calculations (NATM)</strong></summary>

Driven by explicit engineering assumptions (`Shotcrete_Thickness`, `Rock_Bolt_Spacing`, `Rock_Bolt_Length`, `Steel_Arch_Weight_Per_M`, `Steel_Arch_Spacing`) to output:
* `Total_Shotcrete_Vol` (`m³`)
* `Total_Rock_Bolts_Qty` (`pcs`)
* `Total_Steel_Arch_Weight` (`tonnes` / `kg`)

</details>

<details>
<summary><strong>4. Dynamic Rate Lookup & Direct Costing (XLOOKUP Architecture)</strong></summary>

```excel
// Dynamic Material Rate Retrieval (No hard-coded prices)
=XLOOKUP(Material_Name, Price_Database[Material], Price_Database[Rate])

// Extended Direct Costs
Material Cost  = Material_Quantity * Material_Unit_Rate
Labour Cost    = Labour_Hours * Labour_Hourly_Rate
Equipment Cost = Equipment_Hours * Equipment_Hourly_Rate
```

</details>

<details>
<summary><strong>5. Commercial Markup & Margin Waterfall</strong></summary>

Maintains `Overhead_Rate`, `Contingency_Rate`, and `Profit_Margin_Rate` in `01_Project_Inputs` and applies them cleanly in `07_Cost_Summary_Analysis`:
`Direct Cost Subtotal (Material + Labour + Equipment)` → `+ Operating / Overhead / Contingency Layers` → `+ Commercial Profit Margin` → `Total Tender Bid Price`.

</details>

---

### Built-In Input Validation & Error Prevention Rules

| Input Parameter | Validation Rule | Safeguard / Error Behavior |
| :--- | :--- | :--- |
| **`Tunnel_Length` & `Section_Area`** | Must be strictly `> 0` | Rejects or flags invalid geometric volume calculation |
| **`Perimeter`** | Must be a positive geometric input (`> 0`) | Flags invalid tunnel profile geometry |
| **`Overbreak_Rate`** | Must be a valid non-negative percentage | Flags invalid overbreak input |
| **`Pull_Length`** | Must be strictly `> 0` | Prevents `#DIV/0!` division-by-zero in cycle calculation |
| **`Holes_Per_Round` & `Hole_Depth`** | Positive whole number / positive depth (`> 0`) | Flags invalid drill-and-blast pattern |
| **`Explosive_Factor`** | Must specify explicit basis (`kg/m³` or `kg/cycle`) | Prevents unit-basis mixing errors |
| **`Detonator_Per_Round` & `Drill_Rod_Loss_Rate`** | Valid non-negative cycle quantity / wear rate | Prevents negative consumption adjustments |
| **`Shotcrete_Thickness`, `Rock_Bolt_Spacing`, `Steel_Arch_Spacing`** | Non-negative thickness; spacing strictly `> 0` | Prevents division-by-zero in support takeoffs |
| **Material, Equipment & Labour Lookup Keys** | Must exist in `Price_Database` / `Resource_Rates` | Flags missing unit rate instead of returning silent `0` |
| **`Overhead_Rate`, `Contingency_Rate`, `Profit_Margin_Rate`** | Valid percentage inputs + populated Currency Code | Flags incomplete commercial tender setup |

---

### Reproducibility & Pre-Bid Audit Checklist

Before submitting a commercial tender or finalizing a feasibility budget, complete this 6-point verification sequence:

1. **Project Geometry:** Confirm `Tunnel_Length`, `Section_Area`, `Perimeter`, and `Overbreak_Rate`.
2. **Blast Design Assumptions:** Confirm `Pull_Length`, `Holes_Per_Round`, `Hole_Depth`, `Explosive_Factor` basis, `Detonator_Per_Round`, and drill consumable wear rates.
3. **Ground Support Design:** Confirm `Shotcrete_Thickness`, `Rock_Bolt_Spacing` & length, and `Steel_Arch_
