import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { isValidEmail } from '../../utils/validators';
import { loginAdmin, clearAuthError } from '../../store/slices/authSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error: authError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const fromPath = location.state?.from?.pathname || '/admin';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (authError) {
      dispatch(clearAuthError());
    }
  };

  const validate = () => {
    const errors = {};
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      errors.email = 'Email address is required';
    } else if (!isValidEmail(trimmedEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await dispatch(
        loginAdmin({
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();

      // Navigate to destination upon successful login
      navigate(fromPath, { replace: true });
    } catch {
      // Error handled by redux slice & displayed via authError
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {authError && (
        <Alert
          type="error"
          title="Authentication Failed"
          message={authError}
          onClose={() => dispatch(clearAuthError())}
        />
      )}

      {/* Email Input */}
      <Input
        id="email"
        name="email"
        type="email"
        label="Admin Email"
        required
        value={formData.email}
        onChange={handleChange}
        placeholder="admin@example.com"
        error={formErrors.email}
        disabled={loading}
        autoComplete="email"
      />

      {/* Password Input with show/hide toggle */}
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••••••"
          error={formErrors.password}
          disabled={loading}
          autoComplete="current-password"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition p-1"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          icon={LogIn}
          className="w-full py-3"
        >
          Sign In to Admin Workspace
        </Button>
      </div>
    </form>
  );
}
