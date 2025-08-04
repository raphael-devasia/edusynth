import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StudentFormTabs from './StudentFormTabs';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import apiService from '../../services/api';

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

const initialForm = {
  admission_no: '',
  roll_no: '',
  admission_date: '',
  firstname: '',
  middlename: '',
  lastname: '',
  image: undefined as File | string | undefined,
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
  category_id: '',
  school_house_id: '',
  hostel_id: '',
  hostel_room_id: '',
  vehroute_id: '',
  pickuppoint_id: '',
  fee_groups: [] as string[],
  discounts: [] as string[],
  fees_month: [] as string[],
};

const StudentEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [photo, setPhoto] = useState<File|null>(null);
  const [fatherPhoto, setFatherPhoto] = useState<File|null>(null);
  const [motherPhoto, setMotherPhoto] = useState<File|null>(null);
  const [guardianPhoto, setGuardianPhoto] = useState<File|null>(null);
  const [tab, setTab] = useState(0);
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
          apiService.get('/discounts'),
          apiService.get('/categories'),
          apiService.get('/houses'),
          apiService.get('/routes'),
          apiService.get('/pickuppoints'),
          apiService.get('/hostels'),
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

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/students/${id}`);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          setForm({ ...initialForm, ...data });
        } else {
          setForm(initialForm);
        }
      } catch (err: any) {
        setError('Failed to fetch student');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

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
      await axios.put(`/api/students/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/students/list');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Edit Student</Typography>
      {loading ? (
        <Paper elevation={2} sx={{ p: 3, maxWidth: 800 }}>
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
          mode="edit"
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default StudentEditPage;
