import { Skeleton } from '@/components/ui/skeleton'

const BodySkeleton = () => {
    return (
        <>
            <Skeleton className = "h-9 bg-main/5 w-full col-start-2 col-span-14 self-end md:self-auto md:col-start-2 md:col-span-4"/>
            <Skeleton className = "h-9 bg-main/5 w-full lg:w-[280px] col-start-2 col-span-14 md:col-span-2 flex-none"/>
            <Skeleton className = "h-9 bg-main/5 md:w-[250px] lg:w-[350px] justify-items-stretch w-full col-start-2 col-span-7 md:col-span-4 md:col-start-2 md:justify-self-end"/>
            <Skeleton className = "h-9 bg-main/5 w-full lg:w-[280px] col-span-7 md:col-span-2"/>
        </>
    );
}

export default BodySkeleton;