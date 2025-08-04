// Types for Front Office Setup Masters

export interface Purpose {
  _id?: string;
  visitors_purpose: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ComplaintType {
  _id?: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Source {
  _id?: string;
  source: string;
  description: string;
}

export interface Reference {
  _id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Complaint for CRUD
export interface Complaint {
  _id?: string;
  complain_type_id: string; // ref to ComplaintType
  complain_by: string;
  phone?: string;
  date: string;
  description?: string;
  action_taken?: string;
  assigned?: string;
  note?: string;
  image?: string; // file upload
  document?: string; // file upload
  created_at?: string;
  updated_at?: string;
}
