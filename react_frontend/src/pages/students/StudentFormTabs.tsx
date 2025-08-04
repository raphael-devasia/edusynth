import React from 'react';
import { Box, Typography, Paper, Stack, TextField, MenuItem, CircularProgress, Alert, Tabs, Tab, Button } from '@mui/material';

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

interface StudentFormTabsProps {
  form: any;
  setForm: (f: any) => void;
  tab: number;
  setTab: (t: number) => void;
  error?: string|null;
  loading: boolean;
  photo: File|null;
  setPhoto: (f: File|null) => void;
  fatherPhoto: File|null;
  setFatherPhoto: (f: File|null) => void;
  motherPhoto: File|null;
  setMotherPhoto: (f: File|null) => void;
  guardianPhoto: File|null;
  setGuardianPhoto: (f: File|null) => void;
  classOptions: any[];
  sectionOptions: any[];
  feeGroupOptions: any[];
  discountOptions: any[];
  categoryOptions: any[];
  houseOptions: any[];
  routeOptions: any[];
  pickupPointOptions: any[];
  hostelOptions: any[];
  roomOptions: any[];
  handleChange: (e: React.ChangeEvent<any>) => void;
  mode: 'create'|'edit';
  onSubmit: (e: React.FormEvent) => void;
}

const StudentFormTabs: React.FC<StudentFormTabsProps> = ({
  form,
  setForm,
  tab,
  setTab,
  error,
  loading,
  photo,
  setPhoto,
  fatherPhoto,
  setFatherPhoto,
  motherPhoto,
  setMotherPhoto,
  guardianPhoto,
  setGuardianPhoto,
  classOptions,
  sectionOptions,
  feeGroupOptions,
  discountOptions,
  categoryOptions,
  houseOptions,
  routeOptions,
  pickupPointOptions,
  hostelOptions,
  roomOptions,
  handleChange,
  mode,
  onSubmit
}) => {
  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 800 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Basic Info" />
        <Tab label="Contact" />
        <Tab label="Parent/Guardian" />
        <Tab label="Other" />
        <Tab label="Custom" />
        <Tab label="Fee & Discount" />
      </Tabs>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {tab === 0 && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField label="Sibling Name" name="sibling_name" value={form.sibling_name} onChange={handleChange} fullWidth />
                <TextField label="Sibling ID" name="sibling_id" value={form.sibling_id} onChange={handleChange} fullWidth />
                <Button variant="outlined">Find Sibling</Button>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" component="label">Upload Document 1
                  <input type="file" name="first_doc" hidden onChange={handleChange} />
                </Button>
                <Button variant="contained" component="label">Upload Document 2
                  <input type="file" name="second_doc" hidden onChange={handleChange} />
                </Button>
                <Button variant="contained" component="label">Upload Document 3
                  <input type="file" name="third_doc" hidden onChange={handleChange} />
                </Button>
                <Button variant="contained" component="label">Upload Document 4
                  <input type="file" name="fourth_doc" hidden onChange={handleChange} />
                </Button>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Admission No" name="admission_no" value={form.admission_no} onChange={handleChange} required fullWidth />
                <TextField label="Roll No" name="roll_no" value={form.roll_no} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="First Name" name="firstname" value={form.firstname} onChange={handleChange} required fullWidth />
                <TextField label="Middle Name" name="middlename" value={form.middlename} onChange={handleChange} fullWidth />
                <TextField label="Last Name" name="lastname" value={form.lastname} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Gender" name="gender" select value={form.gender} onChange={handleChange} required fullWidth>
                  {genderOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Blood Group" name="blood_group" select value={form.blood_group} onChange={handleChange} fullWidth>
                  {bloodGroupOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Class" name="class_id" select value={form.class_id} onChange={handleChange} required fullWidth>
                  {classOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.class_name}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Section" name="section_id" select value={form.section_id} onChange={handleChange} required fullWidth>
                  {sectionOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.section_name}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Category" name="category_id" select value={form.category_id} onChange={handleChange} fullWidth>
                  {categoryOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.category}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="DOB" name="dob" type="date" value={form.dob} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} />
                <TextField label="Admission Date" name="admission_date" type="date" value={form.admission_date} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} />
              </Stack>
            </Stack>
          )}
          {tab === 1 && (
            <Stack spacing={2}>
              <Typography>Guardian Is:</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <label><input type="radio" name="guardian_is" value="father" checked={form.guardian_is === 'father'} onChange={handleChange} /> Father</label>
                <label><input type="radio" name="guardian_is" value="mother" checked={form.guardian_is === 'mother'} onChange={handleChange} /> Mother</label>
                <label><input type="radio" name="guardian_is" value="other" checked={form.guardian_is === 'other'} onChange={handleChange} /> Other</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Father's Name" name="father_name" value={form.father_name} onChange={handleChange} fullWidth />
                <TextField label="Father's Phone" name="father_phone" value={form.father_phone} onChange={handleChange} fullWidth />
                <TextField label="Father's Occupation" name="father_occupation" value={form.father_occupation} onChange={handleChange} fullWidth />
                <Button variant="contained" component="label">Father Photo
                  <input type="file" name="father_pic" hidden accept="image/*" onChange={handleChange} />
                </Button>
                {fatherPhoto && <Typography>{fatherPhoto.name}</Typography>}
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Mother's Name" name="mother_name" value={form.mother_name} onChange={handleChange} fullWidth />
                <TextField label="Mother's Phone" name="mother_phone" value={form.mother_phone} onChange={handleChange} fullWidth />
                <TextField label="Mother's Occupation" name="mother_occupation" value={form.mother_occupation} onChange={handleChange} fullWidth />
                <Button variant="contained" component="label">Mother Photo
                  <input type="file" name="mother_pic" hidden accept="image/*" onChange={handleChange} />
                </Button>
                {motherPhoto && <Typography>{motherPhoto.name}</Typography>}
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Guardian Name" name="guardian_name" value={form.guardian_name} onChange={handleChange} fullWidth />
                <TextField label="Guardian Relation" name="guardian_relation" value={form.guardian_relation} onChange={handleChange} fullWidth />
                <TextField label="Guardian Email" name="guardian_email" value={form.guardian_email} onChange={handleChange} fullWidth />
                <TextField label="Guardian Phone" name="guardian_phone" value={form.guardian_phone} onChange={handleChange} fullWidth />
                <Button variant="contained" component="label">Guardian Photo
                  <input type="file" name="guardian_pic" hidden accept="image/*" onChange={handleChange} />
                </Button>
                {guardianPhoto && <Typography>{guardianPhoto.name}</Typography>}
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Guardian Address" name="guardian_address" value={form.guardian_address} onChange={handleChange} fullWidth />
                <TextField label="Guardian Occupation" name="guardian_occupation" value={form.guardian_occupation} onChange={handleChange} fullWidth />
                <TextField label="Guardian Is" name="guardian_is" value={form.guardian_is} onChange={handleChange} fullWidth />
              </Stack>
            </Stack>
          )}
          {tab === 2 && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <label><input type="checkbox" onChange={e => { if (e.target.checked) setForm((f: any) => ({...f, current_address: f.guardian_address })); }} /> Same as Guardian Address</label>
                <label><input type="checkbox" onChange={e => { if (e.target.checked) setForm((f: any) => ({...f, permanent_address: f.current_address })); }} /> Same as Current Address</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Mobile No" name="mobileno" value={form.mobileno} onChange={handleChange} fullWidth />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Current Address" name="current_address" value={form.current_address} onChange={handleChange} fullWidth />
                <TextField label="Permanent Address" name="permanent_address" value={form.permanent_address} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth />
                <TextField label="State" name="state" value={form.state} onChange={handleChange} fullWidth />
                <TextField label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} fullWidth />
              </Stack>
            </Stack>
          )}
          {tab === 3 && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField label="Class" name="class_id" value={form.class_id} onChange={handleChange} required fullWidth />
                <TextField label="Section" name="section_id" value={form.section_id} onChange={handleChange} required fullWidth />
                <TextField label="Session" name="session_id" value={form.session_id} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="House" name="school_house_id" select value={form.school_house_id} onChange={handleChange} fullWidth>
                  {houseOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.house}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Hostel" name="hostel_id" select value={form.hostel_id} onChange={handleChange} fullWidth>
                  {hostelOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.hostel_name}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Hostel Room" name="hostel_room_id" select value={form.hostel_room_id} onChange={handleChange} fullWidth>
                  {roomOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.room_number}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Vehicle Route" name="vehroute_id" select value={form.vehroute_id} onChange={handleChange} fullWidth>
                  {routeOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.route_title}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Pickup Point" name="pickuppoint_id" select value={form.pickuppoint_id} onChange={handleChange} fullWidth>
                  {pickupPointOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.pickup_point}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Transport Fees" name="transport_fees" value={form.transport_fees as string} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Fees Discount" name="fees_discount" select value={form.fees_discount} onChange={handleChange} fullWidth>
                  {discountOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.discount_name}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>
          )}
          {tab === 4 && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField label="Aadhar No" name="adhar_no" value={form.adhar_no} onChange={handleChange} fullWidth />
                <TextField label="Samagra ID" name="samagra_id" value={form.samagra_id} onChange={handleChange} fullWidth />
                <TextField label="Bank Account No" name="bank_account_no" value={form.bank_account_no} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Bank Name" name="bank_name" value={form.bank_name} onChange={handleChange} fullWidth />
                <TextField label="IFSC Code" name="ifsc_code" value={form.ifsc_code} onChange={handleChange} fullWidth />
                <TextField label="RTE" name="rte" value={form.rte} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Height" name="height" value={form.height} onChange={handleChange} fullWidth />
                <TextField label="Weight" name="weight" value={form.weight} onChange={handleChange} fullWidth />
                <TextField label="Measurement Date" name="measurement_date" type="date" value={form.measurement_date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField label="Previous School" name="previous_school" value={form.previous_school} onChange={handleChange} fullWidth />
                <TextField label="Note" name="note" value={form.note} onChange={handleChange} fullWidth />
              </Stack>
            </Stack>
          )}
          {tab === 5 && (
            <Stack spacing={2}>
              <Typography variant="h6">Fee & Discount Assignment (Optional)</Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Fee Groups"
                  name="fee_groups"
                  select
                  SelectProps={{ multiple: true }}
                  value={form.fee_groups}
                  onChange={e => setForm((f: any) => ({ ...f, fee_groups: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value }))}
                  fullWidth
                >
                  {feeGroupOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.group_name}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Discounts"
                  name="discounts"
                  select
                  SelectProps={{ multiple: true }}
                  value={form.discounts || []}
                  onChange={e => setForm((f: any) => ({ ...f, discounts: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value }))}
                  fullWidth
                >
                  {discountOptions.map(opt => (
                    <MenuItem key={opt._id || opt.id} value={opt._id || opt.id}>{opt.name || opt.discount_name}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Fees Month"
                  name="fees_month"
                  select
                  SelectProps={{ multiple: true }}
                  value={form.fees_month || []}
                  onChange={e => setForm((f: any) => ({ ...f, fees_month: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value }))}
                  fullWidth
                >
                  {feesMonthOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Assign fee groups/types and fee discounts to this student. This step is optional and can be skipped.
              </Typography>
            </Stack>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} /> : mode === 'edit' ? 'Update Student' : 'Create Student'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default StudentFormTabs;
