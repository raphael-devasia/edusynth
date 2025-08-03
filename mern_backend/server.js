require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
morgan.token('query', req => JSON.stringify(req.query));
morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms query=:query body=:body'));


// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/smart_school_test';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected to:', mongoUri);
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Smart School Management System - Backend running');
});

// Student routes
const studentRoutes = require('./routes/student');
app.use('/api/students', studentRoutes);

// Admission Enquiry routes
const admissionEnquiryRoutes = require('./routes/admissionEnquiry');
app.use('/api/admission-enquiry', admissionEnquiryRoutes);

// User routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Fee Category routes
const feeCategoryRoutes = require('./routes/feeCategory');
app.use('/api/feecategories', feeCategoryRoutes);

// Attendance Type routes
const attendanceTypeRoutes = require('./routes/attendanceType');
app.use('/api/attendancetypes', attendanceTypeRoutes);

// Class routes
const classRoutes = require('./routes/class');
app.use('/api/classes', classRoutes);

// Section routes
const sectionRoutes = require('./routes/section');
app.use('/api/sections', sectionRoutes);

// Online Admission routes
const onlineAdmissionRoutes = require('./routes/onlineAdmission');
app.use('/api/online-admission', onlineAdmissionRoutes);

// Session routes
const sessionRoutes = require('./routes/session');
app.use('/api/sessions', sessionRoutes);

// Category routes
const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);

// Staff Rating routes
const staffRatingRoutes = require('./routes/staffRating');
app.use('/api/staff-ratings', staffRatingRoutes);

// Staff Feedback routes
const staffFeedbackRoutes = require('./routes/staffFeedback');
app.use('/api/staff-feedback', staffFeedbackRoutes);

// Homework routes
const homeworkRoutes = require('./routes/homework');
app.use('/api/homework', homeworkRoutes);

// StudentFee routes
const studentFeeRoutes = require('./routes/studentFee');
app.use('/api/studentfees', studentFeeRoutes);

// StudentFeeMaster routes
const studentFeeMasterRoutes = require('./routes/studentFeeMaster');
app.use('/api/studentfeemasters', studentFeeMasterRoutes);

// Accountant routes
const accountantRoutes = require('./routes/accountant');
app.use('/api/accountants', accountantRoutes);

// GatewayIns routes
const gatewayInsRoutes = require('./routes/gatewayIns');
app.use('/api/gateway-ins', gatewayInsRoutes);

// Addon routes
const addonRoutes = require('./routes/addon');
app.use('/api/addons', addonRoutes);

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Admin routes
const adminRoutes = require('./routes/admin');
app.use('/api/admins', adminRoutes);

// AdmitCard routes


// Alumni routes
const alumniRoutes = require('./routes/alumni');
app.use('/api/alumnis', alumniRoutes);

// ApplyLeave routes
const applyLeaveRoutes = require('./routes/applyLeave');
app.use('/api/applyleaves', applyLeaveRoutes);

// Audit routes
const auditRoutes = require('./routes/audit');
app.use('/api/audits', auditRoutes);

// Book routes
const bookRoutes = require('./routes/book');
app.use('/api/books', bookRoutes);

// BookIssue routes
const bookIssueRoutes = require('./routes/bookIssue');
app.use('/api/bookissues', bookIssueRoutes);

// BatchSubject routes
const batchSubjectRoutes = require('./routes/batchSubject');
app.use('/api/batchsubjects', batchSubjectRoutes);

// Calendar routes
const calendarRoutes = require('./routes/calendar');
app.use('/api/calendars', calendarRoutes);

// Captcha routes
const captchaRoutes = require('./routes/captcha');
app.use('/api/captchas', captchaRoutes);

// Certificate routes
const certificateRoutes = require('./routes/certificate');
app.use('/api/certificates', certificateRoutes);

// Chat routes
const chatRoutes = require('./routes/chat');
app.use('/api/chats', chatRoutes);

// ChatUser routes
const chatUserRoutes = require('./routes/chatUser');
app.use('/api/chatusers', chatUserRoutes);

// ClassSectionTime routes
const classSectionTimeRoutes = require('./routes/classSectionTime');
app.use('/api/classsectiontimes', classSectionTimeRoutes);

// ClassSection routes
const classSectionRoutes = require('./routes/classSection');
app.use('/api/classsections', classSectionRoutes);

// Complaint routes
const complaintRoutes = require('./routes/complaint');
app.use('/api/complaints', complaintRoutes);

// ComplaintType routes
const complaintTypeRoutes = require('./routes/complaintType');
app.use('/api/complainttypes', complaintTypeRoutes);

// DisableReason routes
const disableReasonRoutes = require('./routes/disableReason');
app.use('/api/disablereasons', disableReasonRoutes);

// EmailConfig routes
const emailConfigRoutes = require('./routes/emailConfig');
app.use('/api/emailconfigs', emailConfigRoutes);

// Exam routes
const examRoutes = require('./routes/exam');
app.use('/api/exams', examRoutes);

// ExamGroup routes
const examGroupRoutes = require('./routes/examGroup');
app.use('/api/examgroups', examGroupRoutes);

// ExamGroupStudent routes
const examGroupStudentRoutes = require('./routes/examGroupStudent');
app.use('/api/examgroupstudents', examGroupStudentRoutes);

// ExamResult routes
const examResultRoutes = require('./routes/examResult');
app.use('/api/examresults', examResultRoutes);

// ExamSchedule routes
const examScheduleRoutes = require('./routes/examSchedule');
app.use('/api/examschedules', examScheduleRoutes);

// ExamStudent routes
const examStudentRoutes = require('./routes/examStudent');
app.use('/api/examstudents', examStudentRoutes);

// ExamSubject routes
const examSubjectRoutes = require('./routes/examSubject');
app.use('/api/examsubjects', examSubjectRoutes);

// FeeDiscount routes
const feeDiscountRoutes = require('./routes/feeDiscount');
app.use('/api/feediscounts', feeDiscountRoutes);

// FeeGroup routes
const feeGroupRoutes = require('./routes/feeGroup');
app.use('/api/feegroups', feeGroupRoutes);

// FeeGroupType routes
const feeGroupTypeRoutes = require('./routes/feeGroupType');
app.use('/api/feegrouptypes', feeGroupTypeRoutes);

// FeeMaster routes
const feeMasterRoutes = require('./routes/feeMaster');
app.use('/api/feemasters', feeMasterRoutes);

// FeeReminder routes
const feeReminderRoutes = require('./routes/feeReminder');
app.use('/api/feereminders', feeReminderRoutes);

// FeeSessionGroup routes
const feeSessionGroupRoutes = require('./routes/feeSessionGroup');
app.use('/api/feesessiongroups', feeSessionGroupRoutes);

// FeeType routes
const feeTypeRoutes = require('./routes/feeType');
app.use('/api/feetypes', feeTypeRoutes);

// StudentTransportFee routes
const studentTransportFeeRoutes = require('./routes/studentTransportFee');
app.use('/api/studenttransportfees', studentTransportFeeRoutes);

// TransportFee routes
const transportFeeRoutes = require('./routes/transportFee');
app.use('/api/transportfees', transportFeeRoutes);

// AdmitCard routes


// CmsMedia routes
const cmsMediaRoutes = require('./routes/cmsMedia');
app.use('/api/cmsmedia', cmsMediaRoutes);

// CmsMenu routes
const cmsMenuRoutes = require('./routes/cmsMenu');
app.use('/api/cmsmenus', cmsMenuRoutes);

// CmsMenuItem routes
const cmsMenuItemRoutes = require('./routes/cmsMenuItem');
app.use('/api/cmsmenuitems', cmsMenuItemRoutes);

// CmsPage routes
const cmsPageRoutes = require('./routes/cmsPage');
app.use('/api/cmspages', cmsPageRoutes);

// CmsPageContent routes
const cmsPageContentRoutes = require('./routes/cmsPageContent');
app.use('/api/cmspagecontents', cmsPageContentRoutes);

// CmsProgram routes
const cmsProgramRoutes = require('./routes/cmsProgram');
app.use('/api/cmsprograms', cmsProgramRoutes);

// Content routes
const contentRoutes = require('./routes/content');
app.use('/api/contents', contentRoutes);

// ContentType routes
const contentTypeRoutes = require('./routes/contentType');
app.use('/api/contenttypes', contentTypeRoutes);

// Currency routes
const currencyRoutes = require('./routes/currency');
app.use('/api/currencies', currencyRoutes);

// CustomField routes
const customFieldRoutes = require('./routes/customField');
app.use('/api/customfields', customFieldRoutes);

// Department routes
const departmentRoutes = require('./routes/department');
app.use('/api/departments', departmentRoutes);

// Designation routes
const designationRoutes = require('./routes/designation');
app.use('/api/designations', designationRoutes);

// Enquiry routes
const enquiryRoutes = require('./routes/enquiry');
app.use('/api/enquiries', enquiryRoutes);

// Expense routes
const expenseRoutes = require('./routes/expense');
app.use('/api/expenses', expenseRoutes);

// Hostel routes
const hostelRoutes = require('./routes/hostel');
app.use('/api/hostels', hostelRoutes);

// HostelRoom routes
const hostelRoomRoutes = require('./routes/hostelRoom');
app.use('/api/hostelrooms', hostelRoomRoutes);

// Income routes
const incomeRoutes = require('./routes/income');
app.use('/api/incomes', incomeRoutes);

// IncomeHead routes
const incomeHeadRoutes = require('./routes/incomeHead');
app.use('/api/incomeheads', incomeHeadRoutes);

// Item routes
const itemRoutes = require('./routes/item');
app.use('/api/items', itemRoutes);

// ItemCategory routes
const itemCategoryRoutes = require('./routes/itemCategory');
app.use('/api/itemcategories', itemCategoryRoutes);

// ItemStore routes
const itemStoreRoutes = require('./routes/itemStore');
app.use('/api/itemstores', itemStoreRoutes);

// ItemSupplier routes
const itemSupplierRoutes = require('./routes/itemSupplier');
app.use('/api/itemsuppliers', itemSupplierRoutes);

// Filetype routes
const filetypeRoutes = require('./routes/filetype');

// StaffTimeline routes
const staffTimelineRoutes = require('./routes/staffTimeline');
app.use('/api/stafftimelines', staffTimelineRoutes);

// StaffUpload routes
const staffUploadRoutes = require('./routes/staffUpload');
app.use('/api/staffuploads', staffUploadRoutes);

// StudentCertificate routes
const studentCertificateRoutes = require('./routes/studentCertificate');
app.use('/api/studentcertificates', studentCertificateRoutes);

// StudentHouse routes
const studentHouseRoutes = require('./routes/studentHouse');
app.use('/api/studenthouses', studentHouseRoutes);

// StudentSibling routes
const studentSiblingRoutes = require('./routes/studentSibling');
app.use('/api/studentsiblings', studentSiblingRoutes);

// Task routes
const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes);

app.use('/api/staff-leave-allotment', require('./routes/staffLeaveAllotment'));

// Teacher routes
const teacherRoutes = require('./routes/teacher');
app.use('/api/teachers', teacherRoutes);

// Work routes
const workRoutes = require('./routes/work');
app.use('/api/works', workRoutes);

// Year routes
const yearRoutes = require('./routes/year');
app.use('/api/years', yearRoutes);

// Document routes
const documentRoutes = require('./routes/document');
app.use('/api/documents', documentRoutes);

// ExamAttendance routes
const examAttendanceRoutes = require('./routes/examAttendance');
app.use('/api/examattendances', examAttendanceRoutes);

// FeesGroup routes
const feesGroupRoutes = require('./routes/feesGroup');
app.use('/api/feesgroups', feesGroupRoutes);

// FeesGroupStudent routes
const feesGroupStudentRoutes = require('./routes/feesGroupStudent');
app.use('/api/feesgroupstudents', feesGroupStudentRoutes);

// FeesMaster routes
const feesMasterRoutes = require('./routes/feesMaster');
app.use('/api/feesmasters', feesMasterRoutes);

// FeesFine routes
const feesFineRoutes = require('./routes/feesFine');
app.use('/api/feesfines', feesFineRoutes);

// FeesPayment routes
const feesPaymentRoutes = require('./routes/feesPayment');
app.use('/api/feespayments', feesPaymentRoutes);

// FeesReceipt routes
const feesReceiptRoutes = require('./routes/feesReceipt');
app.use('/api/feesreceipts', feesReceiptRoutes);

// FeesStatement routes
const feesStatementRoutes = require('./routes/feesStatement');
app.use('/api/feesstatements', feesStatementRoutes);

// FeesStructure routes
const feesStructureRoutes = require('./routes/feesStructure');
app.use('/api/feesstructures', feesStructureRoutes);

// FeesTypeDiscount routes
const feesTypeDiscountRoutes = require('./routes/feesTypeDiscount');
app.use('/api/feestypediscounts', feesTypeDiscountRoutes);

// FineMaster routes
const fineMasterRoutes = require('./routes/fineMaster');
app.use('/api/finemasters', fineMasterRoutes);

// DueFee routes
const dueFeeRoutes = require('./routes/dueFee');
app.use('/api/duefees', dueFeeRoutes);

// EnquiryFollowup routes
const enquiryFollowupRoutes = require('./routes/enquiryFollowup');
app.use('/api/enquiryfollowups', enquiryFollowupRoutes);

// ExamFee routes
const examFeeRoutes = require('./routes/examFee');
app.use('/api/examfees', examFeeRoutes);

// FeesAllocation routes
const feesAllocationRoutes = require('./routes/feesAllocation');
app.use('/api/feesallocations', feesAllocationRoutes);

// FeesDiscountAllocation routes
const feesDiscountAllocationRoutes = require('./routes/feesDiscountAllocation');
app.use('/api/feesdiscountallocations', feesDiscountAllocationRoutes);

// Holiday routes
const holidayRoutes = require('./routes/holiday');
app.use('/api/holidays', holidayRoutes);

// HostelDues routes
const hostelDuesRoutes = require('./routes/hostelDues');
app.use('/api/hosteldues', hostelDuesRoutes);

// HostelRoomType routes
const hostelRoomTypeRoutes = require('./routes/hostelRoomType');
app.use('/api/hostelroomtypes', hostelRoomTypeRoutes);

// Inventory routes
const inventoryRoutes = require('./routes/inventory');
app.use('/api/inventories', inventoryRoutes);

// Invoice routes
const invoiceRoutes = require('./routes/invoice');
app.use('/api/invoices', invoiceRoutes);

// Job routes
const jobRoutes = require('./routes/job');
app.use('/api/jobs', jobRoutes);

// LeaveType routes
const leaveTypeRoutes = require('./routes/leaveType');
app.use('/api/leavetypes', leaveTypeRoutes);

// Lesson routes
const lessonRoutes = require('./routes/lesson');
app.use('/api/lessons', lessonRoutes);

// LessonPlan routes
const lessonPlanRoutes = require('./routes/lessonPlan');
app.use('/api/lessonplans', lessonPlanRoutes);

// Loan routes
const loanRoutes = require('./routes/loan');
app.use('/api/loans', loanRoutes);

// Log routes
const logRoutes = require('./routes/log');
app.use('/api/logs', logRoutes);

// Notice routes
const noticeRoutes = require('./routes/notice');
app.use('/api/notices', noticeRoutes);

// PaymentMode routes
const paymentModeRoutes = require('./routes/paymentMode');
app.use('/api/paymentmodes', paymentModeRoutes);

// Photo routes
const photoRoutes = require('./routes/photo');
app.use('/api/photos', photoRoutes);

// Post routes
const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

// StaffLeaveDetail routes
const staffLeaveDetailRoutes = require('./routes/staffLeaveDetail');
app.use('/api/staffleavedetails', staffLeaveDetailRoutes);

// StaffLeave routes
const staffLeaveRoutes = require('./routes/staffLeave');
app.use('/api/staffleaves', staffLeaveRoutes);

// SubjectGroupSubject routes
const subjectGroupSubjectRoutes = require('./routes/subjectGroupSubject');
app.use('/api/subjectgroupsubjects', subjectGroupSubjectRoutes);

// SubjectSyllabus routes
const subjectSyllabusRoutes = require('./routes/subjectSyllabus');
app.use('/api/subjectsyllabi', subjectSyllabusRoutes);

// NotificationSetting routes
const notificationSettingRoutes = require('./routes/notificationSetting');
app.use('/api/notificationsettings', notificationSettingRoutes);

// Module routes
const moduleRoutes = require('./routes/module');
app.use('/api/modules', moduleRoutes);

// ModulePermission routes
const modulePermissionRoutes = require('./routes/modulePermission');
app.use('/api/modulepermissions', modulePermissionRoutes);

// RolePermission routes
const rolePermissionRoutes = require('./routes/rolePermission');
app.use('/api/rolepermissions', rolePermissionRoutes);

// Reference routes
const referenceRoutes = require('./routes/reference');
app.use('/api/references', referenceRoutes);

// Resume routes
const resumeRoutes = require('./routes/resume');
app.use('/api/resumes', resumeRoutes);

// RoomType routes
const roomTypeRoutes = require('./routes/roomType');
app.use('/api/roomtypes', roomTypeRoutes);

// SmsConfig routes
const smsConfigRoutes = require('./routes/smsConfig');
app.use('/api/smsconfigs', smsConfigRoutes);

// StaffBankDetails routes
const staffBankDetailsRoutes = require('./routes/staffBankDetails');
app.use('/api/staffbankdetails', staffBankDetailsRoutes);

// StaffCertificate routes
const staffCertificateRoutes = require('./routes/staffCertificate');
app.use('/api/staffcertificates', staffCertificateRoutes);

// StaffChild routes
const staffChildRoutes = require('./routes/staffChild');
app.use('/api/staffchildren', staffChildRoutes);

// StaffContact routes
const staffContactRoutes = require('./routes/staffContact');
app.use('/api/staffcontacts', staffContactRoutes);

// StaffExperience routes
const staffExperienceRoutes = require('./routes/staffExperience');
app.use('/api/staffexperiences', staffExperienceRoutes);

// Staff routes
const staffRoutes = require('./routes/staff');
app.use('/api/staff', staffRoutes);

// Visitor routes
const visitorRoutes = require('./routes/visitor');
app.use('/api/visitors', visitorRoutes);

// VisitorsPurpose routes
const visitorsPurposeRoutes = require('./routes/visitorsPurpose');
app.use('/api/visitorspurposes', visitorsPurposeRoutes);

// StudentSession routes
const studentSessionRoutes = require('./routes/studentSession');
app.use('/api/studentsessions', studentSessionRoutes);

// SchoolHouse routes
const schoolHouseRoutes = require('./routes/schoolHouse');
app.use('/api/schoolhouses', schoolHouseRoutes);

// SmsTemplate routes
const smsTemplateRoutes = require('./routes/smsTemplate');
app.use('/api/smstemplates', smsTemplateRoutes);

// Source routes
const sourceRoutes = require('./routes/source');
app.use('/api/sources', sourceRoutes);

// VehicleRoute routes
const vehicleRouteRoutes = require('./routes/vehicleRoute');
app.use('/api/vehicleroutes', vehicleRouteRoutes);

// VideoTutorial routes
const videoTutorialRoutes = require('./routes/videoTutorial');
app.use('/api/videotutorials', videoTutorialRoutes);

// VideoTutorialClassSection routes
const videoTutorialClassSectionRoutes = require('./routes/videoTutorialClassSection');
app.use('/api/videotutorialclasssections', videoTutorialClassSectionRoutes);

// EmailAttachment routes
const emailAttachmentRoutes = require('./routes/emailAttachment');
app.use('/api/emailattachments', emailAttachmentRoutes);

// EmailTemplate routes
const emailTemplateRoutes = require('./routes/emailTemplate');
app.use('/api/emailtemplates', emailTemplateRoutes);

// EmailTemplateAttachment routes
const emailTemplateAttachmentRoutes = require('./routes/emailTemplateAttachment');
app.use('/api/emailtemplateattachments', emailTemplateAttachmentRoutes);

// HomeworkEvaluation routes
const homeworkEvaluationRoutes = require('./routes/homeworkEvaluation');
app.use('/api/homeworkevaluations', homeworkEvaluationRoutes);

// PickupPoint routes
const pickupPointRoutes = require('./routes/pickupPoint');
app.use('/api/pickuppoints', pickupPointRoutes);

// Vehicle routes
const vehicleRoutes = require('./routes/vehicle');
app.use('/api/vehicles', vehicleRoutes);

// Dispatch routes
const dispatchRoutes = require('./routes/dispatch');
app.use('/api/dispatch', dispatchRoutes);

// Librarian routes
const librarianRoutes = require('./routes/librarian');
app.use('/api/librarians', librarianRoutes);

// Mark routes
const markRoutes = require('./routes/mark');
app.use('/api/marks', markRoutes);

// Notification routes
const notificationRoutes = require('./routes/notification');
app.use('/api/notifications', notificationRoutes);

// OfflinePayment routes
const offlinePaymentRoutes = require('./routes/offlinePayment');
app.use('/api/offlinepayments', offlinePaymentRoutes);

// Payroll routes
const payrollRoutes = require('./routes/payroll');
app.use('/api/payrolls', payrollRoutes);

// Question routes
const questionRoutes = require('./routes/question');
app.use('/api/questions', questionRoutes);

// Role routes
const roleRoutes = require('./routes/role');
app.use('/api/roles', roleRoutes);

// TransportRoute routes
const transportRouteRoutes = require('./routes/transportRoute');
app.use('/api/transportroutes', transportRouteRoutes);

// RoutePickupPoint routes
const routePickupPointRoutes = require('./routes/routePickupPoint');
app.use('/api/routepickuppoints', routePickupPointRoutes);

// Setting routes
const settingRoutes = require('./routes/setting');
app.use('/api/settings', settingRoutes);

// StaffAttendanceSchedule routes
const staffAttendanceScheduleRoutes = require('./routes/staffAttendanceSchedule');
app.use('/api/staffattendanceschedules', staffAttendanceScheduleRoutes);

// StudentAttendanceSchedule routes
const studentAttendanceScheduleRoutes = require('./routes/studentAttendanceSchedule');
app.use('/api/studentattendanceschedules', studentAttendanceScheduleRoutes);

// Subject routes
const subjectRoutes = require('./routes/subject');
app.use('/api/subjects', subjectRoutes);

// Syllabus routes
const syllabusRoutes = require('./routes/syllabus');
app.use('/api/syllabi', syllabusRoutes);

// AdmitCard routes


// Phone Call Log routes
const phoneCallLogRoutes = require('./routes/phoneCallLog');
app.use('/api/phonecalllogs', phoneCallLogRoutes);

// Marksheet routes
const marksheetRoutes = require('./routes/marksheet');
app.use('/api/marksheets', marksheetRoutes);

// Message routes
const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);

// Promotion routes
const promotionRoutes = require('./routes/promotion');
app.use('/api/promotions', promotionRoutes);

// QuestionGroup routes
const questionGroupRoutes = require('./routes/questionGroup');
app.use('/api/questiongroups', questionGroupRoutes);

// QuestionOption routes
const questionOptionRoutes = require('./routes/questionOption');
app.use('/api/questionoptions', questionOptionRoutes);

// Remark routes
const remarkRoutes = require('./routes/remark');
app.use('/api/remarks', remarkRoutes);

// Salary routes
const salaryRoutes = require('./routes/salary');
app.use('/api/salaries', salaryRoutes);

// SubjectTeacher routes
const subjectTeacherRoutes = require('./routes/subjectTeacher');
app.use('/api/subjectteachers', subjectTeacherRoutes);

// Langpharses routes
const langpharsesRoutes = require('./routes/langpharses');
app.use('/api/langpharses', langpharsesRoutes);

// Userlog routes
const userlogRoutes = require('./routes/userlog');
app.use('/api/userlogs', userlogRoutes);

// GatewayIns routes

// IdCard routes
const idCardRoutes = require('./routes/idCard');
app.use('/api/idcards', idCardRoutes);

// Language routes
const languageRoutes = require('./routes/language');
app.use('/api/languages', languageRoutes);

// OnlineExam routes
const onlineExamRoutes = require('./routes/onlineExam');
app.use('/api/onlineexams', onlineExamRoutes);

// OnlineExamQuestion routes
const onlineExamQuestionRoutes = require('./routes/onlineExamQuestion');
app.use('/api/onlineexamquestions', onlineExamQuestionRoutes);

// OnlineExamResult routes
const onlineExamResultRoutes = require('./routes/onlineExamResult');
app.use('/api/onlineexamresults', onlineExamResultRoutes);

// SubjectAttendance routes
const subjectAttendanceRoutes = require('./routes/subjectAttendance');
app.use('/api/subjectattendances', subjectAttendanceRoutes);

// SubjectAttendanceType routes
const subjectAttendanceTypeRoutes = require('./routes/subjectAttendanceType');
app.use('/api/subjectattendancetypes', subjectAttendanceTypeRoutes);

// Start Server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
