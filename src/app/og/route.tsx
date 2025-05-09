import { ImageResponse } from 'next/og';
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Parameters for customization (optional, with defaults)
        const siteNameParam = searchParams.get("siteName");
        const titleParam = searchParams.get("title");
        const sloganParam = searchParams.get("slogan");

        const siteName = siteNameParam || "ARCH SMOKE";
        // Default title can be more generic if not provided
        const title = titleParam || "Табак и аксессуары";
        const slogan = sloganParam || "доверие с первой затяжки";

        // Construct full URL for the logo
        const logoUrl = new URL("/arch-corgi-logo.svg", req.nextUrl.origin).toString();

        // Fetch Nunito font variations
        const nunitoRegularFont = await fetch(
            "https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.ttf",
        ).then((res) => res.arrayBuffer());
        const nunitoBoldFont = await fetch(
            "https://fonts.gstatic.com/s/nunito/v26/XRXg3I6Li01BKofIMW_xZg.ttf", // Corrected URL for Bold
        ).then((res) => res.arrayBuffer());
        const nunitoExtraBoldFont = await fetch(
            "https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofIMeGT-A.ttf",
        ).then((res) => res.arrayBuffer());


        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#2B2827",
                        color: "#FFFFFF",
                        fontFamily: '"Nunito"',
                        padding: "40px",
                    }}
                >
                    <img src={logoUrl} width="180" height="180" alt="" style={{ marginBottom: "30px" }} />
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 800, // ExtraBold
                            color: "#FF731D", // Primary CTA color
                            marginBottom: "10px",
                            textAlign: "center",
                            lineHeight: 1.2,
                        }}
                    >
                        {siteName}
                    </div>
                    <div
                        style={{
                            fontSize: 48,
                            fontWeight: 700, // Bold
                            color: "#FFFFFF",
                            marginBottom: "20px",
                            textAlign: "center",
                            lineHeight: 1.3,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 400, // Regular
                            color: "#FEE09B", // Secondary/Subtle gradient color
                            textAlign: "center",
                            lineHeight: 1.4,
                        }}
                    >
                        {slogan}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "Nunito",
                        data: nunitoRegularFont,
                        weight: 400,
                        style: "normal",
                    },
                    {
                        name: "Nunito",
                        data: nunitoBoldFont,
                        weight: 700,
                        style: "normal",
                    },
                    {
                        name: "Nunito",
                        data: nunitoExtraBoldFont,
                        weight: 800,
                        style: "normal",
                    },
                ],
            },
        );
    } catch (e: any) {
        console.error(`Failed to generate OG image: ${e.message}`);
        return new Response("Failed to generate OG image", { status: 500 });
    }
} 