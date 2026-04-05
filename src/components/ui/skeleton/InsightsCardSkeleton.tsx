import { Card } from "./../Card";
import { Skeleton } from "./Skeleton";

export const InsightCardSkeleton = () => {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <Skeleton className="w-9 h-9 rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-16 rounded-full"></Skeleton>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-28"></Skeleton>
        <Skeleton className="h-7 w-36"></Skeleton>
      </div>
      <Skeleton className="h-3 w-full"></Skeleton>
      <Skeleton className="h-3 w-3/4"></Skeleton>
    </Card>
  );
};
