export const data = [
  {
    id: "1",
    1: "John",
    2: 24,
    3: "john@cemento.com",
    4: true,
    5: ["R&D", "Sales", "Finance", "Administration"],
  },
  {
    id: "2",
    1: "Alice",
    2: 30,
    3: "alice@cemento.com",
    4: false,
    5: ["Sales", "Marketing", "Human Resources"],
  },

  {
    id: "5",
    1: "Charlie",
    2: 32,
    3: "charlie@cemento.com",
    4: true,
    5: ["R&D", "Administration"],
  },
  {
    id: "6",
    1: "Grace",
    2: 27,
    3: "grace@cemento.com",
    4: true,
    5: ["Sales", "Finance"],
  },
  {
    id: "7",
    1: "David",
    2: 29,
    3: "david@cemento.com",
    4: false,
    5: ["R&D", "Marketing", "Administration"],
  },

  {
    id: "3",
    1: "Bob",
    2: 28,
    3: "bob@cemento.com",
    4: true,
    5: ["R&D", "Finance", "Administration"],
  },
  {
    id: "4",
    1: "Eva",
    2: 35,
    3: "eva@cemento.com",
    4: false,
    5: ["Marketing", "Human Resources"],
  },
  {
    id: "8",
    1: "Sophie",
    2: 26,
    3: "sophie@cemento.com",
    4: true,
    5: ["Sales", "Finance", "Human Resources"],
  },

  {
    id: "9",
    1: "Frank",
    2: 33,
    3: "frank@cemento.com",
    4: false,
    5: ["Marketing"],
  },
  {
    id: "10",
    1: "Hannah",
    2: 31,
    3: "hannah@cemento.com",
    4: true,
    5: ["R&D", "Sales", "Finance", "Administration"],
  },
];

export const columns = [
  { id: "1", ordinalNo: 2, title: "Name", type: "string" },
  { id: "2", ordinalNo: 1, title: "Age", type: "number" },
  { id: "3", ordinalNo: 3, title: "Email", type: "string", width: 300 },
  { id: "4", ordinalNo: 4, title: "Active", type: "boolean" },
  { id: "5", ordinalNo: 5, title: "Department", type: "selection" },
];

export const tableData = {
  data,
  columns,
};
