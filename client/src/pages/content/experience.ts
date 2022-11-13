export interface ICompany {
  name: string;
  logo: string;
  website: string;
  from: string;
  to: string;
  position: string;
  responsibilities: string[];
}

export const companies: ICompany[] = [
  {
    name: "TWI Ltd.",
    logo: "twi.jpg",
    website: "https://www.twi-global.com",
    from: "2012",
    to: "Present",
    position: "Senior Software Engineer",
    responsibilities: [
      "As the lead developer for one of their flagship applications, I maintain a legacy WinForms codebase, develop new and bespoke features, fix bugs, and do customer releases.",
      "I architected their next generation of flagship software using C#, WPF, and MVVM.",
      "I designed and built a complex rule engine used for decision making and validation of user data against international welding standards involving hundreds of variables.",
      "As part of a team I have developed numerous bespoke applications used by major engineering and utility companies around the world. I work with subject matter experts to turn complex requirements into software solutions using agile development methodologies.",
      "I was tasked with learning React and assessing its suitability to extend their software onto the web. I developed a web application using React, Typescript, Bootstrap, and rest services.",
    ],
  },
  {
    name: "TWI Ltd.",
    logo: "twi.jpg",
    website: "https://www.twi-global.com",
    from: "2008",
    to: "2012",
    position: "Software Engineer",
    responsibilities: [
      "I developed an API used for interop between their suite of software products.",
      "I developed a tool to plot welds on an isometric piping diagram and view their production status.",
      "I worked on a tool to calculate the probability of failure for welded components.",
      "I developed a service to gather data on power usage from Zigbee devices. The data was collected in real time using a low-level API written by a partner company and stored in an SQL Server database.",
    ],
  },
];
