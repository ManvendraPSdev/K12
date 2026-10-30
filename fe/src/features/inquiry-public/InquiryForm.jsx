import { useState } from 'react';
import { Send, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  USER_TYPES,
  USER_TYPE_LABELS,
  INQUIRY_CATEGORIES,
  INQUIRY_CATEGORY_LABELS,
} from '../../config/constants';
import {
  validateInquiryForm,
  normalizePhoneNumber,
} from '../../utils/validators';
import { submitPublicInquiry } from '../../services/inquiryService';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  userType: '',
  category: '',
  message: '',
};

export default function InquiryForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  const userTypeOptions = Object.values(USER_TYPES).map((type) => ({
    value: type,
    label: USER_TYPE_LABELS[type] || type,
  }));

  const categoryOptions = Object.values(INQUIRY_CATEGORIES).map((cat) => ({
    value: cat,
    label: INQUIRY_CATEGORY_LABELS[cat] || cat,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (serverError) {
      setServerError(null);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setFieldErrors({});
    setServerError(null);
    setSubmittedInquiry(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while in flight
    if (isSubmitting) return;

    // Reset error banners
    setServerError(null);

    // 1. Client-side validation
    const { isValid, errors } = validateInquiryForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // 2. Prepare payload exactly adhering to backend Zod schema
    // Note: status is strictly omitted; backend assigns PENDING by default
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: normalizePhoneNumber(formData.phone),
      userType: formData.userType,
      category: formData.category,
      message: formData.message.trim(),
    };

    try {
      const response = await submitPublicInquiry(payload);
      const created = response?.data?.inquiry || {
        ...payload,
        createdAt: new Date().toISOString(),
      };

      setSubmittedInquiry(created);
      // Clear form on success
      setFormData(INITIAL_FORM_STATE);
      setFieldErrors({});
    } catch (error) {
      const errorData = error.response?.data;

      if (errorData?.errors && Array.isArray(errorData.errors)) {
        // Backend Zod validation errors mapping
        const backendFieldErrors = {};
        errorData.errors.forEach((err) => {
          if (err.field) {
            backendFieldErrors[err.field] = err.message;
          }
        });

        if (Object.keys(backendFieldErrors).length > 0) {
          setFieldErrors(backendFieldErrors);
        }

        setServerError({
          title: 'Validation Notice',
          message: errorData.message || 'Please review the highlighted fields below.',
          details: errorData.errors,
        });
      } else {
        // General or network error
        setServerError({
          title: 'Submission Failed',
          message:
            errorData?.message ||
            'Unable to submit inquiry at this moment. Please check your connection and try again.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view state after submission
  if (submittedInquiry) {
    return (
      <div className="bg-white border border-emerald-100 rounded-2xl p-8 sm:p-10 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inquiry Submitted Successfully!
          </h3>
          <p className="text-sm text-slate-600">
            Thank you, <strong className="text-slate-800">{submittedInquiry.name}</strong>. Your inquiry has been logged into our system. An educational counselor will review your request and get in touch shortly.
          </p>
        </div>

        {submittedInquiry.id && (
          <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-600">
            Reference ID:{' '}
            <code className="font-mono text-indigo-700 font-semibold">{submittedInquiry.id}</code>
          </div>
        )}

        <div className="pt-2">
          <Button
            variant="outline"
            icon={RotateCcw}
            onClick={handleReset}
            className="w-full sm:w-auto"
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900">Submit an Inquiry</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Have a question about admissions, scholarships, or upcoming concerts? Tell us what you need and our team will assist you.
        </p>
      </div>

      {serverError && (
        <Alert
          type="error"
          title={serverError.title}
          message={serverError.message}
          errors={serverError.details}
          onClose={() => setServerError(null)}
        />
      )}

      {/* Row 1: User Type & Inquiry Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          id="userType"
          name="userType"
          label="I am a"
          required
          value={formData.userType}
          onChange={handleChange}
          options={userTypeOptions}
          placeholder="Select who you are"
          error={fieldErrors.userType}
          disabled={isSubmitting}
        />

        <Select
          id="category"
          name="category"
          label="Inquiry Category"
          required
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          placeholder="Select topic of inquiry"
          error={fieldErrors.category}
          disabled={isSubmitting}
        />
      </div>

      {/* Row 2: Full Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          error={fieldErrors.name}
          disabled={isSubmitting}
          autoComplete="name"
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. john@example.com"
          error={fieldErrors.email}
          disabled={isSubmitting}
          autoComplete="email"
        />
      </div>

      {/* Row 3: Phone Number */}
      <Input
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        required
        value={formData.phone}
        onChange={handleChange}
        placeholder="e.g. +1 234 567 8900 or 9876543210"
        error={fieldErrors.phone}
        disabled={isSubmitting}
        autoComplete="tel"
        helperText="7 to 15 digits. Spaces and hyphens are automatically normalized."
      />

      {/* Row 4: Message */}
      <Textarea
        id="message"
        name="message"
        label="Inquiry Message"
        required
        rows={5}
        maxLength={2000}
        value={formData.message}
        onChange={handleChange}
        placeholder="Please describe your inquiry, question, or specific requirement in detail..."
        error={fieldErrors.message}
        disabled={isSubmitting}
      />

      {/* Submit Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
        <p className="text-xs text-slate-500 order-2 sm:order-1">
          <span className="text-rose-500 font-semibold">*</span> All fields are required.
        </p>
        <div className="flex items-center space-x-3 w-full sm:w-auto order-1 sm:order-2">
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            icon={Send}
            className="w-full sm:w-auto px-6 py-3"
          >
            Submit Inquiry
          </Button>
        </div>
      </div>
    </form>
  );
}
