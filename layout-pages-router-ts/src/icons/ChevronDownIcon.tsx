export default function ChevronDownIcon({ className }: IconType) {
    const svgClassName = className || 'w-[22px] h-[22px] fill-current';

    return (<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={svgClassName}>
        <path d="M12 21l-12-18h24z"/>
    </svg>)
}