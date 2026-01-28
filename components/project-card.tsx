"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    link?: string
    github?: string
    image?: string // In existing projects we usually have images, but I'll make it optional/placeholder for now
}

export function ProjectCard({ title, description, tags, link, github, image }: ProjectCardProps) {
    return (
        <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                {/* Placeholder for image or actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                    {image ? (
                        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                        <span className="text-4xl font-bold opacity-10 select-none">{title.charAt(0)}</span>
                    )}
                </div>
            </div>
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                {link && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                        </a>
                    </Button>
                )}
                {github && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
