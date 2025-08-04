// Certificate and StaffDocument interfaces for staff module

export interface Certificate {
  _id?: string;
  staff_id: string;
  name: string;
  description?: string;
  issue_date: string;
  expiry_date?: string;
  file_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StaffDocument {
  _id?: string;
  staff_id: string;
  original_name: string;
  type: string;
  size: number;
  url?: string;
  uploaded_at?: string;
  remark?: string;
}
