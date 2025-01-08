import { environment } from '../../environments/environment.development';

const envirURL = environment.API_URL;

export const Constant = {
  VALIDATION_MESSAGE: {
    REQUIRED: 'This Is Required',
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
    },
    ENROLLMENT: { GET_ENROLLMENTS: envirURL + 'GetEnrollments' },
    DASHBOARD_DATA: { GET_DASHBOARD_DATA: envirURL + 'GetDashboardData' },
    PAYMENTS: {
      GET_FEES: envirURL + 'GetFees',
    },
  },
};
