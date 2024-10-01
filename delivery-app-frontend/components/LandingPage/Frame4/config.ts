export interface Stat {
  percentage: number;
  title: string;
  hasSource?: boolean;
}

export const stats: Stat[] = [
  {
    percentage: -25,
    title: "CO2 Impact",
    hasSource: true,
  },
  {
    percentage: -38,
    title: "Delivery Time",
    hasSource: true,
  },
  {
    percentage: -22,
    title: "Total cost",
    hasSource: true,
  },
  {
    percentage: 100,
    title: "Better",
  },
];
