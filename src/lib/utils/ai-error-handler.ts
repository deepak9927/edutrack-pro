// src/lib/utils/ai-error-handler.ts

import { GoogleGenerativeAIError } from '@google/generative-ai';

export interface EnhancedAIResponse {
  success: boolean;
  data?: string;
  error?: string;
  errorCode?: string; // Custom error code for easier identification
  details?: Record<string, unknown>; // More detailed error information
  tokensUsed?: number;
}

export function handleAIError(
  functionName: string,
  error: unknown,
  defaultErrorMessage: string = 'An unexpected AI error occurred.'
): EnhancedAIResponse {
  let errorMessage = defaultErrorMessage;
  let errorCode = 'UNKNOWN_AI_ERROR';
  let errorDetails: Record<string, unknown> = {};

  if (error instanceof GoogleGenerativeAIError) {
    errorMessage = `Gemini API Error in ${functionName}: ${error.message}`;
    errorCode = `GEMINI_API_ERROR_${error.code || 'UNKNOWN'}`;
    errorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
    };
  } else if (error instanceof Error) {
    errorMessage = `Application Error in ${functionName}: ${error.message}`;
    errorCode = 'APPLICATION_ERROR';
    errorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  } else {
    errorMessage = `Unknown Error in ${functionName}: ${String(error)}`;
    errorCode = 'UNKNOWN_ERROR_TYPE';
    errorDetails = { rawError: error };
  }

  // Log the error for debugging purposes (can be replaced with a dedicated logging service)
  console.error(`[AI_ERROR] ${errorMessage}`, errorDetails);

  // Return a user-friendly error message for the client
  return {
    success: false,
    error: 'Failed to process your request. Please try again later.', // Generic message for the user
    errorCode,
    details: errorDetails, // Include details for internal debugging
  };
}

// Optional: A simple logger for successful AI interactions (for auditing/monitoring)
export function logAISuccess(functionName: string, tokensUsed?: number) {
  console.log(`[AI_SUCCESS] ${functionName} completed. Tokens used: ${tokensUsed ?? 'N/A'}`);
  // Here you could integrate with a metrics service to track token usage
}