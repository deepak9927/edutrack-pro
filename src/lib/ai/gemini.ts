// src/lib/ai/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set in environment variables');
  // Continue with limited functionality - AI functions will return error messages
}

// Initialize Google Gemini AI (FREE tier: 15 requests/min, 1M tokens/month)
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

// Different models for different use cases
export const models = {
  // Best for general text generation and reasoning
  pro: genAI.getGenerativeModel({ model: "gemini-1.5-pro" }),
  
  // Faster, good for simple tasks
  flash: genAI.getGenerativeModel({ model: "gemini-1.5-flash" }),
  
  // For multimodal tasks (text + images)
  proVision: genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
};

// Type definitions for better TypeScript support
import { handleAIError, logAISuccess } from '../utils/ai-error-handler';
import type { EnhancedAIResponse } from '../utils/ai-error-handler';

// Re-export as a type alias for compatibility
export type AIResponse = EnhancedAIResponse;

// Type definitions for better TypeScript support
// The AIResponse interface is now EnhancedAIResponse from ai-error-handler.ts

export interface StudyPlanRequest {
  selectedCourses: string[]; // IDs of selected courses
  subject: string;
  topics: string[]; // Specific topics to cover
  deadline: string; // Date string for deadline
  estimatedStudyTimePerTopic: number; // hours per topic
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  timeAvailable: number; // hours per week
  goals: string[];
  weakAreas?: string[];
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading/writing';
}

export interface CareerGuidanceRequest {
  skills: string[];
  interests: string[];
  currentEducation: string;
  targetRoles?: string[];
}

export interface WellnessAdviceRequest {
  stressLevel: number; // 1-10
  studyHours: number;
  sleepHours: number;
  issues?: string[];
}

export interface SkillRecommendationRequest {
  currentSkills: string[];
  interests: string[];
  careerGoals?: string[];
  timeCommitment: number; // hours per week
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface DailyChallengeRequest {
  currentSkills: string[];
  interests: string[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  completedChallenges?: string[];
  preferredChallengeType?: 'skill-building' | 'mindfulness' | 'productivity' | 'creativity' | 'mixed';
}

export interface AddictionSupportRequest {
  addictionType: string;
  triggers: string[];
  copingStrategies?: string[];
  supportNeeded: 'trigger-identification' | 'coping-strategies' | 'emergency-help' | 'general-support';
  timeInRecovery?: string;
}

// ============================================================================
// ACADEMIC AI FUNCTIONS (FREE)
// ============================================================================

/**
 * Generate personalized study plan using AI
 */
export async function generateStudyPlan(request: StudyPlanRequest): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Create a detailed study plan for a BCA student with the following requirements:
    
    Selected Courses (IDs): ${request.selectedCourses.join(', ')}
    Subject: ${request.subject}
    Topics: ${request.topics.join(', ')}
    Deadline: ${request.deadline}
    Estimated Study Time per Topic: ${request.estimatedStudyTimePerTopic} hours
    Current Level: ${request.currentLevel}
    Time Available (total): ${request.timeAvailable} hours per week
    Goals: ${request.goals.join(', ')}
    ${request.weakAreas ? `Weak Areas: ${request.weakAreas.join(', ')}` : ''}
    ${request.learningStyle ? `Preferred Learning Style: ${request.learningStyle}` : ''}
    
    Please provide:
    1. Weekly schedule breakdown
    2. Specific topics to cover in order
    3. Recommended resources (free only)
    4. Practice exercises
    5. Assessment milestones
    
    Format as a structured plan with clear timelines.
    `;

    const result = await models.pro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('generateStudyPlan', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('generateStudyPlan', error, 'Failed to generate study plan. Please try again later.');
  }
}

/**
 * Get AI-powered assignment help
 */
export async function getAssignmentHelp(
  subject: string,
  topic: string,
  specificQuestion: string
): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Help a BCA student with their assignment:
    
    Subject: ${subject}
    Topic: ${topic}
    Question: ${specificQuestion}
    
    Provide:
    1. Step-by-step explanation
    2. Key concepts to understand
    3. Example solution approach (don't give direct answers)
    4. Additional resources for learning
    5. Common mistakes to avoid
    
    Focus on teaching rather than providing direct answers.
    `;

    const result = await models.flash.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getAssignmentHelp', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getAssignmentHelp', error, 'Failed to get assignment help. Please try again later.');
  }
}

/**
 * Analyze code and provide feedback
 */
export async function analyzeCode(
  code: string,
  language: string,
  purpose: string
): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Review this ${language} code and provide educational feedback:
    
    Purpose: ${purpose}
    
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Please provide:
    1. Code quality assessment
    2. Potential improvements
    3. Best practices suggestions
    4. Security considerations (if applicable)
    5. Performance optimization tips
    6. Learning opportunities
    
    Focus on educational feedback to help the student improve.
    `;

    const result = await models.pro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('analyzeCode', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('analyzeCode', error, 'Failed to analyze code. Please try again later.');
  }
}

// ============================================================================
// CAREER GUIDANCE AI FUNCTIONS (FREE)
// ============================================================================

/**
 * Get personalized career guidance
 */
export async function getCareerGuidance(request: CareerGuidanceRequest): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Provide career guidance for a BCA student:
    
    Current Skills: ${request.skills.join(', ')}
    Interests: ${request.interests.join(', ')}
    Education: ${request.currentEducation}
    ${request.targetRoles ? `Target Roles: ${request.targetRoles.join(', ')}` : ''}
    
    Please provide:
    1. Suitable career paths based on skills and interests
    2. Skills gap analysis
    3. Learning roadmap for next 6 months
    4. Industry trends and opportunities
    5. Salary expectations and growth potential
    6. Free resources for skill development
    7. Portfolio project suggestions
    
    Focus on practical, actionable advice.
    `;

    const result = await models.pro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getCareerGuidance', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getCareerGuidance', error, 'Failed to get career guidance. Please try again later.');
  }
}

/**
 * Generate resume suggestions
 */
export async function getResumeAdvice(
  skills: string[],
  experience: string,
  targetRole: string
): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Provide resume optimization advice for a BCA student:
    
    Skills: ${skills.join(', ')}
    Experience: ${experience}
    Target Role: ${targetRole}
    
    Please suggest:
    1. How to structure the resume
    2. Key sections to include
    3. How to highlight relevant skills
    4. Project descriptions that would impress recruiters
    5. Keywords to include for ATS systems
    6. Common resume mistakes to avoid
    7. Tailoring tips for the target role
    
    Provide specific, actionable advice.
    `;

    const result = await models.flash.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getResumeAdvice', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getResumeAdvice', error, 'Failed to get resume advice. Please try again later.');
  }
}

// ============================================================================
// WELLNESS AI FUNCTIONS (FREE)
// ============================================================================

/**
 * Get AI-powered wellness advice
 */
export async function getWellnessAdvice(request: WellnessAdviceRequest): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Provide wellness advice for a BCA student:
    
    Stress Level: ${request.stressLevel}/10
    Study Hours per Day: ${request.studyHours}
    Sleep Hours per Night: ${request.sleepHours}
    ${request.issues ? `Specific Issues: ${request.issues.join(', ')}` : ''}
    
    Please provide:
    1. Stress management techniques
    2. Study-life balance recommendations
    3. Sleep optimization tips
    4. Exercise suggestions for desk workers
    5. Nutrition advice for better focus
    6. Mindfulness practices
    7. Time management strategies
    
    Focus on practical, student-friendly advice.
    `;

    const result = await models.flash.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getWellnessAdvice', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getWellnessAdvice', error, 'Failed to get wellness advice. Please try again later.');
  }
}

/**
 * Generate motivation and encouragement
 */
export async function getMotivationalAdvice(
  currentMood: string,
  challenges: string[]
): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Provide motivational support for a BCA student:

    Current Mood: ${currentMood}
    Challenges: ${challenges.join(', ')}

    Please provide:
    1. Encouraging words specific to their situation
    2. Practical tips to overcome current challenges
    3. Success stories of similar students
    4. Small achievable goals for immediate progress
    5. Perspective on long-term benefits of education
    6. Community resources for support

    Be empathetic and genuinely encouraging.
    `;

    const result = await models.flash.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getMotivationalAdvice', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getMotivationalAdvice', error, 'Failed to get motivational advice. Please try again later.');
  }
}

// ============================================================================
// SKILL RECOMMENDATION AI FUNCTIONS (FREE)
// ============================================================================

/**
 * Get personalized skill recommendations using AI
 */
export async function getSkillRecommendations(request: SkillRecommendationRequest): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Provide personalized skill recommendations for a BCA student:

    Current Skills: ${request.currentSkills.join(', ')}
    Interests: ${request.interests.join(', ')}
    ${request.careerGoals ? `Career Goals: ${request.careerGoals.join(', ')}` : ''}
    Time Commitment: ${request.timeCommitment} hours per week
    Current Level: ${request.currentLevel}

    Please provide:
    1. Top 5 skills to learn next based on their profile
    2. Learning priority order with reasoning
    3. Free learning resources for each skill
    4. Estimated time to learn each skill
    5. How these skills complement their current abilities
    6. Career opportunities unlocked by these skills
    7. Project ideas to practice the new skills
    8. Weekly learning schedule suggestion

    Focus on practical, achievable recommendations that align with their interests and career goals.
    `;

    const result = await models.pro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getSkillRecommendations', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getSkillRecommendations', error, 'Failed to get skill recommendations. Please try again later.');
  }
}

/**
 * Generate daily growth challenges and actionable tips
 */
export async function getDailyChallenges(request: DailyChallengeRequest): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Generate personalized daily growth challenges and actionable tips for a BCA student:

    Current Skills: ${request.currentSkills.join(', ')}
    Interests: ${request.interests.join(', ')}
    Current Level: ${request.currentLevel}
    ${request.completedChallenges ? `Previously Completed Challenges: ${request.completedChallenges.join(', ')}` : ''}
    ${request.preferredChallengeType ? `Preferred Challenge Type: ${request.preferredChallengeType}` : ''}

    Please provide:
    1. 3 daily challenges for the next 7 days (one for each category: skill-building, mindfulness, productivity)
    2. Specific, actionable steps for each challenge
    3. Expected time commitment for each challenge (15-60 minutes)
    4. Learning outcomes or benefits for each challenge
    5. Tips for staying motivated and consistent
    6. How to track progress and measure success
    7. Alternative challenges if the suggested ones don't fit their schedule
    8. Weekly reflection questions to assess growth

    Make challenges progressive (increasing difficulty) and tailored to their skill level and interests.
    Focus on sustainable, positive habits that contribute to long-term growth.
    `;

    const result = await models.pro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getDailyChallenges', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getDailyChallenges', error, 'Failed to generate daily challenges. Please try again later.');
  }
}

/**
 * Provide addiction support with trigger identification and coping strategies
 */
export async function getAddictionSupport(request: AddictionSupportRequest): Promise<EnhancedAIResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key missing. Please set GEMINI_API_KEY in .env.", errorCode: "MISSING_API_KEY" };
  }
  try {
    const prompt = `
    Provide compassionate, professional support for addiction recovery for a BCA student:

    Addiction Type: ${request.addictionType}
    Known Triggers: ${request.triggers.join(', ')}
    ${request.copingStrategies ? `Current Coping Strategies: ${request.copingStrategies.join(', ')}` : ''}
    Support Needed: ${request.supportNeeded}
    ${request.timeInRecovery ? `Time in Recovery: ${request.timeInRecovery}` : ''}

    Please provide:
    1. Trigger identification and analysis - help identify patterns and underlying causes
    2. Immediate coping strategies for high-risk situations
    3. Long-term coping mechanisms and lifestyle changes
    4. Emergency resources and when to seek professional help
    5. Building a support network and accountability
    6. Relapse prevention planning
    7. Healthy alternatives and positive habits to replace addictive behaviors
    8. Self-care and stress management techniques
    9. Academic-specific strategies (dealing with study stress, exam pressure, etc.)
    10. Encouragement and motivation for continued recovery

    Be empathetic, non-judgmental, and encouraging. Emphasize that recovery is possible and they're not alone.
    Include specific, actionable steps they can take immediately.
    `;

    const result = await models.pro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const usage = result.usageMetadata;

    logAISuccess('getAddictionSupport', usage?.totalTokenCount);
    
    return {
      success: true,
      data: text,
      tokensUsed: usage?.totalTokenCount
    };
  } catch (error) {
    return handleAIError('getAddictionSupport', error, 'Failed to get addiction support. Please try again later.');
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Rate limiting helper to respect free tier limits
 */
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 15; // Gemini free tier: 15 requests per minute
  private readonly timeWindow = 60 * 1000; // 1 minute in milliseconds

  canMakeRequest(): boolean {
    const now = Date.now();
    
    // Remove requests older than the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    // Check if we can make a new request
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }

  getNextAvailableTime(): Date {
    if (this.requests.length === 0) return new Date();
    
    const oldestRequest = Math.min(...this.requests);
    return new Date(oldestRequest + this.timeWindow);
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Simple in-memory cache for AI responses
 */
class AICache {
  private cache = new Map<string, { data: AIResponse; timestamp: number }>();
  private readonly ttl = 5 * 60 * 1000; // 5 minutes TTL

  get(key: string): AIResponse | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: AIResponse): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const aiCache = new AICache();

/**
 * Wrapper function with rate limiting and caching
 */
export async function aiRequest(
  aiFunction: () => Promise<EnhancedAIResponse>,
  cacheKey?: string,
  useCache: boolean = true
): Promise<EnhancedAIResponse> {
  // Check cache first if enabled
  if (useCache && cacheKey) {
    const cached = aiCache.get(cacheKey);
    if (cached) {
      return cached;
    }
  }

  // Check rate limit
  if (!rateLimiter.canMakeRequest()) {
    const nextAvailable = rateLimiter.getNextAvailableTime();
    return {
      success: false,
      error: `Rate limit exceeded. Please try again after ${nextAvailable.toLocaleTimeString()}.`,
      errorCode: "RATE_LIMIT_EXCEEDED",
      details: { nextAvailableTime: nextAvailable.toISOString() }
    };
  }

  try {
    const result = await aiFunction();

    // Cache successful responses
    if (useCache && cacheKey && result.success) {
      aiCache.set(cacheKey, result);
    }

    return result;
  } catch (error) {
    return handleAIError('aiRequestWrapper', error, 'An unexpected error occurred during AI request. Please try again.');
  }
}


// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Example: Generate study plan
const studyPlan = await aiRequest(() => 
  generateStudyPlan({
    subject: "Data Structures",
    currentLevel: "beginner",
    timeAvailable: 10,
    goals: ["Understand basic concepts", "Implement in JavaScript"],
    weakAreas: ["Recursion", "Trees"]
  })
);

// Example: Get career guidance
const careerAdvice = await aiRequest(() => 
  getCareerGuidance({
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Web Development", "UI/UX"],
    currentEducation: "BCA 3rd Year",
    targetRoles: ["Frontend Developer", "Full Stack Developer"]
  })
);

// Example: Get wellness advice
const wellnessAdvice = await aiRequest(() => 
  getWellnessAdvice({
    stressLevel: 7,
    studyHours: 8,
    sleepHours: 6,
    issues: ["Difficulty concentrating", "Feeling overwhelmed"]
  })
);
*/
