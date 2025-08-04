export interface Dispatch {
  _id?: string;
  reference_no: string;
  to_title: string;
  address: string;
  note?: string;
  from_title: string;
  date: string; // ISO string
  type: 'dispatch' | 'receive';
  image?: string | File; // filename, URL, or File object
  created_at?: string;
}
