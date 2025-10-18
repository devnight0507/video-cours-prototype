'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/mock/auth-context';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockCourses } from '@/lib/mock/data';
import { formatCurrency } from '@/lib/utils';
import {
  CreditCard,
  Building2,
  Check,
  AlertCircle,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentPage() {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bank'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!user) return null;

  const publishedCourses = mockCourses.filter(c => c.published);
  const totalPrice = 99.99; // Full access price

  const handleStripePayment = async () => {
    setIsProcessing(true);

    // Simulate Stripe payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPaymentSuccess(true);
    setIsProcessing(false);
  };

  const handleBankTransfer = () => {
    alert('Bank transfer instructions sent to your email!');
  };

  if (user.paid) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-green-50 border-green-200">
          <CardBody className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-green-900">Payment Confirmed!</h2>
            <p className="text-green-700 mt-2">You have full access to all courses</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="success">
                {user.paymentStatus === 'paid' ? 'Stripe Payment' : 'Manual Approval'}
              </Badge>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-green-50 border-green-200">
            <CardBody className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold text-green-900">Payment Successful!</h2>
              <p className="text-green-700 mt-2">
                Your payment is being processed. You'll receive confirmation shortly.
              </p>
              <div className="bg-white rounded-lg p-6 mt-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Payment confirmation email sent</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Admin will approve your access within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>You'll receive notification when access is granted</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This is a mock payment - in production, real payment would be processed
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
        <p className="text-gray-600 mt-1">Get full access to all {publishedCourses.length} courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stripe Payment */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                paymentMethod === 'stripe'
                  ? 'border-2 border-primary-600 shadow-md'
                  : 'border-2 border-transparent'
              }`}
              onClick={() => setPaymentMethod('stripe')}
            >
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'stripe'
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'stripe' && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                      <Badge variant="success" className="ml-auto">Recommended</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Secure payment via Stripe. Get instant access after payment.
                    </p>
                    {paymentMethod === 'stripe' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <p className="text-sm text-blue-800">
                            This is a <strong>mock payment interface</strong>. In production, you would enter
                            real card details here.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
                            Card Number: •••• •••• •••• 4242
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
                              Expiry: 12/25
                            </div>
                            <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
                              CVV: •••
                            </div>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4"
                          onClick={handleStripePayment}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <CreditCard className="w-4 h-4" />
                              </motion.div>
                              Processing...
                            </span>
                          ) : (
                            `Pay ${formatCurrency(totalPrice)}`
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Bank Transfer */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                paymentMethod === 'bank'
                  ? 'border-2 border-primary-600 shadow-md'
                  : 'border-2 border-transparent'
              }`}
              onClick={() => setPaymentMethod('bank')}
            >
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'bank'
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'bank' && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Manual approval required. Access granted within 24-48 hours.
                    </p>
                    {paymentMethod === 'bank' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bank Name:</span>
                            <span className="font-medium">Example Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account Number:</span>
                            <span className="font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account Name:</span>
                            <span className="font-medium">CourseHub Inc.</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reference:</span>
                            <span className="font-medium">{user.id}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4"
                          variant="outline"
                          onClick={handleBankTransfer}
                        >
                          Get Transfer Instructions
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardBody>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Secure Payment</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Order Summary</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Full Access</p>
                    <p className="text-sm text-gray-600">{publishedCourses.length} courses</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Lifetime access to all courses</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">HD video streaming</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Progress tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Future course updates</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Payment Status Info */}
          {user.paymentStatus === 'pending' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <Card className="bg-yellow-50 border-yellow-200">
                <CardBody className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 text-sm">Payment Pending</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      Complete payment to access courses
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
