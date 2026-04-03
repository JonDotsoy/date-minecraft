export const minecraftClockSvg = (rotation: number) => {
    const theta = -rotation * (Math.PI / 180);
    const nR = -rotation;

    const dayX = 90 + 90 * (Math.sin(theta) - Math.cos(theta));
    const dayY = 90 - 90 * (Math.sin(theta) + Math.cos(theta));
    const nightX = 90 - 90 * Math.cos(theta);
    const nightY = 90 - 90 * Math.sin(theta);

    const f = (n: number) => parseFloat(n.toFixed(4));

    const pathRotation = -(rotation + 60);

    return (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4_392)">
            <g clipPath="url(#clip1_4_392)">
            <mask id="mask0_4_392" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="24" y="24" width="132" height="132">
            <circle cx="90" cy="90.0001" r="65" transform={`rotate(${nR} 90 90.0001)`} fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_4_392)">
            <rect x={f(dayX)} y={f(dayY)} width="180" height="90" transform={`rotate(${nR} ${f(dayX)} ${f(dayY)})`} fill="#4968D8"/>
            <rect x={f(nightX)} y={f(nightY)} width="180" height="90" transform={`rotate(${nR} ${f(nightX)} ${f(nightY)})`} fill="#1E1C1C"/>
            </g>
            <g transform={`rotate(${pathRotation} 90 90)`}>
            <path d="M83.8397 99.3302L73.8397 82.0097L65.1795 87.0097L70.1795 95.67L52.859 105.67L47.859 97.0097L39.1987 102.01L49.1987 119.33L57.859 114.33L62.859 122.99L80.1795 112.99L75.1795 104.33L83.8397 99.3302Z" fill="#6C6C89"/>
            <path d="M119.641 61.3398L114.641 52.6796L97.3205 62.6796L102.321 71.3398L93.6602 76.3398L103.66 93.6603L112.321 88.6603L117.321 97.3206L134.641 87.3206L129.641 78.6603L138.301 73.6603L128.301 56.3398L119.641 61.3398Z" fill="#FFFF00"/>
            </g>
            </g>
            <rect x="80" y="20" width="10" height="10" transform="rotate(-180 80 20)" fill="#44440F"/>
            <rect x="90" y="20" width="10" height="10" transform="rotate(-180 90 20)" fill="#44440F"/>
            <rect x="100" y="20" width="10" height="10" transform="rotate(-180 100 20)" fill="#44440F"/>
            <rect x="110" y="20" width="10" height="10" transform="rotate(-180 110 20)" fill="#44440F"/>
            <rect x="60" y="30" width="10" height="10" transform="rotate(-180 60 30)" fill="#44440F"/>
            <rect x="70" y="30" width="10" height="10" transform="rotate(-180 70 30)" fill="#44440F"/>
            <rect x="80" y="30" width="10" height="10" transform="rotate(-180 80 30)" fill="#DEDE90"/>
            <rect x="90" y="30" width="10" height="10" transform="rotate(-180 90 30)" fill="#DEDE90"/>
            <rect x="100" y="30" width="10" height="10" transform="rotate(-180 100 30)" fill="#DEDE90"/>
            <rect x="110" y="30" width="10" height="10" transform="rotate(-180 110 30)" fill="#DEDE90"/>
            <rect x="120" y="30" width="10" height="10" transform="rotate(-180 120 30)" fill="#44440F"/>
            <rect x="130" y="30" width="10" height="10" transform="rotate(-180 130 30)" fill="#44440F"/>
            <rect x="50" y="40" width="10" height="10" transform="rotate(-180 50 40)" fill="#44440F"/>
            <rect x="60" y="40" width="10" height="10" transform="rotate(-180 60 40)" fill="#DEDE90"/>
            <rect x="70" y="40" width="10" height="10" transform="rotate(-180 70 40)" fill="#DEDE90"/>
            <rect x="80" y="40" width="10" height="10" transform="rotate(-180 80 40)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="90" y="40" width="10" height="10" transform="rotate(-180 90 40)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="100" y="40" width="10" height="10" transform="rotate(-180 100 40)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="110" y="40" width="10" height="10" transform="rotate(-180 110 40)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="120" y="40" width="10" height="10" transform="rotate(-180 120 40)" fill="#DEDE90"/>
            <rect x="130" y="40" width="10" height="10" transform="rotate(-180 130 40)" fill="#DEDE90"/>
            <rect x="140" y="40" width="10" height="10" transform="rotate(-180 140 40)" fill="#44440F"/>
            <rect x="40" y="50" width="10" height="10" transform="rotate(-180 40 50)" fill="#44440F"/>
            <rect x="50" y="50" width="10" height="10" transform="rotate(-180 50 50)" fill="#DEDE90"/>
            <rect x="60" y="50" width="10" height="10" transform="rotate(-180 60 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="70" y="50" width="10" height="10" transform="rotate(-180 70 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="80" y="50" width="10" height="10" transform="rotate(-180 80 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="90" y="50" width="10" height="10" transform="rotate(-180 90 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="100" y="50" width="10" height="10" transform="rotate(-180 100 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="110" y="50" width="10" height="10" transform="rotate(-180 110 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="120" y="50" width="10" height="10" transform="rotate(-180 120 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="130" y="50" width="10" height="10" transform="rotate(-180 130 50)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="140" y="50" width="10" height="10" transform="rotate(-180 140 50)" fill="#E1E1E1"/>
            <rect x="150" y="50" width="10" height="10" transform="rotate(-180 150 50)" fill="#44440F"/>
            <rect x="40" y="60" width="10" height="10" transform="rotate(-180 40 60)" fill="#44440F"/>
            <rect x="50" y="60" width="10" height="10" transform="rotate(-180 50 60)" fill="#DEDE90"/>
            <rect x="60" y="60" width="10" height="10" transform="rotate(-180 60 60)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="70" y="60" width="10" height="10" transform="rotate(-180 70 60)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="130" y="60" width="10" height="10" transform="rotate(-180 130 60)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="140" y="60" width="10" height="10" transform="rotate(-180 140 60)" fill="#DEDE90"/>
            <rect x="150" y="60" width="10" height="10" transform="rotate(-180 150 60)" fill="#33330B"/>
            <rect x="30" y="70" width="10" height="10" transform="rotate(-180 30 70)" fill="#44440F"/>
            <rect x="40" y="70" width="10" height="10" transform="rotate(-180 40 70)" fill="#DEDE90"/>
            <rect x="50" y="70" width="10" height="10" transform="rotate(-180 50 70)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="60" y="70" width="10" height="10" transform="rotate(-180 60 70)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="140" y="70" width="10" height="10" transform="rotate(-180 140 70)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="150" y="70" width="10" height="10" transform="rotate(-180 150 70)" fill="#E1E1E1"/>
            <rect x="160" y="70" width="10" height="10" transform="rotate(-180 160 70)" fill="#33330B"/>
            <rect x="30" y="80" width="10" height="10" transform="rotate(-180 30 80)" fill="#44440F"/>
            <rect x="40" y="80" width="10" height="10" transform="rotate(-180 40 80)" fill="#DEDE90"/>
            <rect x="50" y="80" width="10" height="10" transform="rotate(-180 50 80)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="60" y="80" width="10" height="10" transform="rotate(-180 60 80)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="140" y="80" width="10" height="10" transform="rotate(-180 140 80)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="150" y="80" width="10" height="10" transform="rotate(-180 150 80)" fill="#E1E1E1"/>
            <rect x="160" y="80" width="10" height="10" transform="rotate(-180 160 80)" fill="#33330B"/>
            <rect x="30" y="90" width="10" height="10" transform="rotate(-180 30 90)" fill="#44440F"/>
            <rect x="40" y="90" width="10" height="10" transform="rotate(-180 40 90)" fill="#DEDE90"/>
            <rect x="50" y="90" width="10" height="10" transform="rotate(-180 50 90)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="60" y="90" width="10" height="10" transform="rotate(-180 60 90)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="90" y="90" width="10" height="10" transform="rotate(-180 90 90)" fill="#E1E1E1"/>
            <rect x="100" y="90" width="10" height="10" transform="rotate(-180 100 90)" fill="#DEDE90"/>
            <rect x="110" y="90" width="10" height="10" transform="rotate(-180 110 90)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="140" y="90" width="10" height="10" transform="rotate(-180 140 90)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="150" y="90" width="10" height="10" transform="rotate(-180 150 90)" fill="#E1E1E1"/>
            <rect x="160" y="90" width="10" height="10" transform="rotate(-180 160 90)" fill="#33330B"/>
            <rect x="30" y="100" width="10" height="10" transform="rotate(-180 30 100)" fill="#44440F"/>
            <rect x="40" y="100" width="10" height="10" transform="rotate(-180 40 100)" fill="#DEDE90"/>
            <rect x="50" y="100" width="10" height="10" transform="rotate(-180 50 100)" fill="#E1E1E1"/>
            <rect x="60" y="100" width="10" height="10" transform="rotate(-180 60 100)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="70" y="100" width="10" height="10" transform="rotate(-180 70 100)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="80" y="100" width="10" height="10" transform="rotate(-180 80 100)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="90" y="100" width="10" height="10" transform="rotate(-180 90 100)" fill="#DEDE90"/>
            <rect x="100" y="100" width="10" height="10" transform="rotate(-180 100 100)" fill="#DEDE90"/>
            <rect x="110" y="100" width="10" height="10" transform="rotate(-180 110 100)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="120" y="100" width="10" height="10" transform="rotate(-180 120 100)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="130" y="100" width="10" height="10" transform="rotate(-180 130 100)" fill="#6B6B6B" fillOpacity="0.1"/>
            <rect x="140" y="100" width="10" height="10" transform="rotate(-180 140 100)" fill="#E1E1E1"/>
            <rect x="150" y="100" width="10" height="10" transform="rotate(-180 150 100)" fill="#DEDE90"/>
            <rect x="160" y="100" width="10" height="10" transform="rotate(-180 160 100)" fill="#33330B"/>
            <rect x="30" y="110" width="10" height="10" transform="rotate(-180 30 110)" fill="#33330B"/>
            <rect x="40" y="110" width="10" height="10" transform="rotate(-180 40 110)" fill="#DEDE90"/>
            <rect x="50" y="110" width="10" height="10" transform="rotate(-180 50 110)" fill="#DEDE90"/>
            <rect x="60" y="110" width="10" height="10" transform="rotate(-180 60 110)" fill="#E1E1E1"/>
            <rect x="70" y="110" width="10" height="10" transform="rotate(-180 70 110)" fill="#E1E1E1"/>
            <rect x="80" y="110" width="10" height="10" transform="rotate(-180 80 110)" fill="#E1E1E1"/>
            <rect x="90" y="110" width="10" height="10" transform="rotate(-180 90 110)" fill="#DEDE90"/>
            <rect x="100" y="110" width="10" height="10" transform="rotate(-180 100 110)" fill="#DEDE90"/>
            <rect x="110" y="110" width="10" height="10" transform="rotate(-180 110 110)" fill="#E1E1E1"/>
            <rect x="120" y="110" width="10" height="10" transform="rotate(-180 120 110)" fill="#E1E1E1"/>
            <rect x="130" y="110" width="10" height="10" transform="rotate(-180 130 110)" fill="#E1E1E1"/>
            <rect x="140" y="110" width="10" height="10" transform="rotate(-180 140 110)" fill="#DEDE90"/>
            <rect x="150" y="110" width="10" height="10" transform="rotate(-180 150 110)" fill="#DEDE90"/>
            <rect x="160" y="110" width="10" height="10" transform="rotate(-180 160 110)" fill="#33330B"/>
            <rect x="30" y="120" width="10" height="10" transform="rotate(-180 30 120)" fill="#33330B"/>
            <rect x="40" y="120" width="10" height="10" transform="rotate(-180 40 120)" fill="#727218"/>
            <rect x="50" y="120" width="10" height="10" transform="rotate(-180 50 120)" fill="#DEDE90"/>
            <rect x="60" y="120" width="10" height="10" transform="rotate(-180 60 120)" fill="#DEDE90"/>
            <rect x="70" y="120" width="10" height="10" transform="rotate(-180 70 120)" fill="#DEDE90"/>
            <rect x="80" y="120" width="10" height="10" transform="rotate(-180 80 120)" fill="#DEDE90"/>
            <rect x="90" y="120" width="10" height="10" transform="rotate(-180 90 120)" fill="#DEDE90"/>
            <rect x="100" y="120" width="10" height="10" transform="rotate(-180 100 120)" fill="#DEDE90"/>
            <rect x="110" y="120" width="10" height="10" transform="rotate(-180 110 120)" fill="#DEDE90"/>
            <rect x="120" y="120" width="10" height="10" transform="rotate(-180 120 120)" fill="#DEDE90"/>
            <rect x="130" y="120" width="10" height="10" transform="rotate(-180 130 120)" fill="#DEDE90"/>
            <rect x="140" y="120" width="10" height="10" transform="rotate(-180 140 120)" fill="#DEDE90"/>
            <rect x="150" y="120" width="10" height="10" transform="rotate(-180 150 120)" fill="#727218"/>
            <rect x="160" y="120" width="10" height="10" transform="rotate(-180 160 120)" fill="#33330B"/>
            <rect x="30" y="130" width="10" height="10" transform="rotate(-180 30 130)" fill="#33330B"/>
            <rect x="40" y="130" width="10" height="10" transform="rotate(-180 40 130)" fill="#DEDE90"/>
            <rect x="50" y="130" width="10" height="10" transform="rotate(-180 50 130)" fill="#727218"/>
            <rect x="60" y="130" width="10" height="10" transform="rotate(-180 60 130)" fill="#DEDE90"/>
            <rect x="70" y="130" width="10" height="10" transform="rotate(-180 70 130)" fill="#DEDE90"/>
            <rect x="80" y="130" width="10" height="10" transform="rotate(-180 80 130)" fill="#DEDE90"/>
            <rect x="90" y="130" width="10" height="10" transform="rotate(-180 90 130)" fill="#DEDE90"/>
            <rect x="100" y="130" width="10" height="10" transform="rotate(-180 100 130)" fill="#DEDE90"/>
            <rect x="110" y="130" width="10" height="10" transform="rotate(-180 110 130)" fill="#DEDE90"/>
            <rect x="120" y="130" width="10" height="10" transform="rotate(-180 120 130)" fill="#DEDE90"/>
            <rect x="130" y="130" width="10" height="10" transform="rotate(-180 130 130)" fill="#DEDE90"/>
            <rect x="140" y="130" width="10" height="10" transform="rotate(-180 140 130)" fill="#727218"/>
            <rect x="150" y="130" width="10" height="10" transform="rotate(-180 150 130)" fill="#B06C29"/>
            <rect x="160" y="130" width="10" height="10" transform="rotate(-180 160 130)" fill="#33330B"/>
            <rect x="40" y="140" width="10" height="10" transform="rotate(-180 40 140)" fill="#33330B"/>
            <rect x="50" y="140" width="10" height="10" transform="rotate(-180 50 140)" fill="#DEDE90"/>
            <rect x="60" y="140" width="10" height="10" transform="rotate(-180 60 140)" fill="#727218"/>
            <rect x="70" y="140" width="10" height="10" transform="rotate(-180 70 140)" fill="#727218"/>
            <rect x="80" y="140" width="10" height="10" transform="rotate(-180 80 140)" fill="#DEDE90"/>
            <rect x="90" y="140" width="10" height="10" transform="rotate(-180 90 140)" fill="#DEDE90"/>
            <rect x="100" y="140" width="10" height="10" transform="rotate(-180 100 140)" fill="#DEDE90"/>
            <rect x="110" y="140" width="10" height="10" transform="rotate(-180 110 140)" fill="#DEDE90"/>
            <rect x="120" y="140" width="10" height="10" transform="rotate(-180 120 140)" fill="#727218"/>
            <rect x="130" y="140" width="10" height="10" transform="rotate(-180 130 140)" fill="#727218"/>
            <rect x="140" y="140" width="10" height="10" transform="rotate(-180 140 140)" fill="#B06C29"/>
            <rect x="150" y="140" width="10" height="10" transform="rotate(-180 150 140)" fill="#33330B"/>
            <rect x="50" y="150" width="10" height="10" transform="rotate(-180 50 150)" fill="#33330B"/>
            <rect x="60" y="150" width="10" height="10" transform="rotate(-180 60 150)" fill="#E1E1E1"/>
            <rect x="70" y="150" width="10" height="10" transform="rotate(-180 70 150)" fill="#BEBE29"/>
            <rect x="80" y="150" width="10" height="10" transform="rotate(-180 80 150)" fill="#727218"/>
            <rect x="90" y="150" width="10" height="10" transform="rotate(-180 90 150)" fill="#727218"/>
            <rect x="100" y="150" width="10" height="10" transform="rotate(-180 100 150)" fill="#727218"/>
            <rect x="110" y="150" width="10" height="10" transform="rotate(-180 110 150)" fill="#727218"/>
            <rect x="120" y="150" width="10" height="10" transform="rotate(-180 120 150)" fill="#BEBE29"/>
            <rect x="130" y="150" width="10" height="10" transform="rotate(-180 130 150)" fill="#B06C29"/>
            <rect x="140" y="150" width="10" height="10" transform="rotate(-180 140 150)" fill="#33330B"/>
            <rect x="60" y="160" width="10" height="10" transform="rotate(-180 60 160)" fill="#33330B"/>
            <rect x="70" y="160" width="10" height="10" transform="rotate(-180 70 160)" fill="#33330B"/>
            <rect x="80" y="160" width="10" height="10" transform="rotate(-180 80 160)" fill="#BEBE29"/>
            <rect x="90" y="160" width="10" height="10" transform="rotate(-180 90 160)" fill="#BEBE29"/>
            <rect x="100" y="160" width="10" height="10" transform="rotate(-180 100 160)" fill="#BEBE29"/>
            <rect x="110" y="160" width="10" height="10" transform="rotate(-180 110 160)" fill="#BEBE29"/>
            <rect x="120" y="160" width="10" height="10" transform="rotate(-180 120 160)" fill="#33330B"/>
            <rect x="130" y="160" width="10" height="10" transform="rotate(-180 130 160)" fill="#33330B"/>
            <rect x="80" y="170" width="10" height="10" transform="rotate(-180 80 170)" fill="#33330B"/>
            <rect x="90" y="170" width="10" height="10" transform="rotate(-180 90 170)" fill="#33330B"/>
            <rect x="100" y="170" width="10" height="10" transform="rotate(-180 100 170)" fill="#33330B"/>
            <rect x="110" y="170" width="10" height="10" transform="rotate(-180 110 170)" fill="#33330B"/>
            </g>
            <defs>
            <clipPath id="clip0_4_392">
            <rect width="180" height="180" fill="white"/>
            </clipPath>
            <clipPath id="clip1_4_392">
            <rect width="180" height="180" fill="white" transform={`translate(${f(dayX)} ${f(dayY)}) rotate(${nR})`}/>
            </clipPath>
            </defs>
        </svg>
    );
};


export function MinecraftClock({ rotation }: { rotation: number }) {
    return (
        <div className="minecraft-clock">
            {minecraftClockSvg(rotation)}
        </div>
    );
}
