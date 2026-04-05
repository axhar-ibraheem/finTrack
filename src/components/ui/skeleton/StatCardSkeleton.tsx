import { Card } from "./../Card";
import { Skeleton } from "./Skeleton";

export const StatCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="pl-3 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <Skeleton className="h-3 w-24"></Skeleton>
          <Skeleton className="h-4 w-4 rounded-full"></Skeleton>
        </div>
        <Skeleton className="h-8 w-32"></Skeleton>
        <Skeleton className="h-3 w-20"></Skeleton>
      </div>
    </Card>
  );
};
