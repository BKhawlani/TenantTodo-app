-- CreateTable
CREATE TABLE "TaskShareInvite" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskShareInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskShareInvite" ADD CONSTRAINT "TaskShareInvite_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
