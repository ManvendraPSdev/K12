export const USER_TYPES = {
  PARENT: 'PARENT',
  STUDENT: 'STUDENT',
  SCHOOL: 'SCHOOL',
};

export const USER_TYPE_LABELS = {
  PARENT: 'Parent',
  STUDENT: 'Student',
  SCHOOL: 'School / Institution',
};

export const INQUIRY_CATEGORIES = {
  SCHOLARSHIP: 'SCHOLARSHIP',
  CONCERT: 'CONCERT',
  ADMISSION: 'ADMISSION',
  GENERAL_QUERY: 'GENERAL_QUERY',
};

export const INQUIRY_CATEGORY_LABELS = {
  SCHOLARSHIP: 'Scholarship',
  CONCERT: 'Concert',
  ADMISSION: 'Admission',
  GENERAL_QUERY: 'General Query',
};

export const INQUIRY_STATUSES = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
};

export const INQUIRY_STATUS_LABELS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
};

export const STATUS_COLORS = {
  PENDING: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  IN_PROGRESS: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  RESOLVED: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
};

export const DEFAULT_PAGE_LIMIT = 10;
export const PAGE_LIMIT_OPTIONS = [5, 10, 25, 50];
