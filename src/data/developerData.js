import i18next from 'i18next';

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

const formatPeriod = (startDate, endDate) => {
  const lang = i18next.language;
  const { currentPeriod, months } = getLocalizedDates();

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
    { name: "Ethereum" },
    { name: "Base" },
    { name: "Polygon" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Redis" },
    { name: "GitHub Actions" },
    { name: "Node.js" },
    { name: "Express.js" },
    { name: "Nest.js" }
  ],
  projects: [
    {
      title: "Liqfinity",
      url: "https://app.testnet.liqfinity.com",
      get period() {
        return formatPeriod("06.2024", "obecnie");
      }
    },
    {
      title: "Bored Founders Club",
      url: "https://boredfoundersclub.pl/",
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
      url: "https://www.wennect.com/",
      role: "Blockchain Advisor",
      get period() {
        return formatPeriod("12.2022", "09.2023");
      }
    },
    {
      title: "Mystra",
      url: "https://mystra.io/",
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
    email: "sebastian.strzalkowski@i-can-do.it",
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
  // Sekcja z mediami
  getMediaData() {
    const lang = i18next.language;
    
    if (lang === 'pl') {
      return [
        {
          title: "Od Web2 do Web3 - Ewolucja technologii blockchain",
          description: "Sebastian Strzałkowski omawia przejście od Web2 do Web3, ewolucję blockchainu, mechanizmy konsensusu Ethereum oraz wyzwania takie jak skalowalność, przedstawiając przykłady zastosowań w NFT, grach i zdecentralizowanych finansach. ✨ Najważniejsze punkty 📊 Transkrypcja",
          url: "https://www.youtube.com/watch?v=zAD4uWvU9J4",
          thumbnail: "https://img.youtube.com/vi/zAD4uWvU9J4/maxresdefault.jpg",
          date: "2023-11-20"
        },
        {
          title: "Web2 vs Web3",
          description: "Film omawia ewolucję od Web2 do Web3, podkreślając różnice w technologii, interakcji użytkownika i decentralizacji, jednocześnie analizując zastosowania blockchain, wyzwania i możliwości na przyszłość.",
          url: "https://www.youtube.com/watch?v=I2Kn-YYqU9c",
          thumbnail: "https://img.youtube.com/vi/I2Kn-YYqU9c/maxresdefault.jpg",
          date: "2023-09-15"
        },
        {
          title: "Architektura aplikacji WEB3",
          description: "W tym materiale analizuję architekturę aplikacji web3 w oparciu o protokół opensea.io. Omawiam kluczowe komponenty, przepływy danych i interakcje pomiędzy smart kontraktami a warstwą frontend.",
          url: "https://www.youtube.com/watch?v=fJaq7KupCUU",
          thumbnail: "/images/media/web3-architecture.png",
          date: "2023-06-05"
        }
      ];
    } else {
      return [
        {
          title: "Web2 to Web3 Development - Blockchain Technology Evolution",
          description: "Sebastian Strzałkowski discusses transitioning from Web2 to Web3 development, blockchain's evolution, Ethereum's consensus mechanisms, and challenges like scalability, while highlighting use cases in NFTs, gaming, and decentralized finance. ✨ Highlights 📊 Transcript",
          url: "https://www.youtube.com/watch?v=zAD4uWvU9J4",
          thumbnail: "https://img.youtube.com/vi/zAD4uWvU9J4/maxresdefault.jpg",
          date: "2023-11-20"
        },
        {
          title: "Web2 vs Web3",
          description: "The video discusses the evolution from Web2 to Web3, highlighting differences in technology, user interaction, and decentralization, while addressing blockchain applications, challenges, and future possibilities.",
          url: "https://www.youtube.com/watch?v=I2Kn-YYqU9c",
          thumbnail: "https://img.youtube.com/vi/I2Kn-YYqU9c/maxresdefault.jpg",
          date: "2023-09-15"
        },
        {
          title: "WEB3 Application Architecture",
          description: "In this video, I analyze the architecture of web3 applications based on the opensea.io protocol. I discuss key components, data flows, and interactions between smart contracts and the frontend layer.",
          url: "https://www.youtube.com/watch?v=fJaq7KupCUU",
          thumbnail: "/images/media/web3-architecture.png",
          date: "2023-06-05"
        }
      ];
    }
  },
  
  get media() {
    return this.getMediaData();
  },
  
  mediaChannel: "https://www.youtube.com/@strz4la",
  
  // Sekcja z konferencjami
  getConferencesData() {
    const lang = i18next.language;
    
    if (lang === 'pl') {
      return [
        {
          name: "JVMDays Poznań 2025",
          description: "Warsztat \"Smart kontrakty Ethereum\" na wewnętrznej konferencji firmy - Technologia blockchain i Ethereum, podstawy języka Solidity, interakcja Java-Ethereum przez Web3j, standardy tokenów Ethereum oraz wdrażanie kontraktów na testnet.",
          date: "26.03.2025",
          location: "Poznań, Polska",
          image: "/images/conferences/jvmdays-poznan.png",
          tags: ["Java", "Ethereum", "Solidity", "Web3j", "Smart Contracts"]
        },
        {
          name: "Fiesta BFC 2023",
          description: "Prezentacja 'Who will dethronize Ethereum?', w której analizowałem blockchainy, które mogą przejąć część użytkowników i zastosowań od sieci Ethereum, wraz z porównaniem ich zalet i wad.",
          date: "02.06.2023",
          location: "Warszawa, Polska",
          image: "/images/conferences/fiesta-bfc.png",
          tags: ["Blockchain", "Ethereum", "Solana", "Porównanie Technologii"]
        },
        {
          name: "Blockchain Alliance Opener 2022",
          description: "Prezentacja na temat 'Web2, Web3 aspekty technologiczno biznesowe'. Porównanie tradycyjnych technologii webowych z nowymi rozwiązaniami bazującymi na blockchain, ze szczególnym uwzględnieniem aspektów biznesowych.",
          date: "03.09.2022",
          location: "Warszawa, Polska",
          image: "/images/conferences/blockchain-alliance-opener.jpg",
          tags: ["Web3", "Blockchain", "Strategia Biznesowa", "Trendy Technologiczne"]
        },
        {
          name: "Web3 Devs Poland meetup Kraków",
          description: "Prezentacja analizująca architekturę aplikacji web3 w oparciu o protokół opensea.io. Omówienie kluczowych komponentów, przepływów danych i interakcji pomiędzy smart kontraktami a warstwą frontend.",
          date: "23.07.2022",
          location: "Kraków, Polska",
          image: "/images/conferences/web3-devs-poland.png",
          tags: ["Web3", "OpenSea", "Architektura aplikacji", "Smart Contracts"]
        }
      ];
    } else {
      return [
        {
          name: "JVMDays Poznań 2025",
          description: "Workshop \"Ethereum Smart Contracts\" at the internal company conference - Blockchain and Ethereum technology, Solidity language basics, Java-Ethereum interaction through Web3j, Ethereum token standards, and deploying contracts to testnet.",
          date: "26.03.2025",
          location: "Poznań, Poland",
          image: "/images/conferences/jvmdays-poznan.png",
          tags: ["Java", "Ethereum", "Solidity", "Web3j", "Smart Contracts"]
        },
        {
          name: "Fiesta BFC 2023",
          description: "Presentation titled 'Who will dethronize Ethereum?' analyzing blockchains that could take users and use cases away from the Ethereum network, with a comparison of their advantages and disadvantages.",
          date: "02.06.2023",
          location: "Warsaw, Poland",
          image: "/images/conferences/fiesta-bfc.png",
          tags: ["Blockchain", "Ethereum", "Solana", "Technology Comparison"]
        },
        {
          name: "Blockchain Alliance Opener 2022",
          description: "Presentation on 'Web2, Web3 technological and business aspects'. Comparison of traditional web technologies with new blockchain-based solutions, with a particular focus on business aspects.",
          date: "03.09.2022",
          location: "Warsaw, Poland",
          image: "/images/conferences/blockchain-alliance-opener.png",
          tags: ["Web3", "Blockchain", "Business Strategy", "Technology Trends"]
        },
        {
          name: "Web3 Devs Poland meetup Kraków",
          description: "Presentation analyzing the architecture of web3 applications based on the opensea.io protocol. Discussion of key components, data flows, and interactions between smart contracts and the frontend layer.",
          date: "23.07.2022",
          location: "Kraków, Poland",
          image: "/images/conferences/web3-devs-poland.png",
          tags: ["Web3", "OpenSea", "Application Architecture", "Smart Contracts"]
        }
      ];
    }
  },
  
  get conferences() {
    return this.getConferencesData();
  },
  
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
        "Wennect": "Projekt rekrutacyjny oparty na technologii Blockchain. Wykorzystuje Solidity i maszynę EVM. Odpowiedzialność za smart kontrakty oraz doradztwo w zakresie rozwoju rozwiązań blockchain.",
        "Mystra": "Projekt NFT na sieci Casper Network wraz z botami na Telegram i Discord. Projekt oparty na smart kontraktach napisanych w Rust, boty stworzone przy użyciu Java 11. W projekcie również kierowanie zespołem 2 deweloperów.",
        "MetaDriverseClub": "Aplikacja wykorzystująca blockchain Ethereum dla ekskluzywnego klubu samochodowego. Tokenizacja członkostwa i aktywów klubu w formie NFT. Odpowiedzialność za smart kontrakty i mechanizmy tokenu członkowskiego.",
        "Adchitects": "Projekt marketplace NFT na sieci Ethereum. Projekt oparty na smart kontraktach Solidity."
      },
      en: {
        "Liqfinity": "Project in the area of decentralized finance (DeFi). Responsibility for cloud infrastructure and team leadership.",
        "Bored Founders Club": "Blockchain mentor in developers group. Conducted regular technical workshops on Solidity, Web3, and blockchain integration. Provided support in developing blockchain projects and smart contracts for club members.",
        "Wennect": "Recruiting project based on Blockchain technology. Uses Solidity and EVM machine. Responsibility for smart contracts and advisory role for blockchain solutions development.",
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
      "Wennect": ["Solidity", "EVM", "Blockchain", "Advisory"],
      "Mystra": ["Casper Network", "Rust", "Java 11", "NFT", "Telegram Bot", "Discord Bot", "Team Leadership"],
      "MetaDriverseClub": ["Ethereum", "NFT", "Solidity", "Smart Contracts", "Web3"],
      "Adchitects": ["Solidity", "Ethereum", "NFT", "Smart Contracts"]
    };
    return technologies[title] || [];
  }
};

export default developerData;