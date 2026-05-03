import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const username = "rakibwebdev23";

        // 1. Fetch Contributions
        const contribRes = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`, { next: { revalidate: 3600 } });
        let contributions = 0;
        if (contribRes.ok) {
            const contribData = await contribRes.json();
            if (contribData.years) {
                contributions = contribData.years.reduce((acc: number, year: any) => acc + year.total, 0);
            }
        }

        // 2. Fetch Top Language
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { next: { revalidate: 3600 } });
        let topLanguage = "JavaScript"; // Default fallback
        if (reposRes.ok) {
            const repos = await reposRes.json();
            const languageCounts: Record<string, number> = {};
            repos.forEach((repo: any) => {
                if (repo.language) {
                    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                }
            });
            const top = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0];
            if (top) {
                topLanguage = top[0];
            }
        }

        // 3. Fetch Commits
        const commitsRes = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
            headers: {
                Accept: "application/vnd.github.cloak-preview"
            },
            next: { revalidate: 3600 }
        });
        let commits = 0;
        if (commitsRes.ok) {
            const commitsData = await commitsRes.json();
            commits = commitsData.total_count || 0;
        }

        // Output
        return NextResponse.json({
            contributions,
            topLanguage,
            commits,
            url: `https://github.com/${username}`
        });

    } catch (error) {
        console.error("Error fetching github stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
