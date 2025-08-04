export interface StaffFeedback {
  _id?: string;
  staff: string; // staff _id
  reviewer: {
    _id: string;
    name: string;
    email?: string;
    role?: string;
  } | string; // can be populated or just reviewer id
  rating: number; // 1-5
  comment?: string;
  created_at?: string;
}

export interface StaffFeedbackInput {
  staff: string;
  reviewer: string;
  rating: number;
  comment?: string;
}
