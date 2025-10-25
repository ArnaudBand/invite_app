"use client";

import React, { useState } from 'react';
import { Calendar, Users, User, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const APPWRITE_CONFIG = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'YOUR_PROJECT_ID',
  databaseId: 'YOUR_DATABASE_ID',
  collectionId: 'YOUR_COLLECTION_ID'
};

export default function ApostlesInvitation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guestType: 'single',
    partnerName: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.attendance) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.attendance === 'accept' && formData.guestType === 'couple' && !formData.partnerName) {
      setError('Please enter your partner\'s name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save to Appwrite
      // In production, replace with actual Appwrite SDK calls:
      // const sdk = new Appwrite();
      // sdk.setEndpoint(APPWRITE_CONFIG.endpoint).setProject(APPWRITE_CONFIG.projectId);
      // const databases = new Databases(sdk);
      // await databases.createDocument(
      //   APPWRITE_CONFIG.databaseId,
      //   APPWRITE_CONFIG.collectionId,
      //   'unique()',
      //   formData
      // );

      // Send email notification if accepted
      if (formData.attendance === 'accept') {
        const response = await fetch('/api/send-invitation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Failed to send email notification');
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            {formData.attendance === 'accept' ? (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500 mx-auto" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {formData.attendance === 'accept' ? 'Thank You!' : 'We Understand'}
          </h2>
          <p className="text-gray-600 text-lg">
            {formData.attendance === 'accept'
              ? `We're delighted you'll be joining us, ${formData.name}! We look forward to celebrating with you${formData.guestType === 'couple' ? ' and ' + formData.partnerName : ''}.`
              : `Thank you for letting us know, ${formData.name}. You'll be in our thoughts.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white text-center">
          <div className="mb-4">
            <div className="inline-block p-3 bg-white bg-opacity-20 rounded-full">
              <Calendar className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">You&apos;re Invited!</h1>
          <p className="text-xl text-amber-50">Celebration of Apostleship</p>
        </div>

        <div className="p-8">
          <div className="mb-8 text-center">
            <p className="text-gray-700 text-lg mb-4">
              We are honored to invite you to join us in celebrating the sacred news of being titled as Apostles.
            </p>
            <div className="inline-flex items-center gap-2 text-amber-700 font-semibold text-xl">
              <Calendar className="w-6 h-6" />
              <span>November 1st, 2025</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent black outline-none transition"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border black border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Will you attend? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'accept' })}
                  className={`p-4 border-2 rounded-lg font-semibold transition-all ${formData.attendance === 'accept'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-green-300'
                    }`}
                >
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'decline' })}
                  className={`p-4 border-2 rounded-lg font-semibold transition-all ${formData.attendance === 'decline'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-red-300'
                    }`}
                >
                  <XCircle className="w-6 h-6 mx-auto mb-2" />
                  Decline
                </button>
              </div>
            </div>

            {formData.attendance === 'accept' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Attending as *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestType: 'single', partnerName: '' })}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${formData.guestType === 'single'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-300 hover:border-amber-300'
                        }`}
                    >
                      <User className="w-6 h-6 mx-auto mb-2" />
                      Single
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestType: 'couple' })}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${formData.guestType === 'couple'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-300 hover:border-amber-300'
                        }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      Couple
                    </button>
                  </div>
                </div>

                {formData.guestType === 'couple' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Partner&apos;s Name *
                    </label>
                    <input
                      type="text"
                      value={formData.partnerName}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full px-4 py-3 border black border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                      placeholder="Enter partner's full name"
                    />
                  </div>
                )}
              </>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.attendance || loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Response'
              )}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>We look forward to celebrating this blessed occasion with you</p>
          </div>
        </div>
      </div>
    </div>
  );
}