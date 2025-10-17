import { prisma } from '@/lib/prisma';
import { genAI } from './gemini';

interface StudyPlanInput {
  studentId: string;
  learningObjectives: string[];
  timeCommitment: string; // e.g., "10 hours per week"
}

export async function generatePersonalizedStudyPlan(input: StudyPlanInput) {
  const { studentId, learningObjectives, timeCommitment } = input;

  // 1. Fetch student data
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      enrollments: { include: { course: true } },
      skillAssessments: { include: { skill: true } },
      learningAnalytics: { orderBy: { date: 'desc' }, take: 30 },
    },
  });

  if (!student) {
    throw new Error('Student not found');
  }

  // 2. Construct a detailed prompt for the AI model
  const prompt = `
    **Objective:** Generate a personalized study plan for a student.

    **Student Profile:**
    - **Student ID:** ${student.studentId}
    - **Current Semester:** ${student.semester}
    - **Enrolled Courses:** ${student.enrollments.map(e => e.course.title).join(', ')}
    - **Assessed Skills:** ${student.skillAssessments.map(s => `${s.skill.name} (${s.currentLevel})`).join(', ')}
    - **Recent Learning Activity:** (Summary of learningAnalytics can be added here)

    **Learning Goals:**
    - ${learningObjectives.join('\n- ')}

    **Time Commitment:**
    - ${timeCommitment}

    **Task:**
    Generate a structured study plan for the next 7 days. The plan should include:
    1.  **Daily Breakdown:** Specific tasks for each day.
    2.  **Resource Recommendations:** Suggest relevant lessons, resources, or external links.
    3.  **Time Allocation:** Estimate time for each task.
    4.  **Prioritization:** Focus on areas that align with the student's goals and address any identified weaknesses.

    **Output Format:**
    Return the study plan as a JSON object with the following structure:
    {
      "dailySchedule": [
        {
          "day": "Monday",
          "tasks": [
            { "task": "Read Chapter 1 of 'Introduction to AI'", "duration": "60 mins", "resources": ["Course Material"] },
            { "task": "Complete 'Python for Data Science' tutorial", "duration": "90 mins", "resources": ["External Link"] }
          ]
        },
        // ... other days
      ]
    }
  `;

  // 3. Call the AI model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  // 4. Parse and return the study plan
  try {
    const studyPlan = JSON.parse(text);
    return studyPlan;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error('Failed to generate a valid study plan');
  }
}