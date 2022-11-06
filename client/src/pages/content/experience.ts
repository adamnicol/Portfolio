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
      "I am the lead developer for their flagship software. I am responsible for maintaining a legacy WinForms codebase, developing new and bespoke features, fixing bugs, and doing customer releases.",
      "I architected their next generation of flagship software, using C#, WPF, and MVVM.",
      "I designed and developed a complex rule engine used for decision making and validation of user data against international welding standards.",
      "As part of a team I have developed numerous bespoke applications used by major engineering and utility companies around the world. I worked with subject matter experts to turn complex user requirements into software solutions using agile methodologies.",
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
      "I designed an XML-based format that would allow users to define rules for non-destructive testing based on complex logic. The software used these rules to generate test requirements.",
      "I developed a tool to plot welds on an isometric piping diagram and view their production status.",
      "I developed a service to gather data on power usage from Zigbee devices. The data was collected in real time using a low-level C API written by a partner company and stored in a MSSQL database.",
      "I fixed bugs and wrote unit tests for their flagship software.",
    ],
  },
];
