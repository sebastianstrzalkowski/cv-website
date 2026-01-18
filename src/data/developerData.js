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
      url: "https://liqfinity.com",
      get period() {
        return formatPeriod("06.2024", "10.2025");
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
      position: "DLT Engineer",
      company: "ASTEK",
      get period() {
        return formatPeriod("08.2025", "obecnie");
      }
    },
    {
      position: "Software Developer",
      company: "Inetum - Telco",
      get period() {
        return formatPeriod("09.2024", "07.2025");
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
      company: "Inetum - Telco CRM",
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
        "ASTEK": "Projektowanie i tworzenie rozwiązań bankowych na blockchainie.",
        "Inetum - Telco": "Praca z PostgreSQL/PostGIS oraz projekt migracji bazy danych z Sybase do PostgreSQL. Odpowiedzialność za utrzymanie i nowe funkcjonalności.",
        "Inetum - IoT": "Praca przy aplikacji IoT do monitorowania pojazdów. Odpowiedzialność za utrzymanie i nowe funkcjonalności w mikroserwisie udostępniającym API.",
        "Inetum - Cloud": "Praca nad aplikacją do przetwarzania danych w chmurze, zbudowaną z wykorzystaniem Flink i AWS z użyciem Project Reactor. Odpowiedzialność za infrastrukturę w początkowej fazie projektu oraz nowe funkcjonalności.",
        "Inetum - Telco CRM": "Projekt IoT i telekomunikacyjny. Odpowiedzialność za komunikację z klientem, utrzymanie aplikacji i rozwój nowych funkcjonalności.",
        "Bored Founders Club": "Mentor blockchain w grupie deweloperów. Prowadzenie regularnych warsztatów technicznych z zakresu Solidity, Web3 i integracji z łańcuchami bloków. Wsparcie w rozwoju projektów blockchain i smart kontraktów dla członków klubu."
      },
      en: {
        "ASTEK": "Designing and creating banking solutions on blockchain.",
        "Inetum - Telco": "Working with PostgreSQL/PostGIS and Sybase to PostgreSQL database migration project. Responsible for maintenance and new functionalities.",
        "Inetum - IoT": "Working on an IoT application for vehicle monitoring. Responsible for maintenance and new functionalities in a microservice providing API.",
        "Inetum - Cloud": "Working on a cloud-based data processing application built with Flink and AWS using Project Reactor. Responsible for infrastructure in the initial phase of the project and new functionalities.",
        "Inetum - Telco CRM": "IoT and telecommunications project. Responsible for client communication, application maintenance, and development of new functionalities.",
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
  },

  // Sekcja ze szkoleniami
  getTrainingsData() {
    const lang = i18next.language;

    if (lang === 'pl') {
      return [
        {
          name: "Developer Jutra",
          description: "Kompleksowy program transformacji kariery programistycznej w erze AI. Szkolenie łączy biznes, architekturę i efektywne wykorzystanie LLM-ów. Program obejmuje 10 intensywnych webinarów z Tomaszem Ducinem, warsztaty z Full-Stack developmentu, DevOps, Event Stormingu oraz praktyczne wykorzystanie AI w codziennej pracy.",
          date: "18.07.2025",
          duration: "10 tygodni",
          provider: "Devstyle",
          certificate: true,
          skills: ["Full-Stack", "AI/LLM", "Architektura", "DevOps", "Product Engineering", "Event Storming"]
        },
        {
          name: "Horyzont Lidera",
          description: "Kompleksowy program rozwijający kompetencje miękkie niezbędne w branży IT. Szkolenie obejmuje zarządzanie zespołem, efektywną komunikację, współpracę z biznesem oraz leadership technologiczny. Program prowadzony przez doświadczonych mentorów z branży IT.",
          date: "27.06.2025",
          duration: "12 tygodni",
          provider: "Devstyle",
          certificate: true,
          skills: ["Leadership", "Komunikacja", "Zarządzanie zespołem", "Współpraca IT-Biznes", "Soft skills"]
        },
        {
          name: "Craftsmanship - przybornik profesjonalisty",
          description: "Intensywny 3-dniowy warsztat łączący kluczowe elementy klasycznej i nowoczesnej inżynierii oprogramowania. Szkolenie obejmuje techniki SOLID, GRASP, DDD, architekturę hexagonalną oraz Clean Code. Program prowadzony w formie warsztatów z refaktoringiem aplikacji biznesowej od modelu anemicznego do architektur warstwowych i hexagonalnych.",
          date: "22.01.2025",
          duration: "3 dni",
          provider: "Bottega IT Minds",
          certificate: true,
          skills: ["SOLID", "DDD", "Clean Code", "Architektura Hexagonalna", "TDD", "Refactoring"]
        },
        {
          name: "Apache Flink for Stream Processing",
          description: "Intensywne 3-dniowe szkolenie z przetwarzania strumieniowego w Apache Flink. Program obejmuje przetwarzanie w czasie zdarzenia, zarządzanie stanem, checkpointing, integrację z Kafką, Flink SQL oraz zaawansowane techniki rozwiązywania problemów i optymalizacji wydajności. Szkolenie prowadzone przez ekspertów Ververica - twórców Apache Flink.",
          date: "02.08.2022",
          duration: "3 dni",
          provider: "Ververica",
          certificate: true,
          skills: ["Apache Flink", "Stream Processing", "Event Time", "State Management", "Flink SQL", "Kafka Integration"]
        },
        {
          name: "Reaktywne programowanie w Javie",
          description: "3-dniowe szkolenie wprowadzające w świat reaktywnego programowania. Program obejmuje podstawy teorii reaktywności, backpressure, biblioteki Mono/Flux, WebFlux i Reactor. Praktyczne warsztaty zawierają implementację pełnego stosu reaktywnego, obsługę zasobów synchronicznych, zaawansowane funkcje Reactor oraz komunikację przez RSocket.",
          date: "17.11.2021",
          duration: "3 dni",
          provider: "Bottega IT Minds",
          certificate: true,
          skills: ["Reactor", "WebFlux", "Mono/Flux", "RSocket", "R2DBC", "Reactive Programming"]
        },
        {
          name: "Droga Nowoczesnego Architekta",
          description: "Kompleksowy program rozwoju architekta IT składający się z 20 modułów w 7 blokach tematycznych. Obejmuje strategiczne i taktyczne DDD, Event Storming, style architektury korporacyjnej i aplikacyjnej, mikroserwisy, systemy rozproszone, Event Sourcing, CI/CD, infrastrukturę jako kod, Kubernetes, security oraz refactoring z Big Ball of Mud. Ponad 30 godzin materiałów wideo.",
          date: "24.03.2021",
          duration: "6 miesięcy",
          provider: "Devstyle",
          certificate: true,
          skills: ["DDD", "Event Storming", "Mikroserwisy", "Event Sourcing", "CQRS", "Kubernetes", "CI/CD", "Architektura hexagonalna"]
        }
      ];
    } else {
      return [
        {
          name: "Developer of Tomorrow",
          description: "Comprehensive career transformation program for programmers in the AI era. Training combines business, architecture, and effective use of LLMs. The program includes 10 intensive webinars with Tomasz Ducin, workshops on Full-Stack development, DevOps, Event Storming, and practical AI application in daily work.",
          date: "18.07.2025",
          duration: "10 weeks",
          provider: "Devstyle",
          certificate: true,
          skills: ["Full-Stack", "AI/LLM", "Architecture", "DevOps", "Product Engineering", "Event Storming"]
        },
        {
          name: "Leader's Horizon",
          description: "Comprehensive program developing soft skills essential in the IT industry. The training covers team management, effective communication, business collaboration, and technical leadership. Led by experienced mentors from the IT industry.",
          date: "27.06.2025",
          duration: "12 weeks",
          provider: "Devstyle",
          certificate: true,
          skills: ["Leadership", "Communication", "Team Management", "IT-Business Collaboration", "Soft skills"]
        },
        {
          name: "Craftsmanship - Professional's Toolkit",
          description: "Intensive 3-day workshop combining key elements of classical and modern software engineering. Training covers SOLID, GRASP, DDD techniques, hexagonal architecture, and Clean Code. Conducted as workshops with business application refactoring from anemic model to layered and hexagonal architectures.",
          date: "22.01.2025",
          duration: "3 days",
          provider: "Bottega IT Minds",
          certificate: true,
          skills: ["SOLID", "DDD", "Clean Code", "Hexagonal Architecture", "TDD", "Refactoring"]
        },
        {
          name: "Apache Flink for Stream Processing",
          description: "Intensive 3-day training on stream processing with Apache Flink. The program covers event-time processing, state management, checkpointing, Kafka integration, Flink SQL, and advanced troubleshooting and performance optimization techniques. Training conducted by Ververica experts - the creators of Apache Flink.",
          date: "02.08.2022",
          duration: "3 days",
          provider: "Ververica",
          certificate: true,
          skills: ["Apache Flink", "Stream Processing", "Event Time", "State Management", "Flink SQL", "Kafka Integration"]
        },
        {
          name: "Reactive Programming in Java",
          description: "3-day training introducing the world of reactive programming. The program covers reactive theory basics, backpressure, Mono/Flux libraries, WebFlux and Reactor. Practical workshops include full reactive stack implementation, handling synchronous resources, advanced Reactor features, and communication via RSocket.",
          date: "17.11.2021",
          duration: "3 days",
          provider: "Bottega IT Minds",
          certificate: true,
          skills: ["Reactor", "WebFlux", "Mono/Flux", "RSocket", "R2DBC", "Reactive Programming"]
        },
        {
          name: "Path of Modern Architect",
          description: "Comprehensive IT architect development program consisting of 20 modules in 7 thematic blocks. Covers strategic and tactical DDD, Event Storming, corporate and application architecture styles, microservices, distributed systems, Event Sourcing, CI/CD, infrastructure as code, Kubernetes, security, and refactoring from Big Ball of Mud. Over 30 hours of video content.",
          date: "24.03.2021",
          duration: "6 months",
          provider: "Devstyle",
          certificate: true,
          skills: ["DDD", "Event Storming", "Microservices", "Event Sourcing", "CQRS", "Kubernetes", "CI/CD", "Hexagonal Architecture"]
        }
      ];
    }
  },

  get trainings() {
    return this.getTrainingsData();
  }
};

export default developerData;