import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  // Postal Dispatch endpoints
  async getDispatches(params?: any) {
    return this.get('/dispatch', { params });
  }
  async getDispatch(id: string) {
    return this.get(`/dispatch`, { params: { id } });
  }
  async createDispatch(data: any) {
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            formData.append(key, String(value));
          } else {
            formData.append(key, JSON.stringify(value));
          }
        }
      });
      return this.api.post('/dispatch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return this.post('/dispatch', data);
  }
  async updateDispatch(id: string, data: any) {
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            formData.append(key, String(value));
          } else {
            formData.append(key, JSON.stringify(value));
          }
        }
      });
      return this.api.put(`/dispatch/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return this.put(`/dispatch/${id}`, data);
  }
  async deleteDispatch(id: string) {
    return this.delete(`/dispatch/${id}`);
  }
  async downloadDispatchFile(id: string) {
    return this.api.get(`/dispatch/download/${id}`, { responseType: 'blob' });
  }

  // Visitor Book endpoints
  async getVisitors(params?: any) {
    return this.get('/visitors', { params });
  }
  async getVisitorPurposes() {
    return this.get('/visitorspurposes');
  }
  async getStaffDropdown() {
    return this.get('/staff');
  }
  async getStudentDropdown() {
    return this.get('/students');
  }
  async uploadVisitorFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.api.post('/visitors/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  async getVisitor(id: string) {
    return this.get(`/visitors/${id}`);
  }
  async createVisitor(data: any) {
    // If data contains a file/image, use multipart/form-data
    if (data.file instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            formData.append(key, String(value));
          } else {
            formData.append(key, JSON.stringify(value));
          }
        }
      });
      return this.api.post('/visitors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return this.post('/visitors', data);
  }
  async updateVisitor(id: string, data: any) {
    if (data.file instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            formData.append(key, String(value));
          } else {
            formData.append(key, JSON.stringify(value));
          }
        }
      });
      return this.api.put(`/visitors/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return this.put(`/visitors/${id}`, data);
  }
  async deleteVisitor(id: string) {
    return this.delete(`/visitors/${id}`);
  }

  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor (auth disabled)
    this.api.interceptors.request.use(
      (config: any) => {
        // Do not attach Authorization header
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling (auth disabled)
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        // Do not redirect on 401
        return Promise.reject(error);
      }
    );
  }

  // Admission Enquiry endpoints
  async getSources() {
    return this.get('/source');
  }
  async getReferences() {
    return this.get('/reference');
  }
  async getAdmissionEnquiries() {
    return this.api.get('/admission-enquiry');
  }
  async createAdmissionEnquiry(data: any) {
    return this.api.post('/admission-enquiry', data);
  }
  async updateAdmissionEnquiry(id: string, data: any) {
    return this.api.put(`/admission-enquiry/${id}`, data);
  }
  async deleteAdmissionEnquiry(id: string) {
    return this.api.delete(`/admission-enquiry/${id}`);
  }

  // Generic CRUD methods
  async get<T>(endpoint: string, config?: any): Promise<T> {
    const response = await this.api.get(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.api.post(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.api.put(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: any): Promise<T> {
    const response = await this.api.delete(endpoint, config);
    return response.data;
  }

  // Authentication endpoints
  async login(credentials: { username: string; password: string }) {
    return this.post('/auth/login', credentials);
  }

  async logout() {
    return this.post('/auth/logout');
  }

  async refreshToken() {
    return this.post('/auth/refresh');
  }

  // Student endpoints
  async getStudents(params?: any): Promise<any[]> {
    return this.get<any[]>('/students', { params });
  }

  async getStudent(id: string): Promise<any> {
    return this.get<any>(`/students/${id}`);
  }

  async createStudent(data: any): Promise<any> {
    return this.post<any>('/students', data);
  }

  async updateStudent(id: string, data: any): Promise<any> {
    return this.put<any>(`/students/${id}`, data);
  }

  async deleteStudent(id: string): Promise<void> {
    return this.delete<void>(`/students/${id}`);
  }

  // Class endpoints
  async getClasses(params?: any): Promise<any[]> {
    return this.get<any[]>('/classes', { params });
  }

  async getClass(id: string): Promise<any> {
    return this.get<any>(`/classes/${id}`);
  }

  async createClass(data: any): Promise<any> {
    return this.post<any>('/classes', data);
  }

  async updateClass(id: string, data: any): Promise<any> {
    return this.put<any>(`/classes/${id}`, data);
  }

  async deleteClass(id: string): Promise<void> {
    return this.delete<void>(`/classes/${id}`);
  }

  // Section endpoints
  async getSections(params?: any) {
    return this.get('/sections', { params });
  }

  async getSection(id: string) {
    return this.get(`/sections/${id}`);
  }

  async createSection(data: any) {
    return this.post('/sections', data);
  }

  async updateSection(id: string, data: any) {
    return this.put(`/sections/${id}`, data);
  }

  async deleteSection(id: string) {
    return this.delete(`/sections/${id}`);
  }

  // Session endpoints
  async getSessions(params?: any) {
    return this.get('/sessions', { params });
  }

  async getSession(id: string) {
    return this.get(`/sessions/${id}`);
  }

  async createSession(data: any) {
    return this.post('/sessions', data);
  }

  async updateSession(id: string, data: any) {
    return this.put(`/sessions/${id}`, data);
  }

  async deleteSession(id: string) {
    return this.delete(`/sessions/${id}`);
  }

  // Fee Category endpoints
  async getFeeCategories(params?: any) {
    return this.get('/feecategories', { params });
  }

  async getFeeCategory(id: string) {
    return this.get(`/feecategories/${id}`);
  }

  async createFeeCategory(data: any) {
    return this.post('/feecategories', data);
  }

  async updateFeeCategory(id: string, data: any) {
    return this.put(`/feecategories/${id}`, data);
  }

  async deleteFeeCategory(id: string) {
    return this.delete(`/feecategories/${id}`);
  }

  // Fee Type endpoints
  async getFeeTypes(params?: any) {
    return this.get('/feetypes', { params });
  }

  async getFeeType(id: string) {
    return this.get(`/feetypes/${id}`);
  }

  async createFeeType(data: any) {
    return this.post('/feetypes', data);
  }

  async updateFeeType(id: string, data: any) {
    return this.put(`/feetypes/${id}`, data);
  }

  async deleteFeeType(id: string) {
    return this.delete(`/feetypes/${id}`);
  }

  // Fee Group endpoints
  async getFeeGroups(params?: any) {
    return this.get('/feegroups', { params });
  }

  async getFeeGroup(id: string) {
    return this.get(`/feegroups/${id}`);
  }

  async createFeeGroup(data: any) {
    return this.post('/feegroups', data);
  }

  async updateFeeGroup(id: string, data: any) {
    return this.put(`/feegroups/${id}`, data);
  }

  async deleteFeeGroup(id: string) {
    return this.delete(`/feegroups/${id}`);
  }

  // Library - Book endpoints
  async getBooks(params?: any) {
    return this.get('/books', { params });
  }

  async getBook(id: string) {
    return this.get(`/books/${id}`);
  }

  async createBook(data: any) {
    return this.post('/books', data);
  }

  async updateBook(id: string, data: any) {
    return this.put(`/books/${id}`, data);
  }

  async deleteBook(id: string) {
    return this.delete(`/books/${id}`);
  }

  // Library - Book Issue endpoints
  async getBookIssues(params?: any) {
    return this.get('/bookissues', { params });
  }

  async getBookIssue(id: string) {
    return this.get(`/bookissues/${id}`);
  }

  async createBookIssue(data: any) {
    return this.post('/bookissues', data);
  }

  async updateBookIssue(id: string, data: any) {
    return this.put(`/bookissues/${id}`, data);
  }

  async deleteBookIssue(id: string) {
    return this.delete(`/bookissues/${id}`);
  }

  // Staff endpoints
  async getStaff(params?: any) {
    return this.get('/staff', { params });
  }

  async getStaffMember(id: string) {
    return this.get(`/staff/${id}`);
  }

  async createStaffMember(data: any) {
    return this.post('/staff', data);
  }

  async updateStaffMember(id: string, data: any) {
    return this.put(`/staff/${id}`, data);
  }

  async deleteStaffMember(id: string) {
    return this.delete(`/staff/${id}`);
  }

  // Item endpoints
  async getItems(params?: any) {
    return this.get('/items', { params });
  }

  async getItem(id: string) {
    return this.get(`/items/${id}`);
  }

  async createItem(data: any) {
    return this.post('/items', data);
  }

  async updateItem(id: string, data: any) {
    return this.put(`/items/${id}`, data);
  }

  async deleteItem(id: string) {
    return this.delete(`/items/${id}`);
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.get('/dashboard/stats');
  }

  async getDashboardCharts() {
    return this.get('/dashboard/charts');
  }

  // Staff Document Management
  async getStaffDocuments(staffId: string) {
    return this.get(`/staff-upload`, { params: { staff_id: staffId } });
  }
  async uploadStaffDocument(staffId: string, file: File, meta: any = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(meta).forEach(([k, v]) => formData.append(k, v as any));
    formData.append('staff_id', staffId);
    return this.post(`/staff-upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
  async deleteStaffDocument(id: string) {
    return this.delete(`/staff-upload/${id}`);
  }

  // Staff Experience Management
  async getStaffExperiences(params?: any) {
    return this.get('/staff-experience', { params });
  }
  async createStaffExperience(data: any) {
    return this.post('/staff-experience', data);
  }
  async updateStaffExperience(id: string, data: any) {
    return this.put(`/staff-experience/${id}`, data);
  }
  async deleteStaffExperience(id: string) {
    return this.delete(`/staff-experience/${id}`);
  }

  // Staff Certificate Management
  async getStaffCertificates(staffId: string) {
    return this.get(`/staff-certificate`, { params: { staff_id: staffId } });
  }
  async uploadStaffCertificate(staffId: string, file: File, meta: any = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(meta).forEach(([k, v]) => formData.append(k, v as any));
    formData.append('staff_id', staffId);
    return this.post(`/staff-certificate`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
  async deleteStaffCertificate(id: string) {
    return this.delete(`/staff-certificate/${id}`);
  }

  // File upload endpoint
  async uploadFile(file: File, endpoint: string = '/upload') {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  // Custom Field endpoints
  async getStaffCustomFields() {
    return this.get('/customfield', { params: { belong_to: 'staff' } });
  }

  async createCustomField(data: any) {
    return this.post('/customfield', data);
  }

  async updateCustomField(id: string, data: any) {
    return this.put(`/customfield/${id}`, data);
  }

  async deleteCustomField(id: string) {
    return this.delete(`/customfield/${id}`);
  }

  // Staff Attendance endpoints
  async getStaffAttendance(params?: any) {
    return this.get('/staff-attendance', { params });
  }

  async createOrUpdateStaffAttendance(data: any[]) {
    return this.post('/staff-attendance', data);
  }

  async updateStaffAttendance(id: string, data: any) {
    return this.put(`/staff-attendance/${id}`, data);
  }

  async deleteStaffAttendance(id: string) {
    return this.delete(`/staff-attendance/${id}`);
  }

  // Payroll endpoints
  async getPayrolls(params?: any) {
    return this.get('/payroll', { params });
  }

  async deletePayroll(id: string) {
    return this.delete(`/payroll/${id}`);
  }

  // Leave Type endpoints
  async getLeaveTypes(params?: any) {
    return this.get('/leave-type', { params });
  }
  async createLeaveType(data: any) {
    return this.post('/leave-type', data);
  }
  async updateLeaveType(id: string, data: any) {
    return this.put(`/leave-type/${id}`, data);
  }
  async deleteLeaveType(id: string) {
    return this.delete(`/leave-type/${id}`);
  }

  // Staff Leave Allotment endpoints
  async getStaffLeaveAllotments(params?: any) {
    return this.get('/staff-leave-allotment', { params });
  }
  async createStaffLeaveAllotment(data: any) {
    return this.post('/staff-leave-allotment', data);
  }
  async updateStaffLeaveAllotment(id: string, data: any) {
    return this.put(`/staff-leave-allotment/${id}`, data);
  }
  async deleteStaffLeaveAllotment(id: string) {
    return this.delete(`/staff-leave-allotment/${id}`);
  }

  // Staff Leave endpoints
  async getStaffLeaves(params?: any) {
    return this.get('/staff-leave', { params });
  }
  async getStaffLeave(id: string) {
    return this.get(`/staff-leave/${id}`);
  }
  async createStaffLeave(data: any) {
    return this.post('/staff-leave', data);
  }
  async updateStaffLeave(id: string, data: any) {
    return this.put(`/staff-leave/${id}`, data);
  }
  async deleteStaffLeave(id: string) {
    return this.delete(`/staff-leave/${id}`);
  }

  // Staff Feedback endpoints
  async getStaffFeedback(params?: any) {
    return this.get('/staff-feedback', { params });
  }
  async createStaffFeedback(data: any) {
    return this.post('/staff-feedback', data);
  }
  async deleteStaffFeedback(id: string) {
    return this.delete(`/staff-feedback/${id}`);
  }
}

export const apiService = new ApiService();
export default apiService;
