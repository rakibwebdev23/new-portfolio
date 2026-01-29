import { cn } from "@/lib/utils"

interface SectionWrapperProps {
    children: React.ReactNode
    className?: string
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
    return (
        <div className={cn("w-full md:w-[1440px] px-2 mx-auto overflow-hidden", className)}>
            {children}
        </div>
    )
}
