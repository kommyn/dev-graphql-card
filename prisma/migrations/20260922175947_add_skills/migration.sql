-- CreateTable
CREATE TABLE "skills" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills_on_jobs" (
    "skill_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,

    CONSTRAINT "skills_on_jobs_pkey" PRIMARY KEY ("skill_id","job_id")
);

-- CreateTable
CREATE TABLE "skills_on_profiles" (
    "skill_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,

    CONSTRAINT "skills_on_profiles_pkey" PRIMARY KEY ("skill_id","profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE INDEX "skills_on_jobs_job_id_idx" ON "skills_on_jobs"("job_id");

-- CreateIndex
CREATE INDEX "skills_on_profiles_profile_id_idx" ON "skills_on_profiles"("profile_id");

-- AddForeignKey
ALTER TABLE "skills_on_jobs" ADD CONSTRAINT "skills_on_jobs_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_jobs" ADD CONSTRAINT "skills_on_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_profiles" ADD CONSTRAINT "skills_on_profiles_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_profiles" ADD CONSTRAINT "skills_on_profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
