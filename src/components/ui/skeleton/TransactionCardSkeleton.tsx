import { Card } from "./../Card";
import { Skeleton } from "./Skeleton";

export const TransactionCardSkeleton = () => {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Skeleton className="w-9 h-9 rounded-xl"></Skeleton>
        <div className="flex flex-col flex-1 gap-2">
          <Skeleton className="h-3 w-1/2"></Skeleton>
          <Skeleton className="h-4 w-1/3"></Skeleton>
        </div>
      </div>
    </Card>
  );
};
