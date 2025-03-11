import i18next from 'i18next';

// Funkcja do pobierania przetłumaczonych okresów czasowych
const getLocalizedDates = () => {
  const lang = i18next.language;

  const translations = {
    pl: {
      currentPeriod: "obecnie",
      months: {
        "01": "Sty", "02": "Lut", "03": "Mar", "04": "Kwi",
        "05": "Maj", "06": "Cze", "07": "Lip", "08": "Sie",
        "09": "Wrz", "10": "Paź", "11": "Lis", "12": "Gru"
      }
    },
    en: {
      currentPeriod: "present",
      months: {
        "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
        "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
        "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
      }
    }
  };

  return translations[lang] || translations.pl;
};

// Funkcja formatująca daty
const formatPeriod = (startDate, endDate) => {
  const lang = i18next.language;
  const { currentPeriod, months } = getLocalizedDates();

  // Przykład formatu: 01.2024, 07.2024
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [month, year] = dateStr.split('.');

    if (lang === 'pl') {
      return `${months[month]}.${year}`;
    } else {
      return `${months[month]} ${year}`;
    }
  };

  const start = formatDate(startDate);
  const end = endDate === "obecnie" ? currentPeriod : formatDate(endDate);

  if (lang === 'pl') {
    return `${start} — ${end}`;
  } else {
    return `${start} — ${end}`;
  }
};

const developerData = {
  name: "Sebastian Strzałkowski",
  firstName: "Sebastian",
  title: "Software Developer",
  skills: [
    { name: "Java (8, 11, 17, 21)" },
    { name: "Spring Boot 2, 3" },
    { name: "PostgreSQL" },
    { name: "Project Reactor" },
    { name: "AWS" },
    { name: "Terraform" },
    { name: "Solidity" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Redis" },
    { name: "GitHub Actions" }
  ],
  projects: [
    {
      title: "Liqfinity",
      get period() {
        return formatPeriod("06.2024", "obecnie");
      }
    },
    {
      title: "Bored Founders Club",
      role: "Blockchain Mentor",
      get period() {
        return formatPeriod("01.2023", "09.2023");
      }
    },
    {
      title: "MetaDriverseClub",
      get period() {
        return formatPeriod("06.2022", "08.2023");
      }
    },
    {
      title: "Wennect",
      get period() {
        return formatPeriod("12.2022", "09.2023");
      }
    },
    {
      title: "Mystra",
      get period() {
        return formatPeriod("02.2022", "07.2022");
      }
    },
    {
      title: "Adchitects",
      get period() {
        return formatPeriod("05.2021", "02.2022");
      }
    }
  ],
  experience: [
    {
      position: "Software Developer",
      company: "Inetum — Telco",
      get period() {
        return formatPeriod("09.2024", "obecnie");
      }
    },
    {
      position: "Software Developer",
      company: "Inetum - IoT",
      get period() {
        return formatPeriod("01.2024", "07.2024");
      }
    },
    {
      position: "Software Developer",
      company: "Inetum - Cloud",
      get period() {
        return formatPeriod("07.2022", "01.2024");
      }
    },
    {
      position: "Software Developer",
      company: "Inetum — Telco CRM",
      get period() {
        return formatPeriod("07.2018", "07.2022");
      }
    }
  ],
  education: [
    {
      get degree() {
        return i18next.language === 'pl'
            ? "Inżynier elektroniki i telekomunikacji"
            : "Electronics and Telecommunications Engineer";
      },
      get school() {
        return i18next.language === 'pl'
            ? "Wojskowa Akademia Techniczna w Warszawie"
            : "Military University of Technology in Warsaw";
      },
      period: ""
    }
  ],
  contact: {
    email: "kontakt@i-can-do.it",
    phone: "+48 661 312 648",
    linkedin: "linkedin.com/in/sebastianstrzalkowski",
    github: "github.com/sebastianstrzalkowski",
    telegram: "@strz4la",
    discord: "strz4la"
  },
  additionalTech: [
    "Claude Sonnet",
    "Copilot",
    "Tatum",
    "Fireblocks",
    "IntelliJ"
  ],
  getExperienceDescription(company) {
    const lang = i18next.language;
    const translations = {
      pl: {
        "Inetum — Telco": "Praca z PostgreSQL/PostGIS oraz projekt migracji bazy danych z Sybase do PostgreSQL. Odpowiedzialność za utrzymanie i nowe funkcjonalności.",
        "Inetum - IoT": "Praca przy aplikacji IoT do monitorowania pojazdów. Odpowiedzialność za utrzymanie i nowe funkcjonalności w mikroserwisie udostępniającym API.",
        "Inetum - Cloud": "Praca nad aplikacją do przetwarzania danych w chmurze, zbudowaną z wykorzystaniem Flink i AWS z użyciem Project Reactor. Odpowiedzialność za infrastrukturę w początkowej fazie projektu oraz nowe funkcjonalności.",
        "Inetum — Telco CRM": "Projekt IoT i telekomunikacyjny. Odpowiedzialność za komunikację z klientem, utrzymanie aplikacji i rozwój nowych funkcjonalności.",
        "Bored Founders Club": "Mentor blockchain w grupie deweloperów. Prowadzenie regularnych warsztatów technicznych z zakresu Solidity, Web3 i integracji z łańcuchami bloków. Wsparcie w rozwoju projektów blockchain i smart kontraktów dla członków klubu."
      },
      en: {
        "Inetum — Telco": "Working with PostgreSQL/PostGIS and Sybase to PostgreSQL database migration project. Responsible for maintenance and new functionalities.",
        "Inetum - IoT": "Working on an IoT application for vehicle monitoring. Responsible for maintenance and new functionalities in a microservice providing API.",
        "Inetum - Cloud": "Working on a cloud-based data processing application built with Flink and AWS using Project Reactor. Responsible for infrastructure in the initial phase of the project and new functionalities.",
        "Inetum — Telco CRM": "IoT and telecommunications project. Responsible for client communication, application maintenance, and development of new functionalities.",
        "Bored Founders Club": "Blockchain mentor in developers group. Conducted regular technical workshops on Solidity, Web3, and blockchain integration. Provided support in developing blockchain projects and smart contracts for club members."
      }
    };

    return translations[lang]?.[company] || translations.pl[company] || "";
  },
  getProjectDescription(title) {
    const lang = i18next.language;
    const translations = {
      pl: {
        "Liqfinity": "Projekt w obszarze zdecentralizowanych finansów (DeFi). Odpowiedzialność za infrastrukturę chmurową i przywództwo zespołu.",
        "Bored Founders Club": "Mentor blockchain w grupie deweloperów. Prowadzenie regularnych warsztatów technicznych z zakresu Solidity, Web3 i integracji z łańcuchami bloków. Wsparcie w rozwoju projektów blockchain i smart kontraktów dla członków klubu.",
        "Wennect": "Projekt rekrutacyjny oparty na technologii Blockchain. Wykorzystuje Solidity i maszynę EVM. Odpowiedzialność za smart kontrakty.",
        "Mystra": "Projekt NFT na sieci Casper Network wraz z botami na Telegram i Discord. Projekt oparty na smart kontraktach napisanych w Rust, boty stworzone przy użyciu Java 11. W projekcie również kierowanie zespołem 2 deweloperów.",
        "MetaDriverseClub": "Aplikacja wykorzystująca blockchain Ethereum dla ekskluzywnego klubu samochodowego. Tokenizacja członkostwa i aktywów klubu w formie NFT. Odpowiedzialność za smart kontrakty i mechanizmy tokenu członkowskiego.",
        "Adchitects": "Projekt marketplace NFT na sieci Ethereum. Projekt oparty na smart kontraktach Solidity."
      },
      en: {
        "Liqfinity": "Project in the area of decentralized finance (DeFi). Responsibility for cloud infrastructure and team leadership.",
        "Bored Founders Club": "Blockchain mentor in developers group. Conducted regular technical workshops on Solidity, Web3, and blockchain integration. Provided support in developing blockchain projects and smart contracts for club members.",
        "Wennect": "Recruiting project based on Blockchain technology. Uses Solidity and EVM machine. Responsibility for smart contracts.",
        "Mystra": "NFT project on Casper Network with Telegram and Discord bots. Project based on Rust smart contracts, bots created with Java 11. In the project also led a team of 2 developers.",
        "MetaDriverseClub": "Application using Ethereum blockchain for an exclusive car club. Tokenization of club membership and assets as NFTs. Responsibility for smart contracts and membership token mechanisms.",
        "Adchitects": "NFT marketplace project on Ethereum network. Project based on Solidity smart contracts."
      }
    };
    return translations[lang]?.[title] || translations.pl[title] || "";
  },
  getProjectTechnologies(title) {
    const technologies = {
      "Liqfinity": ["Blockchain", "AWS", "Terraform", "Solidity", "Cloud Infrastructure"],
      "Bored Founders Club": ["Blockchain", "Solidity", "Smart Contracts", "Web3", "Mentoring", "Workshops"],
      "Wennect": ["Solidity", "EVM", "Blockchain"],
      "Mystra": ["Casper Network", "Rust", "Java 11", "NFT", "Telegram Bot", "Discord Bot", "Team Leadership"],
      "MetaDriverseClub": ["Ethereum", "NFT", "Solidity", "Smart Contracts", "Web3"],
      "Adchitects": ["Solidity", "Ethereum", "NFT", "Smart Contracts"]
    };
    return technologies[title] || [];
  }
};

export default developerData;