const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');
const Investor = require('./models/Investor');
const User = require('./models/User');
require('dotenv').config();

// Comprehensive Government Schemes Database
const schemes = [
  // Central Government Schemes
  {
    name: 'Startup India Seed Fund',
    desc: 'Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization',
    eligibility: 'DPIIT recognized startups incorporated as private limited company or registered partnership firm or LLP',
    link: 'https://www.startupindia.gov.in/content/sih/en/sisfs.html',
    state: 'central',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹20 Lakhs (Grant) + ₹50 Lakhs (Convertible Debenture)'
  },
  {
    name: 'BIRAC BioNEST',
    desc: 'Biotechnology incubation program supporting life sciences and biotechnology startups',
    eligibility: 'Biotech/life sciences startups, early-stage companies with innovative products',
    link: 'https://birac.nic.in/webcontent/1467_1_BioNEST.aspx',
    state: 'central',
    stage: 'early',
    sector: 'health',
    fundingAmount: 'Up to ₹50 Lakhs'
  },
  {
    name: 'NIDHI PRAYAS',
    desc: 'Pre-incubation support for translating innovative ideas into prototypes',
    eligibility: 'Students, faculty, researchers with technology-based innovative ideas',
    link: 'https://www.nstedb.com/institutional/prayas.htm',
    state: 'central',
    stage: 'idea',
    sector: 'tech',
    fundingAmount: 'Up to ₹10 Lakhs'
  },
  {
    name: 'Atal Innovation Mission',
    desc: 'Flagship initiative to promote innovation and entrepreneurship across India',
    eligibility: 'Innovative startups with scalable business models and social impact',
    link: 'https://aim.gov.in/',
    state: 'central',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Varies by program'
  },
  {
    name: 'MUDRA Yojana',
    desc: 'Micro-finance scheme for small businesses and startups',
    eligibility: 'Non-corporate, non-farm small/micro enterprises',
    link: 'https://www.mudra.org.in/',
    state: 'central',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹10 Lakhs'
  },
  {
    name: 'Stand Up India',
    desc: 'Facilitates bank loans for SC/ST and women entrepreneurs',
    eligibility: 'SC/ST and women entrepreneurs aged 18+ with new greenfield enterprise',
    link: 'https://www.standupmitra.in/',
    state: 'central',
    stage: 'early',
    sector: 'all',
    fundingAmount: '₹10 Lakhs to ₹1 Crore'
  },
  {
    name: 'ASPIRE Scheme',
    desc: 'Promotion of rural entrepreneurship through agro-rural industry clusters',
    eligibility: 'Rural entrepreneurs, agri-business startups',
    link: 'https://msme.gov.in/schemes-initiatives/schemes/aspire',
    state: 'central',
    stage: 'early',
    sector: 'agri',
    fundingAmount: 'Up to ₅25 Lakhs'
  },
  {
    name: 'Technology Development Fund',
    desc: 'Support for technology development and commercialization',
    eligibility: 'Technology-based startups with innovative solutions',
    link: 'https://www.nstedb.com/institutional/tdf.htm',
    state: 'central',
    stage: 'early',
    sector: 'tech',
    fundingAmount: 'Up to ₹50 Lakhs'
  },

  // Maharashtra State Schemes
  {
    name: 'Maharashtra State Innovation Society',
    desc: 'Comprehensive startup ecosystem support including funding, mentorship and infrastructure',
    eligibility: 'Startups registered in Maharashtra with innovative technology solutions',
    link: 'https://msinnovation.maharashtra.gov.in/',
    state: 'maharashtra',
    stage: 'early',
    sector: 'tech',
    fundingAmount: 'Up to ₹25 Lakhs'
  },
  {
    name: 'Agri Business Incubation Program',
    desc: 'Supporting agri-tech startups in Maharashtra',
    eligibility: 'Agriculture technology startups, food processing ventures',
    link: 'https://krishi.maharashtra.gov.in/',
    state: 'maharashtra',
    stage: 'early',
    sector: 'agri',
    fundingAmount: 'Up to ₹15 Lakhs'
  },

  // Karnataka State Schemes
  {
    name: 'Karnataka Startup Cell',
    desc: 'Single-window startup support with funding, policy advocacy and ecosystem building',
    eligibility: 'Karnataka-based startups with scalable business models',
    link: 'https://ksteps.in/',
    state: 'karnataka',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹1 Crore'
  },
  {
    name: 'Elevate Program',
    desc: 'Supporting deep-tech startups in emerging technologies',
    eligibility: 'Deep-tech startups in AI, IoT, blockchain, biotech',
    link: 'https://www.elevate.karnataka.gov.in/',
    state: 'karnataka',
    stage: 'early',
    sector: 'tech',
    fundingAmount: 'Up to ₹50 Lakhs'
  },

  // Tamil Nadu State Schemes
  {
    name: 'Tamil Nadu Startup and Innovation Policy',
    desc: 'Comprehensive startup support including incubation and funding',
    eligibility: 'Startups registered in Tamil Nadu with innovative solutions',
    link: 'https://www.startuptn.in/',
    state: 'tamilnadu',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹35 Lakhs'
  },
  {
    name: 'TIDCO Startup Fund',
    desc: 'State government fund for promising startups',
    eligibility: 'Tamil Nadu based startups with proven business model',
    link: 'https://www.tidco.com/',
    state: 'tamilnadu',
    stage: 'growth',
    sector: 'all',
    fundingAmount: 'Up to ₹2 Crores'
  },

  // Uttar Pradesh State Schemes
  {
    name: 'UP Startup Policy',
    desc: 'State startup policy with funding and infrastructure support',
    eligibility: 'Startups registered in Uttar Pradesh',
    link: 'https://invest.up.gov.in/',
    state: 'up',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹25 Lakhs'
  },
  {
    name: 'Agri-Business Promotion Policy',
    desc: 'Supporting agriculture and food processing startups',
    eligibility: 'Agri-tech and food processing startups in UP',
    link: 'https://upagripardarshi.gov.in/',
    state: 'up',
    stage: 'early',
    sector: 'agri',
    fundingAmount: 'Up to ₹20 Lakhs'
  }
];

// Comprehensive Private Investors Database
const investors = [
  // Angel Networks
  {
    name: 'Indian Angel Network',
    desc: 'India\'s largest angel investor network with 450+ investors across sectors',
    type: 'angel',
    stage: ['early', 'growth'],
    sectors: ['tech', 'health', 'fintech', 'agri'],
    location: 'Pan India',
    website: 'https://www.indianangelnetwork.com',
    email: 'contact@indianangelnetwork.com',
    ticketSize: '₹25L - ₹2Cr'
  },
  {
    name: 'Mumbai Angels Network',
    desc: 'Premier angel investment platform connecting startups with seasoned investors',
    type: 'angel',
    stage: ['early'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Mumbai',
    website: 'https://www.mumbaiangels.com',
    ticketSize: '₹50L - ₹3Cr'
  },
  {
    name: 'Chennai Angels',
    desc: 'South India focused angel network supporting early-stage startups',
    type: 'angel',
    stage: ['early'],
    sectors: ['tech', 'health', 'agri'],
    location: 'Chennai',
    website: 'https://www.chennaiangels.in',
    ticketSize: '₹25L - ₹1.5Cr'
  },

  // Venture Capital Firms
  {
    name: 'Sequoia Capital India',
    desc: 'Leading global VC firm with strong presence in Indian startup ecosystem',
    type: 'vc',
    stage: ['early', 'growth', 'series-a', 'series-b'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Bangalore, Mumbai',
    website: 'https://www.sequoiacap.com/india',
    ticketSize: '₹5Cr - ₹100Cr'
  },
  {
    name: 'Accel Partners',
    desc: 'Global VC firm investing in exceptional founders building category-defining companies',
    type: 'vc',
    stage: ['early', 'growth', 'series-a'],
    sectors: ['tech', 'fintech'],
    location: 'Bangalore',
    website: 'https://www.accel.com',
    ticketSize: '₹2Cr - ₹50Cr'
  },
  {
    name: 'Blume Ventures',
    desc: 'Early-stage VC fund backing passionate entrepreneurs with differentiated ideas',
    type: 'vc',
    stage: ['early'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Mumbai, Bangalore',
    website: 'https://blume.vc',
    ticketSize: '₹50L - ₹10Cr'
  },
  {
    name: 'Kalaari Capital',
    desc: 'Early-stage venture capital firm partnering with entrepreneurs',
    type: 'vc',
    stage: ['early', 'growth'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Bangalore',
    website: 'https://kalaari.com',
    ticketSize: '₹1Cr - ₹25Cr'
  },
  {
    name: 'Matrix Partners India',
    desc: 'Early-stage VC firm focused on mobile-first businesses',
    type: 'vc',
    stage: ['early', 'growth'],
    sectors: ['tech', 'fintech'],
    location: 'Bangalore',
    website: 'https://www.matrixpartners.in',
    ticketSize: '₹2Cr - ₹30Cr'
  },
  {
    name: 'Nexus Venture Partners',
    desc: 'Leading VC firm investing in technology startups',
    type: 'vc',
    stage: ['early', 'growth'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Bangalore, Mumbai',
    website: 'https://www.nexusvp.com',
    ticketSize: '₹3Cr - ₹40Cr'
  },
  {
    name: 'Lightspeed Venture Partners',
    desc: 'Global VC firm backing exceptional entrepreneurs',
    type: 'vc',
    stage: ['early', 'growth', 'series-a'],
    sectors: ['tech', 'fintech'],
    location: 'Bangalore',
    website: 'https://lsvp.com',
    ticketSize: '₹5Cr - ₹75Cr'
  },
  {
    name: 'Elevation Capital',
    desc: 'Leading VC firm investing in consumer internet and enterprise software',
    type: 'vc',
    stage: ['early', 'growth'],
    sectors: ['tech', 'fintech'],
    location: 'Bangalore, Gurgaon',
    website: 'https://www.elevationcapital.com',
    ticketSize: '₹3Cr - ₹50Cr'
  },

  // Incubators & Accelerators
  {
    name: 'T-Hub',
    desc: 'India\'s largest innovation hub and ecosystem enabler',
    type: 'incubator',
    stage: ['idea', 'early'],
    sectors: ['tech', 'agri', 'health'],
    location: 'Hyderabad',
    website: 'https://t-hub.co',
    ticketSize: '₹10L - ₹1Cr'
  },
  {
    name: 'NASSCOM 10000 Startups',
    desc: 'Flagship initiative to scale up startup ecosystem in India',
    type: 'accelerator',
    stage: ['idea', 'early'],
    sectors: ['tech', 'all'],
    location: 'Pan India',
    website: 'https://10000startups.com',
    ticketSize: 'Mentorship + Network'
  },
  {
    name: 'Techstars Bangalore',
    desc: 'Global startup accelerator helping entrepreneurs succeed',
    type: 'accelerator',
    stage: ['early'],
    sectors: ['tech'],
    location: 'Bangalore',
    website: 'https://www.techstars.com/accelerators/bangalore',
    ticketSize: '$120K for 6% equity'
  },
  {
    name: 'Axilor Ventures',
    desc: 'Early-stage VC fund and startup accelerator',
    type: 'accelerator',
    stage: ['idea', 'early'],
    sectors: ['tech', 'fintech'],
    location: 'Bangalore',
    website: 'https://www.axilor.com',
    ticketSize: '₹25L - ₹2Cr'
  },
  {
    name: 'Zone Startups India',
    desc: 'Global accelerator program for early-stage startups',
    type: 'accelerator',
    stage: ['early'],
    sectors: ['tech', 'fintech'],
    location: 'Mumbai',
    website: 'https://www.zonestartups.com',
    ticketSize: '$50K - $250K'
  },
  {
    name: 'Microsoft for Startups',
    desc: 'Global program helping B2B startups scale their business',
    type: 'accelerator',
    stage: ['early', 'growth'],
    sectors: ['tech'],
    location: 'Bangalore, Hyderabad',
    website: 'https://startups.microsoft.com',
    ticketSize: 'Credits + Mentorship'
  },
  {
    name: 'Google for Startups',
    desc: 'Accelerator program for technology startups',
    type: 'accelerator',
    stage: ['early'],
    sectors: ['tech'],
    location: 'Bangalore',
    website: 'https://startup.google.com',
    ticketSize: 'Equity-free support'
  },
  {
    name: 'Startup Incubator IIT Bombay',
    desc: 'Technology business incubator fostering innovation',
    type: 'incubator',
    stage: ['idea', 'early'],
    sectors: ['tech', 'health'],
    location: 'Mumbai',
    website: 'https://www.sineiitb.org',
    ticketSize: '₹25L - ₹1Cr'
  },
  {
    name: 'IAN Fund',
    desc: 'Early-stage venture fund investing in innovative startups',
    type: 'vc',
    stage: ['early'],
    sectors: ['tech', 'health', 'fintech'],
    location: 'Gurgaon',
    website: 'https://www.ianfund.com',
    ticketSize: '₹1Cr - ₹5Cr'
  },
  {
    name: 'Venture Catalysts',
    desc: 'Integrated incubator with seed fund and accelerator programs',
    type: 'incubator',
    stage: ['idea', 'early'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Mumbai, Delhi',
    website: 'https://www.venturecatalysts.in',
    ticketSize: '₹25L - ₹3Cr'
  }
];

// Sample Users
const users = [
  {
    name: 'Admin User',
    email: 'admin@startupfunding.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Startup',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Priya Entrepreneur',
    email: 'priya@startup.com',
    password: 'password123',
    role: 'user'
  }
];

async function createCompleteDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Scheme.deleteMany({}),
      Investor.deleteMany({}),
      User.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert comprehensive data
    await Scheme.insertMany(schemes);
    console.log(`✅ Inserted ${schemes.length} government schemes`);

    await Investor.insertMany(investors);
    console.log(`✅ Inserted ${investors.length} private investors`);

    await User.insertMany(users);
    console.log(`✅ Inserted ${users.length} users`);

    console.log('\n🎉 Complete database created successfully!');
    console.log(`📊 Total Records: ${schemes.length + investors.length + users.length}`);
    console.log('🚀 Your Startup Funding Portal is ready to use!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating database:', error);
    process.exit(1);
  }
}

createCompleteDatabase();