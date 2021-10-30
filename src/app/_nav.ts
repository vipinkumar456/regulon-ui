import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: "Home",
    url: "/home",
    icon: "icon-home",
  },
  {
    name: "Guidelines",
    url: "/guidelines",
    icon: "icon-guidelines",
  },
  {
    name: "Tranche Selection",
    url: "tranche",
    icon: "icon-tranche",
    children: [
      {
        name: "Tranche 1",
        url: "/tranches/tranche1/1",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1A",
        url: "/tranches/tranche1/a",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1B",
        url: "/tranches/tranche1/b",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1C",
        url: "/tranches/tranche1/c",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1D",
        url: "/tranches/tranche1/d",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1E",
        url: "/tranches/tranche1/e",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1F",
        url: "/tranches/tranche1/f",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 1G",
        url: "/tranches/tranche1/g",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 2",
        url: "/tranches/tranche/2",
        icon: "icon-tranche",
      },
      {
        name: "Tranche 3",
        url: "/tranches/tranche/3",
        icon: "icon-tranche",
      },
    ],
  },
  {
    name: "Reports",
    url: "download",
    icon: "icon-reports",
  },

  {
    name: "Admin Panel",
    url: "admin",
    icon: "icon-admin",
    // text: "ROLE_ADMIN",
    // class: !this.isAdmin ? "displayNone" : "displayBlock",
    children: [
      {
        name: "Admin Dashboard",
        icon: "icon-dashboard",
        url: "/admin/dashboard",
      },
      {
        name: "User Roles",
        icon: "icon-role",
        url: "/admin/userroles",
      },
      {
        name: "Users",
        icon: "icon-users",
        url: "/admin/users",
      },
      {
        name: "DCT",
        icon: "icon-dct",
        url: "/admin/dcts",
      },
      {
        name: "WorkFlow",
        icon: "icon-workflow",
        url: "/admin/workflow",
      },
    ],
  },
  {
    name: "Help and Feedback",
    url: "/faq",
    icon: "icon-help",
  }
];
