"use client";

import React, { useState } from 'react';
import { Calendar, Users, User, CheckCircle, XCircle, Loader2, MapPin, Clock } from 'lucide-react';

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
      // In production, replace with actual Appwrite SDK calls

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
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-fade-in">
          <div className="mb-8">
            {formData.attendance === 'accept' ? (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full">
                <XCircle className="w-16 h-16 text-red-600" />
              </div>
            )}
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {formData.attendance === 'accept' ? 'Thank You!' : 'We Understand'}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {formData.attendance === 'accept'
              ? `We're delighted you'll be joining us, ${formData.name}! We look forward to celebrating with you${formData.guestType === 'couple' ? ' and ' + formData.partnerName : ''}.`
              : `Thank you for letting us know, ${formData.name}. You'll be in our thoughts.`}
          </p>
          {formData.attendance === 'accept' && (
            <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200">
              <p className="text-amber-900 font-semibold mb-2">Save the Date</p>
              <p className="text-amber-800 text-lg">November 1st, 2025</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          <div className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 p-8 sm:p-12 text-white text-center">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                  <Calendar className="w-14 h-14" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">You&apos;re Invited!</h1>
              <div className="h-1 w-24 bg-white opacity-50 mx-auto mb-4"></div>
              <p className="text-2xl sm:text-3xl text-amber-50 font-light mb-2">Celebration of Apostleship</p>
              <p className="text-xl text-amber-100 font-semibold">Irambona Denis & Elysee</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-gradient-to-b from-amber-50 to-white p-6 sm:p-8 border-b border-gray-100">
            <div className="text-center mb-6">
              <p className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                We are honored to invite you to join us in celebrating the sacred news of being titled as Apostles.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Date</p>
                  <p className="text-gray-800 font-semibold">November 1st, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Time</p>
                  <p className="text-gray-800 font-semibold">TBA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RSVP Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">RSVP</h2>
            <p className="text-gray-600">Please let us know if you can join us</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-black bg-white"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-black bg-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Will you attend? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'accept' })}
                  className={`p-6 border-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${formData.attendance === 'accept'
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-lg scale-105'
                    : 'border-gray-300 hover:border-green-300 bg-white'
                    }`}
                >
                  <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                  <span className="text-lg">Accept</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'decline' })}
                  className={`p-6 border-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${formData.attendance === 'decline'
                    ? 'border-red-500 bg-red-50 text-red-700 shadow-lg scale-105'
                    : 'border-gray-300 hover:border-red-300 bg-white'
                    }`}
                >
                  <XCircle className="w-8 h-8 mx-auto mb-3" />
                  <span className="text-lg">Decline</span>
                </button>
              </div>
            </div>

            {formData.attendance === 'accept' && (
              <div className="space-y-6 pt-4 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    Attending as *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestType: 'single', partnerName: '' })}
                      className={`p-6 border-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${formData.guestType === 'single'
                        ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-lg scale-105'
                        : 'border-gray-300 hover:border-amber-300 bg-white'
                        }`}
                    >
                      <User className="w-8 h-8 mx-auto mb-3" />
                      <span className="text-lg">Single</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestType: 'couple' })}
                      className={`p-6 border-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${formData.guestType === 'couple'
                        ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-lg scale-105'
                        : 'border-gray-300 hover:border-amber-300 bg-white'
                        }`}
                    >
                      <Users className="w-8 h-8 mx-auto mb-3" />
                      <span className="text-lg">Couple</span>
                    </button>
                  </div>
                </div>

                {formData.guestType === 'couple' && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Partner&apos;s Name *
                    </label>
                    <input
                      type="text"
                      value={formData.partnerName}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-black bg-white"
                      placeholder="Enter partner's full name"
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.attendance || loading}
              className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white font-bold text-lg py-5 rounded-xl hover:from-amber-700 hover:via-orange-700 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Submit Response
                </>
              )}
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">We look forward to celebrating this blessed occasion with you</p>
          </div>
        </div>
      </div>
    </div>
  );
}