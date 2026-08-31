# Tunnel Drill-and-Blast Cost Estimation Software & BOQ Calculator Engine

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-217346.svg)](#access)
[![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-2251FF.svg)](#what-it-helps-track)

<p><strong>Looking for a reliable underground construction cost estimation software?</strong> This free, browser-based <strong>Bill of Quantities (BOQ) calculator engine</strong> helps tunnel engineers, contractors, and estimators calculate excavation quantities, drilling and blasting resources, ground support materials, heavy equipment operating hours, and underground labour costs from a single set of engineering assumptions—without rebuilding the <strong>tunneling cost model</strong> from scratch for every tender.</p>

**No signup. No installation. Free in your browser.**

Try the browser version for quick feasibility testing. If you need the fully unlocked enterprise Excel version for repeated bidding, you can acquire it with a 30-day, no-questions-asked money-back guarantee.

> [🌐 Launch the Free Web-Based Drill-and-Blast Calculator](https://hyvoid.github.io/tunnel-cost-estimator-boq-excel/) → Best for quick project feasibility testing
> 
> [📥 Download the Reusable Excel Tunnel Estimating Template](https://alexhasgreatestuff.gumroad.com/l/aquodj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=tunnel-cost-estimator-boq) → Best for enterprise ERP integration and offline bidding
>
> *Disclaimer: This software serves as a rigorous cost estimation and Bill of Quantities (BOQ) computational engine. It does not replace the professional engineering judgment, site-specific geotechnical investigations, and certified design authorizations of Tunnel Engineers, Blasting Engineers, or Geotechnical Specialists in establishing blast patterns, explosive loading regimes, perimeter presplit spacing, rock mass classifications (e.g., Q-system, RMR, GSI), or structural ground support classes.*


Instead of isolated spreadsheets, this system maps your commercial and engineering pain points directly to automated solutions:

* **Pain Point: Guessing blast cycles.** → **Solution:** Automated tracking of total excavation volume and the precise number of blast cycles implied by your tunnel length and pull length.
* **Pain Point: Unpredictable material usage.** → **Solution:** Calculate exact drilling metres, explosive (ANFO/Emulsion) yields, detonators, shotcrete thickness, rock bolts, and steel arch requirements based on rock mass geometry.
* **Pain Point: Incomplete resource allocation.** → **Solution:** Generate heavy equipment operating hours and underground labour hours directly from the planned construction cycle.
* **Pain Point: Hidden overheads.** → **Solution:** Separate direct cost, project operating cost, contingency, overhead, and target margin into distinct commercial layers for transparent bidding.
* **Pain Point: Weak unit economics.** → **Solution:** Instantly generate unit-cost indicators such as total cost per metre ($/m) and excavation cost per cubic metre ($/m³) for hard rock tunneling.


## Quick Start Tutorial: How to Build Your Tunnel Cost Model

1. **Step 1: Set the project parameters (Geometry & Assumptions).**
   Enter the tunnel length, excavation section area, perimeter, overbreak allowance, and currency in the dedicated input area. Engineering inputs such as pull length, holes per round, explosive factor, and support spacing are maintained as independent variables.

2. **Step 2: Load the commercial rates (Resource Pricing).**
   Input material prices, equipment hourly rates, labour rates, and crew configurations into the structured rate databases. Transfer your supplier quotations directly into these tables to avoid hard-coding prices into calculation formulas.

3. **Step 3: Generate the engineering and cost results (Automated Engine).**
   Run the calculation engine to instantly convert your project geometry into blast cycles, drilling requirements, explosive/detonator consumption, support material quantities, and total operational hours.

4. **Step 4: Review the BOQ and Cost Summary (Decision Output).**
   Export the material BOQ to review category-level quantities and costs. Analyze the separated direct costs, operating margins, and unit-cost indicators for final decision-making.

💡 **Ready to standardize your workflow?** After testing your project parameters in the free browser version, **[download the reusable Excel tunnel estimating template](https://alexhasgreatestuff.gumroad.com/l/aquodj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=tunnel-cost-estimator-boq)** to save your customized commercial rates and use it repeatedly for future underground construction tender submissions.

## Real-World Scenarios: Who Uses This Drill and Blast Estimator?

This platform is specifically engineered to bridge the gap between technical tunneling parameters and commercial bidding requirements. 

### Tunnelling Contractors & Estimators
* **Scenario:** Expanding from simple manpower supply into full-scope underground construction.
* **Value:** Acts as a comprehensive **tunneling cost estimation software** to evaluate the financial exposure created by materials, equipment, and site operations, not just labour.

### Quantity Surveyors (QS) & Commercial Managers
* **Scenario:** Preparing accurate tender documents and material schedules for infrastructure projects.
* **Value:** Serves as a structured **Bill of Quantities (BOQ) generation template** that links dynamically to current supplier price databases.

### Project Managers & Underground Construction Planners
* **Scenario:** Tracking project feasibility and daily advance rates against budget constraints.
* **Value:** Functions as an **underground mining cost modeling tool** to test how changes in pull length or blast patterns impact the overall project margin.


## Why I Built This

Moving from manpower supply to full tunnelling responsibility changes the estimating problem.

A manpower supplier can often work from labour hours and agreed labour rates. An end-to-end tunnelling contractor has to account for the entire construction cycle: **Drill → Load → Blast → Ventilation → Mucking → Support**. Materials, equipment, labour, and site operating costs become part of the contractor's exposure.

That creates a practical estimating failure: the project may have a plausible labour number while the actual production cycle has not been translated into a complete resource and cost model.

The purpose of this tool is to make that translation explicit.

For example, a tunnel estimate should not stop at “the tunnel is 1,000 m long.” The length must interact with the assumed pull length to determine the number of blast cycles. The excavation section and overbreak assumption then affect excavation volume. The blast design drives drilling metres, explosive consumption, and detonator requirements. Support assumptions drive shotcrete, rock bolts, and steel arch quantities. Those quantities then need rates before they become a usable cost estimate.

The workbook therefore treats estimating as a **connected reasoning chain**, rather than a collection of independent spreadsheets.

The result is a reusable framework: change the project assumptions or commercial rates, and the downstream quantities and cost outputs can be recalculated without rewriting the model.


## Common Underground Estimating Problems This Software Solves

| Tunnelling Estimating Bottleneck | Traditional Manual Spreadsheet Methods | Automated BOQ & Cost Engine Solution |
| :--- | :--- | :--- |
| **Labour-only Bidding Blindness** | Labour cost is estimated while heavy equipment and underground material exposure remains implicit. | Labour, material, and equipment requirements are calculated as connected parts of the drill-and-blast construction cycle. |
| **Manual Quantity Extraction Gaps** | Tunnel length is known, but drilling, explosives, ground support, and excavation volumes require manual, error-prone math. | Engineering assumptions drive the required resource quantities through a centralized calculation engine. |
| **Rate Duplication & Version Chaos** | Material and equipment rates are repeated inside individual calculation cells, making global updates difficult. | Rates are maintained in dedicated databases and dynamically referenced by the calculation layer via `XLOOKUP`. |
| **Hidden Commercial Margins** | Overhead, contingency, and profit margins are mixed into an unexplained lump-sum project total. | Direct cost, operating cost, contingency, overhead, and margin are strictly separated in the cost summary dashboard. |
| **Lack of Unit-Cost Indicators** | A project total gives little indication of whether the estimate is efficient relative to benchmark tunneling standards. | Total cost-per-metre ($/m) and cost-per-cubic-metre ($/m³) indicators expose the actual economics of the estimate. |

## About

I build lightweight operational and decision-support tools for situations where there are too many moving parts to hold reliably in a spreadsheet assembled ad hoc.

The central question is simple:

> **What information needs to be in one place to make the next decision confidently?**

This tunnel estimating engine applies that approach to a specific problem: connecting tunnel geometry and construction assumptions to engineering quantities, resource requirements, BOQ outputs, and project cost.

It is designed as a reusable analytical framework rather than a one-off project estimate.


## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

### Workbook Architecture

The workbook is organized into three layers:

```text
INPUT & ASSUMPTION LAYER
│
├── 01_Project_Inputs
│   └── Global project and commercial parameters
│
├── 02_Engineering_Assumptions
│   └── Drill-and-blast and support assumptions
│
├── 03_Price_Database
│   └── Material unit rates
│
└── 04_Resource_Rates
    └── Equipment rates, labour rates, crew configuration
            │
            ▼
CALCULATION ENGINE
│
└── 05_Drill_Blast_Engine
    ├── Blast cycles
    ├── Excavation volume
    ├── Drilling metres
    ├── Explosives
    ├── Detonators
    ├── Shotcrete
    ├── Rock bolts
    ├── Steel arches
    ├── Equipment hours
    └── Labour hours
            │
            ├──────────────────────┐
            ▼                      ▼
OUTPUT LAYER
│
├── 06_Material_BOQ
│   ├── Material quantities
│   └── Material cost
│
└── 07_Cost_Summary_Analysis
    ├── Material cost
    ├── Labour cost
    ├── Equipment cost
    ├── Direct cost
    ├── Operating cost
    ├── Contingency
    ├── Overhead
    ├── Margin
    ├── Cost / m
    └── Cost / m³
```

The intended data direction is **input → calculation → output**.

The four input sheets provide the assumptions and rate sources. The drill-and-blast engine consumes those inputs and produces engineering and resource quantities. The BOQ and cost summary then consume the engine outputs.

This separation matters because a rate change should not require a calculation rewrite. Likewise, changing a tunnel assumption should not require manually editing the BOQ.

| Sheet                        | Primary Role                                       | Data Behavior       |
| ---------------------------- | -------------------------------------------------- | ------------------- |
| `01_Project_Inputs`          | Project geometry, currency, commercial assumptions | Manual input        |
| `02_Engineering_Assumptions` | Blast and support design assumptions               | Manual input        |
| `03_Price_Database`          | Material prices and units                          | Maintained database |
| `04_Resource_Rates`          | Equipment and labour rates                         | Maintained database |
| `05_Drill_Blast_Engine`      | Engineering/resource calculation                   | Formula-driven      |
| `06_Material_BOQ`            | Material quantity and cost output                  | Formula-driven      |
| `07_Cost_Summary_Analysis`   | Cost and unit economics                            | Formula-driven      |

### Three Traps That Catch Even Experienced Tunnelling Estimators

#### Trap 1 — Estimating the Tunnel, Not the Construction Cycle

A decision may be made from tunnel length alone: a 1,000 m tunnel appears to have a straightforward quantity basis.

The unnoticed problem is that length does not define the number of construction cycles. A 2 m pull and a 4 m pull produce very different cycle counts.

The model therefore makes the relationship explicit:

```text
Blast Cycles = Tunnel Length / Pull Length
```

The corrected approach is to treat the assumed pull length as a production parameter. Once cycle count is established, drilling, explosives, detonators, equipment hours, and labour hours can be related to those cycles.

The resulting decision is not simply “how long is the tunnel?” but “what resource exposure does the assumed construction cycle create?”

#### Trap 2 — Treating Quantity and Cost as the Same Number

A material requirement can be correctly estimated while its commercial impact remains unclear.

For example, knowing the required explosive quantity does not establish its cost until the relevant unit rate is applied. The same applies to drilling consumables, shotcrete, steel, and other materials.

The corrected model separates:

```text
Engineering Quantity
        ↓
Material / Resource Unit Rate
        ↓
Cost
```

This allows procurement or rate assumptions to change without changing the engineering quantity.

The result is a clearer distinction between **what the project consumes** and **what that consumption costs**.

#### Trap 3 — Hiding Commercial Allowances Inside the Project Total

A final project number can look precise even when direct cost, operating cost, contingency, overhead, and margin have been blended together.

That makes it difficult to identify what is driving the estimate and what would change if the commercial assumptions changed.

The corrected approach maintains separate commercial parameters and applies them in the cost summary.

```text
Direct Cost
    ↓
Operating / Overhead / Contingency Layers
    ↓
Commercial Margin
    ↓
Project Cost / Target Commercial Result
```

The purpose is not to make the estimate look more sophisticated. It is to make the source of the final number inspectable.

<!-- README Part 2 of 3 -->

<!-- Continuation of the same README document. -->

<!-- IMPORTANT: The parent Technical Details <details> opened in Part 1 remains OPEN. -->

### Example Scenario

The following is an **illustrative estimating scenario**, not a project-specific engineering recommendation. The values demonstrate how the workbook connects project geometry, construction assumptions, quantities, and commercial rates.

Assume a drill-and-blast tunnel with:

| Input                   | Illustrative Value |
| ----------------------- | -----------------: |
| Tunnel length           |            1,000 m |
| Excavation section area |              50 m² |
| Overbreak rate          |                 8% |
| Pull length             |              2.5 m |
| Holes per round         |                110 |
| Hole depth              |              2.8 m |
| Explosive factor        |          1.8 kg/m³ |
| Detonators per round    |                110 |
| Shotcrete thickness     |             0.10 m |
| Rock-bolt spacing       |              1.5 m |
| Rock-bolt length        |              3.0 m |
| Steel arch spacing      |              1.5 m |

The first calculation establishes the construction-cycle basis:

```text
Blast Cycles
= Tunnel Length / Pull Length
= 1,000 / 2.5
= 400 cycles
```

The excavation-volume basis, including the assumed overbreak allowance, becomes:

```text
Excavation Volume
= Section Area × Tunnel Length × (1 + Overbreak Rate)
= 50 × 1,000 × 1.08
= 54,000 m³
```

The drilling requirement based on the assumed holes per round and hole depth is:

```text
Drilling Metres
= Blast Cycles × Holes per Round × Hole Depth
= 400 × 110 × 2.8
= 123,200 m
```

The explosive quantity, using the stated illustrative factor, is:

```text
Explosive Quantity
= Excavation Volume × Explosive Factor
= 54,000 × 1.8
= 97,200 kg
```

The detonator requirement is:

```text
Detonators
= Blast Cycles × Detonators per Round
= 400 × 110
= 44,000 pcs
```

These outputs are then passed to the BOQ and cost layers. Material quantities are matched to the maintained price database, while equipment and labour requirements are matched to the resource-rate layer.

The important estimating implication is that a single change in an upstream assumption can affect multiple downstream outputs. A change from a 2.5 m pull to a 2.0 m pull increases the cycle count from 400 to 500. That does not merely change one line item: it changes cycle-driven drilling, explosives, detonators, equipment hours, labour hours, and associated costs.

The workbook therefore makes **assumption sensitivity visible before commercial decisions are finalized**.

### Formula Reference

<details>
<summary>Project Geometry and Cycle Calculations</summary>

#### Blast Cycle Count

**Purpose:** Determine the number of excavation/blast cycles implied by tunnel length and assumed pull length.

```excel
=Tunnel_Length/Pull_Length
```

The source architecture defines this relationship as:

```text
Cycles = Tunnel Length / Pull Length
```

The result becomes a driver for cycle-based resource calculations.

#### Excavation Volume

**Purpose:** Convert section geometry and tunnel length into estimated excavation volume while incorporating the stated overbreak allowance.

```excel
=Section_Area*Tunnel_Length*(1+Overbreak_Rate)
```

The architecture explicitly identifies this relationship as:

```text
Volume = Section Area × Tunnel Length × (1 + Overbreak)
```

This means the overbreak assumption is maintained as an input rather than hidden inside the calculation.

#### Unit Cost Indicators

The output layer is designed to expose:

```text
Cost per metre
= Total Project Cost / Tunnel Length

Cost per cubic metre
= Total Project Cost / Excavation Volume
```

These indicators provide a normalized view of project economics alongside the absolute project total. The source specifically identifies `$ / m` and `$ / m³` as key outputs.

</details>

<details>
<summary>Drilling, Explosives, and Detonator Calculations</summary>

#### Drilling Metres

A cycle-based drilling calculation can be expressed as:

```excel
=Blast_Cycles*Holes_Per_Round*Hole_Depth
```

The underlying inputs are explicitly defined in the architecture as `Pull_Length`, `Holes_Per_Round`, and `Hole_Depth`.

Where a drill-rod loss assumption is maintained, the model can additionally account for the specified `Drill_Rod_Loss_Rate` as an engineering/resource parameter rather than embedding a fixed allowance in the formula.

#### Explosive Quantity

Where explosive consumption is expressed as a volume-based factor:

```excel
=Excavation_Volume*Explosive_Factor
```

The source allows the explosive factor to be expressed as either `kg/m³` or `kg/cycle`, so the implementation must keep the selected basis explicit rather than silently mixing the two.

#### Detonator Quantity

For a cycle-based detonator assumption:

```excel
=Blast_Cycles*Detonator_Per_Round
```

This maintains the relationship between the blast-cycle count and the number of detonators assumed for each round.

</details>

<details>
<summary>Support Quantity Calculations</summary>

The support layer uses engineering assumptions such as:

* `Shotcrete_Thickness`
* `Rock_Bolt_Spacing`
* `Rock_Bolt_Length`
* `Steel_Arch_Weight_Per_M`
* `Steel_Arch_Spacing`

The source architecture identifies the corresponding outputs as:

```text
Total_Shotcrete_Vol
Total_Rock_Bolts_Qty
Total_Steel_Arch_Weight
```

The exact support formulas should therefore follow the approved engineering basis for the project. The workbook architecture intentionally treats these values as assumptions rather than presenting one universal support design.

</details>

<details>
<summary>Rate Lookup and Cost Calculation</summary>

#### Material Rate Lookup

Material costs should not contain embedded rates such as:

```excel
=Quantity*15.5
```

Instead, the source specifies a centralized price database and an `XLOOKUP`-based retrieval pattern:

```excel
=XLOOKUP(
    Material_Name,
    Price_Database[Material],
    Price_Database[Rate]
)
```

This allows a supplier quotation or procurement rate to be updated once in the price database and automatically flow through downstream calculations.

#### Material Cost

```excel
=Material_Quantity*Material_Unit_Rate
```

The BOQ therefore keeps **Quantity** and **Cost** conceptually separate, allowing quantity assumptions and commercial rates to be reviewed independently.

#### Labour Cost

```excel
=Labour_Hours*Labour_Hourly_Rate
```

The labour rate is retrieved from the resource-rate layer rather than hard-coded into the engine.

#### Equipment Cost

```excel
=Equipment_Hours*Equipment_Hourly_Rate
```

The same principle applies to equipment: the engine calculates the required hours, while the resource-rate layer supplies the applicable hourly rate.

</details>

<details>
<summary>Commercial Cost Layers</summary>

The project input layer maintains the commercial parameters separately, including:

* `Overhead_Rate`
* `Contingency_Rate`
* `Profit_Margin_Rate`

The source specifically places these commercial parameters in `01_Project_Inputs` and references them from `07_Cost_Summary_Analysis`.

A representative cost-layer structure is:

```text
Material Cost
        +
Labour Cost
        +
Equipment Cost
        =
Direct Cost Subtotal
        ↓
Project Operating / Overhead / Contingency Layers
        ↓
Commercial Margin
        ↓
Project-Level Commercial Result
```

The important implementation principle is **single-point maintenance**. Changing an overhead or contingency assumption should update the summary without editing individual cost formulas.


### Validation Rules

The validation layer should prevent invalid assumptions from silently producing apparently precise quantities.

| Field                 | Rule                                                             | Error Behavior                                           |
| --------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| `Tunnel_Length`       | Must be greater than zero                                        | Reject or flag the project calculation                   |
| `Section_Area`        | Must be greater than zero                                        | Reject or flag excavation-volume calculation             |
| `Perimeter`           | Must be a positive geometric input                               | Flag invalid project geometry                            |
| `Overbreak_Rate`      | Must be expressed as a valid rate                                | Flag invalid percentage input                            |
| `Pull_Length`         | Must be greater than zero                                        | Prevent division-by-zero cycle calculation               |
| `Holes_Per_Round`     | Must be a positive whole-number assumption                       | Flag invalid blast configuration                         |
| `Hole_Depth`          | Must be greater than zero                                        | Prevent invalid drilling calculation                     |
| `Explosive_Factor`    | Must use a clearly defined basis such as `kg/m³` or `kg/cycle`   | Prevent ambiguous explosive calculation                  |
| `Detonator_Per_Round` | Must be a valid cycle-level quantity                             | Flag inconsistent detonator calculation                  |
| `Drill_Rod_Loss_Rate` | Must be a valid non-negative rate                                | Prevent negative or invalid consumption adjustment       |
| `Shotcrete_Thickness` | Must be non-negative and expressed consistently in project units | Flag invalid support assumption                          |
| `Rock_Bolt_Spacing`   | Must be greater than zero                                        | Prevent invalid bolt-count calculation                   |
| `Rock_Bolt_Length`    | Must be greater than zero when bolts are included                | Flag incomplete support configuration                    |
| `Steel_Arch_Spacing`  | Must be greater than zero when steel arches are included         | Prevent invalid arch quantity calculation                |
| Material lookup key   | Material must exist in `Price_Database`                          | Flag missing rate rather than silently assigning a value |
| Equipment lookup key  | Equipment must exist in `Resource_Rates`                         | Flag missing hourly rate                                 |
| Labour lookup key     | Labour category must exist in `Resource_Rates`                   | Flag missing labour rate                                 |
| `Overhead_Rate`       | Must be a valid percentage                                       | Flag invalid commercial assumption                       |
| `Contingency_Rate`    | Must be a valid percentage                                       | Flag invalid commercial assumption                       |
| `Profit_Margin_Rate`  | Must be a valid percentage                                       | Flag invalid commercial assumption                       |
| Currency code         | Must be populated before financial outputs are presented         | Flag incomplete commercial setup                         |

The source defines the relevant input and output fields but does not prescribe a complete error-message library or every worksheet-level validation implementation. Those details should therefore be treated as implementation controls rather than as fixed engineering standards.

### Implementation Principles

#### 1. One Source of Truth for Commercial Rates

Rates belong in the rate databases.

```text
Price Database
      │
      ├── Material Rate
      │
      ▼
Calculation Engine
      │
      ▼
Material BOQ
      │
      ▼
Cost Summary
```

This avoids duplicated rates and makes commercial updates auditable.

#### 2. Engineering Assumptions Are Inputs, Not Hidden Formula Constants

The model explicitly separates project geometry, blast assumptions, support assumptions, resource rates, and commercial parameters.

This allows the estimator to distinguish between:

```text
Engineering assumption
        ≠
Resource rate
        ≠
Commercial allowance
```

That distinction is essential when reviewing why an estimate changed.

#### 3. Dynamic Formula Architecture

The implementation is intended to use modern Excel functions such as:

```excel
XLOOKUP()
FILTER()
LET()
```

with dynamic-array spill behavior so that formula ranges do not have to be manually extended whenever the underlying dataset grows.

The objective is not formula complexity. The objective is **repeatability with fewer manual maintenance points**.

#### 4. Quantity and Cost Remain Traceable

The output architecture deliberately separates:

```text
Quantity
   ↓
Unit Rate
   ↓
Cost
```

rather than presenting only a final monetary total.

This makes the estimate easier to challenge. If the cost looks wrong, the reviewer can ask whether the issue is quantity, rate, or both.

### Limitations and Appropriate Use

This workbook should be treated as an **estimating and decision-support engine**, not as an engineering design authority.

The source architecture defines calculation relationships and the required assumption fields, but it does not establish universal values for blast design, geotechnical conditions, support classes, equipment productivity, labour productivity, procurement logistics, or site-specific construction constraints.

Accordingly:

* Blast parameters should come from the applicable engineering basis.
* Support assumptions should reflect the project's geotechnical and structural requirements.
* Material prices should reflect current procurement conditions.
* Equipment rates should reflect the actual ownership, rental, operating, or internal costing basis.
* Labour rates and crew structures should reflect the intended operating model.
* Overhead, contingency, and margin should be commercial decisions rather than assumed engineering constants.
* The resulting BOQ should be reviewed before it is used for procurement or contractual commitment.

The workbook's value is in **connecting assumptions consistently**, not in deciding whether those assumptions are technically appropriate for a particular tunnel.



### Reproducibility Checklist

Before using an estimate for commercial or operational decisions, the following review sequence should be completed:

1. **Project geometry**

   * Confirm tunnel length.
   * Confirm excavation section area.
   * Confirm perimeter and applicable geometric basis.
   * Confirm the overbreak assumption.

2. **Blast assumptions**

   * Confirm pull length.
   * Confirm holes per round.
   * Confirm hole depth.
   * Confirm explosive consumption basis.
   * Confirm detonator quantity per round.
   * Confirm drilling-consumable assumptions.

3. **Support assumptions**

   * Confirm shotcrete thickness.
   * Confirm rock-bolt spacing and length.
   * Confirm steel-arch spacing and unit weight where applicable.

4. **Resource assumptions**

   * Confirm equipment hourly rates.
   * Confirm labour hourly rates.
   * Confirm crew configuration.
   * Confirm whether rates represent ownership, rental, operating, or internal costing assumptions.

5. **Commercial assumptions**

   * Confirm material prices.
   * Confirm overhead.
   * Confirm contingency.
   * Confirm target margin.
   * Confirm currency.

6. **Output review**

   * Check total excavation volume.
   * Check blast-cycle count.
   * Check drilling metres.
   * Check explosives and detonators.
   * Check support quantities.
   * Check equipment and labour hours.
   * Check material, labour, and equipment cost.
   * Check direct cost and project-level cost.
   * Check `$ / m` and `$ / m³` indicators.

The source architecture explicitly defines these input and output categories as the cross-check basis for the workbook.

### Data Flow Summary

The complete calculation chain can be summarized as:

```text
PROJECT GEOMETRY
        │
        ▼
ENGINEERING ASSUMPTIONS
        │
        ├───────────────┐
        │               │
        ▼               ▼
BLAST / EXCAVATION    SUPPORT
CALCULATIONS          CALCULATIONS
        │               │
        └───────┬───────┘
                ▼
        RESOURCE REQUIREMENTS
        ├── Drilling
        ├── Explosives
        ├── Detonators
        ├── Shotcrete
        ├── Rock Bolts
        ├── Steel Arches
        ├── Equipment Hours
        └── Labour Hours
                │
                ▼
        RATE DATABASES
        ├── Material Rates
        ├── Equipment Rates
        └── Labour Rates
                │
                ▼
             COSTING
        ├── Material Cost
        ├── Labour Cost
        ├── Equipment Cost
        └── Direct Cost
                │
                ▼
       COMMERCIAL ADJUSTMENTS
        ├── Operating / Overhead
        ├── Contingency
        └── Margin
                │
                ▼
       DECISION OUTPUTS
        ├── Material BOQ
        ├── Total Project Cost
        ├── Cost / m
        └── Cost / m³
```

This structure is the core of the workbook: engineering assumptions are translated into measurable resource requirements, and those requirements are then translated into a transparent commercial estimate.

### Extension Opportunities

The current architecture establishes a foundation that can be extended without changing its fundamental data flow.

Potential extensions include:

* Additional support classes for different geological conditions.
* More detailed equipment productivity assumptions.
* Separate operating, ownership, rental, and fuel-cost components.
* Procurement lead-time and material-delivery planning.
* Production-cycle sensitivity analysis.
* Alternative blast-pattern scenarios.
* Bid-price and target-margin simulations.
* Actual-versus-estimate project cost tracking after construction begins.
* Historical project benchmarking using normalized `$ / m` and `$ / m³` indicators.

These are extensions rather than requirements of the current architecture. The uploaded source defines the seven-sheet core system and its primary calculation chain; it does not specify a full project execution or actual-cost accounting module.

### What the Workbook Is Really Designed to Do

The central design principle is simple:

```text
Do not estimate each cost category independently.

Build the estimate from the construction cycle.
```

Tunnel geometry determines the physical scale.

Engineering assumptions determine the construction requirements.

Construction requirements determine resource consumption.

Resource consumption determines quantities and hours.

Rates convert quantities and hours into cost.

Commercial assumptions convert direct cost into a project-level commercial view.

That makes the workbook useful not only for producing a number, but for understanding **why the number is what it is**.

</details>
</details>


## Other Tools in This Series

Theseus Workshop builds lightweight Excel-based decision-support tools for operational problems where a connected calculation workflow is more useful than a generic dashboard.

Related tools cover areas such as:

* **Single-Project Construction Control Workbook** — project budget, actual cost, change orders, progress billing, collections, and cash flow.
* **Contractor Operations & Profitability Management System** — Lead → Estimate → Job → Labor & Materials → Job Cost → Profit → Customer History.
* **Warehouse Billing Control System** — operational records translated into recurring billing and reconciliation.
* **Freight Forwarding Booking-Level Profitability Engine** — revenue, COGS, fees, profit, and margin at booking level.

## License

This project is released under the **Apache License 2.0**.

You may use, reproduce, modify, and distribute the work subject to the terms and conditions of the Apache License 2.0.

See the [`LICENSE`](LICENSE) file for the complete license text.
