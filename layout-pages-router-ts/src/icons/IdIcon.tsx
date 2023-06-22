export default function IdIcon({ className }: IconType) {
    const svgClassName = className || 'w-[32px] h-[24px]';

    return (<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 480"
        id="id"
        className={svgClassName}>
        <g fillRule="evenodd" strokeWidth="1pt"><path fill="#e70011" d="M0 0h639.958v248.947H0z"></path><path fill="#fff" d="M0 240h639.958v240H0z"></path></g>
    </svg>)
}