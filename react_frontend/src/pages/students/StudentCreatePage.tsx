import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentFormTabs from './StudentFormTabs';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import apiService from '../../services/api';

const initialForm = {
  fee_groups: [] as string[],
  discounts: [] as string[], // For Fee & Discount multi-select
  fees_month: [] as string[], // For Fee & Discount multi-select
  fee_discounts: [] as string[],
  // Sibling fields
  sibling_name: '',
  sibling_id: '',
  // Document uploads
  first_doc: undefined as File | undefined,
  second_doc: undefined as File | undefined,
  third_doc: undefined as File | undefined,
  fourth_doc: undefined as File | undefined,
  // Transport fields
  vehroute_id: '',
  transport_fees: '',
  pickuppoint_id: '',
  // Hostel fields
  hostel_id: '',
  // House field
  house: '',
  // Fees discount
  fees_discount: '',
  // Custom fields placeholder (for dynamic fields)
  custom_fields: {},
  // Existing fields

  admission_no: '',
  roll_no: '',
  admission_date: '',
  firstname: '',
  middlename: '',
  lastname: '',
  image: undefined as File | undefined,
  mobileno: '',
  email: '',
  state: '',
  city: '',
  pincode: '',
  religion: '',
  dob: '',
  gender: '',
  current_address: '',
  permanent_address: '',
  guardian_is: '',
  guardian_name: '',
  guardian_phone: '',
  guardian_address: '',
  guardian_occupation: '',
  guardian_relation: '',
  guardian_email: '',
  father_name: '',
  father_phone: '',
  father_occupation: '',
  mother_name: '',
  mother_phone: '',
  mother_occupation: '',
  rte: '',
  note: '',
  previous_school: '',
  height: '',
  weight: '',
  measurement_date: '',
  blood_group: '',
  class_id: '',
  section_id: '',
  session_id: '',
  category: '',
  category_id: '',
  school_house_id: '',
  hostel_room_id: '',
  adhar_no: '',
  samagra_id: '',
  bank_account_no: '',
  bank_name: '',
  ifsc_code: '',
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
const bloodGroupOptions = [
  { value: 'O+', label: 'O Positive' },
  { value: 'A+', label: 'A Positive' },
  { value: 'B+', label: 'B Positive' },
  { value: 'AB+', label: 'AB Positive' },
  { value: 'O-', label: 'O Negative' },
  { value: 'A-', label: 'A Negative' },
  { value: 'B-', label: 'B Negative' },
  { value: 'AB-', label: 'AB Negative' },
];
const feesMonthOptions = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];

const StudentCreatePage: React.FC = () => {
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [tab, setTab] = useState(0);
  const [fatherPhoto, setFatherPhoto] = useState<File|null>(null);
  const [motherPhoto, setMotherPhoto] = useState<File|null>(null);
  const [guardianPhoto, setGuardianPhoto] = useState<File|null>(null);
  const [photo, setPhoto] = useState<File|null>(null);
  const [classOptions, setClassOptions] = useState<any[]>([]);
  const [sectionOptions, setSectionOptions] = useState<any[]>([]);
  const [feeGroupOptions, setFeeGroupOptions] = useState<any[]>([]);
  const [discountOptions, setDiscountOptions] = useState<any[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [houseOptions, setHouseOptions] = useState<any[]>([]);
  const [routeOptions, setRouteOptions] = useState<any[]>([]);
  const [pickupPointOptions, setPickupPointOptions] = useState<any[]>([]);
  const [hostelOptions, setHostelOptions] = useState<any[]>([]);
  const [roomOptions, setRoomOptions] = useState<any[]>([]);
  // Add more as needed
  const [addressType, setAddressType] = useState<'current'|'permanent'|'guardian'|''>('');
  const [siblingInfo, setSiblingInfo] = useState<{ name: string; id: string }>({ name: '', id: '' });
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const navigate = useNavigate();

  // Fetch dropdowns on mount
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [classes, sections, feeGroups, discounts, categories, houses, routes, pickups, hostels, rooms] = await Promise.all([
          apiService.getClasses(),
          apiService.getSections(),
          apiService.getFeeGroups(),
          // TODO: Replace with apiService.getDiscounts() if implemented
          apiService.get('/discounts'),
          // TODO: Replace with apiService.getCategories() if implemented
          apiService.get('/categories'),
          // TODO: Replace with apiService.getHouses() if implemented
          apiService.get('/houses'),
          // TODO: Replace with apiService.getRoutes() if implemented
          apiService.get('/routes'),
          // TODO: Replace with apiService.getPickupPoints() if implemented
          apiService.get('/pickuppoints'),
          // TODO: Replace with apiService.getHostels() if implemented
          apiService.get('/hostels'),
          // TODO: Replace with apiService.getRooms() if implemented
          apiService.get('/rooms'),
        ]);
        setClassOptions(classes as any[]);
        setSectionOptions(sections as any[]);
        setFeeGroupOptions(feeGroups as any[]);
        setDiscountOptions(discounts as any[]);
        setCategoryOptions(categories as any[]);
        setHouseOptions(houses as any[]);
        setRouteOptions(routes as any[]);
        setPickupPointOptions(pickups as any[]);
        setHostelOptions(hostels as any[]);
        setRoomOptions(rooms as any[]);
      } catch (err) {
        // Optionally handle dropdown fetch errors
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file' && files && files[0]) {
      if (name === 'image') setPhoto(files[0]);
      else if (name === 'father_pic') setFatherPhoto(files[0]);
      else if (name === 'mother_pic') setMotherPhoto(files[0]);
      else if (name === 'guardian_pic') setGuardianPhoto(files[0]);
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    if (!form.admission_no || !form.firstname || !form.gender || !form.class_id || !form.section_id || !form.admission_date || !form.dob) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setError('Please fill all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v) data.append(k, v as string | Blob);
      });
      if (photo) data.append('image', photo);
      if (fatherPhoto) data.append('father_pic', fatherPhoto);
      if (motherPhoto) data.append('mother_pic', motherPhoto);
      if (guardianPhoto) data.append('guardian_pic', guardianPhoto);
      await axios.post('/api/students', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/students/list');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Create Student</Typography>
      {loading ? (
        <Paper elevation={2} sx={{ p: 3, maxWidth: 900 }}>
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <StudentFormTabs
          form={form}
          setForm={setForm}
          tab={tab}
          setTab={setTab}
          error={error}
          loading={loading}
          photo={photo}
          setPhoto={setPhoto}
          fatherPhoto={fatherPhoto}
          setFatherPhoto={setFatherPhoto}
          motherPhoto={motherPhoto}
          setMotherPhoto={setMotherPhoto}
          guardianPhoto={guardianPhoto}
          setGuardianPhoto={setGuardianPhoto}
          classOptions={classOptions}
          sectionOptions={sectionOptions}
          feeGroupOptions={feeGroupOptions}
          discountOptions={discountOptions}
          categoryOptions={categoryOptions}
          houseOptions={houseOptions}
          routeOptions={routeOptions}
          pickupPointOptions={pickupPointOptions}
          hostelOptions={hostelOptions}
          roomOptions={roomOptions}
          handleChange={handleChange}
          mode="create"
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default StudentCreatePage;
