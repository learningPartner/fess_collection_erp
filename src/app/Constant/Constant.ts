import { environment } from '../../environments/environment.development';
import { IDashboarddata } from '../Model/interface/dashboardData';

const envirURL = environment.API_URL;

export const VALIDATION_MESSAGE  = {
  required: 'This is Required',
  minLength: 'mIN 10 Cher Needed'
}


export const Constant = {
  VALIDATION_MESSAGE: {
    REQUIRED: ' is required',
    MOB_MIN_LENGTH: 'Min 10 character is required',
    MIN_ZIPCODE_LENGTH: 'Min 6 character is required',
  },

  REGULAR_EXPRESSION: {
    EMAIL: '',
    AADHAR_CARD: '',
  },
  API_METHOD: {
    STUDENT: {
      GET_ALL_STUDENT: 'GetStudents',
      CREATE_STUDENT: 'CreateStudent',
      UPDATE_STUDENT: 'UpdateStudent',
      DELETE_STUDENT: 'DeleteStudentById',
      GetStudentBatchesWithFees: 'student/GetStudentBatchesWithFees',
    },
    ENROLLMENT: { GET_ENROLLMENTS: envirURL + 'GetEnrollments' },
    DASHBOARD_DATA: { GET_DASHBOARD_DATA: envirURL + 'GetDashboardData' },
    PAYMENTS: {
      GET_FEES: envirURL + 'GetFees',
    },
    BATCH: {
      GET_BATCH: envirURL + 'GetBatches',
    },
  },

  menuItems: [
    {
      icon: 'bi-house me-2',
      label: 'Dashboard',
      routerLink: '/admin/dashboard',
    },
    {
      icon: 'bi-mortarboard-fill me-2',
      label: 'Students',
      routerLink: '/admin/student',
    },
    {
      icon: 'bi-book me-2',
      label: 'New Batch',
      routerLink: '/admin/batch/0',
    },
    {
      icon: 'bi-book me-2',
      label: 'Batches',
      routerLink: '/admin/batches',
    },
    {
      icon: 'bi bi-person me-2',
      label: 'Teacher',
      routerLink: '/admin/dashboard',
    },
    {
      icon: 'bi bi-person me-2',
      label: 'Enrollment',
      routerLink: '/admin/enrollments/0',
    },
    {
      icon: 'bi bi-cash me-2',
      label: 'Payment',
      routerLink: '/admin/dashboard',
    },
    {
      icon: 'bi bi-cash me-2',
      label: 'Pending payments',
      routerLink: '/admin/dashboard',
    },
    {
      icon: 'bi bi-gear me-2',
      label: 'Setting',
      routerLink: '/admin/dashboard',
    },
  ],

  modalForm: [
    {
      icon: 'bi-person',
      type: 'text',
      formControlName: 'name',
      id: 'name',
      placeholder: 'Name',
      validation_msg: 'Name is required',
    },
    {
      icon: 'bi-envelope',
      type: 'email',
      formControlName: 'email',
      id: 'email',
      placeholder: 'Email',
      validation_msg: 'Email is required',
    },
    {
      icon: 'bi-telephone-fill',
      type: 'text',
      formControlName: 'phone',
      id: 'phone',
      placeholder: 'Phone',
      validation_msg: 'Phone is required',
      min_length_msg: 'Minimum 10 digits is required',
    },

    {
      icon: 'bi-geo-alt-fill',
      type: 'text',
      formControlName: 'address',
      id: 'address',
      placeholder: 'Address',
      validation_msg: 'Address is required',
    },
    {
      icon: 'bi-buildings-fill',
      type: 'text',
      formControlName: 'city',
      id: 'city',
      placeholder: 'City',
      validation_msg: 'City is required',
    },
    {
      icon: 'bi-geo-fill',
      type: 'text',
      formControlName: 'pinCode',
      id: 'pinCode',
      placeholder: 'Pincode',
      validation_msg: 'Pincode is required',
      min_length_msg: 'Minimum 6 digits is required',
    },
  ],
};
