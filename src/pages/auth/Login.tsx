// src/components/LoginPage.tsx
import React from 'react';
import { useFormik } from 'formik';
import { LoginSchema } from '@/utils/validation/YupSchema';
import { InitLogin } from '@/utils/initValues/InitValues';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/utils/helpers/enums';
import LOGO from '@/assets/drbooking-logo-1.png';
import { Navigate } from 'react-router';

const LoginPage: React.FC = () => {

  const { login, loading } = useAuth();

  const formik = useFormik({
    initialValues: {
      ...InitLogin,
      remember: false,   // add remember field
    },
    validationSchema: LoginSchema, // no change needed here
    onSubmit: ({ email, password, remember }) =>
      login(email, password, remember),
  });



  return (
    <div className="min-h-screen flex">
      {/* Left image panel */}
      <div
        className="hidden lg:block w-1/2 relative p-8"
        style={{
          backgroundImage: `url(${LOGO})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'content-box',
        }}
      >
        {/* Fading divider */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '1px',
            backgroundImage: `linear-gradient(to bottom, transparent, ${Colors.Border}, transparent)`,
          }}
        />
      </div>

      {/* Right form panel */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
        style={{ backgroundColor: Colors.Background }}
      >
        <div className="w-full max-w-md bg-surface rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-2" style={{ color: Colors.TextPrimary }}>
            Welcome Back
          </h2>
          <p className="mb-6" style={{ color: Colors.TextSecondary }}>
            Book your next medical appointment in just a few clicks.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-medium mb-1" style={{ color: Colors.TextPrimary }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{
                  borderWidth: 1,
                  borderColor:
                    formik.touched.email && formik.errors.email
                      ? Colors.Error
                      : Colors.Border,
                }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                onFocus={e =>
                  (e.currentTarget.style.boxShadow = `0 0 0 2px ${Colors.PrimaryLight}`)
                }
                onBlurCapture={e => (e.currentTarget.style.boxShadow = '')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm" style={{ color: Colors.Error }}>
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1" style={{ color: Colors.TextPrimary }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={{
                  borderWidth: 1,
                  borderColor:
                    formik.touched.password && formik.errors.password
                      ? Colors.Error
                      : Colors.Border,
                }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                onFocus={e =>
                  (e.currentTarget.style.boxShadow = `0 0 0 2px ${Colors.PrimaryLight}`)
                }
                onBlurCapture={e => (e.currentTarget.style.boxShadow = '')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm" style={{ color: Colors.Error }}>
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
              
                id="remember"
                type="checkbox"
                name="remember"
                onChange={formik.handleChange}
                checked={formik.values.remember}
                className="h-4 w-4 text-primary rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm" style={{ color: Colors.TextSecondary }}>
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                backgroundColor: Colors.Primary,
                color: Colors.Surface,
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = Colors.PrimaryDark)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = Colors.Primary)
              }
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
