// Common types
export interface BaseEntity {
  _id: string;
  created_at: string;
  updated_at: string;
}

// Authentication types
export interface User extends BaseEntity {
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  lang_id?: string;
  currency_id?: string;
  name?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Student types
export interface Student extends BaseEntity {
  admission_no: string;
  roll_no: string;
  admission_date: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  image?: string;
  mobileno: string;
  email?: string;
  state?: string;
  city?: string;
  pincode?: string;
  religion?: string;
  cast?: string;
  dob: string;
  current_address?: string;
  permanent_address?: string;
  category_id?: string;
  route_id?: string;
  school_house_id?: string;
  blood_group?: string;
  vehroute_id?: string;
  hostel_room_id?: string;
  adhar_no?: string;
  samagra_id?: string;
  bank_account_no?: string;
  bank_name?: string;
  ifsc_code?: string;
  guardian_name: string;
  guardian_relation: string;
  guardian_phone: string;
  guardian_address?: string;
  is_active: boolean;
  session_id: string;
  class_id: string;
  section_id: string;
}

// Class types
export interface Class extends BaseEntity {
  name: string;
  description?: string;
}

// Section types
export interface Section extends BaseEntity {
  name: string;
  class_id: string;
}

// Session types
export interface Session extends BaseEntity {
  name: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
}

// Fee types
export interface FeeCategory extends BaseEntity {
  name: string;
  description?: string;
}

export interface FeeType extends BaseEntity {
  type: string;
  feecategory_id: string;
  code?: string;
  description?: string;
  is_system: boolean;
  nature: string;
}

export interface FeeGroup extends BaseEntity {
  name: string;
  description?: string;
}

// Library types
export interface Book extends BaseEntity {
  book_title: string;
  book_no: string;
  isbn_no?: string;
  subject?: string;
  rack_no?: string;
  publish?: string;
  author?: string;
  qty?: number;
  perunitcost?: number;
  postdate?: string;
  description?: string;
  available?: string;
  is_active: boolean;
}

export interface BookIssue extends BaseEntity {
  book_id: string;
  member_id: string;
  issue_date: string;
  due_date: string;
  return_date?: string;
  is_returned: boolean;
  remarks?: string;
}

// Staff types
export interface Staff extends BaseEntity {
  role_id?: string; // Role reference
  // ...existing fields...
  custom_fields?: CustomFieldValue[];

  employee_id: string;
  lang_id?: string;
  currency_id?: string;
  department?: string;
  designation?: string;
  qualification?: string;
  work_exp?: string;
  name: string;
  surname: string;
  father_name?: string;
  mother_name?: string;
  contact_no: string;
  emergency_contact_no?: string;
  email: string;
  dob?: string;
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed';
  date_of_joining?: string;
  date_of_leaving?: string;
  local_address?: string;
  permanent_address?: string;
  note?: string;
  image?: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  account_title?: string;
  bank_account_no?: string;
  bank_name?: string;
  ifsc_code?: string;
  bank_branch?: string;
  payscale?: string;
  basic_salary?: number;
  epf_no?: string;
  contract_type?: 'permanent' | 'contract' | 'temporary';
  shift?: string;
  location?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  resume?: string;
  joining_letter?: string;
  resignation_letter?: string;
  other_document_name?: string;
  other_document_file?: string;
  user_id?: string;
  is_active: boolean;
  verification_code?: string;
  disable_at?: string;
}

// Item/Inventory types
export interface Item extends BaseEntity {
  name: string;
  item_category_id: string;
  item_store_id: string;
  item_supplier_id: string;
  unit: string;
  item_photo?: string;
  description?: string;
  created_by: string;
}

export interface ItemCategory extends BaseEntity {
  item_category: string;
  is_active: boolean;
}

export interface ItemStore extends BaseEntity {
  item_store: string;
  code: string;
  description?: string;
}

export interface ItemSupplier extends BaseEntity {
  item_supplier: string;
  phone?: string;
  email?: string;
  address?: string;
  contact_person_name?: string;
  contact_person_phone?: string;
  contact_person_email?: string;
  description?: string;
}

// Exam types
export interface Exam extends BaseEntity {
  name: string;
  sesion_id: string;
  term?: string;
  is_publish: boolean;
  description?: string;
}

export interface ExamGroup extends BaseEntity {
  name: string;
  exam_type?: string;
  description?: string;
}

// Subject types
export interface Subject extends BaseEntity {
  name: string;
  code?: string;
  type: 'theory' | 'practical';
}

// Attendance types
export interface AttendanceType extends BaseEntity {
  type: string;
  key_value: string;
  is_active: boolean;
}

// Transport types
export interface TransportRoute extends BaseEntity {
  route_title: string;
  no_of_vehicle?: number;
  route_fare?: number;
  note?: string;
}

export interface Vehicle extends BaseEntity {
  vehicle_no: string;
  vehicle_model?: string;
  year_made?: string;
  driver_name?: string;
  driver_licence?: string;
  driver_contact?: string;
  note?: string;
}

// Hostel types
export interface Hostel extends BaseEntity {
  hostel_name: string;
  type: 'boys' | 'girls' | 'other';
  address?: string;
  intake?: number;
  description?: string;
}

export interface HostelRoom extends BaseEntity {
  hostel_id: string;
  room_no: string;
  room_type: string;
  no_of_bed?: number;
  cost_per_bed?: number;
  description?: string;
}

// Common API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Custom field types
export interface CustomField {
  _id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'file';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
  default_value?: any;
  belong_to: string;
}

export interface CustomFieldValue {
  field_id: string;
  value: any;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'file';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
}

// Staff leave types
export * from './staffLeave';

// Table types
export * from './dispatch';
export interface TableColumn {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: any) => React.ReactNode;
}

// Navigation types
export interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  roles?: string[];
}

// Dashboard types
export interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  totalClasses: number;
  totalBooks: number;
  pendingFees: number;
  todayAttendance: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}
