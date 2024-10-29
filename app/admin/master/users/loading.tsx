import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-12 w-28" />
      </div>

      <div className="mt-5 space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton className="h-10 w-full" key={index} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-52" />
      </div>
    </div>
  )
}

export default Loading
