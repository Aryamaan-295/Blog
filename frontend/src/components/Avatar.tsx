export default function Avatar({ authorName, size=6 }:{ authorName:string; size?: number; }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-${size} aspect-square overflow-hidden bg-gray-200 rounded-full`}>
            <span className={`text-[${size*2.5}px] text-gray-600`}>{`${authorName[0].toUpperCase()}`}</span>
        </div>
    )
}