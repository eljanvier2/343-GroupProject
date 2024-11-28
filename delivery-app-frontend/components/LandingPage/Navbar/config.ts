interface Route {
  name: string;
  path: string;
}

export const dashboardRoutes: Route[] = [
  {
    name: "Tracking",
    path: "/tracking",
  },
  {name: "Plan Delivery", path: "/paymentDelivery"},
  { name: "Dashboard", path: "/dashboard" },
  { name: "Contact Us", path: "/contact" },
];

export const routes: Route[] = [
  {
    name: "Our Concept",
    path: "/",
  },
  {
    name: "Features",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
  // {
  //   name: 'Order Tracking',
  //   path: '/tracking'
  // }
];
