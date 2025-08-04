export interface StaffLeave {
  _id: string;
  staff_id: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  status: string;
  reason: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export type StaffLeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface LeaveType {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface StaffLeaveAllotment {
  _id: string;
  staff: string | { _id: string; name: string; surname: string; employee_id: string };
  leaveType: string | LeaveType;
  allotted: number;
  session?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}
