export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitle: string;
  intro: string[];
  offerLabel: string;
  offerings: { title: string; desc: string }[];
  whyLabel: string;
  whyTitle: string;
  whyItems: string[];
  approachLabel: string;
  approachTitle: string;
  approach: { title: string; desc: string }[];
  image: string;
  ctaTitle: string;
  ctaBody: string;
};

export const SERVICES: Service[] = [
  {
    slug: "grading",
    name: "Grading",
    shortDescription:
      "Level and prepare your land for new construction, house pads, footers, or landscape improvements.",
    metaTitle: "Grading Services in Franklin, TN | Site Prep & Land Leveling",
    metaDescription:
      "Professional grading services in Franklin, TN. Site prep, yard regrading, final grading, and driveway grading for homeowners, builders, and developers.",
    heroKicker: "Grading Services in Franklin, TN",
    heroTitle: "Precision Grading for a Stronger, Safer Start",
    intro: [
      "Before any structure can stand strong, the ground beneath it needs to be properly prepared. At Franklin Excavation, we specialize in grading services that give your project the solid foundation it needs — whether you're building a home, installing a driveway, or fixing a drainage issue.",
      "Grading isn't just about moving dirt. It's about shaping your land for long-term function and stability. Done right, it prevents future headaches. Done wrong, it can lead to erosion, water pooling, and structural issues.",
    ],
    offerLabel: "Common Needs We Handle",
    offerings: [
      { title: "Building Site Prep", desc: "House pads, footers, and garages." },
      { title: "Yard Regrading", desc: "Correcting improper slope and eliminating low spots." },
      { title: "Final Grading", desc: "For landscaping and inspection readiness." },
      { title: "Driveway Grading", desc: "Improving slope, compaction, and water runoff." },
    ],
    whyLabel: "The First Step to a Stable, Lasting Build",
    whyTitle: "Why Grading Matters",
    whyItems: [
      "Water draining toward your foundation instead of away from it",
      "Soil erosion that damages lawns, gardens, or structures",
      "Uneven surfaces that are difficult to build on or maintain",
      "Failed inspections for new construction or property resale",
    ],
    approachLabel: "Method That Matters",
    approachTitle: "Our Approach",
    approach: [
      { title: "Site-Specific Planning", desc: "We evaluate each project to determine the ideal grade and slope." },
      { title: "Precision Equipment", desc: "Skid steers, laser levels, and compactors to get it right the first time." },
      { title: "Drainage Awareness", desc: "Every grading job considers water flow and runoff to protect your property." },
    ],
    image: "/images/grading.jpg",
    ctaTitle: "Ready to Start With a Solid Base?",
    ctaBody:
      "Don't leave the most important part of your project to chance. Franklin Excavation provides accurate, reliable grading that helps you build with confidence.",
  },
  {
    slug: "drainage-solutions",
    name: "Drainage Solutions",
    shortDescription:
      "Prevent water damage with French drains, swales, and stormwater management systems.",
    metaTitle: "Drainage Solutions in Franklin, TN | French Drains & Swales",
    metaDescription:
      "French drains, swales, downspout extensions, and regrading for drainage in Franklin, TN. Fix standing water and erosion before they become costly repairs.",
    heroKicker: "Drainage Solutions in Franklin, TN",
    heroTitle: "Solve Water Problems Before They Become Costly Repairs",
    intro: [
      "Poor drainage is one of the most overlooked threats to your property. Whether it's pooling water in the yard, water seeping toward the foundation, or soil erosion after every rainfall, drainage issues can quietly cause major damage over time.",
      "At Franklin Excavation, we provide customized drainage solutions that fix the problem at the source — protecting your home, your land, and your investment.",
    ],
    offerLabel: "Our Drainage Services",
    offerings: [
      { title: "French Drain Installation", desc: "A time-tested method to redirect groundwater away from problem areas." },
      { title: "Swales and Berms", desc: "Graded channels and small mounds that control and redirect surface water." },
      { title: "Downspout Extensions", desc: "Keep roof runoff away from foundations and prevent water pooling near your home." },
      { title: "Regrading for Drainage", desc: "Adjusting the slope of your property to improve natural water flow." },
    ],
    whyLabel: "Keeping Water Where It Belongs",
    whyTitle: "Common Drainage Issues We Fix",
    whyItems: [
      "Standing water in yards, near foundations, or low spots",
      "Erosion caused by uncontrolled runoff",
      "Downspout discharge that damages landscaping or seeps into basements",
      "Improper grading that sends water toward, not away from, the home",
    ],
    approachLabel: "Expert Drainage, Personalized Approach",
    approachTitle: "Why Choose Franklin Excavation?",
    approach: [
      { title: "Custom Drainage Plans", desc: "Customized solutions tailored to your property's specific needs." },
      { title: "Experienced Team", desc: "We understand the local land, soil, and water flow patterns." },
      { title: "Clear Communication", desc: "No guesswork, no jargon — just smart solutions explained clearly." },
    ],
    image: "/images/drainage.jpg",
    ctaTitle: "Get the Water Under Control",
    ctaBody:
      "Don't wait until your yard floods or your foundation cracks. Let our team diagnose the issue and install a long-term solution that protects your home and property.",
  },
  {
    slug: "driveways",
    name: "Driveways",
    shortDescription:
      "Expert gravel driveway installation and repair for homes, rural properties, and new builds.",
    metaTitle: "Gravel Driveways in Franklin, TN | Installation & Repair",
    metaDescription:
      "Gravel driveway installation, regrading, and repair in Franklin, TN. Built to last through every season of Middle Tennessee weather.",
    heroKicker: "Driveway Services in Franklin, TN",
    heroTitle: "Gravel Driveways Built to Last",
    intro: [
      "A properly built gravel driveway does more than provide access to your home or property — it improves curb appeal, ensures safe vehicle access, and manages drainage the right way. At Franklin Excavation, we specialize in grading and installing gravel driveways that hold up through every season of Middle Tennessee weather.",
      "Whether you need a brand new drive, a complete restoration, or routine maintenance, we bring the right equipment, the right material, and the know-how to get it done right.",
    ],
    offerLabel: "Our Driveway Services",
    offerings: [
      { title: "New Driveway Installation", desc: "A well-graded, properly compacted gravel driveway that lasts." },
      { title: "Driveway Regrading", desc: "Fix low spots, reshape for better drainage, and restore a smooth surface." },
      { title: "Driveway Repair & Maintenance", desc: "Address erosion, potholes, and worn-out areas with fresh gravel and grading." },
      { title: "Access Roads & Private Drives", desc: "Durable access for farms, large lots, and rural properties." },
    ],
    whyLabel: "The Excavation Partner You Can Count On",
    whyTitle: "Why Homeowners Choose Us",
    whyItems: [
      "Proper slope and compaction prevent future washouts",
      "We don't just dump gravel — we select the best type and apply it the right way",
      "You'll know what to expect, when to expect it, and what it will cost",
      "Reliable work across rural properties, new builds, and restorations",
    ],
    approachLabel: "Built the Right Way",
    approachTitle: "What Sets Our Work Apart",
    approach: [
      { title: "We Grade It Right, Every Time", desc: "Proper slope and compaction prevent future washouts." },
      { title: "We Use the Right Material", desc: "We select the best type of gravel and apply it correctly." },
      { title: "We Communicate Clearly", desc: "You'll know what to expect, when to expect it, and what it will cost." },
    ],
    image: "/images/hero-home.jpg",
    ctaTitle: "Don't Settle for a Driveway That Fails Every Time It Rains",
    ctaBody:
      "Our team will make sure your new or restored driveway is built for performance and longevity — not just appearance. Get in touch today for a free quote based on your layout, slope, and use needs.",
  },
  {
    slug: "retaining-walls",
    name: "Retaining Walls",
    shortDescription:
      "Protect your property from erosion and enhance your outdoor space with durable block or boulder walls.",
    metaTitle: "Retaining Wall Contractor in Franklin, TN | Block & Boulder Walls",
    metaDescription:
      "Block and boulder retaining walls in Franklin, TN, built with proper drainage and footings for erosion control and lasting structure.",
    heroKicker: "Retaining Wall Services in Franklin, TN",
    heroTitle: "Functional. Durable. Professionally Built.",
    intro: [
      "Retaining walls aren't just about looks — they play a critical role in controlling erosion, managing water runoff, and supporting the structure of your landscape. At Franklin Excavation, we build retaining walls that do all of that and more, combining strength, proper drainage, and a clean, finished appearance.",
      "Whether you're dealing with a sloped yard, erosion issues, or you need to protect the foundation of a new structure, our team will design and build a solution that fits your property and your goals.",
    ],
    offerLabel: "Our Retaining Wall Services",
    offerings: [
      { title: "Block Retaining Walls", desc: "A modern, clean look with strong structural integrity and long-term durability." },
      { title: "Boulder Walls", desc: "Natural, rustic appearance with heavy-duty erosion control performance." },
      { title: "Erosion Control Walls", desc: "Strategic placement to stabilize slopes and prevent soil movement." },
      { title: "Drainage Integration", desc: "Every wall we build includes proper drainage to protect your property and the wall itself." },
    ],
    whyLabel: "Why You Might Need One",
    whyTitle: "Why You Might Need a Retaining Wall",
    whyItems: [
      "Sloping yards that are hard to use or mow",
      "Soil erosion near structures, patios, or driveways",
      "Drainage problems caused by uneven terrain",
      "Outdoor areas that need elevation support for hardscaping",
    ],
    approachLabel: "Retaining Walls That Last",
    approachTitle: "What Makes Our Work Different",
    approach: [
      { title: "Site-Specific Planning", desc: "Every wall is designed for your terrain, water flow, and soil type." },
      { title: "Proper Footings & Backfill", desc: "We don't cut corners with compaction or drainage." },
      { title: "Reliable Equipment and Crew", desc: "Built by professionals who take pride in doing it right." },
    ],
    image: "/images/retaining-wall-materials.jpg",
    ctaTitle: "Get a Wall That Works as Good as It Looks",
    ctaBody:
      "If you're ready to stabilize your land, control runoff, and add structure to your landscape, we're ready to build it. Contact Franklin Excavation today for a quote.",
  },
  {
    slug: "land-clearing",
    name: "Land Clearing",
    shortDescription:
      "Fast and efficient removal of brush, trees, stumps, and debris to prep your site for development.",
    metaTitle: "Land Clearing in Franklin, TN | Brush, Trees & Lot Prep",
    metaDescription:
      "Land clearing services in Franklin, TN — tree and brush removal, stump removal, and debris haul-off for residential lots and development sites.",
    heroKicker: "Land Clearing Services in Franklin, TN",
    heroTitle: "Start Fresh With Professional Land Clearing",
    intro: [
      "Before any construction, landscaping, or development can begin, the land needs to be cleared safely and properly. At Franklin Excavation, we provide efficient and affordable land clearing services for homeowners, builders, and developers throughout Middle Tennessee.",
      "Whether it's a small residential lot or several wooded acres, our team removes trees, brush, stumps, and debris with precision and care — setting the stage for a successful project.",
    ],
    offerLabel: "Land Clearing Services We Offer",
    offerings: [
      { title: "Tree & Brush Removal", desc: "Clear overgrown vegetation, small trees, and underbrush quickly and safely." },
      { title: "Stump Removal", desc: "Extract stumps and root systems to prepare for grading or future construction." },
      { title: "Debris Haul-Off", desc: "We don't just clear it — we clean it up and haul it away." },
      { title: "Lot Clearing for New Construction", desc: "Prepare your home site or development project with a clean, level start." },
    ],
    whyLabel: "Protecting Your Timeline",
    whyTitle: "Why It Matters",
    whyItems: [
      "Improper land clearing can delay your project",
      "It can damage surrounding trees or soil",
      "It can lead to unexpected costs later in construction",
      "We take the time to do it right — protecting your investment and your timeline",
    ],
    approachLabel: "Quality Work From Start to Finish",
    approachTitle: "What to Expect With Franklin Excavation",
    approach: [
      { title: "Fast Turnaround", desc: "We keep your project on schedule with prompt service and coordination." },
      { title: "Full Clean-Up", desc: "No leftover debris or brush piles — just a clean site." },
      { title: "Experienced Operators", desc: "Skilled crews and well-maintained equipment." },
    ],
    image: "/images/land-clearing.jpg",
    ctaTitle: "Let's Clear the Way for Your Next Project",
    ctaBody:
      "Franklin Excavation has the experience and equipment to clear your land the right way — quickly, cleanly, and with care.",
  },
  {
    slug: "demolition",
    name: "Demolition & Haul-Off",
    shortDescription:
      "Safe removal of small structures like sheds, barns, or garages — with full debris cleanup included.",
    metaTitle: "Demolition & Haul-Off in Franklin, TN | Small Structure Removal",
    metaDescription:
      "Demolition and haul-off services in Franklin, TN for sheds, garages, barns, and mobile homes, with complete debris cleanup and site prep.",
    heroKicker: "Demolition & Haul-Off Services in Franklin, TN",
    heroTitle: "Safe, Efficient Structure Removal With No Mess Left Behind",
    intro: [
      "When it's time to tear something down, you need a crew that takes safety seriously and leaves the job site clean and ready for what's next. Franklin Excavation offers professional demolition and haul-off services for small structures across Middle Tennessee.",
      "From old sheds and barns to garages and home additions, we remove unwanted buildings with care, haul away the debris, and prep the land for your next step.",
    ],
    offerLabel: "Our Demolition Services Include",
    offerings: [
      { title: "Small Structure Demolition", desc: "Safe removal of sheds, detached garages, barns, and mobile homes." },
      { title: "Debris Removal & Haul-Off", desc: "We load it, haul it, and dispose of it — no dumpsters left sitting in your yard." },
      { title: "Site Prep After Demolition", desc: "We leave the area clean, graded, and ready for future use." },
      { title: "Fast Scheduling", desc: "We keep your project moving without unnecessary delays." },
    ],
    whyLabel: "Why Demolition Might Be the Right Choice",
    whyTitle: "Common Reasons for Demolition",
    whyItems: [
      "Replacing an old or unsafe structure",
      "Making room for a new garage, patio, or addition",
      "Removing eyesores to improve property value",
      "Clearing a lot for new construction",
    ],
    approachLabel: "Start Fresh, Build Better",
    approachTitle: "Why Choose Franklin Excavation?",
    approach: [
      { title: "Licensed & Insured", desc: "Safety comes first for you, your property, and our team." },
      { title: "Complete Clean-Up", desc: "We don't just knock it down — we make it disappear." },
      { title: "Reliable Equipment", desc: "Compact machines that fit tight spaces and minimize disruption." },
    ],
    image: "/images/crew-jobsite.jpg",
    ctaTitle: "Need Something Gone? Let's Handle It.",
    ctaBody:
      "Whether it's a one-car garage or an old outbuilding in the way, Franklin Excavation removes it safely, efficiently, and without a mess.",
  },
  {
    slug: "utility-trenching",
    name: "Utility Trenching",
    shortDescription:
      "Precise trenching for water lines, electrical conduit, and downspouts for homeowners and contractors.",
    metaTitle: "Utility Trenching in Franklin, TN | Water, Electric & Drain Lines",
    metaDescription:
      "Utility trenching in Franklin, TN for water lines, electrical conduit, irrigation, and downspout drain lines — accurate depth and clean work.",
    heroKicker: "Utility Trenching in Franklin, TN",
    heroTitle: "Precision Trenches for Water, Power, and More",
    intro: [
      "When you need to run underground utilities, accuracy and care are non-negotiable. At Franklin Excavation, we provide professional utility trenching services for residential and light commercial needs. Whether you're installing a water line, electrical conduit, or downspout extension, we dig with precision and safety in mind.",
      "Our team works closely with homeowners, contractors, and developers to ensure trenching is completed to spec, on schedule, and without complications.",
    ],
    offerLabel: "Trenching Services We Offer",
    offerings: [
      { title: "Water Line Trenching", desc: "Install or replace main and private water lines with clean, accurate trenching." },
      { title: "Electrical & Conduit Trenches", desc: "Trenching for low-voltage and primary power lines, including conduit systems." },
      { title: "Downspout & Drain Line Extensions", desc: "Protect foundations by directing roof runoff away from structures." },
      { title: "Irrigation System Trenches", desc: "Dig safe, consistent lines for sprinkler and irrigation installation." },
    ],
    whyLabel: "Avoid Costly Mistakes",
    whyTitle: "Why Choose a Pro for Trenching?",
    whyItems: [
      "Incorrect trench depth or poor backfill can cause water leaks or pressure loss",
      "Improper trenching can cause electrical shorts or code violations",
      "Crossing existing utility lines can cause serious damage",
      "Mistakes here mean failed inspections or costly delays",
    ],
    approachLabel: "Precision, Cleanliness & Teamwork",
    approachTitle: "Why Work With Franklin Excavation?",
    approach: [
      { title: "Accurate Depth & Slope", desc: "Each trench is cut to spec for reliable, lasting performance." },
      { title: "Clean Work", desc: "We leave the site tidy, safe, and ready for the next phase." },
      { title: "Coordination With Other Trades", desc: "We work alongside your plumber, electrician, or builder to keep the job moving." },
    ],
    image: "/images/crane-commercial.jpg",
    ctaTitle: "Let's Get It in the Ground the Right Way",
    ctaBody:
      "Trust Franklin Excavation to handle your trenching needs with accuracy, professionalism, and respect for your property.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAdjacentServices(slug: string): { prev: Service; next: Service } {
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];
  return { prev, next };
}

export const SERVICE_AREA = [
  "Franklin",
  "Spring Hill",
  "Columbia",
  "Brentwood",
  "College Grove",
  "Leiper's Fork",
  "Santa Fe",
  "South Nashville",
];

export const BUSINESS = {
  name: "Franklin Excavation",
  phone: "615-282-5355",
  phoneHref: "tel:+16152825355",
  email: "team@excavatefranklin.com",
  address: "1441 New Hwy 96 W Ste 2 #418, Franklin, TN 37064",
  hours: "Mon–Fri: 7am – 5pm",
};

export const TESTIMONIALS = [
  {
    quote:
      "Franklin Excavation went above and beyond for our land grading project. The crew was on time, professional, and kept us informed every step of the way. They made the process stress-free and delivered top-notch results. It is rare to find a team this reliable. Highly recommended!",
    name: "Amy R.",
    location: "Spring Hill, TN",
  },
  {
    quote:
      "We hired Franklin Excavation for a driveway installation and couldn't be happier. They showed up when they said they would, explained everything clearly, and completed the work exactly as promised. The finished result was clean, level, and durable. We will definitely use them again!",
    name: "James L.",
    location: "Franklin, TN",
  },
];
