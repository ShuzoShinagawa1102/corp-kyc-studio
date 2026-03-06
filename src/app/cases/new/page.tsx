'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductType, RiskTier } from '@/types';

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    companyName: '',
    registrationNumber: '',
    jurisdiction: '',
    industry: '',
    productType: 'Corporate Account' as ProductType,
    riskTier: 'Medium' as RiskTier,
    assignedTo: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.companyName ||
      !form.registrationNumber ||
      !form.jurisdiction ||
      !form.industry ||
      !form.assignedTo
    ) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          legalEntity: {
            registeredName: form.companyName,
            registrationNumber: form.registrationNumber,
            jurisdiction: form.jurisdiction,
            industry: form.industry,
          },
          productType: form.productType,
          riskTier: form.riskTier,
          assignedTo: form.assignedTo,
        }),
      });
      if (!res.ok) throw new Error('Failed to create case');
      const newCase = await res.json();
      router.push(`/cases/${newCase.caseId}`);
    } catch {
      setError('Failed to create case. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New KYC Case</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new corporate onboarding case
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 w-full">
              Legal Entity Information
            </legend>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corporation Ltd"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="registrationNumber"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="registrationNumber"
                    name="registrationNumber"
                    type="text"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. GB12345678"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jurisdiction"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Jurisdiction <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="jurisdiction"
                    name="jurisdiction"
                    type="text"
                    value={form.jurisdiction}
                    onChange={handleChange}
                    placeholder="e.g. United Kingdom"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Industry <span className="text-red-500">*</span>
                </label>
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Manufacturing"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 w-full">
              Case Configuration
            </legend>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="productType"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    value={form.productType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Corporate Account">Corporate Account</option>
                    <option value="Trade Finance">Trade Finance</option>
                    <option value="FX">FX</option>
                    <option value="Loans">Loans</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="riskTier"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Risk Tier <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="riskTier"
                    name="riskTier"
                    value={form.riskTier}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Assigned Analyst <span className="text-red-500">*</span>
                </label>
                <input
                  id="assignedTo"
                  name="assignedTo"
                  type="text"
                  value={form.assignedTo}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Chen"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </fieldset>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating Case...' : 'Create Case'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
