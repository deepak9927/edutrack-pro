import { Button } from "@/components/ui/button";
import { StudyPlannerForm } from "@/components/features/ai-tutor/study-planner-form";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48 xl:py-64 bg-mesh-gradient text-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Unlock Your Full Potential with IgnouCompass
              </h1>
              <p className="mx-auto max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your all-in-one platform for academic excellence, skill development, and holistic well-being.
                IgnouCompass empowers you to achieve your goals and thrive in every aspect of your life.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Link>
                <Button asChild variant="outline" className="h-11 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <Link href="/auth/login">
                    User Login
                  </Link>
                </Button>
              </div>
              {/* Teacher and Admin Login/Register Section */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-gray-200 mb-4">Are you a teacher or administrator?</p>
                <div className="flex flex-col gap-3 sm:flex-row justify-center flex-wrap">
                  <Link href="/auth/login?role=teacher">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 hover:text-white border-white/30">
                      Teacher Login
                    </Button>
                  </Link>
                  <Link href="/auth/register?role=teacher">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 hover:text-white border-white/30">
                      Teacher Register
                    </Button>
                  </Link>
                  <Link href="/auth/login?role=admin">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 hover:text-white border-white/30">
                      Admin Login
                    </Button>
                  </Link>
                  <Link href="/auth/register?role=admin">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 hover:text-white border-white/30">
                      Admin Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Comprehensive Features for Your Success
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  IgnouCompass offers a suite of tools designed to support your academic, professional, and personal growth.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Academic Excellence Hub</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        AI-powered study planner, adaptive assessments, intelligent note-taking, and plagiarism detection.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Professional Skill Development</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Interactive coding labs, multi-language support, AI-assisted code reviews, and industry certifications.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Comprehensive Wellness Suite</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Guided meditations, stress management programs, digital wellness tools, and anonymous support networks.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <StudyPlannerForm />
          </div>
        </section>
      </main>
    </div>
  );
}
