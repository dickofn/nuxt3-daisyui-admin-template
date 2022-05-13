export interface Breadcrumb {
  label: string;
  path: string;
}

export interface Menu {
  label: string;
  link?: string;
  id?: number;
  name?: string;
  icon?: string;
  role?: string;
  subItems?: Menu[];
}
